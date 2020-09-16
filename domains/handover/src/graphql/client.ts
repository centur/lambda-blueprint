const CREATE_QUERY = "mutation($dto: CreateHandoverDto!) { createHandover(dto: $dto) { id } }";
const DELETE_QUERY = "mutation($id: ID!) { deleteHandover($id: id) }";
const GET_QUERY    = "query($id: ID!) { getHandover(id: $id) { id property1 property2 } }";
const UPDATE_QUERY = "mutation($id: ID!, $dto: UpdateHandoverDto! { updateHandover(id: $id, dto: $dto) { id } })";

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
