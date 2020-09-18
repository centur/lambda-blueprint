import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cognito from "@aws-cdk/aws-cognito";
import * as cdk from "@aws-cdk/core";

export class ApiGateway extends cdk.Stack {
  restApi:                apigateway.RestApi;
  restAuthorizer:         apigateway.CfnAuthorizer;
  readerAccessOAuthScope: cognito.OAuthScope;
  writerAccessOAuthScope: cognito.OAuthScope;

  constructor(scope: cdk.App, props: any) {
    super(scope, `${props.env}-api-gateway`);

    // Todo: custom-domain
    this.restApi = new apigateway.RestApi(this, `${props.env}-api`, {
      deployOptions: { stageName: "v1" },
    });
    // Todo: Is edge-caching enabled, when using edge-optimized endpoints?

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
    this.readerAccessOAuthScope = cognito.OAuthScope.custom(`${userPoolResourceServer.name}/readerAccess`);
    this.writerAccessOAuthScope = cognito.OAuthScope.custom(`${userPoolResourceServer.name}/writerAccess`);

    // Todo: custom-domain
    userPool.addDomain(`${props.env}-user-pool-domain`, { cognitoDomain: { domainPrefix: "" } });

    userPool.addClient(`${props.env}-reader-access-client`, {
      generateSecret: true,
      oAuth: { flows: { clientCredentials: true }, scopes: [ this.readerAccessOAuthScope ] }, // <--- M2M-Communication
    });
    userPool.addClient(`${props.env}-writer-access-client`, {
      generateSecret: true,
      oAuth: { flows: { clientCredentials: true }, scopes: [ this.writerAccessOAuthScope ] }, // <--- M2M-Communication
    });

    this.restAuthorizer = new apigateway.CfnAuthorizer(this, `${props.env}-authorizer`, {
      restApiId:      this.restApi.restApiId,
      name:           `${props.env}-authorizer`,
      type:           apigateway. AuthorizationType.COGNITO,
      identitySource: "method.request.header.Authorization",
      providerArns:   [userPool.userPoolArn],
    });
    // ...
  }
}
