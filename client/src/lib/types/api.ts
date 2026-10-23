export type ApiResponse<T = null> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      error: string;
      message?: string;
    };
