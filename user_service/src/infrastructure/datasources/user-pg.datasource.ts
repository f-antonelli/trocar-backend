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
  getUsers(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  getUser(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  update(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: Number): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
}
