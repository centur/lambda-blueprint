import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as cdk from "@aws-cdk/core";

export class CustomerDB extends cdk.Stack {
  constructor(scope: cdk.App, props: any) {
    super(scope, `${props.env}-customer-db`);

    const tableName = `${props.env}-customers`;

    new dynamodb.Table(this, tableName, {
      tableName,
//    timeToLiveAttribute: "ttl",
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
