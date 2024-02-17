import { APIGatewayEvent } from 'aws-lambda';

import { UserRepository } from '../../domain/repositories/user.repository';
import { GetUserUseCase, GetUsersUseCase } from '../../infrastructure/use-cases/users';

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  async GetUsers(event: APIGatewayEvent) {
    await new GetUsersUseCase(this.userRepository).execute(event);
  }

  async GetUser(event: APIGatewayEvent) {
    await new GetUserUseCase(this.userRepository).execute(event);
  }
}
