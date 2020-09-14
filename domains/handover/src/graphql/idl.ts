const typeDefs = `
  type Handover {
    id: ID
    property1: String
    property2: String
  }
  
  input CreateHandoverDto {
    property1: String
    property2: String
  }
  
  input UpdateHandoverDto {
    property1: String
    property2: String
  }
  
  type Query {
    getHandover(id: ID!): Handover
  }
  
  type Mutation {
    createHandover(dto: CreateHandoverDto!): Handover
    deleteHandover(id: ID!): Boolean
    updateHandover(id: ID!, dto: UpdateHandoverDto!): Handover
  }
  
  schema {
    query:    Query
    mutation: Mutation
  }
`;

export default typeDefs;
