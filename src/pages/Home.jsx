import React from "react";
import Sidebar from "../components/Sidebar";
import Slider from "../components/Slider";
import { Search } from "lucide-react";
import Cards from "../components/Cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Swiperbtns from "../components/Swiperbtns";
import products from "../components/Product";
import useSearchStore from "../components/store/SearchStore";// Add this import

const Home = () => {
  const { filteredProducts } = useSearchStore(); // Add this line

  // Modify this to use filteredProducts instead of products
  const productPages = [];
  for (let i = 0; i < filteredProducts(products).length; i += 9) {
    productPages.push(filteredProducts(products).slice(i, i + 9));
  }

  // If no product pages, fill with empty arrays to maintain 3 slides
  while (productPages.length < 3) {
    productPages.push([]);
  }

  return (
    <div className="flex flex-col md:flex-row p-4 overflow-hidden pt-30">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>

      <section className="w-full sticky">
        <Slider />
        {/* Products Section */}
        <div className="m-4 md:m-6 w-full grid grid-cols-1">
          <span className="flex text-gray-500 flex-row w-fit m-auto md:m-0 rounded-full border px-3 py-2 mb-4">
            <input
              type="text"
              placeholder="Search"
              className="outline-0 w-full"
              onChange={(e) => useSearchStore.getState().setSearchQuery(e.target.value)} // Add this
            />
            <button>
              <Search />
            </button>
          </span>

          <span className="flex items-center gap-2 md:mt-3">
            <div className="w-3 h-8 md:w-5 md:h-10 bg-green-800"></div>
            <p className="text-green-800 text-sm md:text-base">Products</p>
          </span>

          <span className="font-bold text-xl md:text-2xl mt-3 md:mt-4">
            Explore our products.
          </span>
        </div>

        <section className="md:w-[80vw]">
          {/* Swiper Product Pagination */}
          <div className="relative w-full h-full">
            <Swiper
              modules={[Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
                renderBullet: (index, className) => {
                  return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
                },
              }}
              loop={false}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
              }}
            >
              {/* Map through filtered product pages */}
              {productPages.map((pageProducts, pageIndex) => (
                <SwiperSlide key={pageIndex}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pageProducts.length > 0 ? (
                      pageProducts.map((product) => (
                        <Cards key={product.id} product={product} />
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-10">
                        No more products available
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
              <Swiperbtns />
            </Swiper>

            {/* Custom Navigation */}
            <div className="flex items-center justify-center gap-2 md:gap-4 mt-4 md:mt-6 mb-6 md:mb-10">
              <div className="custom-pagination flex justify-center gap-1 md:gap-2 mx-2 md:mx-4"></div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;