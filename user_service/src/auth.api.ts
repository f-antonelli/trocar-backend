import 'reflect-metadata';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { PgUserDatasource } from './infrastructure/datasources/user-pg.datasource';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { EmailService } from './infrastructure/services/email.service';
import { UserService } from './presentation/services/user.service';
import { ErrorResponse } from './presentation/utils';

const service = new UserService(new UserRepositoryImpl(new PgUserDatasource()), new EmailService());

export const handler = (event: APIGatewayProxyEvent) => {
  switch (event.path) {
    case '/auth/login':
      return service.LoginUser(event);
    case '/auth/signup':
      return service.CreateUser(event);
    default:
      return ErrorResponse(404, 'Requested method not allowed!');
  }
};
