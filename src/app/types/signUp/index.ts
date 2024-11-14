export type NewAccount = {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
};

export type SignUpFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        repeat_password?: string[];
      };
      message?: string;
    }
  | undefined;
