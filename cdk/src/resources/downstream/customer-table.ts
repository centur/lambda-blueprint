import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as cdk from "@aws-cdk/core";

export default class CustomerTable extends cdk.Stack {

  constructor(scope: cdk.App, props: any) {

    super(scope,  `${props.env}-customer-table`);
    const table = `${props.env}-customer-table` ;

    new dynamodb.Table(this, table, {
      tableName: table,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    new cdk.CfnOutput(this, `${table}-output`, { // Imported in functions
      exportName: table,
      value:      table,
    });

    // ...
  }
}
