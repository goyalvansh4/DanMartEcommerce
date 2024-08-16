import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Thanks = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <AiOutlineCheckCircle className="text-green-500 text-6xl mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Thank You!</h1>
        <p className="text-gray-600 mt-2">
          Your payment was successful. We appreciate your business!
        </p>
        <p className="text-gray-600 mt-2">
          A confirmation email has been sent to your email address.
        </p>
        <Link to="/" className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Thanks;
