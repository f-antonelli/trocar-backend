import { APIGatewayEvent } from 'aws-lambda';

import { UserRepository } from '../../domain/repositories/user.repository';
import { EmailService } from '../../infrastructure/services/email.service';
import {
  CreateUserUseCase,
  LoginUserUseCase,
  VerifyUserUseCase,
} from '../../infrastructure/use-cases/auth';

export class AuthController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) {}

  async CreateUser(event: APIGatewayEvent) {
    await new CreateUserUseCase(this.userRepository, this.emailService).execute(event);
  }

  async VerifyUser(event: APIGatewayEvent) {
    await new VerifyUserUseCase(this.userRepository).execute(event);
  }

  async LoginUser(event: APIGatewayEvent) {
    await new LoginUserUseCase(this.userRepository).execute(event);
  }
}
