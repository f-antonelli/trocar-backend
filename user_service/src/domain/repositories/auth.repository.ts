import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
  abstract Create(user: UserEntity): Promise<UserEntity | void>;
  abstract UpdateVerifyUser(userId: number): Promise<UserEntity | null>;
}
