import { APIGatewayProxyResult } from "aws-lambda";
import { Error400 } from "./errors/error-400";
import { Error404 } from "./errors/error-404";

export const handleError = (error: Error): APIGatewayProxyResult => {
  console.debug(error);
  const message = error.message;
  if (error.constructor === Error400) { return { statusCode: 400, body: message }; }
  if (error.constructor === Error404) { return { statusCode: 404, body: message }; }
  return { statusCode: 500, body: message };
};
