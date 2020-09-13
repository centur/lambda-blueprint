import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { assertNotNull, handleError } from "@lambda-blueprint/core";
import { createService } from "./utils/service-factory";
import { Service } from "./utils/service";

import {
  graphql,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
} from "graphql";

let service: Service;

const customerType = new GraphQLObjectType({
  name: "Customer",
  fields: {
    id:        { type: GraphQLString },
    property1: { type: GraphQLString },
    property2: { type: GraphQLString },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      customer: {
        args: { id: { type: new GraphQLNonNull(GraphQLString) } },
        type: customerType,
        resolve: async (source, args) => { return await service.getCustomer(args.id); },
      },
    },
  }),
});

export const entrypoint = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.debug("Received a graphql-based customer-event: %s", event);
  try {
    const json = assertNotNull(event.body);
    if (!service) { service = await createService(); }

    const body = JSON.parse(json);
    const qResult = await graphql(schema, body.query);

    return { statusCode: 200, body: JSON.stringify(qResult) };
  } catch (e) {
    return handleError(e);
  }
}