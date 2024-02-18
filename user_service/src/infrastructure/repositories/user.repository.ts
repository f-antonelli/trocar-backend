import { UserDatasource } from '../../domain/datasources/user.datasource';
import { UpdateUserDTO } from '../../domain/dtos/users';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  GetUsers(limit: number, page: number): Promise<UserEntity[] | null> {
    return this.userDatasource.GetUsers(limit, page);
  }

  GetUserById(id: number): Promise<UserEntity | null> {
    return this.userDatasource.GetUserById(id);
  }

  GetUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userDatasource.GetUserByEmail(email);
  }

  UpdateUser(id: number, userData: UpdateUserDTO): Promise<UserEntity | null> {
    return this.userDatasource.UpdateUser(id, userData);
  }

  update(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
}
