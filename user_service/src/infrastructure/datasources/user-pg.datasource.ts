import { PrismaClient } from '@prisma/client';

import { UserDatasource } from '../../domain/datasources/user.datasource';
import { UserEntity } from '../../domain/entities/user.entity';

const client = new PrismaClient();

export class PgUserDatasource implements UserDatasource {
  create(user: UserEntity): Promise<void> {
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
