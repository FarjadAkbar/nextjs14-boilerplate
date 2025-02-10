import { UseQueryResult, UseMutationResult, useQuery, useMutation } from "@tanstack/react-query";
import * as api from "./api";
import { ProductResponse, CartResponse, CheckoutResponse, CartProps, CheckoutAPIMutationPayload, CartAPIMutationPayload } from "./types";

export function useFetchProducts(): UseQueryResult<ProductResponse[]> {
    return useQuery({
      queryKey: ["products"],
      queryFn: () => api.fetchProducts(),
    });
  }
  

export function useAddToCart(props: CartProps = {}): UseMutationResult<
CartResponse,
  { message?: string },
  CartAPIMutationPayload
> {
  return useMutation({
    mutationFn: (payload) => {
      return api.addToCart({ ...props, data: payload });
    },
  })

}


export function useCheckout(): UseMutationResult<
  CheckoutResponse,
  Error,
  CheckoutAPIMutationPayload
> {
  return useMutation({
    mutationFn: (payload) => api.checkout({ data: payload }),
  });
}
