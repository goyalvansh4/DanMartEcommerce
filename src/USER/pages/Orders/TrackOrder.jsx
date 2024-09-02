import React, { useEffect, useState } from "react";
import GlobalAxios from "../../../../Global/GlobalAxios";
import { PuffLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const TrackOrder = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Function to extract query parameters
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  // Extract order_id and token from query params
  const queryParams = getQueryParams(location.search);
  const order_id = queryParams.get("order_id");
  const token = queryParams.get("token");

  useEffect(() => {
    const fetchOrderTrack = async () => {
      try {
        const response = await GlobalAxios.get(
          `/order-track/${order_id}/${token}`
        );
        if (response.data.status === "success") {
          setOrderData(response.data);
        } else {
          console.log("Error fetching order track");
        }
      } catch (error) {
        console.error("Error fetching order track:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderTrack();
  }, [order_id, token]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "paid":
        return "bg-green-200 text-green-800";
      case "unpaid":
        return "bg-red-200 text-red-800";
      case "shipped":
        return "bg-blue-200 text-blue-800";
      case "delivered":
        return "bg-purple-200 text-purple-800";
      case "cancelled":
        return "bg-gray-300 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="my-10 p-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Track Your Order
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <PuffLoader color="#36D7B7" loading={loading} size={60} />
          </div>
        ) : !orderData ? (
          <p className="text-center text-gray-600">Order not found.</p>
        ) : (
          <div className="bg-white p-6 rounded-md shadow-lg">
            <div className="border-b-2 pb-4 mb-4">
              <h3 className="text-2xl font-bold text-gray-800 flex justify-between items-center">
                <span>Order #{orderData.order_id}</span>
                <span
                  className={`text-lg font-semibold px-4 py-2 rounded-full ${getStatusBadgeClass(
                    orderData.order_status
                  )}`}
                >
                  {orderData.order_status.charAt(0).toUpperCase() +
                    orderData.order_status.slice(1)}
                </span>
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Placed on: {new Date(orderData.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Shipping to: {orderData.shipping_details.name},{" "}
                {orderData.shipping_details.city},{" "}
                {orderData.shipping_details.state}
              </p>
            </div>
            <div className="flex flex-col gap-4 mb-4">
              {orderData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border p-4 rounded-md bg-gray-50"
                >
                  <div className="w-24 h-24 bg-white p-2 rounded-md flex-shrink-0">
                    <img
                      src={`${imageURI}/${item.product_thumbnail}`}
                      className="w-full h-full object-contain"
                      alt={item.product_name}
                    />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-gray-800">
                      {item.product_name}
                    </h4>
                    <div className="text-sm md:text-base text-gray-600">
                      Quantity: {item.quantity}
                    </div>
                    <div className="text-sm md:text-base text-gray-600">
                      Item Price: ${item.price}
                    </div>
                    <div className="text-sm md:text-base font-bold text-gray-800">
                      Total: ${item.total}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 pt-4 border-t">
              <div className="text-lg font-normal text-gray-700">
                Total Amount: ${orderData.total_amount}
              </div>
              {/* <div className="mt-4 md:mt-0 text-right">
                <span
                  className={`text-sm md:text-base font-semibold px-3 py-1 rounded-full ${getStatusBadgeClass(
                    orderData.order_status
                  )}`}
                >
                  {orderData.order_status.charAt(0).toUpperCase() +
                    orderData.order_status.slice(1)}
                </span>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
