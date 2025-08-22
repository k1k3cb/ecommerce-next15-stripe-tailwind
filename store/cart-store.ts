import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addOrIncreaseItem: (item: CartItem) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    set => ({
      items: [],

      addOrIncreaseItem: (item: CartItem) =>
        set(state => {
          const existingItem = state.items.find(i => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      decreaseQuantity: (id: string) =>
        set(state => ({
          items: state.items
            .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
            .filter(i => i.quantity > 0)
        })),

      removeItem: (id: string) =>
        set(state => ({
          items: state.items.filter(item => item.id !== id)
        })),

      clearCart: () => set({ items: [] })
    }),
    { name: 'cart-store' }
  )
);
