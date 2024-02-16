import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<UserEntity | void>;
  abstract getUsers(limit: number, page: number): Promise<UserEntity[]>;
  abstract getUser(id: number): Promise<UserEntity>;
  abstract update(id: Number): Promise<UserEntity[]>;
  abstract delete(id: Number): Promise<UserEntity[]>;
}
