import React from "react";
import Sidebar from "../components/Sidebar";
import Slider from "../components/Slider";
import { Search, ChevronRight, Star, Box } from "lucide-react";
import Cards from "../components/Cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Swiperbtns from "../components/Swiperbtns";
import Products from "../components/Product";
import useSearchStore from "../components/store/SearchStore";

const Home = () => {
  const { filteredProducts, setSearchQuery } = useSearchStore();
  const productPages = [];

  // Create product pages with 9 items each
  for (let i = 0; i < filteredProducts(Products).length; i += 9) {
    productPages.push(filteredProducts(Products).slice(i, i + 9));
  }

  // Ensure minimum 3 slides for better swiper experience
  while (productPages.length < 1) {
    productPages.push([]);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 pt-30">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden ">
        {/* Hero Slider */}
        <div className="relative">
          <Slider />

          {/* Mobile Search - Sticky at top */}
          <div className="md:hidden sticky top-0 z-10 bg-white p-4 shadow-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Desktop Search */}
          <div className="hidden md:block mb-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for shoes, clothes, accessories..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <button className="absolute right-1.5 top-1.5 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center gap-3">
                <div className="w-5 h-10 bg-green-600 rounded"></div>
                <h2 className="text-green-600 font-semibold">Our Products</h2>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
                Discover Amazing Deals
              </h1>
            </div>
            <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
              View all <ChevronRight size={18} className="ml-1" />
            </button>
          </div>

          {/* Featured Products */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-yellow-500 mb-3">
              <Star size={18} className="fill-current" />
              <span className="font-medium text-gray-800">Featured Items</span>
            </div>
          </div>

          {/* Products Slider */}
          <div className="relative">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
                renderBullet: (index, className) => {
                  return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
                },
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {productPages.map((pageProducts, pageIndex) => (
                <SwiperSlide key={pageIndex}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6">
                    {pageProducts.length > 0 ? (
                      pageProducts.map((Product) => (
                        <Cards key={Product.id} product={Product} />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-10 text-gray-500">
                        No products found matching your search
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
              <Swiperbtns />
            </Swiper>

            {/* Custom Pagination */}
            <div className="flex justify-center mt-8">
              <div className="custom-pagination flex gap-2"></div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {["Men", "Women", "Kids", "Shoes", "Accessories"].map(
                (category) => (
                  <div
                    key={category}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="bg-gray-100 rounded-lg w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Box size={24} className="text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {category}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
