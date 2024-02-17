import 'reflect-metadata';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { PgAuthDatasource, PgUserDatasource } from './infrastructure/datasources';
import { AuthRepositoryImpl, UserRepositoryImpl } from './infrastructure/repositories';
import { EmailService } from './infrastructure/services/email.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { ErrorResponse } from './presentation/utils';

const service = new AuthController(
  new AuthRepositoryImpl(new PgAuthDatasource()),
  new UserRepositoryImpl(new PgUserDatasource()),
  new EmailService()
);

export const handler = (event: APIGatewayProxyEvent) => {
  const isRoot = event.queryStringParameters === null;

  switch (event.path) {
    case '/auth/login':
      return service.LoginUser(event);
    case '/auth/signup':
      return service.CreateUser(event);
    case '/auth/verify':
      return !isRoot
        ? service.VerifyUser(event)
        : ErrorResponse(404, 'Requested method not allowed!');
    default:
      return ErrorResponse(404, 'Requested method not allowed!');
  }
};
