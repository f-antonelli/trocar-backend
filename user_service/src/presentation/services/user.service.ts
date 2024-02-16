import { APIGatewayEvent, APIGatewayProxyEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';

import { CreateUserDTO } from '../../domain/dtos/users/create-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { AppValidation, ErrorResponse, Password, SuccessResponse } from '../utils';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async CreateUser(event: APIGatewayEvent) {
    try {
      const input = plainToInstance(CreateUserDTO, JSON.parse(event.body!));
      const error = await AppValidation(input);
      if (error) return ErrorResponse(404, error);

      const hashedPassword = await Password.GetHashedPassword(input.password);

      const data = await this.userRepository.create({
        ...input,
        password: hashedPassword,
      });

      if (!data) return ErrorResponse(500, 'Couldnt create user, please try again.');

      return SuccessResponse(201, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async getUsers(event: APIGatewayEvent) {
    const { limit = '10', page = '1' } = event.pathParameters || {};

    try {
      const data = await this.userRepository.getUsers(parseInt(limit), parseInt(page));

      return SuccessResponse(200, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async getUser(event: APIGatewayEvent) {
    const userId = event.pathParameters?.id;
    if (!userId) return ErrorResponse(403, 'please provide product id');

    try {
      const data = await this.userRepository.getUser(parseInt(userId));

      return SuccessResponse(200, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
