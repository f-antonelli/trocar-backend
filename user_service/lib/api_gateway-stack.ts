import { aws_apigateway } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ApiGatewayStackProps {
  userService: IFunction;
}

interface ResourceType {
  name: string;
  methods: string[];
  child?: ResourceType;
}

export class ApiGatewayStack extends Construct {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id);
    this.addResource("user", props);
  }

  addResource(
    serviceName: string,
    {
      userService,
    }: ApiGatewayStackProps
  ) {
    const apgw = new aws_apigateway.RestApi(this, `${serviceName}-ApiGtw`);

    this.createEndpoints(userService, apgw, {
      name: "user",
      methods: ["GET", "POST"],
      child: {
        name: "{id}",
        methods: ["GET", "PUT", "DELETE"],
      },
    });
  }

  private createEndpoints(
    handler: IFunction,
    resource: RestApi,
    { name, methods, child }: ResourceType
  ) {
    const lambdaFunction = new LambdaIntegration(handler);
    const rootResource = resource.root.addResource(name);
    methods.map((item) => {
      rootResource.addMethod(item, lambdaFunction);
    });

    if (child) {
      const childResource = rootResource.addResource(child.name);
      child.methods.map((item) => {
        childResource.addMethod(item, lambdaFunction);
      });
    }
  }
}
