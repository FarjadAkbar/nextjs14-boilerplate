import { UseMutationResult, useMutation } from "@tanstack/react-query";
import * as api from "./api";
import { ForgotPassword, ForgotPasswordAPIMutationPayload, ForgotPasswordResponse } from "./types";


export function useForgotPassword(props: ForgotPassword = {}): UseMutationResult<
ForgotPasswordResponse,
  { message?: string },
  ForgotPasswordAPIMutationPayload
> {
  return useMutation({
    mutationFn: (payload) => {
      return api.forgotPassword({ ...props, data: payload });
    },
  })

}
