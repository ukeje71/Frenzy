import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCartStore from "./CartStore";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      // Add item to wishlist (if not already present)
      addToWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);
          if (exists) return state; // Don't add duplicates
          return { wishlist: [...state.wishlist, product] };
        }),

      // Remove item from wishlist
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),

      // Check if item is in wishlist
      isInWishlist: (id) => get().wishlist.some((item) => item.id === id),

      // Move all wishlist items to cart
      moveAllToCart: () => {
        const { wishlist } = get();
        const { addToCart } = useCartStore.getState();

        // Add each item to cart
        wishlist.forEach((product) => {
          addToCart(product);
        });

        // Clear wishlist
        set({ wishlist: [] });

        return wishlist.length; // Return count of moved items
      },

      // Clear entire wishlist
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "wishlist-storage",
      getStorage: () => localStorage, // Explicitly use localStorage
    }
  )
);

export default useWishlistStore;
