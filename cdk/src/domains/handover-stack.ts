import { DomainStackProps } from "../interfaces/domain-stack-props";
import { Keys } from "../../../domains/handover/src/utils/keys";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as codedeploy from "@aws-cdk/aws-codedeploy";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import { lambdaWithAliasAndDeploymentGroup } from "./utils";
import * as cdk from "@aws-cdk/core";

export class HandoverStack extends cdk.Stack {
  constructor(scope: cdk.App, props: DomainStackProps, distPath: string) {
    super(scope, `${props.env}-handover-stack`);

    const restApi              = props.restApi;
    const restAuthorizer       = props.restAuthorizer;
    const readAccessOAuthScope = props.readAccessOAuthScope.scopeName;
    const fullAccessOAuthScope = props.fullAccessOAuthScope.scopeName;

    const dynamodbTable = new dynamodb.Table(this, "handovers", {
      tableName: `${props.env}-handovers`,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const environment: Record<string, string> = {};

    environment[Keys.ENV]        = props.env;
    environment[Keys.TABLE_NAME] = dynamodbTable.tableName;
    // ...

    const application = new codedeploy.LambdaApplication(this, `${props.env}-handover-application`);

    const createLambdaContext  = lambdaWithAliasAndDeploymentGroup(
      this,
      "create-lambda",
      {},
      {
        handler: "create-lambda-bundle.entrypoint",
        code:    lambda.AssetCode.fromAsset(
          distPath, { exclude: ["**", "!create-lambda.js"] },
        ),
        environment,
      },
      { application },
      props.env,
    );

    const deleteLambdaContext  = lambdaWithAliasAndDeploymentGroup(
      this,
      "delete-lambda",
      {},
      {
        handler: "delete-lambda-bundle.entrypoint",
        code:    lambda.AssetCode.fromAsset(
          distPath, { exclude: ["**", "!delete-lambda.js"] },
        ),
        environment,
      },
      { application },
      props.env,
    );

    const getLambdaContext     = lambdaWithAliasAndDeploymentGroup(
      this,
      "get-lambda",
      { provisionedConcurrentExecutions: 10 },
      {
        handler: "get-lambda-bundle.entrypoint",
        code:    lambda.AssetCode.fromAsset(
          distPath, { exclude: ["**", "!get-lambda.js"] },
        ),
        environment,
      },
      { application },
      props.env,
    );

    const updateLambdaContext  = lambdaWithAliasAndDeploymentGroup(
      this,
      "update-lambda",
      {},
      {
        handler: "update-lambda-bundle.entrypoint",
        code:    lambda.AssetCode.fromAsset(
          distPath, { exclude: ["**", "!update-lambda.js"] },
        ),
        environment,
      },
      { application },
      props.env,
    );

    dynamodbTable.grantWriteData(createLambdaContext.fun);
    dynamodbTable.grantWriteData(deleteLambdaContext.fun);
    dynamodbTable.grantReadData(getLambdaContext.fun);
    dynamodbTable.grantReadWriteData(updateLambdaContext.fun);

    const methodOptions: apigateway.MethodOptions = {
      authorizationType: apigateway.AuthorizationType.COGNITO,
      authorizer:        { authorizerId: restAuthorizer.ref },
    };

    const handovers = restApi.root.addResource("handovers");

    const createIntegration = new apigateway.LambdaIntegration(createLambdaContext.funAlias);
    handovers.addMethod("POST", createIntegration, { ...methodOptions, authorizationScopes: [fullAccessOAuthScope] });

    const handover = handovers.addResource("{id}");

    const deleteIntegration = new apigateway.LambdaIntegration(deleteLambdaContext.funAlias);
    handover.addMethod("DELETE", deleteIntegration, { ...methodOptions, authorizationScopes: [fullAccessOAuthScope] });

    const getIntegration = new apigateway.LambdaIntegration(getLambdaContext.funAlias);
    handover.addMethod("GET", getIntegration, { ...methodOptions, authorizationScopes: [readAccessOAuthScope, fullAccessOAuthScope] });

    const updateIntegration = new apigateway.LambdaIntegration(updateLambdaContext.funAlias);
    handover.addMethod("PUT", updateIntegration, { ...methodOptions, authorizationScopes: [fullAccessOAuthScope] });

    handovers.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // <--- Todo: Restrict?
      allowMethods: ["POST"],
    });
    handover.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // <--- Todo: Restrict?
      allowMethods: ["DELETE, GET, PUT"],
    });
  }
}
