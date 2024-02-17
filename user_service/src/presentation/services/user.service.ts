import { APIGatewayEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';

import { CreateUserDTO, LoginUserDTO } from '../../domain/dtos/users';
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

      const data = await this.userRepository.Create({
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

  async LoginUser(event: APIGatewayEvent) {
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

  async GetUsers(event: APIGatewayEvent) {
    const { limit = '10', page = '1' } = event.pathParameters || {};

    try {
      const data = await this.userRepository.GetUsers(parseInt(limit), parseInt(page));
      if (!data) return ErrorResponse(404, 'No users found.');

      return SuccessResponse(200, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetUser(event: APIGatewayEvent) {
    const userId = event.pathParameters?.id;
    if (!userId) return ErrorResponse(403, 'please provide product id');

    try {
      const data = await this.userRepository.GetUserById(parseInt(userId));
      if (!data) return ErrorResponse(404, 'No user was found with this id.');

      return SuccessResponse(200, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
