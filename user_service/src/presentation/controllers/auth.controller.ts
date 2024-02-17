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
    await new CreateUserUseCase(this.authRepository, this.emailService).execute(event);
  }

  async VerifyUser(event: APIGatewayEvent) {
    await new VerifyUserUseCase(this.userRepository, this.authRepository).execute(event);
  }

  async LoginUser(event: APIGatewayEvent) {
    await new LoginUserUseCase(this.userRepository).execute(event);
  }
}
