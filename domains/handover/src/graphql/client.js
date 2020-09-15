const createQuery = "mutation($dto: CreateHandoverDto!) { createHandover(dto: $dto) { id } }";
const deleteQuery = "mutation($id: ID!) { deleteHandover($id: id) }";
const getQuery    = "query($id: ID!) { getHandover(id: $id) { id property1 property2 } }";
const updateQuery = "mutation($id: ID!, $dto: UpdateHandoverDto! { updateHandover(id: $id, dto: $dto) { id } })";

const doRequest = async ({ query, variables }) => {
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
