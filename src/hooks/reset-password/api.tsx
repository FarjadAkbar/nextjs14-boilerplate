import service from "@/services";
import { ResetPasswordAPIPayload, ResetPasswordResponse } from "./types";
import { ENDPOINTS } from "../constant/endpoints";

export async function resetPassword(
  payload: ResetPasswordAPIPayload
): Promise<ResetPasswordResponse> {
  return service({
    url: ENDPOINTS.RESET_PASSWORD,
    method: "POST",
    body: payload.data,
  });
}
