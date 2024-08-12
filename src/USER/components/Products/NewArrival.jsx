import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk } from "../../store/slices/productsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HashLoader } from "react-spinners";
import StarRating from "../StarRating";
import GlobalAxios from "../../../../Global/GlobalAxios";
import { addCartItem } from "../../store/slices/cartSlice";
const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const NewArrival = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [homeProducts, setHomeProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GlobalAxios.get("/product/new");
        console.log(response.data.data);
        if (response.data.status === "success") {
          setHomeProducts(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  const handleAddToCart = async (id) => {
    setLoadingProductId(id); // Set the loading state for this product
    console.log(id);
    const data = {
      product_id: id,
      quantity: 1,
    };
    try {
      const response = await GlobalAxios.post("/cart", data);
      console.log(response.data);
      if (response.data.status === "success") {
        toast.success("Product added to cart");
        dispatch(addCartItem(id));
      }
    } catch (error) {
      console.error("Add to Cart Error", error);
      toast.error("Failed to add product to cart");
    } finally {
      setLoadingProductId(null); // Reset the loading state
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
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

  if (loading)
    return (
      <div className="text-center py-4 flex flex-col items-center justify-center">
        <HashLoader size={50} color={"#123abc"} />
        <p className="text-black text-lg">Loading... Please Wait</p>
      </div>
    );

  return (
    <div className="my-5 font-sans py-5 w-11/12 mx-auto ">
      <h2 className="text-4xl text-center font-extrabold text-gray-800 mb-4">
        New Arrivals
      </h2>
      <p className="text-xl text-center font-semibold text-gray-700 mb-12">
        It's a gateway to another era
      </p>
      <Slider {...settings} className="w-11/12 mx-auto flex gap-6">
        {homeProducts.map((product) => (
          <div
            key={product.product_id}
            className="product-card  rounded-xl relative overflow-hidden p-4 shadow-lg"
          >
            <div className="wishlist-icon bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full absolute top-4 right-4 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                className="fill-gray-800 inline-block"
                viewBox="0 0 64 64"
              >
                <path
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
            <div className="product-image w-full overflow-hidden mx-auto mb-4">
              <img
                src={`${imageURI + product.thumbnail}`}
                alt={product.name}
                className="w-full h-64 object-cover object-center rounded-xl"
              />
            </div>
            <div className="product-info text-center bg-gray-100 p-6 rounded-b-xl">
              <h3 className="text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <h4 className="text-lg text-gray-800 font-bold mt-2">
                ${product.price}{" "}
                <strike className="text-gray-400 ml-2 font-medium">
                  ${product.originalPrice}
                </strike>
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
                        d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm212 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15z"
                        data-original="#000000"
                      ></path>
                    </svg>
                    Add to Cart
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

export default NewArrival;
