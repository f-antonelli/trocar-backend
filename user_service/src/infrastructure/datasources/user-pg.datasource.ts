import { UserDatasource } from '../../domain/datasources/user.datasource';
import { UserEntity } from '../../domain/entities/user.entity';
import { DBOperation } from '../data/pg/db-operation';

export class PgUserDatasource extends DBOperation implements UserDatasource {
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

  async GetUsers(limit: number = 10, page: number = 1): Promise<UserEntity[] | null> {
    const offset = (page - 1) * limit;

    const queryString = `
      SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2
    `;

    const values = [limit, offset];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows as UserEntity[];
    }

    return null;
  }

  async GetUserById(id: number): Promise<UserEntity | null> {
    const queryString = 'SELECT * FROM users WHERE id = $1';

    const values = [id];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows[0] as UserEntity;
    }

    return null;
  }

  async GetUserByEmail(email: string): Promise<UserEntity | null> {
    const queryString = 'SELECT * FROM users WHERE email = $1';

    const values = [email];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows[0] as UserEntity;
    }

    return null;
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

  update(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
}
