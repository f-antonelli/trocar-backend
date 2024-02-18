import { APIGatewayEvent } from 'aws-lambda';

import { UserRepository } from '../../../domain/repositories/user.repository';
import { IResponse, IUseCase } from '../../../presentation/interfaces';
import { authMiddleware } from '../../../presentation/middlewares/auth.middleware';
import { ErrorResponse, SuccessResponse } from '../../../presentation/utils';

export class GetUserUseCase implements IUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(event: APIGatewayEvent): Promise<IResponse> {
    const payload = authMiddleware(event);
    if ((payload as IResponse).statusCode) return payload as IResponse;

    const userId = event.pathParameters?.id;
    if (!userId) return ErrorResponse(403, 'Please, provide user id.');

    try {
      const data = await this.userRepository.GetUserById(parseInt(userId));
      if (!data) return ErrorResponse(404, 'No user was found with this id.');

      if ('password' in data) delete data.password;

      return SuccessResponse(200, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
