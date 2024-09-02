import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchCartItems,
  removeCartItem,
  upDateCartItem,
} from "../../store/slices/cartSlice";
import GlobalAxios from "../../../../Global/GlobalAxios";
const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [amountData, setAmountData] = useState({
    max_price: 0,
    shipping_fee: 0,
    platform_fee: 0,
    discount: 0,
  });

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
          setAmountData({
            max_price: response.data.data.max_price,
            shipping_fee: response.data.data.shipping_fee || 0,
            platform_fee: response.data.data.platform_fee || 0,
            discount: response.data.data.discount || 0,
          });
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
  }, [dispatch, cartItems.length, cartItems]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleRemove = async (id) => {
    try {
      setCartData(cartData.filter((item) => item.product_id !== id));
      toast.info("Item removed from cart");
      dispatch(removeCartItem(id));
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    dispatch(upDateCartItem({ id, quantity }));
    try {
      const response = await GlobalAxios.put(`/cart/${id}`, {
        quantity: quantity,
      });
      if (response.data.status === "success") {
        const updatedCart = cartData.map((item) =>
          item.product_id === id
            ? {
                ...item,
                quantity: quantity,
                total: item.price * quantity,
              }
            : item
        );
        setCartData(updatedCart);
        setTotalPrice(updatedCart.reduce((acc, item) => acc + item.total, 0));
      }
    } catch (error) {
      console.error("Failed to update cart item quantity", error);
    }
  };

  const handleIncrease = (id, currentQuantity) => {
    if (currentQuantity >= 1) {
      handleQuantityChange(id, currentQuantity + 1);
    }
  };

  const handleDecrease = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(id, currentQuantity - 1);
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

  if (cartData.length === 0 || isEmpty) {
    return (
      <div className="my-10 md:max-w-5xl mx-auto bg-white py-8 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Your Cart Is Empty
        </h1>
        <img
          className="block mx-auto w-full max-w-xs"
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
    <div className="my-10 md:max-w-5xl mx-auto bg-white py-8 px-4 overflow-x-hidden">
      <ToastContainer position="bottom-right" />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
          <hr className="border-gray-300 mb-8" />

          <div className="space-y-4">
            <AnimatePresence>
              {cartData.map((item) => (
                <motion.div
                  key={item.product_id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-md shadow-md"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-24 h-24 bg-white p-2 rounded-md">
                      <img
                        src={`${imageURI + item.thumbnail}`}
                        className="w-full h-full object-contain"
                        alt={item.name}
                      />
                    </div>
                    <div className="w-full sm:w-auto">
                      <h3 className="text-base font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <div className="text-sm text-gray-600 flex items-center mt-2">
                        <span>Quantity:</span>
                        <div className="flex items-center ml-4">
                          <button
                            onClick={() =>
                              handleDecrease(item.product_id, item.quantity)
                            }
                            className="px-2 py-1 text-sm font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-l"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-sm font-medium text-gray-800 bg-white border-t border-b">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncrease(item.product_id, item.quantity)
                            }
                            className="px-2 py-1 text-sm font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-gray-800 mt-2">
                        Price: ${item.price}
                      </h4>
                      <h4 className="text-base font-bold text-gray-800">
                        Total Price: ${item.total}
                      </h4>
                    </div>
                  </div>
                  <div className="ml-auto mt-4 sm:mt-0">
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

        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Price Details
          </h2>
          <hr className="border-gray-300 mb-8" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-800 font-semibold">Max Price:</span>
              <span className="text-gray-800 font-bold">
                ${amountData.max_price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800 font-semibold">Shipping Fee:</span>
              <span className="text-gray-800 font-bold">
                ${amountData.shipping_fee}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800 font-semibold">Platform Fee:</span>
              <span className="text-gray-800 font-bold">
                ${amountData.platform_fee}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800 font-semibold">Discount:</span>
              <span className="text-gray-800 font-bold">
                ${amountData.discount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800 font-semibold">Total:</span>
              <span className="text-gray-800 font-bold">${totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 text-sm px-4 py-2.5 font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
