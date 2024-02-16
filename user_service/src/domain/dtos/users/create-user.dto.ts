import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Length(3, 10)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 10)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must have a Uppercase, lowercase letter and a number',
  })
  public password: string;
}
