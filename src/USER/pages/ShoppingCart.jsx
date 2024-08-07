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
  const cartItems = useSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData , setCartData] = useState(cartItems);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      cartItems.forEach(item => {
        total += item.price;  //* item.quantity
      });
      setTotalPrice(total);
    };
    calculateTotal();
    setCartData(cartItems);
  }, [cartItems]);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    toast.info('Item removed from cart');
  };

  const handleShoping = () => {
    navigate('/');
  }


  return (
    <div className="my-10 md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
      <ToastContainer />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
          <hr className="border-gray-300 mt-4 mb-8" />

          <div className="space-y-4">
            <AnimatePresence>
              {cartData.map((item) => (
                <motion.div
                  key={item.id}
                  className="grid grid-cols-3 items-center gap-4"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                      <img src={item.imgSrc} className="w-full h-full object-contain" alt={item.name} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">{item.name}</h3>
                      <h6 className="text-xs text-red-500 cursor-pointer mt-0.5" onClick={() => handleRemove(item.id)}>Remove</h6>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <h4 className="text-base font-bold text-gray-800">${item.price}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
          <div className="flex border border-blue-600 overflow-hidden rounded-md">
            <input type="email" placeholder="Promo code" className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5" />
            <button type="button" className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white">
              Apply
            </button>
          </div>

          <ul className="text-gray-800 mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-base">Discount <span className="ml-auto font-bold">$0.00</span></li>
            <li className="flex flex-wrap gap-4 text-base">Shipping <span className="ml-auto font-bold">$2.00</span></li>
            <li className="flex flex-wrap gap-4 text-base">Tax <span className="ml-auto font-bold">$4.00</span></li>
            <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">${totalPrice.toFixed(2)}</span></li>
          </ul>

          <div className="mt-8 space-y-2">
            <button onClick={handleCheckout} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Checkout
            </button>
            <button onClick={handleShoping} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
