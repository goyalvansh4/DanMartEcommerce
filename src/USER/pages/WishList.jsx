import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchWishlistThunk, removeWishlistItem } from "../store/slices/wishListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const WishList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.wish.items);

  useEffect(() => {
    dispatch(fetchWishlistThunk());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeWishlistItem(productId));
    toast.success(`Item removed from wishlist!`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="font-[sans-serif] py-4 mx-auto lg:max-w-6xl max-w-lg md:max-w-full">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-gray-200 rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden"
          >
            <NavLink to={`/products/${product.id}`} className="block">
              <div className="w-full overflow-hidden mx-auto">
                <img
                  src={product.imgSrc}
                  alt={product.name}
                  className="w-full h-[300px] object-cover object-center"
                />
              </div>
            </NavLink>
            <div className="text-center bg-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <h4 className="text-lg text-gray-800 font-bold mt-6">
                ${product.price}{" "}
                <strike className="text-gray-400 ml-2 font-medium">
                  ${product.originalPrice}
                </strike>
              </h4>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-yellow-400 text-base text-gray-800 font-semibold rounded-xl hover:bg-yellow-500 transition duration-150"
                onClick={() => handleAddToCart(product)}
                disabled={cartItems.some((item) => item.id === product.id)}
              >
                <ClipLoader size={20} color={"#fff"} />
                Add to cart
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 mt-2 px-6 py-3 bg-red-400 text-base text-gray-800 font-semibold rounded-xl hover:bg-red-500 transition duration-150"
                onClick={() => handleRemoveFromWishlist(product.id)}
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default WishList;
