import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { assertNotNull, handleError } from "@lambda-blueprint/core";
import { createService } from "./utils/service-factory";
import { Service } from "./utils/service";

// Keep outside to re-use it for subsequent invocations.
let service: Service;

export const entrypoint = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.debug("Received customer-event: %s", event);
  try {
    const pathParameters = assertNotNull(event.pathParameters);
    if (!service) { service = await createService(); }

    await service.deleteCustomer(pathParameters.id);
    return { statusCode: 204, body: "" };
  } catch (e) {
    return handleError(e);
  }
}
