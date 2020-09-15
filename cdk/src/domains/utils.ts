import * as codedeploy from "@aws-cdk/aws-codedeploy";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";

export const lambdaWithAliasAndDeploymentGroup = (
  scope:                      cdk.Construct,
  id:                         string,
  aliasProps:                 Partial<lambda.AliasProps>,
  functionProps:              Partial<lambda.FunctionProps>,
  lambdaDeploymentGroupProps: Partial<codedeploy.LambdaDeploymentGroupProps>,
  env:                        string,
): {
  funAlias: lambda.Alias,
  fun:      lambda.Function,
} => {
  const deploymentConfig = codedeploy.LambdaDeploymentConfig.ALL_AT_ONCE; // Todo

  const fun = new lambda.Function(scope, `${env}-${id}`, {
    tracing:               lambda.Tracing.ACTIVE,
    runtime:               lambda.Runtime.NODEJS_12_X,
    currentVersionOptions: { removalPolicy: cdk.RemovalPolicy.RETAIN },
    ...functionProps,
  } as any);
  const funAlias = new lambda.Alias(scope, `${env}-${id}-alias`, {
    aliasName: env,
    version:   fun.currentVersion,
    ...aliasProps,
  } as any);
  new codedeploy.LambdaDeploymentGroup(scope, `${env}-${id}-deployment-group`, {
    ...lambdaDeploymentGroupProps,
    deploymentConfig,
    alias:  funAlias,
  } as any);
  return {
    funAlias,
    fun,
  };
};
