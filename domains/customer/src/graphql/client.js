// When express is up, open browser plus developer-console, and use:

fetch("/graphiql", {
  method:  "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept":       "application/json",
  },
  body: JSON.stringify({ query: "{ getCustomer(id: \"<id>\") { id } }" }) // Todo
})
  .then((json) => json.json())
  .then((body) => console.log("Body: %s", body));

// ...
