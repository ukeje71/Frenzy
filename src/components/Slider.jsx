import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";

import img1 from "../assets/Puma (1).jpeg";
import img2 from "../assets/Puma (2).jpeg";
import img3 from "../assets/Puma (3).jpeg";
import Swiperbtns from "./Swiperbtns";
const Slider = () => {
  return (
    <div>
      {/* <section className="w-full h-full md:p-4">
        <div className="md:rounded-2xl md:p-2 lg:w-[75vw] h-[45vh]  md:h-[50vh] lg:h-[60vh]">
          <img src={img1} alt="img1" className="md:rounded-2xl w-full h-full" />
        </div>
      </section> */}
      <section className="w-full h-full p-4 ">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, A11y]}
          spaceBetween={2}
          pagination={{ clickable: true }}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          loop={true}
        >
          <SwiperSlide>
            <div className="rounded-2xl md:p-2 md:w-[75vw] h-[45vh]  md:h-[50vh] lg:h-[60vh]">
              <img
                src={img1}
                alt="img1"
                className="rounded-2xl w-full h-full"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="rounded-2xl md:p-2 md:w-[75vw] h-[45vh]  md:h-[50vh] lg:h-[60vh]">
              <img
                src={img2}
                alt="img2"
                className="rounded-2xl w-full h-full"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="rounded-2xl md:p-2 md:w-[75vw] h-[45vh]  md:h-[50vh] lg:h-[60vh]">
              <img
                src={img3}
                alt="img1"
                className="rounded-2xl w-full h-full"
              />
            </div>
          </SwiperSlide>
          <div className="flex  items-center justify-center m-auto">
            <Swiperbtns />
          </div>
        </Swiper>
      </section>
    </div>
  );
};

export default Slider;
