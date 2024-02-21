import { APIGatewayEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';

import { ProfileDTO } from '../../../domain/dtos/users';
import { ProfileRepository } from '../../../domain/repositories';
import { IResponse, ITokenPayload, IUseCase } from '../../../presentation/interfaces';
import { authMiddleware } from '../../../presentation/middlewares/auth.middleware';
import { AppValidation, ErrorResponse, SuccessResponse } from '../../../presentation/utils';

export class UpdateProfileUseCase implements IUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  public async execute(event: APIGatewayEvent): Promise<IResponse> {
    try {
      const payload = authMiddleware(event);
      if ((payload as IResponse).statusCode) return payload as IResponse;

      const input = plainToInstance(ProfileDTO, JSON.parse(event.body!));
      const error = await AppValidation(input);
      if (error) return ErrorResponse(404, error);

      const data = await this.profileRepository.UpdateProfile(
        +(payload as ITokenPayload).id,
        input
      );
      if (!data) return ErrorResponse(500, 'Couldnt update profile user, please try again.');

      return SuccessResponse(201, data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
