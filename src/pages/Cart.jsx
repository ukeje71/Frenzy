import Sidebar from "../components/Sidebar";
import React from "react";
import img1 from "../assets/Jordan8.png";
import { CheckCircle2, ChevronLeft, Trash2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import useCartStore from "../components/store/CartStore";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCartStore();

  // Calculate cart totals
  const subtotal = totalPrice();
  const discount = 10;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
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
          <NavLink to="/cart">
            <p>Cart</p>
          </NavLink>
          {/* ... rest of your breadcrumb navigation ... */}
        </figure>

        {/* Cart_cover */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-6 px-4 sm:px-6 lg:px-8 py-6">
          {/* Items Table - Responsive */}
          <div className="w-full lg:w-2/3 shadow-lg overflow-x-auto">
            <div className="shadow-lg rounded-xl bg-white overflow-hidden min-w-[300px]">
              <div className="px-4 py-3 border-b border-gray-200 sm:px-6">
                <h3 className="font-bold text-lg">Cart</h3>
                <p className="text-gray-500 text-sm">({cart.length} items)</p>
              </div>

              {/* Mobile/Tablet View (Stacked) */}
              <div className="lg:hidden">
                {cart.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                        <img
                          src={item.image || img1}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                        <div className="flex items-center mt-1">
                          <p className="text-xs text-gray-500 mr-2">
                            Size: {item.size || "N/A"} |
                          </p>
                          {item.color && (
                            <div className="flex">
                              <div
                                className="w-4 h-4 rounded-full z-30"
                                style={{ backgroundColor: item.color }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500 mb-2">Price</p>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-center mb-2">Qty</p>
                        <div className="flex items-center justify-center border border-gray-300 rounded-md w-fit mx-auto px-1">
                          <button
                            className="px-1 text-xs"
                            onClick={() => updateQuantity(item.id, "decrease")}
                          >
                            -
                          </button>
                          <span className="px-1">{item.quantity}</span>
                          <button
                            className="px-1 text-xs"
                            onClick={() => updateQuantity(item.id, "increase")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-center mb-2">Total</p>
                        <div className="flex items-center justify-end gap-2">
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            className="text-red-500 "
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View (Table) */}
              <table className="hidden lg:table w-full border-gray-200 border-1 rounded-2xl shadow-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={item.image || img1}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                            <div className="flex items-center mt-1">
                              <p className="text-xs text-gray-500 mr-2">
                                Size: {item.size || "N/A"} |
                              </p>
                              {item.color && (
                                <div className="flex">
                                  <div
                                    className="w-4 h-4 rounded-full z-30"
                                    style={{ backgroundColor: item.color }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center border border-gray-300 rounded-md w-fit mx-auto px-2">
                          <button
                            className="px-1"
                            onClick={() => updateQuantity(item.id, "decrease")}
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            className="px-1"
                            onClick={() => updateQuantity(item.id, "increase")}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <p className="text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary - Responsive */}
          <div className="w-full lg:w-1/3">
            <div className="shadow-lg border-gray-200 border-1 p-4 sm:p-6 rounded-xl bg-white">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">
                    -${discount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex mt-4">
                <input
                  type="text"
                  placeholder="Gift Card / Discount code"
                  className="p-2 border-1 border-gray-400 rounded-l-lg"
                />
                <button className="bg-green-600 hover:bg-green-700 p-2 rounded-r-lg text-white">
                  Apply
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="text-red-500 font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate("/billing")}
                disabled={cart.length === 0}
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-colors ${
                  cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Check Out
              </button>
            </div>
            <NavLink to="/">
              <span className="flex text-gray-600 mt-7 gap-2">
                <ChevronLeft />
                <p>Continue Shopping</p>
              </span>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
