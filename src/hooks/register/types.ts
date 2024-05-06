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
  phoneNumber?: string;
  fullname?: string;
  role: number;
  address?: string;
  bio?: string;
  university?: {
    id: number,
  },
  dob?: Date,
  gender?: string,
  latitude?: string,
  longitude?: string,
  graduation?: string,
  photo?: {
    id: number
  }
}

export interface RegisterAPIPayload {
  data: RegisterAPIMutationPayload;
}
