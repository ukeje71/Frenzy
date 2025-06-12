import { NavLink } from "react-router";
import Sidebar from "../components/Sidebar";
import React from "react";
import { CheckCircle2, ChevronLeft } from "lucide-react";

const Payement = () => {
  //   const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row  overflow-hidden">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>

      {/* Billing_details */}
      <section className="w-full p-4 pt-30">
        <figure className="flex lg:hidden text-gray-600 flex-row gap-3 mb-4 mt-4">
             <NavLink to={"/"}>
            <p> Home</p>
          </NavLink>/
             <NavLink to={"/payement"}>
            <p> Payment</p>
          </NavLink>
        </figure>
        <figure className=" hidden  text-gray-600 lg:flex flex-row gap-3 mb-4">
          <NavLink to={"/"}>
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
        <div className="flex flex-col h-full md:p-3 lg:flex-row lg:justify-between gap-10 ">
          <div className="border-1 shadow-lg h-fit border-gray-200 rounded-2xl w-full p-6">
            <h2>Payment options</h2>
            <form action="#" className="text-gray-600">
              <fieldset className="flex gap-5 flex-row mt-3 h-20 border rounded-xl p-2">
                <input type="radio" id="chioce" name="street" />
                <span>
                  <label>First line of address</label>
                  <p>Pay with mobile banking application or e-wallet</p>
                </span>
              </fieldset>

              <fieldset className="flex gap-5 flex-row h-20 mt-5 border rounded-xl p-2">
                <input type="radio" id="chioce" name="street" />
                <span>
                  <label>Cash on delivery</label>
                  <p>Pay with cash when your order is delivered </p>
                </span>
              </fieldset>

              <div className="flex gap-5 flex-row justify-between mt-3 ">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-colors">
                  Complete Order
                </button>
              </div>
            </form>
            <NavLink to={"/billing"}>
              <span className="flex mb-3 text-gray-600 mt-7 gap-2">
                <ChevronLeft />
                <p>Back </p>
              </span>
            </NavLink>
          </div>
          {/* Order Summary - Responsive */}
          <div className="w-full flex flex-col gap-3">
            <div className="shadow-lg border-gray-200 border-1 p-4 sm:p-6 rounded-xl bg-white">
              <h2>Address</h2>
              <div className="text-gray-600">
                <p>Nguyen Duy Trung</p>
                <p>Han Thuyen,Linh Trung,Thu Duc</p>
                <p>07076354937</p>
              </div>
            </div>
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

              {/* <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Gift Card / Discount code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                  Apply
                </button>
              </div> */}

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="text-red-500 font-bold">$320.45</span>
              </div>
              {/* 
              <button
                onClick={() => {
                  navigate("/payment");
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-colors"
              >
                Check Out
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payement;
