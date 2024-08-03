import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const CartIconWithBadge = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length; // Assuming each item has a quantity property

  return (
    <li className="relative">
      <NavLink className="md:p-4 py-2 block hover:text-[#FFD700]" to="/cart">
        <FaShoppingCart />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {cartCount}
          </span>
        )}
      </NavLink>
    </li>
  );
};

export default CartIconWithBadge;
