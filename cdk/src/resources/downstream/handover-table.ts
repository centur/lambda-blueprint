import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as cdk from "@aws-cdk/core";

export class HandoverTable extends cdk.Stack {
  constructor(scope: cdk.App, props: any) {
    super(scope, `${props.env}-handover-table`);

    const tableName = `${props.env}-handovers`;

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
