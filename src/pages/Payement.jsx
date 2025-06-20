import { NavLink } from "react-router";
import Sidebar from "../components/Sidebar";
import React from "react";
import {
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  Wallet,
  DollarSign,
} from "lucide-react";

const Payment = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 pt-38">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>

      {/* Main Content */}
      <section className="w-full p-4 md:p-8 ">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          {/* Mobile Breadcrumb */}
          <div className="flex lg:hidden items-center  text-gray-600 mb-4">
            <NavLink to="/" className="hover:text-green-600 transition-colors">
              Home
            </NavLink>
            <span className="mx-2">/</span>
            <NavLink to="/payment" className="font-medium text-green-600">
              Payment
            </NavLink>
          </div>

          {/* Desktop Breadcrumb */}
          <div className="hidden lg:flex items-center  text-gray-600 space-x-4">
            <NavLink
              to="/cart"
              className="flex items-center hover:text-green-600 transition-colors"
            >
              Cart
            </NavLink>
            <div className="flex items-center">
              <div className="w-6 h-px bg-gray-300"></div>
              <CheckCircle2
                className="mx-1"
                size={16}
                fill="#10B981"
                color="white"
              />
              <div className="w-6 h-px bg-gray-300"></div>
            </div>
            <NavLink
              to="/billing"
              className="flex items-center hover:text-green-600 transition-colors"
            >
              Billing & Address
            </NavLink>
            <div className="flex items-center">
              <div className="w-6 h-px bg-gray-300"></div>
              <CheckCircle2
                className="mx-1"
                size={16}
                fill="#10B981"
                color="white"
              />
              <div className="w-6 h-px bg-gray-300"></div>
            </div>
            <span className="font-medium text-green-600">Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Options */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Payment Options
              </h2>

              <form className="space-y-4">
                {/* Digital Payment Option */}
                <label className="flex items-start p-4 border border-gray-200 rounded-xl hover:border-green-500 transition-all cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="mt-1 mr-4 h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <CreditCard className="text-gray-700 mr-3" size={20} />
                      <span className="font-medium text-gray-800">
                        Digital Payment
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 ml-8">
                      Pay with mobile banking application or e-wallet
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label className="flex items-start p-4 border border-gray-200 rounded-xl hover:border-green-500 transition-all cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="mt-1 mr-4 h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <DollarSign className="text-gray-700 mr-3" size={20} />
                      <span className="font-medium text-gray-800">
                        Cash on Delivery
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 ml-8">
                      Pay with cash when your order is delivered
                    </p>
                  </div>
                </label>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-all shadow-md hover:shadow-lg"
                >
                  Complete Order
                </button>
              </form>

              <NavLink
                to="/billing"
                className="inline-flex items-center text-gray-600 hover:text-green-600 mt-6 transition-colors"
              >
                <ChevronLeft size={18} className="mr-1" />
                <span>Back to Billing</span>
              </NavLink>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 space-y-4">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Shipping Address
              </h2>
              <div className="text-gray-600 space-y-2">
                <p className="font-medium">Nguyen Duy Trung</p>
                <p>Han Thuyen, Linh Trung, Thu Duc</p>
                <p>07076354937</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">$316.55</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Home Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">-$10.00</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-green-600">$320.45</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
