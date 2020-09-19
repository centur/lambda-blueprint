import * as cdk from "@aws-cdk/core";
import { CustomerTable } from "./downstream/customer-table";
import { HandoverTable } from "./downstream/handover-table";

const app = new cdk.App();
const env = process.env["ENV"];

if (!env) { throw new Error("You missed a value for env-var 'ENV'."); }

new CustomerTable(app, { env });
new HandoverTable(app, { env });

// ...
