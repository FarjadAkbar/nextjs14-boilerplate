
import service from "@/services";
import { ENDPOINTS } from "../constant/endpoints";

// Login
export async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return service({
      method: "POST",
      noAuth: true,
      url: ENDPOINTS.LOGIN,
      body: {
        email,
        password,
      },
    });
  }
  
  export async function getUser(token: string) {
    return service({
      method: "GET",
      url: ENDPOINTS.PROFILE,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  export async function refreshToken(token: string) {
    return service({
      method: "POST",
      url: ENDPOINTS.REFRESH_TOKEN,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }