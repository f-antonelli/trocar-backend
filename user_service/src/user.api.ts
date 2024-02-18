import 'reflect-metadata';
import { APIGatewayEvent } from 'aws-lambda';

import { PgUserDatasource } from './infrastructure/datasources/user-pg.datasource';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { UserController } from './presentation/controllers/user.controller';
import { ErrorResponse } from './presentation/utils';

const controller = new UserController(new UserRepositoryImpl(new PgUserDatasource()));

export const handler = (event: APIGatewayEvent) => {
  const isRoot = event.pathParameters === null;

  switch (event.httpMethod.toLowerCase()) {
    case 'get':
      return isRoot ? controller.GetUsers(event) : controller.GetUser(event);
    case 'put':
      if (!isRoot) {
        return controller.UpdateUser(event);
      }
  }
  return ErrorResponse(404, 'Requested method not allowed!');
};
