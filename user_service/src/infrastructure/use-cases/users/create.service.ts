interface CreateUserUseCase {
  execute(url: string): Promise<boolean>;
}

export class CreateUserService implements CreateUserUseCase {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/require-await
  public async execute(url: string): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      return false;
    }
  }
}
