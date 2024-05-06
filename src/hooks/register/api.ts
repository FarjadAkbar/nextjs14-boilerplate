import service from "@/services";
import { ENDPOINTS } from "../constant/endpoints";
import { RegisterAPIPayload, RegisterResponse } from "./types";

export async function register(payload: RegisterAPIPayload): Promise<RegisterResponse> {
  try {
    const response = await service({
      url: ENDPOINTS.REGISTER,
      method: "POST",
      body: payload.data,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to register. Please try again later.");
  }
}
