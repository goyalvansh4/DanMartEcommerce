import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
      <p className="text-lg text-gray-700 mb-8">
        Oops! Something went wrong with your payment. Please try again or contact support if the issue persists.
      </p>
      <div className="space-x-4">
        <Link to="/checkout" className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600">
          Try Again
        </Link>
        <Link to="/support" className="text-gray-600 underline hover:text-gray-800">
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;