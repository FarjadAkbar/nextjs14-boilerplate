export interface ResetPassword {}

export interface ResetPasswordResponse {
  message: string;
  data: {
    email: string;
  };
}

export interface ResetPasswordAPIMutationPayload {
  password: string;
  hash: string | null;
}

export interface ResetPasswordAPIPayload {
  data: ResetPasswordAPIMutationPayload;
}
