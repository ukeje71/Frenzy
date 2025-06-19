import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCartStore from "./CartStore";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      // Add item to wishlist
      addToWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);
          if (exists) return state;
          return { wishlist: [...state.wishlist, product] };
        }),

      // Remove item from wishlist
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),

      // Move single item to cart
      moveToCart: (product) => {
        const { removeFromWishlist } = get();
        useCartStore.getState().addToCart(product);
        removeFromWishlist(product.id);
        return product;
      },

      // Move all items to cart
      moveAllToCart: () => {
        const { wishlist } = get();
        const { addToCart } = useCartStore.getState();
        
        wishlist.forEach((product) => {
          addToCart(product);
        });

        set({ wishlist: [] });
        return wishlist.length;
      },

      // Check if item is in wishlist
      isInWishlist: (id) => get().wishlist.some((item) => item.id === id),
    }),
    {
      name: "wishlist-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useWishlistStore;