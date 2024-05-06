import service from "@/services";
import { ForgotPasswordAPIPayload, ForgotPasswordResponse } from "./types";
import { ENDPOINTS } from "../constant/endpoints";

export async function forgotPassword(
  payload: ForgotPasswordAPIPayload,
): Promise<ForgotPasswordResponse> {
  return service({
    url: ENDPOINTS.FORGOT_PASSWORD,
    method: "POST",
    body: payload.data,
  });
}
