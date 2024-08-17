import React, { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const PaymentCancel = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Dummy data
    const dummyOrderDetails = {
      order_id: "12345",
      order_date: "2023-08-01T14:48:00.000Z",
      payment_status: "Failed",
      total_amount: 150.0,
      error_message: "Payment declined by the bank",
      items: [
        {
          product_id: "1",
          name: "Product 1",
          quantity: 2,
          price: 50.0,
          total: 100.0,
          thumbnail: "product1.jpg",
        },
        {
          product_id: "2",
          name: "Product 2",
          quantity: 1,
          price: 50.0,
          total: 50.0,
          thumbnail: "/product2.jpg",
        },
      ],
    };

    // Set state with dummy data
    setOrderDetails(dummyOrderDetails);
    setErrorMessage(dummyOrderDetails.error_message);
    setLoading(false);
  }, []);

  return (
    <>
    <div className="my-10 bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Payment Failed
        </h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <PuffLoader color="#36D7B7" loading={loading} size={60} />
          </div>
        ) : (
          <div className="bg-gray-100 p-6 rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Order ID: {orderDetails.order_id}
                </h3>
                <p className="text-sm text-gray-600">
                  Placed on: {new Date(orderDetails.order_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <FaExclamationCircle size={24} />
                <span className="font-bold text-xl">Payment Failed</span>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-bold text-gray-800">Reason for Failure</h4>
              <p className="text-sm text-gray-600">{errorMessage}</p>
            </div>
            {orderDetails.items.map((item) => (
              <div key={item.product_id} className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 bg-white p-2 rounded-md">
                  <img
                    src={`${item.thumbnail}`}
                    className="w-full h-full object-contain"
                    alt={item.name}
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-800">{item.name}</h4>
                  <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                  <h4 className="text-base font-bold text-gray-800">Item Price: ${item.price}</h4>
                  <h4 className="text-base font-bold text-gray-800">Total: ${item.total}</h4>
                </div>
              </div>
            ))}
            <hr className="border-gray-300 my-1" />
            <div className="flex justify-between items-center">
              <div className="text-lg font-normal">Total Amount: ${orderDetails.total_amount}</div>
              <div className="text-lg font-normal text-red-600">Payment Status: {orderDetails.payment_status}</div>
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="w-full flex justify-center items-center">
    <NavLink to="/" className="py-2 px-3 bg-black mx-auto text-center text-white border border-black rounded-sm">Back To Home</NavLink>
    </div>
    </>
  );
};

export default PaymentCancel;