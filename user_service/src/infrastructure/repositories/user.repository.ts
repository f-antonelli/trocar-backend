import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

export class UserRepositoryImpl implements UserRepository {
  create(user: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
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
