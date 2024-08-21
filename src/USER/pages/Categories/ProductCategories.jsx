import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../store/slices/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { NavLink, useParams } from "react-router-dom";
import StarRating from "../../components/StarRating";
import GlobalAxios from "../../../../Global/GlobalAxios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import {
  addWishlistThunk,
  removeWishlistThunk,
} from "../../store/slices/wishListSlice";

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const ProductCategories = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [loadingProductId, setLoadingProductId] = useState(null);
  const { id, slug } = useParams();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true); // Start loading animation
      try {
        const response = await GlobalAxios.get(
          `/product-categories/${id}/${slug}`
        );
        if (response.data.status === "success") {
          console.log(response.data.data);
          setItems(response.data.data);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false); // Stop loading animation
      }
    };
    fetchData();
  }, [id, slug]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await GlobalAxios.get("/wishlist");
        setWishlist(response.data.data.map((item) => item.product_id));
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  const handleAddToCart = async (id) => {
    setLoadingProductId(id);
    try {
      const response = await GlobalAxios.post("/cart", {
        product_id: id,
        quantity: 1,
      });
      if (response.data.status === "success") {
        toast.success("Product added to cart.");
        dispatch(addCartItem(id));
      }
    } catch (error) {
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleWishlistToggle = (p_id) => {
    if (wishlist.includes(p_id)) {
      setWishlist(wishlist.filter((id) => id !== p_id));
      dispatch(removeWishlistThunk(p_id)); // Remove from wishlist
      toast.info(`Product removed from wishlist`);
    } else {
      setWishlist([...wishlist, p_id]); // Add to wishlist
      dispatch(addWishlistThunk(p_id)); // Add to wishlist
      toast.success(`Product added to wishlist`);
    }
  };

  if (loading) {
    return (
      <div className="text-center flex flex-col items-center justify-center h-screen">
        <ClipLoader size={50} color={"#123abc"} />
        <p className="text-black text-lg">Loading... Please Wait</p>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="font-[sans-serif] py-4 mx-auto lg:max-w-6xl max-w-lg md:max-w-full">
      <ToastContainer position="bottom-right"
 />
      <div className="flex flex-col lg:flex-row justify-between p-5">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Our Products
        </h2>
        <button className="bg-black uppercase text-[12px] font-light text-white rounded-md px-3 py-2 w-[150px] lg:w-[10%]">
          Add catalog
        </button>
      </div>
      <p className="text-xl font-semibold text-gray-700 mb-12">
        Represent Latest Products In Market
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <div
            key={product.product_id}
            className="bg-white shadow-lg rounded-xl p-6 relative overflow-hidden transform transition-all"
          >
            <div
              className="absolute top-4 right-4 bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => handleWishlistToggle(product.product_id)}
            >
              {wishlist.includes(product.product_id) ? (
                <AiFillHeart size={24} className="text-red-500" />
              ) : (
                <AiOutlineHeart size={24} className="text-gray-400" />
              )}
            </div>
            <NavLink
              to={`/products/${product.product_id}/${product.products_slug}`}
            >
              <div className="mb-4">
                <img
                  src={`${imageURI + product.thumbnail}`}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </NavLink>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-lg font-semibold text-gray-800 mt-2">
                ${product.price}{" "}
                <span className="text-gray-400 ml-2 line-through">
                  ${product.max_price}
                </span>
              </p>
              <div className="flex justify-center items-center">
                <StarRating rating={4} className="mt-2" />
              </div>
              <button
                type="button"
                className="mt-4 w-full py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition duration-150"
                onClick={() => handleAddToCart(product.product_id)}
              >
                {loadingProductId === product.product_id ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    <FaShoppingCart size={20} className="text-black" />
                    Add to Cart
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductCategories;
