import * as cdk from "aws-cdk-lib";
import { Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";



export class ServiceStack extends Construct {
  public readonly userService: NodejsFunction;

  constructor(scope: Construct, id: string, props?:cdk.StackProps) {
    super(scope, id);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {

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
