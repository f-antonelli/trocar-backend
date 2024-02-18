import { APIGatewayProxyEvent } from 'aws-lambda';
import { hash } from 'bcryptjs';

import { UserRepository } from '../../../../domain/repositories';
import { LoginUserUseCase } from '../../../use-cases/auth';

describe('LoginUser UseCase', () => {
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let useCase: LoginUserUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      GetUserByEmail: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    useCase = new LoginUserUseCase(userRepositoryMock);
  });

  it('should return an error if validation fails', async () => {
    const invalidInput = {
      email: 'invalid-email',
      password: 'weak',
    };

    const response = await useCase.execute({
      body: JSON.stringify(invalidInput),
    } as APIGatewayProxyEvent);

    expect(response.statusCode).toBe(404);
    expect(response.body).toContain(
      JSON.stringify({ success: false, error: ['email must be an email'] })
    );
  });

  it('should return an error if user is not found', async () => {
    userRepositoryMock.GetUserByEmail.mockResolvedValueOnce(null);

    const validInput = {
      email: 'valid-email@example.com',
      password: 'Valid123',
    };

    const response = await useCase.execute({
      body: JSON.stringify(validInput),
    } as APIGatewayProxyEvent);

    expect(response.statusCode).toBe(404);
    expect(response.body).toContain(
      JSON.stringify({
        success: false,
        error: 'Invalid credentials. Please check your email and password.',
      })
    );
  });

  it('should return an error if password is incorrect', async () => {
    userRepositoryMock.GetUserByEmail.mockResolvedValueOnce({
      username: 'testeoo',
      email: 'valid-email@example.com',
      password: 'Cod123',
    });

    const invalidInput = {
      email: 'valid-email@example.com',
      password: 'Cod12sad3',
    };

    const response = await useCase.execute({
      body: JSON.stringify(invalidInput),
    } as APIGatewayProxyEvent);

    expect(response.statusCode).toBe(404);
    expect(response.body).toContain(
      JSON.stringify({
        success: false,
        error: 'Invalid credentials. Please check your email and password.',
      })
    );
  });

  it('should return a token if login is successful', async () => {
    userRepositoryMock.GetUserByEmail.mockResolvedValueOnce({
      username: 'testing',
      email: 'valid-email@example.com',
      password: await hash('Valid123', 10),
      id: 1,
      role: 'user',
    });

    const validInput = {
      email: 'valid-email@example.com',
      password: 'Valid123',
    };

    const response = await useCase.execute({
      body: JSON.stringify(validInput),
    } as APIGatewayProxyEvent);
    console.log(response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('token');
  });
});
