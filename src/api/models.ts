type WithId<T extends Record<string, unknown>> = T & { id: string };

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type UserModel = WithId<{
  firstName: string;
  lastName: string;
  email: string;
}>;
