import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../components/Firebase';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router';
import { CheckCircle2, ChevronLeft, Truck, Package, Loader2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import useCartStore from '../components/store/CartStore';

const Billing = () => {
  const publicKey = "pk_test_15d1a66d354ca8680092d0ff1c1ccebef82044be"; // Replace with your actual key
  const navigate = useNavigate();
  const { totalPrice, clearCart } = useCartStore();

  // Form state with all required fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    streetName: '',
    city: '',
    state: '',
    deliveryOption: 'Free Delivery'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate order totals
  const subtotal = totalPrice();
  const discount = 10;
  const shipping = formData.deliveryOption === 'Home Delivery' ? 500 : 0;
  const total = subtotal - discount + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name required';
    if (!formData.email.trim()) errors.email = 'Email required';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Phone number required';
    if (!formData.addressLine1.trim()) errors.addressLine1 = 'Address line required';
    if (!formData.streetName.trim()) errors.streetName = 'Street name required';
    if (!formData.city.trim()) errors.city = 'City required';
    if (!formData.state.trim()) errors.state = 'State required';
    return errors;
  };

  // Paystack configuration
  const paystackConfig = {
    reference: `FRENZY-${Date.now()}`,
    email: formData.email,
    amount: total * 100, // Paystack uses amount in kobo
    publicKey,
    currency: 'NGN',
    metadata: {
      customer_name: formData.fullName,
      phone: formData.phoneNumber,
      delivery_address: `${formData.addressLine1}, ${formData.streetName}, ${formData.city}, ${formData.state}`
    }
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const handlePaymentSuccess = async (response) => {
    try {
      // Save complete order details to Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        customerDetails: {
          ...formData,
          deliveryAddress: `${formData.addressLine1}, ${formData.streetName}, ${formData.city}, ${formData.state}`
        },
        paymentDetails: {
          amount: total,
          reference: response.reference,
          status: 'paid',
          method: 'Paystack',
          paidAt: new Date()
        },
        orderDetails: {
          subtotal,
          discount,
          shipping,
          total,
          items: useCartStore.getState().items // Get current cart items
        },
        status: 'processing',
        createdAt: new Date()
      });

      // Clear cart after successful payment
      clearCart();

      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-green-500" />
          Payment successful! Your order is being processed.
        </div>
      );

      navigate(`/order-confirmation/${orderRef.id}`);
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error(
        <div className="flex items-center gap-2">
          <Package className="text-red-500" />
          Payment succeeded but failed to save order details
        </div>
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentClose = () => {
    toast.info(
      <div className="flex items-center gap-2">
        <Truck className="text-blue-500" />
        Payment window closed - you can try again
      </div>
    );
    setIsProcessing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsProcessing(true);
      initializePayment(handlePaymentSuccess, handlePaymentClose);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 pt-20">
      <Sidebar />

      <main className="w-full p-4 md:p-8">
        {/* Navigation */}
        <div className="mb-8">
          <NavLink 
            to="/cart" 
            className="flex items-center text-gray-600 hover:text-green-600"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to Cart
          </NavLink>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Truck size={24} className="text-green-600" />
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${
                        formErrors.fullName ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-green-500`}
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${
                        formErrors.email ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-green-500`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Address Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${
                        formErrors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-green-500`}
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Method
                    </label>
                    <select
                      name="deliveryOption"
                      value={formData.deliveryOption}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Free Delivery">Free Delivery (3-5 days)</option>
                      <option value="Home Delivery">Express Delivery (+₦500)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1*
                  </label>
                  <input
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="House number, building name"
                    className={`w-full px-4 py-3 border rounded-lg ${
                      formErrors.addressLine1 ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-green-500`}
                  />
                  {formErrors.addressLine1 && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.addressLine1}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Name*
                  </label>
                  <input
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                    placeholder="Street name, area"
                    className={`w-full px-4 py-3 border rounded-lg ${
                      formErrors.streetName ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-green-500`}
                  />
                  {formErrors.streetName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.streetName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${
                        formErrors.city ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-green-500`}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${
                        formErrors.state ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-green-500`}
                    />
                    {formErrors.state && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Package size={20} className="text-green-600" />
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-₦{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₦{shipping.toLocaleString()}</span>
                </div>
              </div>

              <div className="py-4 border-t border-gray-200 mb-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Proceed to Payment
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                <span className="font-medium">Note:</span> You'll be redirected to Paystack for secure payment
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Billing;