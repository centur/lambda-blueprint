import * as cdk from "@aws-cdk/core";
import { CustomerFunctions } from "./customer-functions";
import { HandoverFunctions } from "./handover-functions";
import { ApiGateway } from "./api-gateway";

const app = new cdk.App({});
const env = process.env["ENV"];

if (!env) { throw new Error("You missed a value for env-var 'ENV'."); }

const apiGateway = new ApiGateway(app, { env });

const props = { restApi: apiGateway.restApi, restAuthorizer: apiGateway.restAuthorizer, readerAccessOAuthScope: apiGateway.readerAccessOAuthScope, writerAccessOAuthScope: apiGateway.writerAccessOAuthScope };

new CustomerFunctions(app, { ...props, env }, "domains/customer/dist");
new HandoverFunctions(app, { ...props, env }, "domains/handover/dist");

// ...
