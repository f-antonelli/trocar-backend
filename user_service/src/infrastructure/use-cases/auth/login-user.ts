import { APIGatewayEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';

import { LoginUserDTO } from '../../../domain/dtos/users';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { IResponse, IUseCase } from '../../../presentation/interfaces';
import {
  AppValidation,
  ErrorResponse,
  Password,
  SuccessResponse,
} from '../../../presentation/utils';

export class LoginUserUseCase implements IUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(event: APIGatewayEvent): Promise<IResponse> {
    try {
      const input = plainToInstance(LoginUserDTO, JSON.parse(event.body!));
      const error = await AppValidation(input);
      if (error) return ErrorResponse(404, error);

      const data = await this.userRepository.GetUserByEmail(input.email);
      if (!data)
        return ErrorResponse(404, 'Invalid credentials. Please check your email and password.');

      const verified = await Password.ValidatePassword(input.password, data.password);
      if (!verified)
        return ErrorResponse(404, 'Invalid credentials. Please check your email and password.');

      const token = Password.GetToken({
        email: data.email,
        role: data.role,
        id: data.id,
      });

      return SuccessResponse(200, { token });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
