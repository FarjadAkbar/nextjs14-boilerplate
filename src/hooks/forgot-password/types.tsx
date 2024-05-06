export interface ForgotPassword {}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ForgotPasswordAPIMutationPayload {
  email: string;
}

export interface ForgotPasswordAPIPayload {
  data: ForgotPasswordAPIMutationPayload;
}
