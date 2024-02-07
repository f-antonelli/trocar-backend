import { ValidationError, validate } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppValidation = async (input: any): Promise<ValidationError[] | false> => {
  const error = await validate(input as string, {
    ValidationError: { target: true },
  });

  if (error.length) return error;

  return false;
};
