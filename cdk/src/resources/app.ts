import * as cdk from "@aws-cdk/core";
import { CustomerDB } from "./downstream/customer-db";
import { HandoverDB } from "./downstream/handover-db";

const app = new cdk.App();
const env = process.env["ENV"];

if (!env) { throw new Error("You missed a value for env-var 'ENV'."); }

new CustomerDB(app, { env });
new HandoverDB(app, { env });

// ...
