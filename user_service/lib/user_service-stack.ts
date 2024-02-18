import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { ApiGatewayStack } from './api_gateway-stack';
import { ConfigProps } from './config';
import { ServiceStack } from './service-stack';

export type UserServiceStackProps = cdk.StackProps & {
  config: Readonly<ConfigProps>;
};

export class UserServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: UserServiceStackProps) {
    super(scope, id, props);

    const { config } = props;

    const { userService, authService } = new ServiceStack(this, 'UserService', { config });

    new ApiGatewayStack(this, 'UserApiGateway', {
      userService,
      authService,
    });
  }
}
