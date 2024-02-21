import { Role } from '../enums/user-role.enum';

export interface UserEntity {
  id?: number;
  username: string;
  email: string;
  password?: string;
  image_url?: string;
  is_active?: boolean;
  role?: Role;
  created_at?: Date;
  updated_at?: Date;
}
