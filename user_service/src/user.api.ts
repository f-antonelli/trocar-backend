import 'reflect-metadata';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { AuthController } from './presentation/controllers/auth.controller';

const controller = new AuthController(new UserRepositoryImpl());

export const handler = (event: APIGatewayProxyEvent) => {
  const isRoot = event.pathParameters === null;

  switch (event.httpMethod.toLowerCase()) {
    case 'post':
      if (isRoot) {
        return controller.CreateUser(event);
      }
      break;
  }
};
