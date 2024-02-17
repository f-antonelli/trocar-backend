import { APIGatewayEvent } from 'aws-lambda';

import { AuthRepository, UserRepository } from '../../../domain/repositories';
import { IResponse, IUseCase } from '../../../presentation/interfaces';
import { ErrorResponse, Password, SuccessResponse } from '../../../presentation/utils';

export class VerifyUserUseCase implements IUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository
  ) {}

  public async execute(event: APIGatewayEvent): Promise<IResponse> {
    const token = event.queryStringParameters!.token!;

    try {
      const payload = Password.VerifyToken(token);
      if (!payload) return ErrorResponse(403, 'Authorization failed!');

      const data = await this.userRepository.GetUserById(+payload.id);
      if (!data) return ErrorResponse(404, 'No user was found with this id.');

      const userVerified = await this.authRepository.UpdateVerifyUser(data.id!);
      if (!userVerified)
        return ErrorResponse(400, 'The user could not be verified. Please request another code.');

      return SuccessResponse(201, { message: 'User verified!' });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
