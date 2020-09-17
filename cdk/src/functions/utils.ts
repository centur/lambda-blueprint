import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";

export const lambdaWithAlias = (
  scope:         cdk.Construct,
  id:            string,
  aliasProps:    Partial<lambda.AliasProps>,
  functionProps: Partial<lambda.FunctionProps>,
  env:           string,
): {
  funcAlias: lambda.Alias,
  func:      lambda.Function,
} => {
  const func = new lambda.Function(scope, `${env}-${id}`, {
    runtime:               lambda.Runtime.NODEJS_12_X,
    currentVersionOptions: { removalPolicy: cdk.RemovalPolicy.RETAIN },
    ...functionProps,
  } as any);
  const funcAlias = new lambda.Alias(scope, `${env}-${id}-alias`, {
    aliasName: env,
    version:   func.currentVersion,
    ...aliasProps,
  } as any);
  return {
    funcAlias,
    func,
  };
};
