import { create } from 'zustand';

export interface CartItem {
  menuId: number;
  quantity: number;
  type: 'individual' | 'team'; // 'individual' for 공통메뉴, 'team' for 개별메뉴
  storeId: string;
}

interface CartState {
  cartItems: CartItem[];
  cartQuantity: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (menuId: number, storeId: string, quantity: number) => void;
  resetCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  cartQuantity: 0,
  addToCart: (newItem: CartItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) =>
          item.menuId === newItem.menuId && item.storeId === newItem.storeId,
      );
      let updatedItems;
      if (existingItem) {
        updatedItems = state.cartItems.map((item) =>
          item.menuId === newItem.menuId && item.storeId === newItem.storeId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        updatedItems = [...state.cartItems, newItem];
      }
      return {
        cartItems: updatedItems,
        cartQuantity: updatedItems.reduce(
          (acc, item) => acc + item.quantity,
          0,
        ),
      };
    }),
  updateQuantity: (menuId: number, storeId: string, quantity: number) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.menuId === menuId && item.storeId === storeId,
      );

      // Prevent unnecessary updates
      if (existingItem && existingItem.quantity === quantity) {
        return state;
      }

      const updatedItems = state.cartItems.map((item) =>
        item.menuId === menuId && item.storeId === storeId
          ? { ...item, quantity }
          : item,
      );

      return {
        cartItems: updatedItems,
        cartQuantity: updatedItems.reduce(
          (acc, item) => acc + item.quantity,
          0,
        ),
      };
    }),
  resetCart: () =>
    set({
      cartItems: [],
      cartQuantity: 0,
    }),
}));
