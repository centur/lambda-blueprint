import * as cdk from "@aws-cdk/core";
import { CustomerResources } from "./customer-resources";
import { HandoverResources } from "./handover-resources";
import { ApiGateway } from "./api-gateway";

const app = new cdk.App({});
const env = process.env["ENV"];

new ApiGateway(app, { env });

new CustomerResources(app, { env });
new HandoverResources(app, { env });

// ...
