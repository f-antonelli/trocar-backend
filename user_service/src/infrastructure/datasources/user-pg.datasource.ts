import { UserDatasource } from '../../domain/datasources/user.datasource';
import { UserEntity } from '../../domain/entities/user.entity';
import { DBOperation } from '../data/pg/db-operation';

export class PgUserDatasource extends DBOperation implements UserDatasource {
  async create(user: UserEntity): Promise<UserEntity | void> {
    const { username, email, password } = user;

    const queryString =
      'INSERT INTO users( username, email, password ) VALUES ( $1,$2,$3 ) RETURNING *';

    const values = [username, email, password];
    const result = await this.executeQuery(queryString, values);

    if (result && result.rowCount! > 0) {
      return result.rows[0] as UserEntity;
    }
  }

  async getUsers(limit: number = 10, page: number = 1): Promise<UserEntity[]> {
    const offset = (page - 1) * limit;

    const queryString = `
      SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2
    `;

    const values = [limit, offset];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! < 1) {
      throw new Error('No users found.');
    }

    return result.rows as UserEntity[];
  }

  async getUser(id: number): Promise<UserEntity> {
    const queryString = 'SELECT * FROM users WHERE id = $1';

    const values = [id];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! < 1) {
      throw new Error('User doesnt exist with provided id.');
    }

    return result.rows[0] as UserEntity;
  }
  update(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
}
