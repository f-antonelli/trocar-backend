import { APIGatewayEvent } from 'aws-lambda';

import { ProfileRepository } from '../../../domain/repositories';
import { IResponse, ITokenPayload, IUseCase } from '../../../presentation/interfaces';
import { authMiddleware } from '../../../presentation/middlewares/auth.middleware';
import { ErrorResponse, SuccessResponse } from '../../../presentation/utils';

export class GetProfileUseCase implements IUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  public async execute(event: APIGatewayEvent): Promise<IResponse> {
    try {
      const payload = authMiddleware(event);
      if ((payload as IResponse).statusCode) return payload as IResponse;

      const data = await this.profileRepository.GetProfile(+(payload as ITokenPayload).id);
      if (!data) return ErrorResponse(404, 'No profile user was found with this id.');

      return SuccessResponse(200, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
