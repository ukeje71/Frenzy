import Sidebar from "../components/Sidebar";
import React from "react";
import {
  CheckCircle2,
  ChevronLeft,
  Trash2,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 pt-30">
      {/* Sidebar */}
      <section className="w-fit">
        <Sidebar />
      </section>

      {/* Main Content */}
      <section className="w-full p-4 md:p-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          {/* Mobile Breadcrumb */}
          <div className="flex lg:hidden items-center text-sm text-gray-600 mb-4">
            <NavLink to="/" className="hover:text-green-600 transition-colors">
              Home
            </NavLink>
            <span className="mx-2">/</span>
            <NavLink to="/cart" className="font-medium text-green-600">
              Cart
            </NavLink>
          </div>

          {/* Desktop Breadcrumb */}
          <div className="hidden lg:flex items-center text-sm text-gray-600 space-x-4">
            <NavLink
              to="/"
              className="flex items-center hover:text-green-600 transition-colors"
            >
              Home
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
            <span className="font-medium text-green-600">Cart</span>
            <div className="flex items-center">
              <div className="w-6 h-px bg-gray-300"></div>
              <CheckCircle2
                className="mx-1"
                size={16}
                fill="#e5e7eb"
                color="#9ca3af"
              />
              <div className="w-6 h-px bg-gray-300"></div>
            </div>
            <NavLink to="/Payment" className="flex items-center text-gray-400">
              Payment
            </NavLink>
            <div className="flex items-center">
              <div className="w-6 h-px bg-gray-300"></div>
              <CheckCircle2
                className="mx-1"
                size={16}
                fill="#e5e7eb"
                color="#9ca3af"
              />
              <div className="w-6 h-px bg-gray-300"></div>
            </div>
             <NavLink to="/billing" className="flex items-center text-gray-400">
              Billing
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <ShoppingBag className="text-green-600 mr-3" size={20} />
                <h3 className="text-xl font-bold text-gray-800">Your Cart</h3>
                <span className="ml-auto text-sm text-gray-500">
                  ({cart.length} items)
                </span>
              </div>

              {/* Mobile/Tablet View */}
              <div className="lg:hidden divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex">
                      {item.image && (
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-900">
                            {item.name || "Unnamed Product"}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span>Size: {item.size || "N/A"}</span>
                          {item.color && (
                            <div className="flex items-center ml-3">
                              <span className="mr-1">Color:</span>
                              <div
                                className="w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: item.color }}
                              ></div>
                            </div>
                          )}
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                              onClick={() =>
                                updateQuantity(item.id, "decrease")
                              }
                            >
                              -
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                              onClick={() =>
                                updateQuantity(item.id, "increase")
                              }
                            >
                              +
                            </button>
                          </div>
                          <p className="font-medium">
                            $
                            {item.price
                              ? (item.price * item.quantity).toFixed(2)
                              : "0.00"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <table className="hidden lg:table w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {item.image && (
                            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.name || "Unnamed Product"}
                            </p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <span>Size: {item.size || "N/A"}</span>
                              {item.color && (
                                <div className="flex items-center ml-3">
                                  <span className="mr-1">Color:</span>
                                  <div
                                    className="w-3 h-3 rounded-full border border-gray-200"
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
                          ${item.price ? item.price.toFixed(2) : "0.00"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center border border-gray-300 rounded-md w-fit mx-auto">
                          <button
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            onClick={() => updateQuantity(item.id, "decrease")}
                          >
                            -
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            onClick={() => updateQuantity(item.id, "increase")}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <p className="font-medium">
                            $
                            {item.price
                              ? (item.price * item.quantity).toFixed(2)
                              : "0.00"}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
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

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">
                    -${discount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Gift Card / Discount code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-green-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/billing")}
                disabled={cart.length === 0}
                className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-all shadow-md hover:shadow-lg ${
                  cart.length === 0 ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                Proceed to Checkout
              </button>

              <NavLink
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-green-600 mt-4 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" />
                Continue Shopping
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
