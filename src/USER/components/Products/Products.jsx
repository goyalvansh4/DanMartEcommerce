import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk } from "../../store/slices/productsSlice";
import { addWishlistThunk } from "../../store/slices/wishListSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import { NavLink } from "react-router-dom";
import StarRating from "../StarRating";
import GlobalAxios from "../../../../Global/GlobalAxios";
import { addCartItem } from "../../store/slices/cartSlice";

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [homeProducts, setHomeProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    setHomeProducts(items);
  }, [items]);

  const handleAddToCart = async (id) => {
    setLoadingProductId(id);
    const data = {
      product_id: id,
      quantity: 1
    };

    try {
      const response = await GlobalAxios.post('/cart', data);
      if (response.data.status === 'success') {
        toast.success('Product added to cart');
        dispatch(addCartItem(id));
      }
    } catch (error) {
      console.error("Add to Cart Error", error);
      toast.error('Failed to add product to cart');
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await dispatch(addWishlistThunk(productId)).unwrap();
      toast.success('Product added to wishlist!');
    } catch (error) {
      console.error("Add to Wishlist Error", error);
      toast.error('Failed to add product to wishlist');
    }
  };

  const handleRandomPrice = (price) => {
    const originalPrice = Math.floor(Math.random() * price) + 1;
    return originalPrice;
  };

  if (loading)
    return (
      <div className="text-center flex flex-col items-center justify-center">
        <ClipLoader size={50} color={"#123abc"} />
        <p className="text-black text-lg">Loading... Please Wait</p>
      </div>
    );
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
        {homeProducts.map((product) => (
          <div
            key={product.product_id}
            className="bg-gray-200 rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden"
          >
            <div
              className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 z-10"
              onClick={() => handleAddToWishlist(product.product_id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                className={`fill-gray-800 inline-block`}
                viewBox="0 0 64 64"
              >
                <path
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                  data-original="#000000"
                ></path>
              </svg>
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
                  ${product.price + handleRandomPrice(product.price)}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M164.96 300.004h.024c.02 0 .04-.004.06-.004h.004c11.126 0 20.066-7.852 22.162-18.248l.11-.444L205.16 256h151.684l17.58 87.668h.004l11.768 58.708H145.504c-12.104 0-22.554 8.596-25.166 20.422L101.372 464H64v32h51.372h16.16h280.936v-.82l-.074-.18-17.66-88.298h71.668L512 80H109.18l-12.742-63.71l-1.268-6.34H0v32h83.18l11.47 57.348l37.882 189.42c-7.518 6.05-12.572 15.225-12.572 25.464c0 18.622 15.146 33.768 33.768 33.768h8.664l-5.236 24.774l-.11.444c-1.04 5.09-.044 10.364 2.774 14.604c2.818 4.242 7.248 7.108 12.294 7.92l.96.158H416v-32H164.96l13.772-65.268H377.04L339.92 192H195.168l-7.94 36.338l-.11.444c-1.618 8.134-8.874 13.99-17.088 13.99h-.968c-4.07 0-7.848 1.768-10.464 4.836s-3.684 7.094-2.956 11.122l.964 5.052h80.264v-32h-59.3l4.708-24.278z"
                        data-original="#000000"
                        fill="#fff"
                      />
                    </svg>
                    Add to Cart
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

export default Products;