import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @IsEmail()
  email: string;

  @Length(3, 10)
  password: string;
}
