import { AuthDatasource } from '../../domain/datasources/auth.datasource';
import { UserEntity } from '../../domain/entities/user.entity';
import { AuthRepository } from '../../domain/repositories/auth.repository';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  Create(user: UserEntity): Promise<UserEntity | void> {
    return this.authDatasource.Create(user);
  }

  UpdateVerifyUser(userId: number): Promise<UserEntity | null> {
    return this.authDatasource.UpdateVerifyUser(userId);
  }
}
