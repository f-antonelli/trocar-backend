import { UserDatasource } from '../../domain/datasources/user.datasource';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  create(user: UserEntity): Promise<UserEntity> {
    return this.userDatasource.create(user);
  }

  getUsers(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  getUser(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  update(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
}
