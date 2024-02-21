import 'reflect-metadata';
import { APIGatewayEvent } from 'aws-lambda';

import { PgProfileDatasource, PgUserDatasource } from './infrastructure/datasources';
import { ProfileRepositoryImpl, UserRepositoryImpl } from './infrastructure/repositories';
import { UserController } from './presentation/controllers/user.controller';
import { ErrorResponse } from './presentation/utils';

const controller = new UserController(
  new UserRepositoryImpl(new PgUserDatasource()),
  new ProfileRepositoryImpl(new PgProfileDatasource())
);

export const handler = (event: APIGatewayEvent) => {
  const isRoot = event.pathParameters === null;

  if (event.path == '/users/profile')
    switch (event.httpMethod.toLowerCase()) {
      case 'get':
        return controller.GetProfile(event);
      case 'put':
        return controller.UpdateProfile(event);
      case 'post':
        return controller.CreateProfile(event);
    }

  switch (event.httpMethod.toLowerCase()) {
    case 'get':
      return isRoot ? controller.GetUsers(event) : controller.GetUser(event);
    case 'put':
      return controller.UpdateUser(event);
    case 'delete':
      if (!isRoot) {
        return controller.DeleteUser(event);
      }
  }
  return ErrorResponse(404, 'Requested method not allowed!');
};
