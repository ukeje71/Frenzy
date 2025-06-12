import { Eye, Heart } from "lucide-react";
import useCartStore from "./store/CartStore";
import { useState, useEffect } from "react";

const Cards = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Product prop received:", product); // Debug what's coming in
    setIsLoading(false);
  }, [product]);

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
      color: product.color || "#CCCCCC",
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
    } catch (err) {
      console.error("Add to cart error:", err);
      setError("Failed to add item");
    }
  };

  if (isLoading) {
    return <div className="p-2 w-fit">Loading...</div>;
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
    <div className="p-2 shadow-xs shadow-gray-400 border-gray-200 border-1 rounded-2xl h-100 w-65">
      {error && (
        <div className="text-red-500 text-sm mb-2">
          {error}
        </div>
      )}

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
          <button
            className="bg-[#1dc2b1] font-bold px-3 py-2 text-white rounded-xl hover:bg-[#1aa995] transition-colors"
            onClick={handleAddToCart}
          >
            Add
          </button>
          <figure className="flex flex-col gap-3">
            <Heart
              size={30}
              className="bg-white rounded-full p-1 cursor-pointer"
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
            <div className="flex items-center">
              <div
                className="w-5 h-5 rounded-full z-30 border border-gray-300"
                style={{ backgroundColor: productData.color }}
              />
            </div>
            <p className="text-base font-medium">
              ${productData.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;