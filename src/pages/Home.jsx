import React from "react";
import Sidebar from "../components/Sidebar";
import Slider from "../components/Slider";
import { Search } from "lucide-react";
import Cards from "../components/Cards";
import img1 from "../assets/jordan8.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Swiperbtns from "../components/Swiperbtns";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row  overflow-clip">
      <section>
        <Sidebar />
      </section>

      <section className="w-full">
        <Slider />
        {/* Products Section */}
        <div className="m-4 md:m-6 w-full grid grid-cols-1">
          <span className="flex text-gray-500 flex-row w-fit  m-auto md:m-0 rounded-full border px-3 py-2 mb-4">
            <input
              type="text"
              placeholder="Search"
              className="outline-0 w-full"
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

        <section className="md:w-[80vw] ">
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
                // when window width is >= 640px
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
              }}
            >
              {/* Page 1 */}
              <SwiperSlide>
                <div className=" md:grid flex flex-col items-center sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-y-4 p-2 md:p-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <Cards key={i} images={img1} />
                  ))}
                </div>
              </SwiperSlide>

              {/* Page 2 */}
              <SwiperSlide>
                <div className="md:grid flex  flex-col items-centersm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 p-2 md:p-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <Cards key={i + 9} images={img1} />
                  ))}
                </div>
              </SwiperSlide>

              {/* Page 3 */}
              <SwiperSlide>
                <div className="md:grid flex flex-col items-centersm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 p-2 md:p-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <Cards key={i + 9} images={img1} />
                  ))}
                </div>
              </SwiperSlide>
              <Swiperbtns />
            </Swiper>

            {/* Custom Navigation */}
            <div className="flex  items-center justify-center gap-2 md:gap-4 mt-4 md:mt-6 mb-6 md:mb-10">
              <div className="custom-pagination flex justify-center gap-1 md:gap-2 mx-2 md:mx-4"></div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
