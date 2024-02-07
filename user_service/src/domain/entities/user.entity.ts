export class UserEntity {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly username: string
  ) {}

  // static fromJson = (json: string): UserEntity => {
  //   json = json === '' ? '{}' : json;

  //   const { message, level, createdAt, origin } = JSON.parse(json);

  //   const log = new UserEntity({
  //     message,
  //     level,
  //     createdAt: new Date(createdAt),
  //     origin,
  //   });

  //   return log;
  // };

  // static fromObject = (object: { [key: string]: any }): LogEntity => {
  //   const { message, level, createdAt, origin } = object;
  //   const log = new LogEntity({
  //     message,
  //     level,
  //     createdAt,
  //     origin,
  //   });
  //   return log;
  // };
}
