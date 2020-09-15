import * as codedeploy from "@aws-cdk/aws-codedeploy";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";

export const lambdaWithAliasAndDeploymentGroup = (
  scope: cdk.Construct,
  id: string,
  handler: string,
  distPath: string,
  fileName: string,
  environment: Record<string, any>,
  propertiies: Record<string, any>,
  env: string,
): {
  funcAlias: lambda.Alias,
  func:      lambda.Function,
} => {
  const func = new lambda.Function(scope, `${env}-${id}`, {
    handler: handler,
    runtime: lambda.Runtime.NODEJS_12_X,
    code:    lambda.AssetCode.fromAsset(
      distPath, { exclude: ["**", `!${fileName}`] },
    ),
    currentVersionOptions: { removalPolicy: cdk.RemovalPolicy.RETAIN },
    environment,
  });
  const funcAlias = new lambda.Alias(scope, `${env}-${id}-alias`, {
    aliasName: env,
    version:   func.currentVersion,
  });
  new codedeploy.LambdaDeploymentGroup(scope, `${env}-${id}-deployment-group`, {
    ...propertiies,
    alias: funcAlias,
  });
  return {
    funcAlias,
    func,
  };
};
