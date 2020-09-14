import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { assertNotNull, handleError } from "@lambda-blueprint/core";

export const entrypoint = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.debug("Received handover-event: %s", event);
  try {
    const json = assertNotNull(event.body);
    const body = JSON.parse(json);
    return { statusCode: 200, body: JSON.stringify("Todo ...") };
  } catch (e) {
    return handleError(e);
  }
}
