import { Keys } from "../../../domains/customer/src/utils/keys";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import { lambdaWithAlias } from "./utils";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as codedeploy from "@aws-cdk/aws-codedeploy";
import * as cdk from "@aws-cdk/core";

export class CustomerFunctions extends cdk.Stack {
  constructor(scope: cdk.App, props: any, pathToDist: string) {
    super(scope, `${props.env}-customer-functions`);

    // Todo
    const restApi                = props.restApi;
    const restAuthorizer         = props.restAuthorizer;
    const readerAccessOAuthScope = props.readerAccessOAuthScope.scopeName;
    const writerAccessOAuthScope = props.writerAccessOAuthScope.scopeName;

    const tableName     = `${props.env}-customers`;
    const customerTable = dynamodb.Table.fromTableName(this, tableName, cdk.Fn.importValue(tableName));

    const environment: Record<string, string> = {};

    environment[Keys.ENV]        = props.env;
    environment[Keys.TABLE_NAME] = customerTable.tableName;
    // ...

    const createLambdaContext = lambdaWithAlias(
      this,
      "create-lambda",
      {},
      {
        handler: "create-lambda-bundle.entrypoint",
        code:    lambda.AssetCode.fromAsset(
          pathToDist, { exclude: ["**", "!create-lambda-bundle.js"] },
        ),
        environment,
      },
      props.env,
    );

    const deleteLambdaContext = lambdaWithAlias(
      this,
      "delete-lambda",
      {},
      {
        handler: "delete-lambda-bundle.entrypoint",
        code:    lambda.AssetCode.fromAsset(
          pathToDist, { exclude: ["**", "!delete-lambda-bundle.js"] },
        ),
        environment,
      },
      props.env,
    );

    const getLambdaContext    = lambdaWithAlias(
      this,
      "get-lambda",
      {}, // { provisionedConcurrentExecutions: 1 }, // Todo
      {
        handler: "get-lambda-bundle.entrypoint",
        code:    lambda.AssetCode.fromAsset(
          pathToDist, { exclude: ["**", "!get-lambda-bundle.js"] },
        ),
        environment,
      },
      props.env,
    );

    const updateLambdaContext = lambdaWithAlias(
      this,
      "update-lambda",
      {},
      {
        handler: "update-lambda-bundle.entrypoint",
        code:    lambda.AssetCode.fromAsset(
          pathToDist, { exclude: ["**", "!update-lambda-bundle.js"] },
        ),
        environment,
      },
      props.env,
    );

    customerTable.grantWriteData(createLambdaContext.func);
    customerTable.grantWriteData(deleteLambdaContext.func);
    customerTable.grantReadData(getLambdaContext.func);
    customerTable.grantReadWriteData(updateLambdaContext.func);

    const methodOptions: apigateway.MethodOptions = {
      authorizationType: apigateway.AuthorizationType.COGNITO,
      authorizer:        { authorizerId: restAuthorizer.ref },
    };

    const customersResource = restApi.root.addResource("customers");

    const createIntegration = new apigateway.LambdaIntegration(createLambdaContext.funcAlias);
    customersResource.addMethod("POST", createIntegration, { ...methodOptions, authorizationScopes: [writerAccessOAuthScope] });

    const customerResource = customersResource.addResource("{id}");

    const deleteIntegration = new apigateway.LambdaIntegration(deleteLambdaContext.funcAlias);
    customerResource.addMethod("DELETE", deleteIntegration, { ...methodOptions, authorizationScopes: [writerAccessOAuthScope] });

    const getIntegration = new apigateway.LambdaIntegration(getLambdaContext.funcAlias);
    customerResource.addMethod("GET", getIntegration, { ...methodOptions, authorizationScopes: [readerAccessOAuthScope] });

    const updateIntegration = new apigateway.LambdaIntegration(updateLambdaContext.funcAlias);
    customerResource.addMethod("PUT", updateIntegration, { ...methodOptions, authorizationScopes: [writerAccessOAuthScope] });

    customersResource.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // <--- Todo: Restrict?
      allowMethods: ["POST"],
    });
    customerResource.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, // <--- Todo: Restrict?
      allowMethods: ["DELETE, GET, PUT"],
    });
  }
}
