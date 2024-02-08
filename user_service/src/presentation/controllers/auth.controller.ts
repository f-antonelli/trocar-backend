import { APIGatewayProxyEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';

import { CreateUserDTO } from '../../domain/dtos/users/create-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { AppValidation, ErrorResponse, Password, SuccessResponse } from '../utils';

export class AuthController {
  constructor(private readonly userRepository: UserRepository) {}

  async CreateUser(event: APIGatewayProxyEvent) {
    try {
      const input = plainToInstance(CreateUserDTO, JSON.parse(event.body!));
      const error = await AppValidation(input);
      if (error) return ErrorResponse(404, error);

      const hashedPassword = await Password.GetHashedPassword(input.password);

      const data = await this.userRepository.create({
        ...input,
        password: hashedPassword,
      });

      return SuccessResponse(201, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
