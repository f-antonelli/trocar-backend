import { aws_apigateway } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

interface ApiGatewayStackProps {
  userService: IFunction;
  authService: IFunction;
}

interface ResourceType {
  name: string;
  methods: string[];
  child?: ResourceType | ResourceType[];
}

export class ApiGatewayStack extends Construct {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id);
    this.addResource('user', props);
  }

  addResource(serviceName: string, { userService, authService }: ApiGatewayStackProps) {
    const apgw = new aws_apigateway.RestApi(this, `${serviceName}-ApiGtw`);

    this.createEndpoints(userService, apgw, {
      name: 'users',
      methods: ['GET', 'POST'],
      child: {
        name: '{id}',
        methods: ['GET', 'PUT', 'DELETE'],
      },
    });

    this.createEndpoints(authService, apgw, {
      name: 'auth',
      methods: [],
      child: [
        { name: 'login', methods: ['POST'] },
        { name: 'signup', methods: ['POST'] },
      ],
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
      if (Array.isArray(child)) {
        child.forEach((childResourceType) => {
          const childResource = rootResource.addResource(childResourceType.name);
          childResourceType.methods.forEach((item) => {
            childResource.addMethod(item, lambdaFunction);
          });
        });
      } else {
        const childResource = rootResource.addResource(child.name);
        child.methods.forEach((item) => {
          childResource.addMethod(item, lambdaFunction);
        });
      }
    }
  }
}
