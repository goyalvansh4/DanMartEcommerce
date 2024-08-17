import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import StarRating from '../../components/StarRating';
import { addCartItem } from '../../store/slices/cartSlice';
import GlobalAxios from '../../../../Global/GlobalAxios';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { removeWishlistThunk, addWishlistThunk } from '../../store/slices/wishListSlice';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const FeatureProducts = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [homeProducts, setHomeProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GlobalAxios.get('/product/new');
        if (response.data.status === 'success') {
          setHomeProducts(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await GlobalAxios.get('/wishlist');
        setWishlist(response.data.data.map((item) => item.product_id));
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };
    fetchWishlist();
  }, [dispatch]);

  const handleAddToCart = async (id) => {
    setLoadingProductId(id);
    const data = {
      product_id: id,
      quantity: 1,
    };
    try {
      const response = await GlobalAxios.post('/cart', data);
      if (response.data.status === 'success') {
        toast.success('Product added to cart');
        dispatch(addCartItem(id));
      }
    } catch (error) {
      console.error('Add to Cart Error:', error);
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleWishlistToggle = (p_id) => {
    if (wishlist.includes(p_id)) {
      setWishlist(wishlist.filter((id) => id !== p_id));
      dispatch(removeWishlistThunk(p_id));
      toast.info('Product removed from wishlist');
    } else {
      setWishlist([...wishlist, p_id]);
      dispatch(addWishlistThunk(p_id));
      toast.success('Product added to wishlist');
    }
  };

  return (
    <div className="my-5 font-sans py-5 w-11/12 mx-auto">
      <h2 className="text-4xl text-center font-extrabold text-gray-800 mb-4">Feature Products</h2>
      <p className="text-xl text-center font-semibold text-gray-700 mb-12">Product's Advantages and Attract the Attention</p>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {homeProducts.map((product) => (
              <motion.div
                key={product.product_id}
                className="product-card rounded-xl relative overflow-hidden p-4 shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="wishlist-icon bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full absolute top-4 right-4 z-10 cursor-pointer"
                  onClick={() => handleWishlistToggle(product.product_id)}
                >
                  {wishlist.includes(product.product_id) ? (
                    <AiFillHeart size={24} className="text-red-500" />
                  ) : (
                    <AiOutlineHeart size={24} className="text-gray-400" />
                  )}
                </div>
                <NavLink to={`/products/${product.product_id}/${product.products_slug}`}>
                  <div className="product-image flex justify-center w-full overflow-hidden mx-auto mb-4">
                    <img
                      src={`${imageURI + product.thumbnail}`}
                      alt={product.product_name}
                      className="w-full h-64 object-cover object-center rounded-xl"
                    />
                  </div>
                </NavLink>
                <div className="product-info text-center rounded-b-xl">
                  <h3 className="text-lg font-bold text-gray-800">{product.product_name}</h3>
                  <h4 className="text-lg text-gray-800 font-bold mt-2">
                    ${product.price}{' '}
                    <strike className="text-gray-400 ml-2 font-medium">${product.originalPrice}</strike>
                  </h4>
                  <div className="mt-2 flex justify-center">
                    <StarRating rating={4} />
                  </div>
                  <button
                    type="button"
                    className="add-to-cart-btn w-full flex items-center justify-center gap-3 mt-4 px-6 py-3 bg-yellow-400 text-base text-gray-800 font-semibold rounded-xl hover:bg-yellow-500 transition duration-150"
                    onClick={() => handleAddToCart(product.product_id)}
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
                            d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm60 0c0 8.271-6.729 15-15 15s-15-6.729-15-15 6.729-15 15-15 15 6.729 15 15zm167 45c24.812 0 45-20.188 45-45s-20.188-45-45-45-45 20.188-45 45 20.188 45 45 45zm0-60c8.271 0 15 6.729 15 15s-6.729 15-15 15-15-6.729-15-15 6.729-15 15-15z"
                            data-original="#000000"
                          ></path>
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default FeatureProducts;
