import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCartItems, removeCartItem } from "../store/slices/cartSlice";
import GlobalAxios from "../../../Global/GlobalAxios";
const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await GlobalAxios.get("/cart");
        const carts = response.data.data.carts;

        if (carts.length === 0) {
          setIsEmpty(true);
        } else {
          setCartData(carts);
          setTotalPrice(Number(response.data.data.total_price));
          setIsEmpty(false);
        }
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartData();
  }, [dispatch]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleRemove = async (id) => {
    try {
      dispatch(removeCartItem(id));
      setCartData(cartData.filter((item) => item.product_id !== id));
      toast.info("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  const handleShopping = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="my-10 md:max-w-5xl mx-auto bg-white py-8 px-4">
        <div className="text-center text-gray-800 text-lg font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="my-10 md:max-w-5xl mx-auto bg-white py-8 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Your Cart Is Empty
        </h1>
        <img
          className="block mx-auto"
          src="empty_cart.png"
          alt="empty cart"
        />
        <button
          onClick={handleShopping}
          type="button"
          className="mt-6 text-sm px-4 py-2.5 font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="my-10 md:max-w-5xl mx-auto bg-white py-8 px-4">
      <ToastContainer />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Shopping Cart
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
          <hr className="border-gray-300 mb-8" />

          <div className="space-y-4">
            <AnimatePresence>
              {cartData.map((item) => (
                <motion.div
                  key={item.product_id}
                  className="flex items-center justify-between bg-white p-4 rounded-md shadow-md"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-white p-2 rounded-md">
                      <img
                        src={`${imageURI + item.thumbnail}`}
                        className="w-full h-full object-contain"
                        alt={item.name}
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <div className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </div>
                      <h4 className="text-base font-bold text-gray-800">
                        Price: ${item.price}
                      </h4>
                      <h4 className="text-base font-bold text-gray-800">
                        Total Price: ${item.total}
                      </h4>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => handleRemove(item.product_id)}
                      className="text-red-500 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-md md:sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Price Details
          </h2>
          <hr className="border-gray-300 mb-8" />

          <ul className="text-gray-800 space-y-4">
            <li className="flex justify-between">
              <span>Total Price</span>
              <span className="font-bold">${totalPrice}</span>
            </li>
            <li className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-bold">$2.00</span>
            </li>
            <li className="flex justify-between">
              <span>Platform Fee</span>
              <span className="font-bold">$4.00</span>
            </li>
            <li className="flex justify-between">
              <span>Discount</span>
              <span className="font-bold">-$0.00</span>
            </li>
            <li className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>${totalPrice + 2 + 4}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              onClick={handleCheckout}
              type="button"
              disabled={cartData.length === 0}
              className="w-full text-sm px-4 py-2.5 font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Place Order
            </button>
            <button
              onClick={handleShopping}
              type="button"
              className="w-full text-sm px-4 py-2.5 font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;