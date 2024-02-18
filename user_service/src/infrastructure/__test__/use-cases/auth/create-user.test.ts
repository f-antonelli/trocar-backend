import { APIGatewayEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';

import { CreateUserDTO } from '../../../../domain/dtos/users';
import { AuthRepository } from '../../../../domain/repositories';
import { AppValidation } from '../../../../presentation/utils';
import { EmailService } from '../../../services/email.service';
import { CreateUserUseCase } from '../../../use-cases/auth';

const mockAuthRepository = {
  Create: jest.fn(),
};

const mockEmailService = {
  sendEmail: jest.fn(),
};

const mockEvent: APIGatewayEvent = {
  body:
    '{\r\n' +
    '    "username": "fede4",\r\n' +
    '    "email": "antonelli.fd@gmail.com",\r\n' +
    '    "password": "213Aa12dSd"\r\n' +
    '}',
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'Content-Length': '100',
    'Content-Type': 'application/json',
    Host: '127.0.0.1:3000',
    'Postman-Token': 'b7719f92-44f9-472c-a873-c09081bafb97',
    'User-Agent': 'PostmanRuntime/7.36.3',
    'X-Forwarded-Port': '3000',
    'X-Forwarded-Proto': 'http',
  },
  httpMethod: 'POST',
  isBase64Encoded: false,
  multiValueHeaders: {
    Accept: ['*/*'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
    'Content-Length': ['100'],
    'Content-Type': ['application/json'],
    Host: ['127.0.0.1:3000'],
    'Postman-Token': ['b7719f92-44f9-472c-a873-c09081bafb97'],
    'User-Agent': ['PostmanRuntime/7.36.3'],
    'X-Forwarded-Port': ['3000'],
    'X-Forwarded-Proto': ['http'],
  },
  multiValueQueryStringParameters: null,
  path: '/auth/signup',
  pathParameters: null,
  queryStringParameters: null,
  requestContext: {
    accountId: '123456789012',
    apiId: '1234567890',
    domainName: '127.0.0.1:3000',
    extendedRequestId: undefined,
    httpMethod: 'POST',
    identity: {
      accountId: null,
      apiKey: null,
      caller: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityPoolId: null,
      sourceIp: '127.0.0.1',
      user: null,
      userAgent: 'Custom User Agent String',
      userArn: null,
      accessKey: null,
      apiKeyId: null,
      clientCert: null,
      cognitoIdentityId: null,
      principalOrgId: null,
    },
    path: '/auth/signup',
    protocol: 'HTTP/1.1',
    requestId: '3bde84e7-753b-4eb0-a194-64460d81e02e',
    requestTime: '17/Feb/2024:21:36:21 +0000',
    requestTimeEpoch: 1708205781,
    resourceId: '123456',
    resourcePath: '/auth/signup',
    stage: 'prod',
    authorizer: undefined,
  },
  resource: '/auth/signup',
  stageVariables: null,
};

describe('CreateUser UseCase', () => {
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    useCase = new CreateUserUseCase(
      mockAuthRepository as unknown as AuthRepository,
      mockEmailService as unknown as EmailService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    const userData = {
      id: '7',
      username: 'fede3',
      email: 'antonelli.fd@gmail.com',
      password: '$2a$10$6xzMgaEh0aGQm9y4Z2SYzuDKp5WfRo9/Nra4GeMBtecFUJjpPS83q',
      image_url: null,
      is_active: false,
      role: 'user',
      created_at: '2024-02-17T16:44:00.936Z',
      updated_at: null,
    };

    mockAuthRepository.Create.mockResolvedValue(userData);
    mockEmailService.sendEmail.mockResolvedValue(true);

    const response = await useCase.execute(mockEvent);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(JSON.stringify({ success: true, data: userData }));
  });

  it('should return an error if user creation fails', async () => {
    const expectedError = { success: false, error: 'Couldnt create user, please try again.' };

    mockAuthRepository.Create.mockResolvedValue(null);

    const response = await useCase.execute(mockEvent);

    expect(response.statusCode).toBe(500);
    expect(response.body).toBe(JSON.stringify(expectedError));

    expect(mockEmailService.sendEmail).not.toHaveBeenCalled();
  });

  it('should return an error if username is too short', async () => {
    const input = {
      username: 'us',
      email: 'test@example.com',
      password: 'Password123',
    };

    const value = plainToInstance(CreateUserDTO, input);
    const errors = await AppValidation(value);

    expect(errors).not.toBe(false);
  });

  it('should return an error if email is invalid', async () => {
    const input = {
      username: 'username',
      email: 'invalid-email',
      password: 'Password123',
    };

    const value = plainToInstance(CreateUserDTO, input);
    const errors = await AppValidation(value);

    expect(errors).not.toBe(false);
  });

  it('should return an error if password is too weak', async () => {
    const input = {
      username: 'username',
      email: 'test@example.com',
      password: 'weak',
    };

    const value = plainToInstance(CreateUserDTO, input);
    const errors = await AppValidation(value);

    expect(errors).not.toBe(false);
  });
});
