import { create } from 'zustand';

interface CartState {
  cartQuantity: number;
  addToCart: (quantity: number) => void;
  resetCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartQuantity: 0,
  addToCart: (quantity: number) =>
    set((state) => ({ cartQuantity: state.cartQuantity + quantity })),
  resetCart: () =>
    set({
      cartQuantity: 0,
    }),
}));
