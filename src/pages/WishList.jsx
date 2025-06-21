import React from "react";
import Sidebar from "../components/Sidebar";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import useWishlistStore from "../components/store/WishlistStore";
import { toast } from "react-toastify";

const WishList = () => {
  const {
    wishlist,
    moveAllToCart,
    moveToCart,
    removeFromWishlist,
    // isInWishlist
  } = useWishlistStore();

  const handleMoveToCart = (product) => {
    moveToCart(product);
    toast.success(`${product.name} moved to cart!`);
  };

  const handleRemove = (product) => {
    removeFromWishlist(product.id);
    toast.error(`${product.name} removed from wishlist`);
  };

  return (
    <div className="flex flex-col md:flex-row overflow-hidden pt-30">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>

      {/* Main Content */}
      <section className="w-full p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Wishlist</h1>
          {wishlist.length > 0 && (
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => {
                  const count = moveAllToCart();
                  toast.success(`Moved ${count} items to cart!`);
                }}
              >
                <ShoppingCart size={18} />
                <span>Move all to Cart</span>
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="relative shadow-xs  shadow-gray-400 border-gray-200 border-1 rounded-lg  p-4 hover:shadow-md transition-shadow group"
            >
              {/* Product Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 h-48 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-70  rounded-t-xl"
                />
              </div>

              {/* Product Info */}
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-green-600 font-bold mt-1">
                ${product.price.toFixed(2)}
              </p>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => handleRemove(product)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="text-gray-500" size={18} />
                </button>

                <button
                  onClick={() => handleMoveToCart(product)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="text-blue-500" size={18} />
                </button>
              </div>

              {/* Add to Cart Button (Bottom) */}
              <button
                onClick={() => handleMoveToCart(product)}
                className="w-full mt-4 py-2 bg-[#1dc2b1] text-white hover:bg-[#1aa995]  rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {wishlist.length === 0 && (
          <div className="text-center py-20">
            <Heart className="mx-auto text-gray-300" size={48} />
            <h3 className="text-xl font-medium mt-4">Your wishlist is empty</h3>
            <p className="text-gray-500 mt-2">
              Save your favorite items by clicking the ♡ icon
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default WishList;
