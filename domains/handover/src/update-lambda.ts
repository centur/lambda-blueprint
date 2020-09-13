import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isRight } from "fp-ts/lib/Either";
import { assertNotNull, handleError } from "@lambda-blueprint/core";
import { UpdateDto } from "./dtos/update-dto";
import { createService } from "./utils/service-factory";
import { Service } from "./utils/service";

// Keep outside to re-use it for subsequent invocations.
let service: Service;

export async function entrypoint(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.debug("Received handover-event: %s", event);
  try {
    const pathParameters = assertNotNull(event.pathParameters);
    const body           = assertNotNull(event.body);
    if (!service) { service = await createService(); }
    const updateDto = JSON.parse(body);
    const either = UpdateDto.decode(updateDto);
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
