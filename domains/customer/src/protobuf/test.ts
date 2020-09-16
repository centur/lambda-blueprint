import { load } from "protobufjs";

load("customer.proto")
  .then ((result) => {
    const Customer = result.lookupType("customer.Customer");

    // Is there any validation?
    const customer = Customer.create({ id: "id", property1: "1", property2: "2" });
    console.debug(`customer = ${JSON.stringify(customer)}`);

    const cencoded = Customer.encode(customer).finish();
    console.debug(`cencoded = ${Array.prototype.toString.call(cencoded)}`);

    const cdecoded = Customer.decode(cencoded);
    console.debug(`cdecoded = ${JSON.stringify(cdecoded)}`); // Todo: Export functions?
  })
  .catch((reason) => console.error(reason));
