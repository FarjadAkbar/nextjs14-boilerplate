import { create } from "zustand";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  totalQuantity: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  totalQuantity: 0,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.productId === item.productId);
      const updatedItems = existingItem
        ? state.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...state.items, item];

      const newTotal = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const newTotalQuantity = updatedItems.reduce((sum, i) => sum + i.quantity, 0);

      return { items: updatedItems, total: newTotal, totalQuantity: newTotalQuantity };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const filteredItems = state.items.filter((i) => i.productId !== productId);
      const newTotal = filteredItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const newTotalQuantity = filteredItems.reduce((sum, i) => sum + i.quantity, 0);

      return { items: filteredItems, total: newTotal, totalQuantity: newTotalQuantity };
    }),
  clearCart: () => set({ items: [], total: 0, totalQuantity: 0 }),
}));

export default useCartStore;
