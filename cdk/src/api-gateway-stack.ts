import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cognito from "@aws-cdk/aws-cognito";
import * as cdk from "@aws-cdk/core";
import { SharedStackProps } from "./interfaces/shared-stack-props";

export class ApiGatewayStack extends cdk.Stack {
  restApi:              apigateway.RestApi;
  restAuthorizer:       apigateway.CfnAuthorizer;
  readAccessOAuthScope: cognito.OAuthScope;
  fullAccessOAuthScope: cognito.OAuthScope;

  constructor(scope: cdk.App, props: SharedStackProps) {
    super(scope, `${props.env}-api-gateway-stack`);

    this.restApi = new apigateway.RestApi(this, `${props.env}-api`, {
      deployOptions: { stageName: "v1" },
    });

    const userPool = new cognito.UserPool(this, `${props.env}-user-pool`, {});

    const userPoolResourceServer = new cognito.CfnUserPoolResourceServer(this, `${props.env}-user-pool-resource-server`, {
      identifier: `${props.env}-user-pool-resource-server`,
      name:       `${props.env}-user-pool-resource-server`,
      userPoolId: userPool.userPoolId,
      scopes: [
        { scopeName: "readAccess", scopeDescription: "readAccess" },
        { scopeName: "fullAccess", scopeDescription: "fullAccess" },
      ],
    });
    this.readAccessOAuthScope = cognito.OAuthScope.custom(`${userPoolResourceServer.name}/readAccess`);
    this.fullAccessOAuthScope = cognito.OAuthScope.custom(`${userPoolResourceServer.name}/fullAccess`);
    userPool.addDomain(`${props.env}-user-pool-domain`, { cognitoDomain: { domainPrefix: `${props.env}-api` } });

    userPool.addClient(`${props.env}-read-access-client`, {
      generateSecret: true,
      oAuth: {
        flows:  { clientCredentials: true },
        scopes: [ this.readAccessOAuthScope ],
      },
    });
    userPool.addClient(`${props.env}-full-access-client`, {
      generateSecret: true,
      oAuth: {
        flows:  { clientCredentials: true },
        scopes: [ this.fullAccessOAuthScope ],
      },
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
