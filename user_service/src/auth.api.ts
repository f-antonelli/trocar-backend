import 'reflect-metadata';
import { APIGatewayEvent } from 'aws-lambda';

import { PgAuthDatasource, PgUserDatasource } from './infrastructure/datasources';
import { AuthRepositoryImpl, UserRepositoryImpl } from './infrastructure/repositories';
import { EmailService } from './infrastructure/services/email.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { ErrorResponse } from './presentation/utils';

const controller = new AuthController(
  new AuthRepositoryImpl(new PgAuthDatasource()),
  new UserRepositoryImpl(new PgUserDatasource()),
  new EmailService()
);

export const handler = (event: APIGatewayEvent) => {
  const isRoot = event.queryStringParameters === null;

  switch (event.path) {
    case '/auth/login':
      return controller.LoginUser(event);
    case '/auth/signup':
      return controller.CreateUser(event);
    case '/auth/verify':
      return !isRoot
        ? controller.VerifyUser(event)
        : ErrorResponse(404, 'Requested method not allowed!');
    default:
      return ErrorResponse(404, 'Requested method not allowed!');
  }
};
