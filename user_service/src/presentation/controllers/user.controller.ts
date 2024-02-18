import { APIGatewayEvent } from 'aws-lambda';

import { UserRepository } from '../../domain/repositories/user.repository';
import {
  GetUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
} from '../../infrastructure/use-cases/users';

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  async GetUsers(event: APIGatewayEvent) {
    return await new GetUsersUseCase(this.userRepository).execute(event);
  }

  async GetUser(event: APIGatewayEvent) {
    return await new GetUserUseCase(this.userRepository).execute(event);
  }

  async UpdateUser(event: APIGatewayEvent) {
    return await new UpdateUserUseCase(this.userRepository).execute(event);
  }

  async DeleteUser(event: APIGatewayEvent) {
    return await new UpdateUserUseCase(this.userRepository).execute(event);
  }
}
