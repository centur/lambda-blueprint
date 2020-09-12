import * as cdk from "@aws-cdk/core";
import { ApiGatewayStackDependency } from "./interfaces/api-gateway-stack-dependency";
import { CustomerStack } from "./domains/customer-stack";
import { HandoverStack } from "./domains/handover-stack";
import { DomainStackProps } from "./interfaces/domain-stack-props";
import { SharedStackProps } from "./interfaces/shared-stack-props";
import { ApiGatewayStack } from "./api-gateway-stack";

const app = new cdk.App({});

const env = app.node.tryGetContext("ENV");
// if (!env) { throw new Error("You missed a value for 'ENV'. Run: 'cdk <command> -c ENV=<value>'"); }

const sharedStackProps: SharedStackProps = { env };

const apiGatewayStack = new ApiGatewayStack(app, sharedStackProps);
// ...

// Build dependencies
const apiGatewayStackDependency: ApiGatewayStackDependency = { restApi: apiGatewayStack.restApi, restAuthorizer: apiGatewayStack.restAuthorizer, readAccess: apiGatewayStack.readAccess, fullAccess: apiGatewayStack.fullAccess };
// ...

new CustomerStack(app, { ...sharedStackProps, ...apiGatewayStackDependency }, "domains/customer/dist");
new HandoverStack(app, { ...sharedStackProps, ...apiGatewayStackDependency }, "domains/handover/dist");

// ...
