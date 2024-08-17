import React, { useEffect, useState } from 'react';
import { FaHeart, FaUser, FaBoxOpen, FaChevronDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import CartIconWithBadge from './CartIconWithBadge';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../store/slices/cartSlice';

const categories = [
  { id: 1, name: 'Telescope', slug: 'telescope' },
  { id: 2, name: 'Compass with leather case', slug: 'compass-leather-case' },
  { id: 3, name: 'Compass With Wooden Box', slug: 'compass-wooden-box' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemCount(itemCount);
  }, [items]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Categories Dropdown */}
          <div className="relative group">
            <div className="flex items-center cursor-pointer text-gray-800 text-xl font-bold">
              Categories <FaChevronDown className="ml-1" />
            </div>
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              {categories.map((category) => (
                <NavLink
                  key={category.id}
                  to={`/category/${category.id}/${category.slug}`}
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center space-x-4">
            <NavLink to="/wishlist" className="text-gray-800 hover:text-blue-600">
              <FaHeart className="w-6 h-6" />
            </NavLink>
            <NavLink to="/cart" className="text-gray-800 hover:text-blue-600">
              <CartIconWithBadge itemCount={cartItemCount} />
            </NavLink>
            <NavLink to="/orders" className="text-gray-800 hover:text-blue-600">
              <FaBoxOpen className="w-6 h-6" />
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