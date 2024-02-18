import { APIGatewayEvent } from 'aws-lambda';

import { AuthRepository, UserRepository } from '../../domain/repositories';
import { EmailService } from '../../infrastructure/services/email.service';
import {
  CreateUserUseCase,
  LoginUserUseCase,
  VerifyUserUseCase,
} from '../../infrastructure/use-cases/auth';

export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) {}

  async CreateUser(event: APIGatewayEvent) {
    return await new CreateUserUseCase(this.authRepository, this.emailService).execute(event);
  }

  async VerifyUser(event: APIGatewayEvent) {
    return await new VerifyUserUseCase(this.userRepository, this.authRepository).execute(event);
  }

  async LoginUser(event: APIGatewayEvent) {
    return await new LoginUserUseCase(this.userRepository).execute(event);
  }
}
