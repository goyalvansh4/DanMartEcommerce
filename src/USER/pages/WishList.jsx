import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import GlobalAxios from "../../../Global/GlobalAxios";
import StarRating from "../components/StarRating";
import { AiFillHeart } from "react-icons/ai";

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const WishList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await GlobalAxios.get("/wishlist");
        setItems(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch wishlist items.");
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId);
    try {
      const response = await GlobalAxios.post("/cart", {
        product_id: productId,
        quantity: 1,
      });
      if (response.data.status === "success") {
        toast.success("Product added to cart successfully.");
      }
    } catch (error) {
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await GlobalAxios.delete(`/wishlist/${productId}`);
      setItems(items.filter((item) => item.product_id !== productId));
      toast.success("Product removed from wishlist.");
    } catch (error) {
      toast.error("Failed to remove product from wishlist. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <ClipLoader size={50} color="#123abc" />
        <p className="text-lg text-black mt-4">Loading... Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        My Wishlist
      </h1>
      {items.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.product_id}
              className="bg-white shadow-lg rounded-lg p-6 relative overflow-hidden transform transition-all hover:scale-105"
            >
              <div
                className="absolute top-4 right-4 bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
                onClick={() => handleRemoveFromWishlist(item.product_id)}
              >
                <AiFillHeart size={24} className="text-red-500" />
              </div>
              <NavLink
                to={`/products/${item.product_id}/${item.products_slug}`}
                className="block mb-4"
              >
                <img
                  src={`${imageURI + item.thumbnail}`}
                  alt={item.name}
                  className="w-full h-52 object-cover rounded-lg"
                />
              </NavLink>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                  {item.product_name}
                </h3>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  ${item.price}{" "}
                  <span className="text-gray-400 ml-2 line-through">
                    ${item.max_price}
                  </span>
                </p>
                <div className="flex justify-center items-center mt-2">
                  <StarRating rating={4} />
                </div>
                <button
                  type="button"
                  className="mt-4 w-full py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition duration-150"
                  onClick={() => handleAddToCart(item.product_id)}
                >
                  {loadingProductId === item.product_id ? (
                    <ClipLoader size={20} color="#fff" />
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default WishList;
