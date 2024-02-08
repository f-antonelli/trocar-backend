import 'reflect-metadata';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { PgUserDatasource } from './infrastructure/datasources/user-pg.datasource';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { AuthController } from './presentation/controllers/auth.controller';
import { ErrorResponse } from './presentation/utils';

console.log(process.env.PRISMA_CLI_BINARY_TARGETS);

const controller = new AuthController(new UserRepositoryImpl(new PgUserDatasource()));

export const handler = (event: APIGatewayProxyEvent) => {
  const isRoot = event.pathParameters === null;

  switch (event.httpMethod.toLowerCase()) {
    case 'post':
      if (isRoot) {
        return controller.CreateUser(event);
      }
      break;
  }

  return ErrorResponse(404, 'Requested method not allowed!');
};
