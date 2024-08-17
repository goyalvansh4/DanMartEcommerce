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
        // Simulate API call with dummy data
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: {
                data: {
                  orders: [
                    {
                      order_id: "12345",
                      order_date: "2023-08-01T14:48:00.000Z",
                      payment_status: "Paid",
                      total_amount: 150.0,
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
                          thumbnail: "product2.jpg",
                        },
                      ],
                    },
                    {
                      order_id: "67890",
                      order_date: "2023-08-10T14:48:00.000Z",
                      payment_status: "Pending",
                      total_amount: 200.0,
                      items: [
                        {
                          product_id: "3",
                          name: "Product 3",
                          quantity: 4,
                          price: 50.0,
                          total: 200.0,
                          thumbnail: "product3.jpg",
                        },
                      ],
                    },
                  ],
                },
              },
            });
          }, 2000); // Simulate 2 seconds loading time
        });

        setOrderHistory(response.data.data.orders);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, []);

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
          orderHistory.map((order) => (
            <div
              key={order.order_id}
              className="bg-gray-100 p-6 rounded-md shadow-sm mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Order ID: {order.order_id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on: {new Date(order.order_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <AiOutlineEye />
                    View Details
                  </button>
                  <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
                    <MdOutlineCancel />
                    Cancel Order
                  </button>
                </div>
              </div>
              {order.items.map((item) => (
                <div key={item.product_id} className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-24 bg-white p-2 rounded-md">
                    <img
                      src={`${item.thumbnail}`}
                      className="w-full h-full object-contain"
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-800">
                      {item.name}
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
                  <span className={`font-bold ${order.payment_status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                    {order.payment_status}
                  </span>
                </div>
                <div className="text-lg font-normal">
                  Total Amount: ${order.total_amount}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
