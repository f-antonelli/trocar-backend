import { APIGatewayEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';

import { CreateUserDTO } from '../../../domain/dtos/users';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { IResponse, IUseCase } from '../../../presentation/interfaces';
import {
  AppValidation,
  ErrorResponse,
  Password,
  SuccessResponse,
} from '../../../presentation/utils';
import { EmailService } from '../../services/email.service';
import { SendEmailVerify } from '../email/send-email-verify';

export class CreateUserUseCase implements IUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailService: EmailService
  ) {}

  public async execute(event: APIGatewayEvent): Promise<IResponse> {
    try {
      const input = plainToInstance(CreateUserDTO, JSON.parse(event.body!));
      const error = await AppValidation(input);
      if (error) return ErrorResponse(404, error);

      const hashedPassword = await Password.GetHashedPassword(input.password);

      const data = await this.authRepository.Create({
        ...input,
        password: hashedPassword,
      });

      if (!data) return ErrorResponse(500, 'Couldnt create user, please try again.');

      // send email verification
      const token = Password.GetToken({
        email: data.email,
        role: data.role,
        id: data.id,
      });
      const sentEmail = await new SendEmailVerify(this.emailService).execute(data.email, token);
      if (!sentEmail) throw Error('Couldnt sent email.');

      return SuccessResponse(201, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
