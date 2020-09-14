import { APIGatewayProxyResult } from "aws-lambda";

export const enum CorsReqHeader {}

export const enum CorsResHeader {}

export const withCors = (
  result: APIGatewayProxyResult,
  origin: string,
  allowedOrigins: string[],
): APIGatewayProxyResult => { // Todo
  return result;
};
