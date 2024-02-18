import { APIGatewayEvent } from 'aws-lambda';

import { ErrorResponse, Password } from '../utils';

export const authMiddleware = (event: APIGatewayEvent) => {
  try {
    const token = event.headers.Authorization;
    if (!token) return ErrorResponse(403, 'Authorization failed!');

    const payload = Password.VerifyToken(token);
    if (!payload) return ErrorResponse(403, 'Authorization failed!');

    return payload;
  } catch (error) {
    console.log(error);
    return ErrorResponse(500, error);
  }
};
