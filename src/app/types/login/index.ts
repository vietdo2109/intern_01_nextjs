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

export type SessionPayload = {
  userId: string;
  expires: Date;
};

export type User = {
  userid: number;
  username: string;
  email: string;
  todoids: number[];
};
