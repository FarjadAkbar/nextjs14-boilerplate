import { UseMutationResult, useMutation } from "@tanstack/react-query";
import * as api from "./api";
import { ResetPassword, ResetPasswordAPIMutationPayload, ResetPasswordResponse } from "./types";

export function useResetPassword(props: ResetPassword = {}): UseMutationResult<
  ResetPasswordResponse,
  { message?: string },
  ResetPasswordAPIMutationPayload
> {
  return useMutation({
    mutationFn: (payload) => {
      return api.resetPassword({ ...props, data: payload });
    },
  })

}
