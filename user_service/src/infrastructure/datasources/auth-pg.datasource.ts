import { AuthDatasource } from '../../domain/datasources/auth.datasource';
import { UserEntity } from '../../domain/entities/user.entity';
import { DBOperation } from '../data/pg/db-operation';

export class PgAuthDatasource extends DBOperation implements AuthDatasource {
  async Create(user: UserEntity): Promise<UserEntity | void> {
    const { username, email, password } = user;

    const queryString =
      'INSERT INTO users( username, email, password ) VALUES ( $1,$2,$3 ) RETURNING *';

    const values = [username, email, password];
    const result = await this.executeQuery(queryString, values);

    if (result && result.rowCount! > 0) {
      return result.rows[0] as UserEntity;
    }
  }

  async UpdateVerifyUser(userId: number): Promise<UserEntity | null> {
    const queryString =
      'UPDATE users SET is_active = true WHERE id = $1 AND is_active = false RETURNING *';

    const values = [userId];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows[0] as UserEntity;
    }

    return null;
  }
}
