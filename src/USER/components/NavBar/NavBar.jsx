import React, { useState, useEffect } from "react";
import { FaHeart, FaUser, FaBoxOpen, FaChevronDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import CartIconWithBadge from "./CartIconWithBadge";
import Cookies from "js-cookie";
import GlobalAxios from "../../../../Global/GlobalAxios";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GlobalAxios.get("/product-categories");
        if (response.data.status === "success") {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const authToken = Cookies.get("authToken");

  const handleLogout = () => {
    Cookies.remove("authToken");
    setShowLogoutModal(false);
    navigate("/"); // Redirect to home page after logout
  };

  const handleUserIconClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogin = () => {
    navigate("/login"); // Redirect to login page
  };

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Categories Dropdown */}
          <div className="relative">
            <div
              onClick={toggleCategories}
              className="flex items-center cursor-pointer text-gray-800 text-xl font-bold"
            >
              Categories <FaChevronDown className="ml-1" />
            </div>
            {showCategories && (
              <div className="absolute left-0 mt-2 w-48 md:w-64 lg:w-96 bg-white border rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                {categories.map((category) => (
                  <NavLink
                    key={category.id}
                    to={`/category/${category.id}/${category.slug}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                    onClick={() => setShowCategories(false)} // Close dropdown after selection
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
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
            <NavLink
              to="/wishlist"
              className="text-gray-800 hover:text-blue-600"
            >
              <FaHeart className="w-6 h-6" />
            </NavLink>
            <NavLink to="/cart" className="text-gray-800 hover:text-blue-600">
              <CartIconWithBadge />
            </NavLink>
            <NavLink to="/orders" className="text-gray-800 hover:text-blue-600">
              <FaBoxOpen className="w-6 h-6" />
            </NavLink>
            {/* User Icon with Profile Popup */}
            <div className="relative">
              <button
                onClick={handleUserIconClick}
                className="text-gray-800 hover:text-blue-600"
              >
                <FaUser className="w-6 h-6" />
              </button>

              {/* Profile Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-30">
                  <div className="p-4">
                    {authToken ? (
                      <>
                        <p className="text-gray-800">user@example.com</p>
                        <button
                          onClick={() => setShowLogoutModal(true)}
                          className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleLogin}
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mt-2">
              Are you sure you want to log out?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
