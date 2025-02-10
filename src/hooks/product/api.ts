import service from "@/services";
import { ENDPOINTS } from "../constant/endpoints";
import { ProductResponse, CartResponse, CheckoutResponse, CartAPIPayload, CheckoutAPIPayload } from "./types";

export async function fetchProducts(): Promise<ProductResponse[]> {
  try {
    // const response = await service({
    //   url: ENDPOINTS.PRODUCTS,
    //   method: "GET",
    // });
    // return response.data;
    return [
        {
            id: '1',
            name: 'Test',
            price: 23,
            image: 'image.png',
            description: 'testing',
        }
    ]
  } catch (error) {
    throw new Error("Failed to fetch products.");
  }
}


export async function addToCart(payload: CartAPIPayload): Promise<CartResponse> {
    try {
      const response = await service({
        url: ENDPOINTS.CART,
        method: "POST",
        body: payload.data,
      });
      return response.data;
    } catch (error) {
        throw new Error("Failed to add to cart.");
    }
  }
  

export async function checkout(payload: CheckoutAPIPayload): Promise<CheckoutResponse> {
  try {
    const response = await service({
      url: `${ENDPOINTS.CHECKOUT}`,
      method: "POST",
      body: payload.data,
    });
    return response.data;
  } catch (error) {
    throw new Error("Checkout failed.");
  }
}
