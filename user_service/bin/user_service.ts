#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { getConfig } from '../lib/config';
import { UserServiceStack } from '../lib/user_service-stack';

const config = getConfig();

const app = new cdk.App();

new UserServiceStack(app, 'UserServiceStack', {
  env: {},
  config,
});
