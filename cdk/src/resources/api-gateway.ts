import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cognito from "@aws-cdk/aws-cognito";
import * as cdk from "@aws-cdk/core";

export class ApiGateway extends cdk.Stack {
  constructor(scope: cdk.App, props: any) {
    super(scope, `${props.env}-api-gateway`);

    const restApi = new apigateway.RestApi(this, `${props.env}-api`, {
      deployOptions: { stageName: "v1" },
    });

    new cdk.CfnOutput(this, `restApi-output`, { // Todo
      exportName: restApi.restApiId,
      value:      restApi.restApiId,
    });

    const userPool = new cognito.UserPool(this, `${props.env}-user-pool`);

    const userPoolResourceServer = new cognito.CfnUserPoolResourceServer(this, `${props.env}-user-pool-resource-server`, {
      identifier: `${props.env}-user-pool-resource-server`,
      name:       `${props.env}-user-pool-resource-server`,
      userPoolId: userPool.userPoolId,
      scopes: [
        { scopeName: "readerAccess", scopeDescription: "readerAccess" },
        { scopeName: "writerAccess", scopeDescription: "writerAccess" },
      ],
    });
    const readerAccessOAuthScope = cognito.OAuthScope.custom(`${userPoolResourceServer.name}/readerAccess`);
    new cdk.CfnOutput(this, `${readerAccessOAuthScope.scopeName}-output`, { // Todo
      exportName: readerAccessOAuthScope.scopeName,
      value:      readerAccessOAuthScope.scopeName,
    });
    const writerAccessOAuthScope = cognito.OAuthScope.custom(`${userPoolResourceServer.name}/writerAccess`);
    new cdk.CfnOutput(this, `${writerAccessOAuthScope.scopeName}-output`, { // Todo
      exportName: writerAccessOAuthScope.scopeName,
      value:      writerAccessOAuthScope.scopeName,
    });

    userPool.addDomain(`${props.env}-user-pool-domain`, { cognitoDomain: { domainPrefix: `${props.env}-authentication` } });

    userPool.addClient(`${props.env}-reader-access-client`, {
      generateSecret: true,
      oAuth: { flows: { clientCredentials: true }, scopes: [ readerAccessOAuthScope ] }, // <--- M2M-Communication
    });
    userPool.addClient(`${props.env}-writer-access-client`, {
      generateSecret: true,
      oAuth: { flows: { clientCredentials: true }, scopes: [ writerAccessOAuthScope ] }, // <--- M2M-Communication
    });

    const authorizer = new apigateway.CfnAuthorizer(this, `${props.env}-authorizer`, {
      restApiId:      restApi.restApiId,
      name:           `${props.env}-authorizer`,
      type:           apigateway. AuthorizationType.COGNITO,
      identitySource: "method.request.header.Authorization",
      providerArns:   [userPool.userPoolArn],
    });
    new cdk.CfnOutput(this, `authorizer-output`, { // Todo
      exportName: authorizer.ref,
      value:      authorizer.ref,
    });
    // ...
  }
}
