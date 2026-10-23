export type RegisterFromState = {
  success: boolean;
  message?: string;
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
  success: false,
  errors: {},
  values: {
    email: "",
    username: "",
  },
};
