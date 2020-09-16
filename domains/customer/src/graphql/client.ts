const CREATE_QUERY = "mutation($dto: CreateCustomerDto!) { createCustomer(dto: $dto) { id } }";
const DELETE_QUERY = "mutation($id: ID!) { deleteCustomer($id: id) }";
const GET_QUERY    = "query($id: ID!) { getCustomer(id: $id) { id property1 property2 } }";
const UPDATE_QUERY = "mutation($id: ID!, $dto: UpdateCustomerDto! { updateCustomer(id: $id, dto: $dto) { id } })";

const doRequest = async ({ query, variables }: { query: any, variables: any }): Promise<any> => {
  const json = await fetch("/graphql", {
    method:  "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept":       "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  return json.json();
};

// ...
