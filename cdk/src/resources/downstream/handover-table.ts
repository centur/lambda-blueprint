import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as cdk from "@aws-cdk/core";

export default class HandoverTable extends cdk.Stack {

  constructor(scope: cdk.App, props: any) {

    super(scope,  `${props.env}-handover-table`);
    const table = `${props.env}-handover-table` ;

    new dynamodb.Table(this, table, {
      tableName: table,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    new cdk.CfnOutput(this, `${table}-output`, {
      exportName: table,
      value:      table,
    });

    // ...
  }
}
