import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchWishlistThunk, removeWishlistThunk } from "../store/slices/wishListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const WishList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.wish);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    dispatch(fetchWishlistThunk());
    setWishlist(items);
  }, [dispatch]);

  useEffect(() => {
    setWishlist(items);
  }, [items]);

  const handleAddToCart = (product) => {
    toast.success(`${product.product_name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeWishlistThunk(productId));
    toast.success(`Item removed from wishlist!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#000"} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div className="font-[sans-serif] py-4 mx-auto lg:max-w-6xl max-w-lg md:max-w-full">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div
              key={product.product_id}
              className="bg-gray-200 rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden"
            >
              {/* <NavLink to={`/products/${product.product_id}`} className="block"> */}
                <div className="w-full overflow-hidden mx-auto">
                  <img
                    src={`${imageURI + product.thumbnail}`}
                    alt={product.product_name}
                    className="w-full h-[300px] object-cover object-center"
                  />
                </div>
              {/* </NavLink> */}
              <div className="text-center bg-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.product_name}
                </h3>
                <h4 className="text-lg text-gray-800 font-bold mt-6">
                  ${product.price}{" "}
                  <strike className="text-gray-400 ml-2 font-medium">
                    ${product.originalPrice}
                  </strike>
                </h4>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-yellow-400 text-base text-gray-800 font-semibold rounded-xl hover:bg-yellow-500 transition duration-150"
                  onClick={() => handleAddToCart(product.product_id)}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 mt-2 px-6 py-3 bg-red-400 text-base text-gray-800 font-semibold rounded-xl hover:bg-red-500 transition duration-150"
                  onClick={() => handleRemoveFromWishlist(product.product_id)}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default WishList;