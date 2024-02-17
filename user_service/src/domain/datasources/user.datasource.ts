import { UserEntity } from '../entities/user.entity';

export abstract class UserDatasource {
  abstract Create(user: UserEntity): Promise<UserEntity | void>;
  abstract GetUsers(limit: number, page: number): Promise<UserEntity[] | null>;
  abstract GetUserById(id: number): Promise<UserEntity | null>;
  abstract GetUserByEmail(email: string): Promise<UserEntity | null>;
  abstract update(id: Number): Promise<UserEntity[]>;
  abstract delete(id: Number): Promise<UserEntity[]>;
}
