import { APIGatewayProxyResult } from "aws-lambda";
import { Error400 } from "./errors/error-400";
import { Error404 } from "./errors/error-404";

export const handleError = (error: Error): APIGatewayProxyResult => {
  let statusCode = 500;
  if (error.constructor === Error400) { statusCode = 400; }
  if (error.constructor === Error404) { statusCode = 404; }
  return { statusCode, body: error.message };
};
