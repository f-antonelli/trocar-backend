import 'reflect-metadata';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { PgUserDatasource } from './infrastructure/datasources/user-pg.datasource';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { UserService } from './presentation/services/user.service';
import { ErrorResponse } from './presentation/utils';

const service = new UserService(new UserRepositoryImpl(new PgUserDatasource()));

export const handler = (event: APIGatewayProxyEvent) => {
  const isRoot = event.pathParameters === null;

  switch (event.httpMethod.toLowerCase()) {
    case 'post':
      if (isRoot) {
        return service.CreateUser(event);
      }
      break;
    case 'get':
      return isRoot ? service.getUsers(event) : service.getUser(event);
  }

  return ErrorResponse(404, 'Requested method not allowed!');
};
