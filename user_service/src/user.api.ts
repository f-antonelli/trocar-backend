import 'reflect-metadata';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { PgUserDatasource } from './infrastructure/datasources/user-pg.datasource';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { UserController } from './presentation/controllers/user.controller';
import { ErrorResponse } from './presentation/utils';

const service = new UserController(new UserRepositoryImpl(new PgUserDatasource()));

export const handler = (event: APIGatewayProxyEvent) => {
  const isRoot = event.pathParameters === null;

  switch (event.httpMethod.toLowerCase()) {
    case 'get':
      return isRoot ? service.GetUsers(event) : service.GetUser(event);
  }

  return ErrorResponse(404, 'Requested method not allowed!');
};
