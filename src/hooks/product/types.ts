export interface ProductResponse {
  message: string;
  data: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

export interface CartResponse {
  message: string;
  data: {
    id: number;
    products: Array<{
      productId: number;
      name: string;
      price: number;
      quantity: number;
    }>;
    total: number;
  };
}

export interface CheckoutResponse {
  message: string;
  data: {
    orderId: number;
  };
}

export interface CartProps {}
export interface CartAPIMutationPayload {
  productId: number;
  quantity: number;
}

export interface CartAPIPayload {
  data: CartAPIMutationPayload;
}

export interface CheckoutAPIMutationPayload {
  cartId: number;
}

export interface CheckoutAPIPayload {
  data: CheckoutAPIMutationPayload;
}
