import { load } from "protobufjs";

load("handover.proto")
  .then ((result) => {
    const Handover = result.lookupType("handover.Handover");

    // Is there any validation?
    const handover = Handover.create({ id: "id", property1: "1", property2: "2" });
    console.log(`handover = ${JSON.stringify(handover)}`);

    const hencoded = Handover.encode(handover).finish();
    console.log(`hencoded = ${Array.prototype.toString.call(hencoded)}`);

    const hdecoded = Handover.decode(hencoded);
    console.log(`hdecoded = ${JSON.stringify(hdecoded)}`); // Todo: Export functions?
  })
  .catch((reason) => console.error(reason));
