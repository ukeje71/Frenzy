import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Camera, CheckCircle2 } from "lucide-react";
import { NavLink } from "react-router";

const NewProducts = () => {
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  const handleClickUpload = () => {
    inputRef.current.click();
  };

  const handleImageChange = () => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  return (
    <div className="flex flex-col md:flex-row overflow-hidden pt-30">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>

      {/* Cart_details */}
      <section className="w-full p-4">
        <figure className="hidden text-gray-600 sm:flex flex-row gap-3 mb-4">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          <span className="flex flex-row items-center gap-2">
            <div className="w-6 h-0.5 bg-black"></div>
            <CheckCircle2 fill="black" color="white" />
            <div className="w-6 h-0.5 bg-black"></div>
          </span>
          <NavLink to="/new">
            <p>New Products</p>
          </NavLink>
        </figure>

        {/* Cart_cover */}
        <div className="flex flex-col lg:flex-row justify-eve items-start gap-6 px-4 sm:px-6 lg:px-8 py-6">
          <div className="border-1 border-gray-400 w-[65%] p-3 rounded-xl">
            <form action="#" className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Product Name "
                className="w-full outline-none border-gray-600 border-1 p-3 rounded-xl font-bold"
              />
              <fieldset className="flex flex-col gap-4">
                <label
                  htmlFor="description"
                  className="font-bold text-gray-600"
                >
                  Product-Description
                </label>
                <textarea
                  rows="4"
                  type="text"
                  id="description"
                  placeholder="Write something Awesome "
                  className="resize-none rounded-xl border-1 border-gray-600 outline-none p-3"
                />
              </fieldset>

              <fieldset className="flex flex-col  w-full">
                <label htmlFor="file" className="font-bold text-gray-600">
                  Image
                </label>
                <div className="border-1 border-gray-600 rounded-xl p-3 px-10 flex flex-row items-center justify-between w-full">
                  <fieldset>
                    <div
                      className="bg-gray-200  rounded-full h-35 w-35 flex items-center  justify-center cursor-pointer"
                      onClick={handleClickUpload}
                    >
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          size={80}
                          className="text-green-500 w-full rounded-full font-extralight h-full"
                        />
                      ) : (
                        <Camera
                          size={80}
                          className="text-green-500 font-extralight w-20"
                        />
                      )}
                    </div>
                    <label htmlFor="image-upload-input">
                      {image ? image.name : "Choose an image "}
                    </label>
                  </fieldset>
                  <fieldset>
                    <p>Select FIles</p>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="hidden"
                      onChange={handleImageChange}
                      ref={inputRef}
                    />
                    <p className="gap-2 flex flex-row">
                      Drop files or
                      <b
                        onClick={handleClickUpload}
                        className="underline text-green-600 cursor-pointer"
                      >
                        Click
                      </b>
                      through your machine
                    </p>
                  </fieldset>
                </div>
              </fieldset>
            </form>
          </div>
          {/*  */}
          <div className="w-[35%] rounded-xl p-5 border-gray-600 border-1">
            <form action="#" className=" flex flex-col gap-5">
              <fieldset className="flex flex-row  gap-2 text-gray-600 ">
                <input type="radio" name="stock" id="stock" className="w-9" />
                <label htmlFor="stock" className="font-bold text-[20px]">
                  In stock
                </label>
              </fieldset>
              <fieldset className="flex flex-col w-full gap-5">
                <input
                  type="text"
                  placeholder="Product Id"
                  className="outline-none text-gray-600  border-1 p-3 rounded-xl "
                />
                <input
                  type="text"
                  placeholder="Product Size "
                  className="outline-none text-gray-600  border-1 p-3 rounded-xl"
                />
              </fieldset>
              <h4 className="font-bold text-[20px] text-gray-600">Gender</h4>
              <div className="text-gray-600 flex flex-row gap-6">
                <fieldset className="flex flex-row gap-2 ">
                  <input type="radio" name="type" id="Male" className="w-9" />
                  <label htmlFor="type">Male</label>
                </fieldset>
                <fieldset className="flex flex-row gap-2">
                  <input type="radio" name="type" id="Female" className="w-9" />
                  <label htmlFor="type">Female</label>
                </fieldset>
                <fieldset className="flex flex-row gap-2">
                  <input type="radio" name="type" id="Kids" className="w-9" />
                  <label htmlFor="type">Kids</label>
                </fieldset>
              </div>
              <h4 className="font-bold text-[20px] text-gray-600">Category</h4>
              <fieldset className="flex flex-col gap-5 ">
                <label id="street">Select Shipping</label>
                <select
                  name="delivery"
                  id="delivery"
                  //   className="border-none px-2 w-300 rounded-xl py-2 outline-0 md:w-fit"
                >
                  <datalist value="Free Delivery" className="w-30">
                    Free Delivery
                  </datalist>
                  <datalist value="Home Delivery" className="w-30">
                    Home Delivery
                  </datalist>
                  <datalist value="Pick up" className="w-30">
                    Pick up
                  </datalist>
                </select>
              </fieldset>

              <div>
                <h4 className="font-bold text-[20px] text-gray-600">
                  Regular Price
                </h4>
                <input
                  type="text"
                  placeholder="$35.70"
                  className="outline-none text-gray-600 w-full border-1 p-3 rounded-xl "
                />
                <h4 className="font-bold text-[20px]  text-gray-600">
                  Sales Price
                </h4>
                <input
                  type="text"
                  placeholder="$35.70"
                  className="outline-none text-gray-600 w-full border-1 p-3 rounded-xl "
                />
              </div>

              <button
                className="bg-green-500 text-white p-2 rounded-sm mt-4 cursor-pointer"
                onClick={handleClickUpload}
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewProducts;
