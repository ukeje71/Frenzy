import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Camera, CheckCircle2, PlusCircle, Tag, Box, DollarSign } from "lucide-react";
import { NavLink } from "react-router";

const NewProducts = () => {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleClickUpload = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
      setImage(file);
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
          <div className="flex items-center text-sm text-gray-600">
            <NavLink to="/" className="hover:text-green-600 transition-colors">
              Home
            </NavLink>
            <div className="flex items-center mx-2">
              <div className="w-4 h-px bg-gray-300"></div>
              <CheckCircle2 className="mx-1" size={14} fill="#10B981" color="white" />
              <div className="w-4 h-px bg-gray-300"></div>
            </div>
            <span className="font-medium text-green-600">New Product</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Add New Product</h1>
        </div>

        {/* Form Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Main Product Info */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PlusCircle size={20} className="text-green-600" />
              Product Information
            </h2>

            <form className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="w-full outline-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                <textarea
                  rows="4"
                  placeholder="Write a compelling product description"
                  className="w-full outline-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                ></textarea>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                    ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'}
                  `}
                  onClick={handleClickUpload}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {image ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Product preview"
                        className="w-40 h-40 object-contain rounded-lg mb-3"
                      />
                      <p className="text-sm text-gray-600">{image.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <Camera size={40} className="mb-3 text-gray-400" />
                      {isDragging ? (
                        <p className="text-green-500">Drop image here</p>
                      ) : (
                        <>
                          <p className="font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  ref={inputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </form>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:w-1/3 space-y-6">
            {/* Stock Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Box size={20} className="text-green-600" />
                Inventory
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="inStock"
                    name="stock"
                    className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="inStock" className="ml-3 block text-sm font-medium text-gray-700">
                    In Stock
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                  <input
                    type="text"
                    placeholder="e.g. PROD-001"
                    className="w-full outline-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <input
                    type="text"
                    placeholder="e.g. M, L, XL"
                    className="w-full outline-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Tag size={20} className="text-green-600" />
                Category
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <label htmlFor="male" className="ml-2 block text-sm text-gray-700">
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <label htmlFor="female" className="ml-2 block text-sm text-gray-700">
                        Female
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="kids"
                        name="gender"
                        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <label htmlFor="kids" className="ml-2 block text-sm text-gray-700">
                        Kids
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Method</label>
                  <select className=" outline-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                    <option>Free Delivery</option>
                    <option>Home Delivery</option>
                    <option>Pick Up</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-green-600" />
                Pricing
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price ($)</label>
                  <input
                    type="text"
                    placeholder="35.70"
                    className="w-full outline-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price ($)</label>
                  <input
                    type="text"
                    placeholder="29.99"
                    className="w-full outline-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg">
              Create Product
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewProducts;