import { ApiGatewayStackDependency } from "./api-gateway-stack-dependency";
import { SharedStackProps } from "./shared-stack-props";

export interface DomainStackProps extends SharedStackProps, ApiGatewayStackDependency {}
