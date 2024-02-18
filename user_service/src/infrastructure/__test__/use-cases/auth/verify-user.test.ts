import { APIGatewayEvent } from 'aws-lambda';

import { AuthRepository, UserRepository } from '../../../../domain/repositories';
import { VerifyUserUseCase } from '../../../use-cases/auth';

describe('VerifyUser UseCase', () => {
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let authRepositoryMock: jest.Mocked<AuthRepository>;
  let useCase: VerifyUserUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      GetUserById: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    authRepositoryMock = {
      UpdateVerifyUser: jest.fn(),
    } as unknown as jest.Mocked<AuthRepository>;

    useCase = new VerifyUserUseCase(userRepositoryMock, authRepositoryMock);
  });

  it('should return an error if token is invalid', async () => {
    const invalidToken = 'invalid-token';

    const response = await useCase.execute({
      queryStringParameters: { token: invalidToken },
    } as unknown as APIGatewayEvent);

    expect(response.statusCode).toBe(403);
    expect(response.body).toContain('Authorization failed');
  });

  it('should return an error if user is not found', async () => {
    const validToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGlkLWVtYWlsQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpZCI6MSwiaWF0IjoxNzA4MjExNDkzLCJleHAiOjE3MTA4MDM0OTN9.4475Evns8a5pKCV1UT570kB7ZbJJ-RO8OLIHvRHfLGY';
    const userId = 123;

    userRepositoryMock.GetUserById.mockResolvedValueOnce(null);

    const response = await useCase.execute({
      queryStringParameters: { token: validToken },
    } as unknown as APIGatewayEvent);

    expect(response.statusCode).toBe(404);
    expect(response.body).toContain('No user was found with this id.');
  });

  it('should return an error if user verification fails', async () => {
    const validToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGlkLWVtYWlsQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpZCI6MSwiaWF0IjoxNzA4MjExNDkzLCJleHAiOjE3MTA4MDM0OTN9.4475Evns8a5pKCV1UT570kB7ZbJJ-RO8OLIHvRHfLGY';
    const userId = 123;

    userRepositoryMock.GetUserById.mockResolvedValueOnce({
      id: userId,
      username: 'fede',
      email: 'fede@gmail.com',
      password: '234SDFd',
    });
    authRepositoryMock.UpdateVerifyUser.mockResolvedValueOnce(null);

    const response = await useCase.execute({
      queryStringParameters: { token: validToken },
    } as unknown as APIGatewayEvent);

    expect(response.statusCode).toBe(400);
    expect(response.body).toContain('The user could not be verified. Please request another code.');
  });

  it('should return success if user verification is successful', async () => {
    const validToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGlkLWVtYWlsQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpZCI6MSwiaWF0IjoxNzA4MjExNDkzLCJleHAiOjE3MTA4MDM0OTN9.4475Evns8a5pKCV1UT570kB7ZbJJ-RO8OLIHvRHfLGY';
    const userId = 123;

    userRepositoryMock.GetUserById.mockResolvedValueOnce({
      id: userId,
      username: 'fede',
      email: 'fede@gmail.com',
      password: '234SDFd',
    });

    authRepositoryMock.UpdateVerifyUser.mockResolvedValueOnce({
      id: userId,
      username: 'fede',
      email: 'fede@gmail.com',
      password: '234SDFd',
      is_active: true,
    });

    const response = await useCase.execute({
      queryStringParameters: { token: validToken },
    } as unknown as APIGatewayEvent);

    expect(response.statusCode).toBe(201);
    expect(response.body).toContain(
      JSON.stringify({ success: true, data: { message: 'User verified!' } })
    );
  });
});
