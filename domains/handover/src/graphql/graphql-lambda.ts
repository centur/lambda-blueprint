import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";

import typeDefs  from "./idl";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

graphql(schema, {} as any).then((result) => {}).catch((reason) => {});

const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();
app.use("/graphiql", graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(4000);
