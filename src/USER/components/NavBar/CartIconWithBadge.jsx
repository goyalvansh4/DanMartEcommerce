import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartIconWithBadge = ({ itemCount }) => {
  return (
    <div className="relative">
      <FaShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute top-[-11px] right-[-12px] inline-flex items-center justify-center py-1 px-2 text-xs  text-red-100 bg-red-600 rounded-full">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIconWithBadge;
