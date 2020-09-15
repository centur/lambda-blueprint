import { makeExecutableSchema } from "@graphql-tools/schema";

import typeDefs  from "./idl";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(4000);
