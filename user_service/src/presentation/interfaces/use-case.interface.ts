import { APIGatewayEvent } from 'aws-lambda';

import { IResponse } from './response.interface';

export interface IUseCase {
  execute(event: APIGatewayEvent): Promise<IResponse>;
}
