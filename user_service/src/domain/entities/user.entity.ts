export interface UserEntity {
  id?: number;
  username: string;
  email: string;
  password?: string;
  image_url?: string;
  is_active?: boolean;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
}
