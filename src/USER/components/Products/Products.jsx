import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk } from "../../store/slices/productsSlice";
import {
  addWishlistThunk,
  fetchWishlistThunk,
  removeWishlistThunk,
} from "../../store/slices/wishListSlice";
import { addCartItem } from "../../store/slices/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { NavLink } from "react-router-dom";
import StarRating from "../StarRating";
import GlobalAxios from "../../../../Global/GlobalAxios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [wishItems, setWishItems] = useState([]);
  const wishlistItems = useSelector((state) => state.wish.items);
  const [loadingProductId, setLoadingProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsThunk());
    dispatch(fetchWishlistThunk());
    setWishItems(wishlistItems);
  }, [dispatch]);

  const handleAddToCart = async (id) => {
    setLoadingProductId(id);
    try {
      const response = await GlobalAxios.post("/cart", {
        product_id: id,
        quantity: 1,
      });
      if (response.data.status === "success") {
        toast.success("Product added to cart");
        dispatch(addCartItem(id));
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleWishlistToggle = async (productId) => {
    const isWishlisted = wishItems.some(
      (item) => item.product_id === productId
    );

    try {
      if (isWishlisted) {
        await dispatch(removeWishlistThunk(productId)).unwrap();
        setWishItems(wishItems.filter((item) => item.product_id !== productId));
        toast.success("Product removed from wishlist!");
      } else {
        await dispatch(addWishlistThunk(productId)).unwrap();
        setWishItems([...wishItems, { product_id: productId }]);
        toast.success("Product added to wishlist!");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  const isProductInWishlist = (productId) => {
    return wishItems.some((item) => item.product_id === productId);
  };

  if (loading) {
    return (
      <div className="text-center flex flex-col items-center justify-center">
        <ClipLoader size={50} color={"#123abc"} />
        <p className="text-black text-lg">Loading... Please Wait</p>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="font-[sans-serif] py-4 mx-auto lg:max-w-6xl max-w-lg md:max-w-full">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
        Our Products
      </h2>
      <p className="text-xl font-semibold text-gray-700 mb-12">
        Represent Latest Products In Market
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <div
            key={product.product_id}
            className="bg-gray-200 rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 z-10 ${
                isProductInWishlist(product.product_id)
                  ? "text-red-500"
                  : "text-gray-800"
              }`}
              onClick={() => handleWishlistToggle(product.product_id)}
            >
              {isProductInWishlist(product.product_id) ? (
                <AiFillHeart size={24} />
              ) : (
                <AiOutlineHeart size={24} />
              )}
            </div>
            <NavLink
              key={product.product_id}
              to={`/products/${product.product_id}/${product.products_slug}`}
              className="block"
            >
              <div className="bg-white w-full overflow-hidden mx-auto">
                <img
                  src={`${imageURI + product.thumbnail}`}
                  alt={product.name}
                  className="w-full h-[350px] object-cover aspect-square"
                />
              </div>
            </NavLink>
            <div className="text-center bg-gray-100 p-6">
              <h3 className="text-lg truncate font-bold text-gray-800">
                {product.product_name}
              </h3>
              <h4 className="text-lg text-gray-800 font-bold mt-6">
                ${product.price}{" "}
                <strike className="text-gray-400 ml-2 font-medium">
                  $
                  {product.price +
                    Math.floor(Math.random() * product.price) +
                    1}
                </strike>
              </h4>
              <div className="mt-2 flex justify-center">
                <StarRating rating={4} />
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-yellow-400 text-base text-gray-800 font-semibold rounded-xl hover:bg-yellow-500 transition duration-150"
                onClick={() => handleAddToCart(product.product_id)}
                disabled={loadingProductId === product.product_id}
              >
                {loadingProductId === product.product_id ? (
                  <ClipLoader size={20} color={"#fff"} />
                ) : (
                  <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512">
                      <path
                        d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm60 0c0 8.271-6.729 15-15 15s-15-6.729-15-15 6.729-15 15-15 15 6.729 15 15zm167 45c24.812 0 45-20.188 45-45s-20.188-45-45-45-45 20.188-45 45 20.188 45 45 45zm0-60c8.271 0 15 6.729 15 15s-6.729 15-15 15-15-6.729-15-15 6.729-15 15-15z"
                        data-original="#000000"
                      ></path>
                    </svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
