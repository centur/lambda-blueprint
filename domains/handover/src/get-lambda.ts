import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { assertNotNull, handleError } from "@lambda-blueprint/core";
import { createService } from "./utils/service-factory";
import { Service } from "./utils/service";

// Keep outside to re-use it for subsequent invocations.
let service: Service;

export const entrypoint = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.debug("Received handover-event: %s", event);
  try {
    const pathParameters = assertNotNull(event.pathParameters);
    if (!service) { service = await createService(); }

    const dto = await service.getHandover(pathParameters.id);
    return {
      statusCode: 200,
      body:       JSON.stringify(dto),
    };
  } catch (e) {
    return handleError(e);
  }
}
