export type LoginFormValues = {
  email: string;
  password: string;
};

export type LogInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
