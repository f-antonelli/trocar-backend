import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class Password {
  private static async GetSalt(): Promise<string> {
    return await genSalt();
  }

  static async GetHashedPassword(password: string): Promise<string> {
    return await hash(password, await this.GetSalt());
  }

  static async ValidatePassword(enteredPassword: string, savedPassword: string) {
    return await compare(enteredPassword, savedPassword);
  }

  static GetToken(data: { [key: string]: unknown }) {
    return sign(
      {
        ...data,
      },
      process.env.APP_SECRET!,
      {
        expiresIn: process.env.EXPIRES,
      }
    );
  }
}
