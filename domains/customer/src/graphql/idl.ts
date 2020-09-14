const types = `
type Customer {
  id: ID
  property1: String
  property2: String
}

type CreateCustomerDto {
  property1: String
  property2: String
}

type UpdateCustomerDto {
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

export default types;
