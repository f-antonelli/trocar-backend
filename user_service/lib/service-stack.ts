import { Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

import { UserServiceStackProps } from "./user_service-stack";



export class ServiceStack extends Construct {
  public readonly userService: NodejsFunction;

  constructor(scope: Construct, id: string, props:UserServiceStackProps) {
    super(scope, id);

    const {config} = props

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        POSTGRES_URL: config.POSTGRES_URL,
        POSTGRES_USER: config.POSTGRES_USER,
        POSTGRES_DB: config.POSTGRES_DB,
        POSTGRES_PASSWORD: config.POSTGRES_PASSWORD,
        POSTGRES_PORT: config.POSTGRES_PORT
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: Duration.seconds(10),
    };

    this.userService = new NodejsFunction(this, "userLambda", {
      entry: join(__dirname, "/../src/user.api.ts"),
      ...nodeJsFunctionProps,
    });
  }
}
