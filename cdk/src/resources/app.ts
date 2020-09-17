import * as cdk from "@aws-cdk/core";
import { CustomerResources } from "./customer-resources";
import { HandoverResources } from "./handover-resources";

const app = new cdk.App({});
const env = process.env["ENV"];

if (!env) { throw new Error("You missed a value for env-var 'ENV'."); }

new CustomerResources(app, { env });
new HandoverResources(app, { env });

// ...
