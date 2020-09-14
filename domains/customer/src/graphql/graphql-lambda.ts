import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";

import typeDefs  from "./idl";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Todo: Use this line in your lambda-function and pass the body (graphql-query) as the second argument.
graphql(schema, {} as any).then((result) => {}).catch((reason) => {});
