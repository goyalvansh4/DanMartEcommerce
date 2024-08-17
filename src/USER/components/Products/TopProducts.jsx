import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarRating from '../StarRating';
import { addCartItem } from '../../store/slices/cartSlice';
import GlobalAxios from '../../../../Global/GlobalAxios';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { removeWishlistThunk,addWishlistThunk } from '../../store/slices/wishListSlice';
import { NavLink } from 'react-router-dom';

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const TopProducts = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [homeProducts, setHomeProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [wishlist, setWishlist] = useState([]); // State to manage wishlist

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GlobalAxios.get('/product/top');
        if (response.data.status === 'success') {
          setHomeProducts(response.data.data);
        }
      } catch (error) {
        console.error(error);
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
    setLoadingProductId(id); // Start loading indicator for this product
    const data = {
      product_id: id,
      quantity: 1,
    };
    try {
      const response = await GlobalAxios.post('/cart', data);
      if (response.data.status === 'success') {
        toast.success('Product added to cart');
        dispatch(addCartItem(id)); // Dispatch the entire product data, not just the ID
      }
    } catch (error) {
      // toast.error('Failed to add product to cart');
      console.error('Add to Cart Error:', error);
    } finally {
      setLoadingProductId(null); // Stop loading indicator
    }
  };

  const handleWishlistToggle = (p_id) => {
    if (wishlist.includes(p_id)) {
      setWishlist(wishlist.filter((id) => id !== p_id)); 
      dispatch(removeWishlistThunk(p_id))// Remove from wishlist
      toast.info(`Product removed from wishlist`);
    } else {
      setWishlist([...wishlist, p_id]); // Add to wishlist
      dispatch(addWishlistThunk(p_id))// Add to wishlist
      toast.success(`Product added to wishlist`);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    loop: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-5 font-sans py-5 w-11/12 mx-auto">
      <h2 className="text-4xl text-center font-extrabold text-gray-800 mb-4">Top Products</h2>
      <p className="text-xl text-center font-semibold text-gray-700 mb-12">Product's Advantages and Attract the Attention</p>
      <Slider {...settings} className="w-11/12 mx-auto flex gap-6">
        {homeProducts.map((product) => (
          <div
            key={product.product_id}
            className="product-card rounded-xl relative overflow-hidden p-4 shadow-lg"
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
              <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.product_name}</h3>
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
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopProducts;