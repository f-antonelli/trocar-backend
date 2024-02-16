export interface UserEntity {
  id?: number;
  username: string;
  email: string;
  password: string;
  image_url?: string;
  is_active?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}
