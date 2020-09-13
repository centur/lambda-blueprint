import * as DynamoDB from "aws-sdk/clients/dynamodb";

export const createTable = async (
  tableName:   string,
  hashKeyName: string,
  hashKeyType: DynamoDB.ScalarAttributeType,
): Promise<void> => {
  const createTableInput: DynamoDB.CreateTableInput = {
    TableName:            tableName,
    KeySchema:            [{ AttributeName: hashKeyName, KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: hashKeyName, AttributeType: hashKeyType }],
    BillingMode:          "PAY_PER_REQUEST",
  };
  await dynamoDB.createTable(createTableInput).promise().catch((reason: any) => Promise.reject(reason));
};

export const deleteTable = async (
  tableName: string,
): Promise<void> => {
  const deleteTableInput: DynamoDB.DeleteTableInput = {
    TableName: tableName,
  };
  await dynamoDB.deleteTable(deleteTableInput).promise().catch((reason: any) => Promise.reject(reason));
};

const endpoint = process.env.DYNAMODB_ENDPOINT;

const options: DynamoDB.ClientConfiguration = {
  endpoint: endpoint,
};

const dynamoDB = new DynamoDB({
  ...options,
});
