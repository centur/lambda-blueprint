import * as cdk from "@aws-cdk/core";
import { CustomerFunctions } from "./customer-functions";
import { HandoverFunctions } from "./handover-functions";

const app = new cdk.App({});
const env = process.env["ENV"];

new CustomerFunctions(app, { env }, "domains/customer/dist");
new HandoverFunctions(app, { env }, "domains/handover/dist");

// ...
