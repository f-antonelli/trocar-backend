import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { ApiGatewayStack } from './api_gateway-stack';
import { ServiceStack } from './service-stack';

export class UserServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const {
      userService,
    } = new ServiceStack(this, "UserService", {});

    new ApiGatewayStack(this, "UserApiGateway", {
      userService
    });
  }
}
