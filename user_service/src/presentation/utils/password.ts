import { genSalt, hash } from 'bcryptjs';

export class Password {
  private static async GetSalt(): Promise<string> {
    return await genSalt();
  }

  static async GetHashedPassword(password: string): Promise<string> {
    return await hash(password, await this.GetSalt());
  }
}
