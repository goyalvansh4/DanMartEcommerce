import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
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
        const response = await GlobalAxios.get('/wishlist');
        setItems(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch wishlist items');
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId);
    try {
      const response = await GlobalAxios.post('/cart', { product_id: productId, quantity: 1 });
      if (response.data.status === 'success') {
        toast.success('Product added to cart');
        // Optionally update local cart state if needed
      }
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await GlobalAxios.delete(`/wishlist/${productId}`);
      setItems(items.filter(item => item.product_id !== productId));
      toast.success("Product removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  };

  if (loading) {
    return (
      <div className="text-center flex flex-col items-center justify-center h-screen">
        <ClipLoader size={50} color={"#123abc"} />
        <p className="text-black text-lg mt-4">Loading... Please Wait</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-lg">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">My Wishlist</h1>
      {items.length === 0 ? (
        <p className="text-xl text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.product_id}
              className="w-[70%] bg-gray-200 rounded-xl relative overflow-hidden transition-transform"
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 z-10 "
                onClick={() => handleRemoveFromWishlist(item.product_id)}
              >
                <AiFillHeart size={25} className="text-red-500" />
              </div>
              <NavLink to={`/products/${item.product_id}/${item.products_slug}`} className="block">
                <div className="bg-white w-full overflow-hidden mx-auto">
                  <img
                    src={`${imageURI + item.thumbnail}`}
                    alt={item.product_name}
                    className="w-full h-[280px] object-cover"
                  />
                </div>
              </NavLink>
              <div className="text-center bg-gray-100 p-6">
                <h3 className="text-lg truncate font-bold text-gray-800">{item.product_name}</h3>
                <h4 className="text-lg text-gray-800 font-bold mt-6">
                  ${item.price}{" "}
                  <strike className="text-gray-400 ml-2 font-medium">
                    ${item.price + Math.floor(Math.random() * item.price) + 1}
                  </strike>
                </h4>
                <div className="mt-2 flex justify-center">
                  <StarRating rating={4} />
                </div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-yellow-400 text-base text-gray-800 font-semibold rounded-xl hover:bg-yellow-500 transition duration-150"
                  onClick={() => handleAddToCart(item.product_id)}
                  disabled={loadingProductId === item.product_id}
                >
                  {loadingProductId === item.product_id ? (
                    <ClipLoader size={20} color={"#fff"} />
                  ) : (
                    <>Add to Cart</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default WishList;