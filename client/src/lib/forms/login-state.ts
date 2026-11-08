export type LoginFromState = {
  notificationId: number;
  success: boolean;
  message?: string;
  errors: {
    login?: string[];
    password?: string[];
    form?: string[];
  };
  values: {
    login: string;
  };
};

export const initialLoginState: LoginFromState = {
  notificationId: 0,
  success: false,
  errors: {},
  values: {
    login: "",
  },
};
