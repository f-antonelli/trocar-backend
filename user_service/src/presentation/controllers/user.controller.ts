import { APIGatewayEvent } from 'aws-lambda';

import { ProfileRepository, UserRepository } from '../../domain/repositories';
import {
  CreateProfileUseCase,
  GetUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
} from '../../infrastructure/use-cases/users';

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

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

  // profiles section
  async CreateProfile(event: APIGatewayEvent) {
    return await new CreateProfileUseCase(this.profileRepository).execute(event);
  }

  async GetProfile(event: APIGatewayEvent) {
    return await new CreateProfileUseCase(this.profileRepository).execute(event);
  }

  async UpdateProfile(event: APIGatewayEvent) {
    return await new CreateProfileUseCase(this.profileRepository).execute(event);
  }
}
