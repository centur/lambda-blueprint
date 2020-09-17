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

    // Only initialize if this is a valid request ...
    if (!service) { service = await createService(); }

    const customerDto = await service.getCustomer(pathParameters.id);
    return {
      statusCode: 200,
      body:       JSON.stringify(customerDto),
    };
  } catch (e) {
    return handleError(e);
  }
}
