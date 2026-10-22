export type RegisterFromState = {
  errors: {
    email?: string[];
    username?: string[];
    password?: string[];
    passwordConfirm?: string[];
    form?: string[];
  };
  values: {
    email: string;
    username: string;
  };
};

export const initialRegisterState: RegisterFromState = {
  errors: {},
  values: {
    email: "",
    username: "",
  },
};
