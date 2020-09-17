import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isRight } from "fp-ts/lib/Either";
import { assertNotNull, handleError } from "@lambda-blueprint/core";
import { UpdateDto } from "./dtos/update-dto";
import { createService } from "./utils/service-factory";
import { Service } from "./utils/service";

// Keep outside to re-use it for subsequent invocations.
let service: Service;

export const entrypoint = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.debug("Received handover-event: %s", event);
  try {
    const pathParameters = assertNotNull(event.pathParameters);
    const json           = assertNotNull(event.body);

    // Only initialize if this is a valid request ...
    if (!service) { service = await createService(); }

    const body   = JSON.parse(json);
    const either = UpdateDto.decode(body);
    if (isRight(either)) {
      await service.updateHandover(pathParameters.id, either.right);
      return { statusCode: 204, body: "" };
    } else {
      return { statusCode: 400, body: JSON.stringify(either.left) };
    }
  } catch (e) {
    return handleError(e);
  }
}
