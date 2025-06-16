import React from "react";
import Sidebar from "../components/Sidebar";
import { Heart, ShoppingCart } from "lucide-react";
import useWishlistStore from "../components/store/WishlistStore";

const WishList = () => {
  // Get wishlist items from the store
  const { wishlist, moveAllToCart } = useWishlistStore();

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
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={moveAllToCart}
            >
              <ShoppingCart size={18} />
              <span>Move all to Cart</span>
            </button>
          )}
        </div>

        {/* Wishlist Items Grid - Now showing only wishlisted products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="relative border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 h-48 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-green-600 font-bold mt-1">
                ${product.price.toFixed(2)}
              </p>

              {/* Wishlist Button - Now shows filled heart for wishlisted items */}
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                <Heart className="text-red-500 fill-red-500" size={20} />
              </button>

              {/* Add to Cart Button */}
              <button className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Empty State - Shows when wishlist is empty */}
        {wishlist.length === 0 && (
          <div className="text-center py-10">
            <Heart className="mx-auto text-gray-300" size={48} />
            <h3 className="text-xl font-medium mt-4">Your wishlist is empty</h3>
            <p className="text-gray-500 mt-2">Save your favorite items here</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default WishList;
