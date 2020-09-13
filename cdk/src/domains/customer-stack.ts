import { DomainStackProps } from "../interfaces/domain-stack-props";
import { Keys } from "../../../domains/customer/src/utils/keys";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as codedeploy from "@aws-cdk/aws-codedeploy";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { lambdaWithAliasAndDeploymentGroup } from "./utils";
import * as cdk from "@aws-cdk/core";

export class CustomerStack extends cdk.Stack {
  constructor(scope: cdk.App, props: DomainStackProps, distPath: string) {
    super(scope, `${props.env}-customer-stack`);

    const restApi        = props.restApi;
    const restAuthorizer = props.restAuthorizer;

    const readAccessOAuthScope = props.readAccessOAuthScope.scopeName;
    const fullAccessOAuthScope = props.fullAccessOAuthScope.scopeName;

    const dynamodbTable = new dynamodb.Table(this, "customers", {
      tableName: `${props.env}-customers`,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const environment: Record<string, string> = {};

    environment[Keys.ENV]        = props.env;
    environment[Keys.TABLE_NAME] = dynamodbTable.tableName;
    // ...

    // Todo: build ssm-role and attach it ...

    const lambdaApplication = new codedeploy.LambdaApplication(this, `${props.env}-customer-stack`);

    const propertiies = {
      application:      lambdaApplication,
      deploymentConfig: codedeploy.LambdaDeploymentConfig.CANARY_10PERCENT_15MINUTES,
    };

    const createLambdaContext  = lambdaWithAliasAndDeploymentGroup(
      this,
      "create-lambda",
      "create-lambda-bundle.entrypoint",
      distPath,
      "create-lambda-bundle.js",
      environment,
      propertiies,
      props.env,
    );

    const deleteLambdaContext  = lambdaWithAliasAndDeploymentGroup(
      this,
      "delete-lambda",
      "delete-lambda-bundle.entrypoint",
      distPath,
      "delete-lambda-bundle.js",
      environment,
      propertiies,
      props.env,
    );

    const getLambdaContext     = lambdaWithAliasAndDeploymentGroup(
      this,
      "get-lambda",
      "get-lambda-bundle.entrypoint",
      distPath,
      "get-lambda-bundle.js",
      environment,
      propertiies,
      props.env,
    );

    const updateLambdaContext  = lambdaWithAliasAndDeploymentGroup(
      this,
      "update-lambda",
      "update-lambda-bundle.entrypoint",
      distPath,
      "update-lambda-bundle.js",
      environment,
      propertiies,
      props.env,
    );

    const graphqlLambdaContext = lambdaWithAliasAndDeploymentGroup(
      this,
      "graphql-lambda",
      "graphql-lambda-bundle.entrypoint",
      distPath,
      "graphql-lambda-bundle.js",
      environment,
      propertiies,
      props.env,
    );

    dynamodbTable.grantWriteData(createLambdaContext.func);
    dynamodbTable.grantWriteData(deleteLambdaContext.func);
    dynamodbTable.grantReadData(getLambdaContext.func);
    dynamodbTable.grantReadWriteData(updateLambdaContext.func);

    const methodOptions: apigateway.MethodOptions = {
      authorizationType: apigateway.AuthorizationType.COGNITO,
      authorizer:        { authorizerId: restAuthorizer.ref },
    };

    const customers = restApi.root.addResource("customers");

    const createIntegration = new apigateway.LambdaIntegration(createLambdaContext.funcAlias);
    customers.addMethod("POST", createIntegration, { ...methodOptions, authorizationScopes: [fullAccessOAuthScope] });

    const customer = customers.addResource("{id}");

    const deleteIntegration = new apigateway.LambdaIntegration(deleteLambdaContext.funcAlias);
    customer.addMethod("DELETE", deleteIntegration, { ...methodOptions, authorizationScopes: [fullAccessOAuthScope] });

    const getIntegration = new apigateway.LambdaIntegration(getLambdaContext.funcAlias);
    customer.addMethod("GET", getIntegration, { ...methodOptions, authorizationScopes: [readAccessOAuthScope, fullAccessOAuthScope] });

    const updateIntegration = new apigateway.LambdaIntegration(updateLambdaContext.funcAlias);
    customer.addMethod("PUT", updateIntegration, { ...methodOptions, authorizationScopes: [fullAccessOAuthScope] });

    const graphql = customers.addResource("graphql");

    const graphqlIntegration = new apigateway.LambdaIntegration(graphqlLambdaContext.funcAlias);
    graphql.addMethod("POST", graphqlIntegration);

    customers.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // <--- Todo: Restrict?
      allowMethods: ["POST"],
    });
    customer.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // <--- Todo: Restrict?
      allowMethods: ["DELETE, GET, PUT"],
    });
  }
}
