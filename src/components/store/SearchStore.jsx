import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  filteredProducts: (products) => {
    const { searchQuery } = useSearchStore.getState();
    
    // Return empty array if no products
    if (!products || !Array.isArray(products)) return [];
    
    // Return all products if empty search query
    if (!searchQuery) return products;
    
    const query = searchQuery.toLowerCase();
    
    return products.filter((product) => {
      // Skip if product is invalid
      if (!product) return false;
      
      // Check name (with null check)
      const nameMatch = product.name 
        ? product.name.toLowerCase().includes(query)
        : false;
      
      // Check category (with null check)
      const categoryMatch = product.category
        ? product.category.toLowerCase().includes(query)
        : false;
      
      return nameMatch || categoryMatch;
    });
  },
}));

export default useSearchStore;