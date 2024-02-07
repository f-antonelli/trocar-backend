import { UserEntity } from '../entities/user.entity';

export abstract class UserDatasource {
  abstract create(user: UserEntity): Promise<void>;
  abstract getUsers(id: Number): Promise<UserEntity[]>;
  abstract getUser(id: Number): Promise<UserEntity[]>;
  abstract update(id: Number): Promise<UserEntity[]>;
  abstract delete(id: Number): Promise<UserEntity[]>;
}
