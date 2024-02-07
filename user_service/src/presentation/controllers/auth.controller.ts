import { APIGatewayProxyEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';

import { CreateUserDTO } from '../../domain/dtos/users/create-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { AppValidation } from '../utils/validate';
import { ErrorResponse } from '../utils/response';

export class AuthController {
  constructor(private readonly userRepository: UserRepository) {}

  async CreateUser(event: APIGatewayProxyEvent) {
    const input = plainToInstance(CreateUserDTO, JSON.parse(event.body!));
    const error = await AppValidation(input);
    if (error) return ErrorResponse(404, error);
  }
}

// try {
//   const input = plainToClass(SignupDto, event.body);
//   const error = await AppValidation(input);
//   if (error) return ErrorResponse(404, error);

//   const salt = await GetSalt();
//   const hashedPassword = await GetHashedPassword(input.password, salt);
//   const data = await this.repository.createAccount({
//     email: input.email,
//     password: hashedPassword,
//     phone: input.phone,
//     userType: "BUYER",
//     salt: salt,
//   });

//   return SuccessResponse(data);
// } catch (error) {
//   console.log(error);
//   return ErrorResponse(500, error);
// }
