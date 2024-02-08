import { UserDatasource } from '../../domain/datasources/user.datasource';
import { UserEntity } from '../../domain/entities/user.entity';
import { DBOperation } from '../data/pg/db-operation';

export class PgUserDatasource extends DBOperation implements UserDatasource {
  create(user: UserEntity): Promise<UserEntity> {
    // const {username,email,password} = user
    // const queryString =
    //   'INSERT INTO users(phone,email,password,salt,user_type) VALUES($1,$2,$3,$4,$5) RETURNING *';

    // const values = [phone, email, password, salt, userType];
    // const result = await this.executeQuery(queryString, values);

    // if (result.rowCount > 0) {
    //   return result.rows[0] as UserEntity;
    // }
    // return await client.user.create({
    //   data: {
    //     ...user,
    //   },
    // });
    throw new Error('Method not implemented.');
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
