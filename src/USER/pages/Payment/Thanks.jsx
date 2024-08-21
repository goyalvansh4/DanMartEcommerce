import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Thanks = () => {
  // Use useLocation to get the query params
  const location = useLocation();

  // Function to extract query parameters
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  // Extract order_id and payment_id from query params
  const queryParams = getQueryParams(location.search);
  const order_id = queryParams.get("order_id");
  const payment_id = queryParams.get("payment_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center w-full">
        <AiOutlineCheckCircle className="text-green-500 text-6xl mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Thank You!</h1>
        <p className="text-gray-600 mt-2">
          Your payment was successful. We appreciate your business!
        </p>
        <p className="text-gray-600 mt-2">
          A confirmation email has been sent to your email address.
        </p>

        {/* Display the Order ID and Payment ID */}
        <div className="mt-6 text-left">
          <p className="text-lg font-semibold text-gray-800">
            Order ID: <span className="font-normal text-gray-600">{order_id}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-2">
            Payment ID: <span className="font-normal text-gray-600">{payment_id}</span>
          </p>
        </div>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Thanks;
