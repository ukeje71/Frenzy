// store/CartStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      // Add to cart
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      // Remove from cart
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // Update quantity
      updateQuantity: (id, action) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.id !== id) return item;
            const newQuantity =
              action === "increase"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1);
            return { ...item, quantity: newQuantity };
          }),
        })),

      // Calculate total price
      totalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useCartStore;