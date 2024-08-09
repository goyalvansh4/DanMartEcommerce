import React, { useEffect, useState } from 'react';
import { FaHeart, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import CartIconWithBadge from './CartIconWithBadge';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
   const cartItems = useSelector((state) => state.cart.items);
   useEffect(() => {
    setCartItemCount(cartItems.length);
   },[cartItems]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-gray-800 text-xl font-bold">
              Categories
            </NavLink>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink to="/wishlist" className="text-gray-800 hover:text-blue-600">
              <FaHeart className="w-6 h-6" />
            </NavLink>
            <NavLink to="/cart" className="text-gray-800 hover:text-blue-600">
              <CartIconWithBadge itemCount={cartItemCount} />
            </NavLink>
            <NavLink to="/login" className="text-gray-800 hover:text-blue-600">
              <FaUser className="w-6 h-6" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;