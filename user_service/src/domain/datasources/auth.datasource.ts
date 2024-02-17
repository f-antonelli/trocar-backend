import { UserEntity } from '../entities/user.entity';

export abstract class AuthDatasource {
  abstract Create(user: UserEntity): Promise<UserEntity | void>;
  abstract UpdateVerifyUser(userId: number): Promise<UserEntity | null>;
}
