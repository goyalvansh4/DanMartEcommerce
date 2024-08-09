import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem } from '../store/slices/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Dummy product data
  const dummyProduct = {
    id: 1,
    imgSrc: 'https://via.placeholder.com/150',
    name: 'Sample Product',
    price: 20.00,
    quantity: 1
  };

  const cartItems = useSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([...cartItems, dummyProduct]);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      cartData.forEach((item) => {
        total += item.price; // * item.quantity
      });
      setTotalPrice(total);
    };
    calculateTotal();
  }, [cartData]);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    setCartData(cartData.filter(item => item.id !== id));
    toast.info('Item removed from cart');
  };

  const handleShopping = () => {
    navigate('/');
  };

  return (
    <div className="my-10 md:max-w-5xl mx-auto bg-white py-8 px-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
          <hr className="border-gray-300 mb-8" />

          <div className="space-y-4">
            <AnimatePresence>
              {cartData.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-md shadow-md"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-white p-2 rounded-md">
                      <img src={item.imgSrc} className="w-full h-full object-contain" alt={item.name} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">{item.name}</h3>
                      <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                      <h4 className="text-base font-bold text-gray-800">${item.price}</h4>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <button onClick={() => handleRemove(item.id)} className="text-red-500 text-xs font-bold">
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-md md:sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Price Details</h2>
          <hr className="border-gray-300 mb-8" />

          <ul className="text-gray-800 space-y-4">
            <li className="flex justify-between">
              <span>Total Price</span>
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
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
              <span>${(totalPrice + 2 + 4).toFixed(2)}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button onClick={handleCheckout} type="button" className="w-full text-sm px-4 py-2.5 font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Place Order
            </button>
            <button onClick={handleShopping} type="button" className="w-full text-sm px-4 py-2.5 font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
