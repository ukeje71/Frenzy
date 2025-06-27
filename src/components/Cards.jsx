import { Eye, Heart } from "lucide-react";
import useCartStore from "./store/CartStore";
import useWishlistStore from "../components/store/WishlistStore";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Cards = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add wishlist functionality
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    console.log("Product prop received:", product); // Debug what's coming in
    setIsLoading(false);
    // Check if product is in wishlist when component mounts
    if (product?.id) {
      setIsWishlisted(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  // More robust product data preparation
  const getProductData = () => {
    if (!product) {
      console.warn("No product prop provided");
      return null;
    }

    return {
      id: product.id || Math.random().toString(36).substring(2, 9),
      name: product.name || "Unnamed Product",
      price: Number(product.price) || 0,
      image: product.image || "/default-product.jpg",
      color1: product.color1 || "#CCCCCC",
      color2: product.color2 || "#CCCCCC",
      color3: product.color3 || "#CCCCCC",

      size: product.size || "N/A",
    };
  };

  const productData = getProductData();

  const handleAddToCart = () => {
    if (!productData) {
      setError("Cannot add - no product data");
      return;
    }

    try {
      console.log("Adding to cart:", productData);
      addToCart(productData);
      toast.success(product.name + " Added to Cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      setError("Failed to add item");
    }
  };

  // Add this function for wishlist toggle
  const handleWishlistToggle = () => {
    if (!productData) return;

    try {
      if (isWishlisted) {
        removeFromWishlist(productData.id);
        toast.success("Removed from wishlist");
      } else {
        addToWishlist(productData);
        toast.success("Added to wishlist");
      }
      setIsWishlisted(!isWishlisted);
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error("Wishlist operation failed");
    }
  };

  if (isLoading) {
    return <div className="text-center font-bold mb-30 mt-30 loader"></div>;
  }

  if (!productData) {
    console.warn("Rendering 'Product not available' state");
    return (
      <div className="p-2 w-fit border border-yellow-500 text-yellow-500">
        Product not available
      </div>
    );
  }

  return (
    <div className="p-2 shadow-xs  shadow-gray-400 border-gray-200 border-1 hover:shadow-md transition-shadow group rounded-2xl h-full md:w-65">
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <div className="relative">
        <div className="bg-[#0000000a]">
          <img
            src={productData.image}
            alt={productData.name}
            className="w-full h-70  rounded-t-xl"
            onError={(e) => {
              e.target.src = "/default-product.jpg";
              console.warn("Image failed to load, using fallback");
            }}
          />
        </div>

        <span className="flex flex-row p-2 items-center absolute top-0 justify-between w-full m-auto mt-4">
          <figure className="flex flex-col gap-3">
            {" "}
            <Heart
              onClick={handleWishlistToggle}
              className={
                isWishlisted
                  ? "bg-white rounded-full p-1  text-red-500 fill-red-500"
                  : "rounded-full p-1 cursor-pointer text-gray-600"
              }
              size={30}
            />
            <Eye
              size={30}
              className="bg-white rounded-full p-1 cursor-pointer"
            />
          </figure>
        </span>

        <div className="w-full max-w-xs">
          <p className="text-lg font-semibold">{productData.name}</p>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center flex-row">
              <div
                className=" w-5 h-5 rounded-full z-30"
                style={{ backgroundColor: productData.color1 }}
              ></div>
              <div
                className=" w-5 h-5 rounded-full -ml-2 z-20"
                style={{ backgroundColor: productData.color2 }}
              ></div>
              <div
                className="w-5 h-5 rounded-full -ml-2 z-10"
                style={{ backgroundColor: productData.color3 }}
              ></div>
            </div>
            <p className="text-base font-medium text-green-600">
              ${productData.price.toFixed(2)}
            </p>
          </div>
        </div>
        <button
          className="bg-[#1dc2b1] mt-5 font-bold px-3 py-2 text-white rounded-xl hover:bg-[#1aa995] w-full transition-colors"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Cards;
