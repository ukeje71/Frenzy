import { CheckCircle2, ChevronLeft, Truck, Home, Package } from "lucide-react";
import Sidebar from "../components/Sidebar";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import useCartStore from "../components/store/CartStore";
import { db } from "../components/Firebase";
import { collection, addDoc } from "firebase/firestore";

const Billing = () => {
  const navigate = useNavigate();
  const { totalPrice } = useCartStore();
  const [formData, setFormData] = useState({
    addressLine1: "",
    streetName: "",
    phoneNumber: "",
    deliveryOption: "Free Delivery",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate cart totals
  const subtotal = totalPrice();
  const discount = 10;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.addressLine1.trim())
      errors.addressLine1 = "First line of address is required";
    if (!formData.streetName.trim())
      errors.streetName = "Street name is required";
    if (!formData.phoneNumber.trim())
      errors.phoneNumber = "Phone number is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const docRef = await addDoc(collection(db, "users"), {
          ...formData,
          orderTotal: total,
          subtotal,
          discount,
          shipping,
          timestamp: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
        navigate("/payment");
      } catch (error) {
        console.error("Error adding document: ", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
            <NavLink to="/billing" className="font-medium text-green-600">
              Address & Billing
            </NavLink>
          </div>

          {/* Desktop Breadcrumb */}
          <div className="hidden lg:flex items-center text-sm text-gray-600 space-x-4">
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
            <span className="font-medium text-green-600">
              Billing & Address
            </span>
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
            <NavLink to="/payment" className="flex items-center text-gray-400">
              Payment
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Billing Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="addressLine1"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First line of address
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    id="addressLine1"
                    placeholder="House number and street name"
                    className={`w-full outline-none px-4 py-3 border ${
                      formErrors.addressLine1
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                  />
                  {formErrors.addressLine1 && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.addressLine1}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="streetName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street name
                  </label>
                  <input
                    type="text"
                    name="streetName"
                    id="streetName"
                    placeholder="Azikiwe Street"
                    className={`w-full outline-none px-4 py-3 border ${
                      formErrors.streetName
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                    value={formData.streetName}
                    onChange={handleInputChange}
                  />
                  {formErrors.streetName && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.streetName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="+234 123 456 7890"
                      className={`w-full outline-none px-4 py-3 border ${
                        formErrors.phoneNumber
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                    {formErrors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="deliveryOption"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Delivery Method
                    </label>
                    <div className="relative">
                      <select
                        name="deliveryOption"
                        id="deliveryOption"
                        className="w-full outline-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none transition-all"
                        value={formData.deliveryOption}
                        onChange={handleInputChange}
                      >
                        <option value="Free Delivery">Free Delivery</option>
                        <option value="Home Delivery">Home Delivery</option>
                        <option value="Pick up">Pick up</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h3>

              <div className="space-y-4">
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

              <div className="mt-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Gift Card / Discount code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
                  />
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-r-lg transition-colors">
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
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-all shadow-md hover:shadow-lg ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Proceed to Payment"
                )}
              </button>

              <NavLink
                to="/cart"
                className="inline-flex items-center text-gray-600 hover:text-green-600 mt-6 transition-colors"
              >
                <ChevronLeft size={18} className="mr-1" />
                <span>Back to Cart</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Billing;
