export interface RegisterProps {}

export interface RegisterResponse {
  message: string;
  data: {
    email: string;
  };
}

export interface RegisterAPIMutationPayload {
  email: string,
  password: string;
  username: string;
  fullname?: string;
  avatar?: {
    id: number
  }
}

export interface RegisterAPIPayload {
  data: RegisterAPIMutationPayload;
}
