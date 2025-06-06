import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React from "react";
import { useSwiper } from "swiper/react";

const Swiperbtns = () => {
  const swiper = useSwiper();
  return (
    <div className="w-full m-auto flex items-center justify-center gap-2 md:gap-9 mt-4 md:mt-6 mb-6 md:mb-10">
      <button
        onClick={() => swiper.slidePrev()}
        className="bg-green-500 p-2 rounded-full"
      >
        <ArrowLeftIcon color="white" />
      </button>
      <p>1/3</p>
      <button
        onClick={() => swiper.slideNext()}
        className="bg-green-500 p-2 rounded-full"
      >
        <ArrowRightIcon color="white" />
      </button>
    </div>
  );
};

export default Swiperbtns;
