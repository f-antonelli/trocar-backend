import { UserDatasource } from '../../domain/datasources/user.datasource';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  create(user: UserEntity): Promise<UserEntity | void> {
    return this.userDatasource.create(user);
  }

  getUsers(limit: number, page: number): Promise<UserEntity[]> {
    return this.userDatasource.getUsers(limit, page);
  }

  getUser(id: number): Promise<UserEntity> {
    return this.userDatasource.getUser(id);
  }
  update(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
}
