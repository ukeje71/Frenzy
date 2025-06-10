import { CheckCircle2, ChevronLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";
import React from "react";
import { NavLink, useNavigate } from "react-router";
const Billing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row  overflow-hidden">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>

      {/* Billing_details */}
      <section className="w-full p-4">
        <figure className="flex lg:hidden text-grey flex-row gap-3 mb-4 mt-4 text-gray-600">
          <NavLink to={"/"}>
            <p> Home</p>
          </NavLink>
          /
          <NavLink to={"/billing"}>
            <p> Address & Billing</p>
          </NavLink>
        </figure>
        <figure className="hidden text-gray-600 sm:flex flex-row md:gap-2 lg:gap-3 items-center mb-4">
          <NavLink to={"/cart"}>
            <p> Cart</p>
          </NavLink>
          <span className="flex flex-row items-center gap-2">
            <div className="w-6 h-0.5 bg-black"> </div>
            <CheckCircle2 fill="black" color="white" />
            <div className="w-6 h-0.5 bg-black"> </div>
          </span>
          <NavLink to={"/billing"}>
            <p>Billing & Address</p>
          </NavLink>
          <span className="flex flex-row items-center gap-2">
            <div className="w-6 h-0.5 bg-black"> </div>
            <CheckCircle2 fill="black" color="white" />
            <div className="w-6 h-0.5 bg-black"> </div>
          </span>
          <NavLink to={"/payement"}>
            <p> Payement</p>
          </NavLink>
        </figure>
        <div className="flex flex-col h-full md:p-3 lg:flex-row justify-between gap-10 ">
          <div className="border-1 shadow-lg h-fit border-gray-200 rounded-2xl p-6">
            <h2>Address</h2>
            <form action="#" className="text-gray-600 ">
              <fieldset className="flex gap-5 flex-col mt-3">
                <label id="street">First line of address</label>
                <input
                  type="text"
                  placeholder="street No."
                  className="border-1 px-2 rounded-xl py-2 outline-0 "
                />
              </fieldset>

              <fieldset className="flex gap-5 flex-col mt-3">
                <label id="street">Street name</label>
                <input
                  type="text"
                  placeholder="Azikiwe"
                  className="border-1 px-2 rounded-xl py-2 outline-0 "
                />
              </fieldset>

              <div className="flex md:gap-5 flex-col justify-between md:flex-row  mt-3">
                <fieldset className="flex flex-col gap-5">
                  <label id="street">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+234"
                    className="border-1 px-1 rounded-xl py-2 outline-0 "
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <label id="street">Select Shipping</label>
                  <select
                    name="delivery"
                    id="delivery"
                    className="border-1 px-2 rounded-xl py-2 outline-0 md:w-fit"
                  >
                    <option value="Free Delivery">Free Delivery</option>
                    <option value="Home Delivery">Home Delivery</option>
                    <option value="Pick up">Pick up</option>
                  </select>
                </fieldset>
              </div>
            </form>
          </div>
          {/* Order Summary - Responsive */}
          <div className="w-full">
            <div className="shadow-lg border-gray-200 border-1 p-4 sm:p-6 rounded-xl bg-white">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub total</span>
                  <span>$316.55</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Home</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-$10</span>
                </div>
              </div>

              <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Gift Card / Discount code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                  Apply
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="text-red-500 font-bold">$320.45</span>
              </div>

              <button
                onClick={() => {
                  navigate("/payement");
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-colors"
              >
                Check Out
              </button>
            </div>
            <NavLink to={"/cart"}>
              <span className="flex text-gray-600 mt-7 gap-2">
                <ChevronLeft />
                <p>Back </p>
              </span>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Billing;
