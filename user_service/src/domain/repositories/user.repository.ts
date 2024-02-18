import { UpdateUserDTO } from '../dtos/users';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract GetUsers(limit: number, page: number): Promise<UserEntity[] | null>;
  abstract GetUserById(id: number): Promise<UserEntity | null>;
  abstract GetUserByEmail(email: string): Promise<UserEntity | null>;
  abstract UpdateUser(id: number, userData: UpdateUserDTO): Promise<UserEntity | null>;
  abstract DeleteUser(id: number): Promise<UserEntity | null>;
}
