const typeDefs = `
  type Customer {
    id: ID
    property1: String
    property2: String
  }
  
  input CreateCustomerDto {
    property1: String
    property2: String
  }
  
  input UpdateCustomerDto {
    property1: String
    property2: String
  }
  
  type Query {
    getCustomer(id: ID!): Customer
  }
  
  type Mutation {
    createCustomer(dto: CreateCustomerDto!): Customer
    deleteCustomer(id: ID!): Boolean
    updateCustomer(id: ID!, dto: UpdateCustomerDto!): Customer
  }
  
  schema {
    query:    Query
    mutation: Mutation
  }
`;

export default typeDefs;
