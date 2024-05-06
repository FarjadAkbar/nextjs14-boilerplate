import { UseMutationResult, useMutation } from "@tanstack/react-query";
import * as api from "./api";
import { RegisterProps, RegisterAPIMutationPayload, RegisterResponse } from "./types";


export function useRegister(props: RegisterProps = {}): UseMutationResult<
  RegisterResponse,
  { message?: string },
  RegisterAPIMutationPayload
> {
  return useMutation({
    mutationFn: (payload) => {
      return api.register({ ...props, data: payload });
    },
  })

}
