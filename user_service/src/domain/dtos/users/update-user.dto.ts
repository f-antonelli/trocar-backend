import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @Length(3, 10)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  image_url: string;
}
