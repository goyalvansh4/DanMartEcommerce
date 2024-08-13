import React from "react";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

const CheckOut = () => {
  return (
    <div className="my-10 bg-white p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center md:text-left">
            Checkout
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MdOutlineLocationOn className="text-blue-600" />
                Personal Details
              </h3>
              <form className="grid gap-4 mt-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                />
              </form>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MdOutlineLocationOn className="text-blue-600" />
                Shipping Address
              </h3>
              <form className="grid gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Address Lane 1"
                  className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Address Lane 2"
                  className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700">
                  Save Address
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Details */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Payment Details
          </h3>
          <div className="bg-gray-100 p-6 rounded-md shadow-sm">
            <div className="grid gap-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Price</span>
                <span className="font-semibold text-gray-800">$120.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Quantity</span>
                <span className="font-semibold text-gray-800">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total</span>
                <span className="font-semibold text-gray-800">$240.00</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800">
                Payment Method
              </h4>
              <div className="mt-4 grid gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    className="w-5 h-5 text-blue-600 cursor-pointer"
                  />
                  <label
                    htmlFor="cod"
                    className="ml-4 text-gray-700 flex items-center gap-2 cursor-pointer"
                  >
                    <FaMoneyBillWave className="text-blue-600" />
                    Cash on Delivery (COD)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit-card"
                    name="payment"
                    className="w-5 h-5 text-blue-600 cursor-pointer"
                    defaultChecked
                  />
                  <label
                    htmlFor="credit-card"
                    className="ml-4 text-gray-700 flex items-center gap-2 cursor-pointer"
                  >
                    <FaCreditCard className="text-blue-600" />
                    Credit/Debit Card
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="upi"
                    name="payment"
                    className="w-5 h-5 text-blue-600 cursor-pointer"
                  />
                  <label
                    htmlFor="upi"
                    className="ml-4 text-gray-700 flex items-center gap-2 cursor-pointer"
                  >
                    <FaPaypal className="text-blue-600" />
                    UPI Payment
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Pay now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
