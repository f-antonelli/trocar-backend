import { APIGatewayEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';

import { UpdateUserDTO } from '../../../domain/dtos/users';
import { UserRepository } from '../../../domain/repositories';
import { IResponse, ITokenPayload, IUseCase } from '../../../presentation/interfaces';
import { authMiddleware } from '../../../presentation/middlewares/auth.middleware';
import { AppValidation, ErrorResponse, SuccessResponse } from '../../../presentation/utils';

export class UpdateUserUseCase implements IUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(event: APIGatewayEvent): Promise<IResponse> {
    try {
      const payload = authMiddleware(event);

      if ((payload as IResponse).statusCode) return payload as IResponse;

      const input = plainToInstance(UpdateUserDTO, JSON.parse(event.body!));
      const error = await AppValidation(input);
      if (error) return ErrorResponse(404, error);

      const data = await this.userRepository.UpdateUser(+(payload as ITokenPayload).id, input);
      if (!data) return ErrorResponse(500, 'Couldnt update user, please try again.');

      return SuccessResponse(201, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
