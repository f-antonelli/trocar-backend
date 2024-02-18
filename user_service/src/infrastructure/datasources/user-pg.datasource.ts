import { UserDatasource } from '../../domain/datasources/user.datasource';
import { UpdateUserDTO } from '../../domain/dtos/users';
import { UserEntity } from '../../domain/entities/user.entity';
import { DBOperation } from '../data/pg/db-operation';

export class PgUserDatasource extends DBOperation implements UserDatasource {
  async GetUsers(limit: number = 10, page: number = 1): Promise<UserEntity[] | null> {
    const offset = (page - 1) * limit;

    const queryString = `
      SELECT id, username, email, image_url, is_active, role FROM users ORDER BY id LIMIT $1 OFFSET $2
    `;

    const values = [limit, offset];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows as UserEntity[];
    }

    return null;
  }

  async GetUserById(id: number): Promise<UserEntity | null> {
    const queryString =
      'SELECT id, username, email, image_url, is_active, role, created_at, updated_at FROM users WHERE id = $1';

    const values = [id];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows[0] as UserEntity;
    }

    return null;
  }

  async GetUserByEmail(email: string): Promise<UserEntity | null> {
    const queryString =
      'SELECT id, username, email, image_url, is_active, role, created_at, updated_at FROM users WHERE email = $1';

    const values = [email];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows[0] as UserEntity;
    }

    return null;
  }

  async UpdateUser(id: number, userData: UpdateUserDTO): Promise<UserEntity | null> {
    const { username, email, image_url } = userData;
    const queryString =
      'UPDATE users SET username=$1, email=$2, image_url=$3, updated_at = NOW() WHERE id=$4 RETURNING *';

    const values = [username, email, image_url, id];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows[0] as UserEntity;
    }

    return null;
  }

  async DeleteUser(id: Number): Promise<UserEntity | null> {
    const queryString = 'DELETE FROM users WHERE id = $1';

    const values = [id];
    const result = await this.executeQuery(queryString, values);

    if (result.rowCount! > 0) {
      return result.rows[0] as UserEntity;
    }

    return null;
  }
}
