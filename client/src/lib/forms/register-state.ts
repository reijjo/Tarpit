export type RegisterFromState = {
  notificationId: number;
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
  notificationId: 0,
  success: false,
  errors: {},
  values: {
    email: "",
    username: "",
  },
};
