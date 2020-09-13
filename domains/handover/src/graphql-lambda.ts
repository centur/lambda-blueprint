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

const handoverType = new GraphQLObjectType({
  name: "Handover",
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
      handover: {
        args: { id: { type: new GraphQLNonNull(GraphQLString) } },
        type: handoverType,
        resolve: async (source, args) => { return await service.getHandover(args.id); },
      },
    },
  }),
  /*
  mutation: new GraphQLObjectType({ // Todo
    name: "Mutation",
    fields: {
      createHandover: {},
      updateHandover: {},
      deleteHandover: {},
    },
  }),
  */
});

export const entrypoint = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.debug("Received a graphql-based handover-event: %s", event);
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
