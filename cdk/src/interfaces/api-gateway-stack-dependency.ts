import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cognito from "@aws-cdk/aws-cognito";

export interface ApiGatewayStackDependency {
  restApi:              apigateway.RestApi;
  restAuthorizer:       apigateway.CfnAuthorizer;
  readAccessOAuthScope: cognito.OAuthScope;
  fullAccessOAuthScope: cognito.OAuthScope;
}
