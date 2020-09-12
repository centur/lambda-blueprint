import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isRight } from "fp-ts/lib/Either";
import { assertNotNull, handleError } from "@lambda-blueprint/core";
import { CreateDto } from "./dtos/create-dto";
import { createService } from "./utils/service-factory";
import { Service } from "./utils/service";

// Keep outside to re-use it for subsequent invocations.
let service: Service;

export async function entrypoint(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.debug("Received customer-event: %s", event);
  try {
    const body = assertNotNull(event.body);
    if (!service) {
      service = await createService();
    }
    const createDto = JSON.parse(body);
    const either = CreateDto.decode(createDto);
    if (isRight(either)) {
      const id = await service.createCustomer(either.right);
      const headers = {
        Location: `https://${event.requestContext.domainName}/${event.requestContext.stage}/customers/${id}`
      };
      return { statusCode: 201, body: "", headers };
    } else {
      return { statusCode: 400, body: JSON.stringify(either.left) };
    }
  } catch (e) {
    return handleError(e);
  }
}
