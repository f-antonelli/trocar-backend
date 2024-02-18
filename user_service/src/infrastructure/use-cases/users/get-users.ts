import { APIGatewayEvent } from 'aws-lambda';

import { UserRepository } from '../../../domain/repositories/user.repository';
import { IResponse, IUseCase } from '../../../presentation/interfaces';
import { authMiddleware } from '../../../presentation/middlewares/auth.middleware';
import { ErrorResponse, SuccessResponse } from '../../../presentation/utils';

export class GetUsersUseCase implements IUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(event: APIGatewayEvent): Promise<IResponse> {
    const payload = authMiddleware(event);
    if ((payload as IResponse).statusCode) return payload as IResponse;

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
}
