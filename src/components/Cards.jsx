import { Eye, Heart } from "lucide-react";
// import img1 from "../assets/jordan8.png";

const Cards = ({ images }) => {
  return (
      <div className="p-2 w-fit shadow-xs shadow-gray-400 border-gray-200 border-1 rounded-2xl">
        <div className="relative">
          <div className="bg-[#0000000a] p-2 rounded-2xl">
              <img
                src={images}
                alt="img1"
                className="w-full h-full mix-blend-overlay"
              />
          </div>
          <span className="flex flex-row p-2 items-center absolute top-0 justify-between w-full m-auto mt-4">
            <p className="bg-[#1dc2b1] font-bold  px-3 py-2 text-white rounded-xl ">
              New
            </p>
            <figure className="flex flex-col gap-3">
              <Heart size={30} className="bg-white rounded-full p-1" />
              <Eye size={30} className="bg-white rounded-full p-1" />
            </figure>
          </span>
          <div className="w-full max-w-xs">
            <p className="text-lg font-semibold">Nike Air 1'07</p>
            <div className="flex justify-between items-center mt-2">
              <a href="#" className="flex items-center">
                <div className="bg-[darkorchid] w-5 h-5 rounded-full z-30"></div>
                <div className="bg-gray-500 w-5 h-5 rounded-full -ml-2 z-20"></div>
                <div className="bg-[#ccc] w-5 h-5 rounded-full -ml-2 z-10"></div>
              </a>
              <p className="text-base font-medium">$115</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Cards;
