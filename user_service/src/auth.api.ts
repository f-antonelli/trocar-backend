import 'reflect-metadata';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { PgUserDatasource } from './infrastructure/datasources/user-pg.datasource';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { EmailService } from './infrastructure/services/email.service';
import { AuthController } from './presentation/services/auth.controller';
import { ErrorResponse } from './presentation/utils';

const service = new AuthController(
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
