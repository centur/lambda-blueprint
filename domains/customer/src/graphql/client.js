const createQuery = "mutation($dto: CreateCustomerDto!) { createCustomer(dto: $dto) { id } }";
const deleteQuery = "mutation($id: ID!) { deleteCustomer($id: id) }";
const getQuery    = "query($id: ID!) { getCustomer(id: $id) { id property1 property2 } }";
const updateQuery = "mutation($id: ID!, $dto: UpdateCustomerDto! { updateCustomer(id: $id, dto: $dto) { id } })";

const request = async (body) => {
  const json = await fetch("/graphql", {
    method:  "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept":       "application/json",
    },
    body: JSON.stringify(body),
  });
  return json.json();
};

// ...
