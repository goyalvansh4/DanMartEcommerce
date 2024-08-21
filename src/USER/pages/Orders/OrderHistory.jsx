import React, { useEffect, useState } from "react";
import GlobalAxios from "../../../../Global/GlobalAxios";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { PuffLoader } from "react-spinners";

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await GlobalAxios.get('/order-history');
        // console.log(response.data.data);
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await GlobalAxios.post(`/cancel-order/${orderId}`);
      // console.log(response.data);
      // Update order status in the UI or refetch the order history
    } catch (error) {
      console.error("Error cancelling the order:", error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "paid":
        return "bg-green-100 text-green-700";
      case "unpaid":
        return "bg-red-100 text-red-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-purple-100 text-purple-700";
      case "cancelled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="my-10 bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Order History
        </h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <PuffLoader color="#36D7B7" loading={loading} size={60} />
          </div>
        ) : orderHistory.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          orderHistory.map((orderData) => (
            <div
              key={orderData.order.order_id}
              className="bg-gray-100 p-6 rounded-md shadow-sm mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Order ID: {orderData.order.order_id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on: {new Date(orderData.order.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Shipping to: {orderData.shipping_address.name}, {orderData.shipping_address.city}, {orderData.shipping_address.state}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCancelOrder(orderData.order.order_id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <MdOutlineCancel />
                    Cancel Order
                  </button>
                </div>
              </div>
              {orderData.order_items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-24 bg-white p-2 rounded-md">
                    <img
                      src={`${imageURI}/${item.product_thumbnail}`}
                      className="w-full h-full object-contain"
                      alt={item.product_name}
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-800">
                      {item.product_name}
                    </h4>
                    <div className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </div>
                    <h4 className="text-base font-bold text-gray-800">
                      Item Price: ${item.price}
                    </h4>
                    <h4 className="text-base font-bold text-gray-800">
                      Total: ${item.total}
                    </h4>
                  </div>
                </div>
              ))}
              <hr className="border-gray-300 my-1" />
              <div className="flex justify-between items-center">
                <div className="text-lg font-normal">
                  Payment Status:{" "}
                  <span className={`font-bold ${getStatusBadgeClass(orderData.order.payment_status)} px-2 py-1 rounded-full`}>
                    {orderData.order.payment_status.charAt(0).toUpperCase() + orderData.order.payment_status.slice(1)}
                  </span>
                </div>
                <div className="text-lg font-normal">
                  Total Amount: ${orderData.order.total_amount}
                </div>
              </div>
              <div className="text-right mt-4">
              Delivery Status:{" "}
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusBadgeClass(orderData.order.status)}`}>
                   {orderData.order.status.charAt(0).toUpperCase() + orderData.order.status.slice(1)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;