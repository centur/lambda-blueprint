import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as cdk from "@aws-cdk/core";

export class CustomerResources extends cdk.Stack {
  constructor(scope: cdk.App, props: any) {
    super(scope, `${props.env}-customer-resources`);

    const tableName = `${props.env}-customers`;

    new dynamodb.Table(this, tableName, {
      tableName,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    new cdk.CfnOutput(this, `${tableName}-output`, {
      exportName: tableName,
      value:      tableName,
    });

    // ...
  }
}
