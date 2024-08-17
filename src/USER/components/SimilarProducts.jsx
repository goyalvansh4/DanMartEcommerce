import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { NavLink } from "react-router-dom";
import GlobalAxios from "../../../Global/GlobalAxios";
import { addCartItem } from "../store/slices/cartSlice";
import {
  addWishlistThunk,
  fetchWishlistThunk,
  removeWishlistThunk,
} from "../store/slices/wishListSlice"; // Assuming you have these thunks
import { fetchProductsThunk } from "../store/slices/productsSlice";
const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const SimilarProducts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null); // Track loading state for individual products
  const [wishlist, setWishlist] = useState([]); // Local wishlist state

  const products = useSelector((state) => state.products.items);
  const wishlistItems = useSelector((state) => state.wishlist); // Assuming wishlist is managed in the Redux store

  useEffect(() => {
    // Fetch products from the backend
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    // Fetch wishlist items from the backend
    dispatch(fetchWishlistThunk());
  }, [dispatch]);

  // Handle Add to Cart
  const handleAddToCart = async (id) => {
    setLoading(id);
    const data = {
      product_id: id,
      quantity: 1,
    };

    try {
      const response = await GlobalAxios.post("/cart", data);
      if (response.data.status === "success") {
        toast.success("Product added to cart successfully.");
        dispatch(addCartItem(id)); // Dispatch Redux action to update the cart
      }
    } catch (error) {
      toast.error("Failed to add product to cart. Please try again.");
      console.error("Failed to add product to cart:", error);
    } finally {
      setLoading(null);
    }
  };

  // Handle Wishlist Toggle
  const handleWishlistToggle = (product_id) => {
    if (wishlist.includes(product_id)) {
      dispatch(removeWishlistThunk(product_id));
      setWishlist(wishlist.filter((id) => id !== product_id));
    } else {
      dispatch(addWishlistThunk(product_id));
      setWishlist([...wishlist, product_id]);
    }
  };

  return (
    <div className="font-[sans-serif] py-4 mx-auto lg:max-w-6xl max-w-lg md:max-w-full">
      <h2 className="text-4xl text-center font-extrabold text-gray-800 mb-9">
        Similar Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="bg-white rounded-xl shadow-lg cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              <button
                onClick={() => handleWishlistToggle(product.product_id)}
                className={`bg-white p-2 rounded-full shadow-lg ${
                  wishlist.includes(product.product_id)
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                <FaHeart size={20} />
              </button>
            </div>
            <NavLink to={`/products/${product.product_id}`} className="">
              <div className="w-full h-[250px] overflow-hidden mx-auto">
                <img
                  src={`${imageURI + product.thumbnail}`}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </NavLink>
            <div className="text-center bg-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800">
                {product.product_name}
              </h3>
              <h4 className="text-lg text-gray-800 font-bold mt-4">
                ${product.price}{" "}
                <strike className="text-gray-400 ml-2 font-medium">
                  ${product.originalPrice}
                </strike>
              </h4>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-yellow-400 text-base text-gray-800 font-semibold rounded-xl hover:bg-yellow-500 transition-all"
                onClick={() => handleAddToCart(product.product_id)}
              >
                {loading === product.product_id ? (
                  <ClipLoader size={20} color={"#fff"} />
                ) : (
                  <>
                    <FaShoppingCart size={20} />
                    Add to cart
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SimilarProducts;
