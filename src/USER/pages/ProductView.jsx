import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { addItem } from "../store/slices/productsSlice";
import { toast } from "react-toastify";
import {
  FaShippingFast,
  FaBoxOpen,
  FaRegCheckCircle,
  FaUndoAlt,
  FaCartPlus,
} from "react-icons/fa";
import SimilarProducts from "../components/SimilarProducts";
import Navbar from "../components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import GlobalAxios from "../../../Global/GlobalAxios";
const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [productInfo, setProductInfo] = useState({
    id: "",
    name: "",
    slug: "",
    thumbnail: "",
    category_id: "",
    price: "",
    status: "",
    min_order_quantity: "",
    top_product: "",
    featured_product: "",
    best_seller: "",
    created_at: "",
    updated_at: "",
    product_id: "",
    long_description: "",
    description_img1: "",
    description_img2: "",
    seo_title: "",
    seo_description: "",
    weight: "",
    dimensions: null,
    brand: "",
    style: "",
    model_name: "",
    suggested_users: "",
    product_material: "",
    special_features: null,
    category_name: "",
    image_id: "",
    path: "",
    images: [],
  });
  const { id, slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await GlobalAxios.get(`/product/${id}/${slug}`);
      console.log(response.data.data);
      window.scrollTo(0, 0);
      if (response.data.status === "success") {
        setProductInfo(response.data.data);
        setMainImage(response.data.data.thumbnail);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async(id) => {
    try {
      const response = await GlobalAxios.post("/cart", {
        product_id: id,
        quantity: 1,
      });
      if (response.data.status === "success") {
        toast.success("Product added to cart successfully.");
        dispatch(addCartItem(id));
      }
    } catch (error) {
      // toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleBuyNow = (id) => {
    // Placeholder for Buy Now functionality
    toast.success(`Proceeding to buy ${product.name}!`);
  };

  const handleImageClick = (src) => {
    setMainImage(src);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-start justify-center w-full p-6 text-gray-800 shadow-lg box-border">
        <div className="flex-1 max-w-lg mb-6 md:mb-0 md:mr-6">
          <img
            src={mainImage ? `${imageURI + mainImage}` : ""}
            alt={productInfo.name}
            className="w-full h-auto rounded-lg"
          />
          <div className="flex mt-4 space-x-2">
            {productInfo.images.map((src, index) => (
              <img
                key={index}
                src={`${imageURI + src}`}
                alt={`Small ${index + 1}`}
                className="w-16 h-16 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleImageClick(src)}
              />
            ))}
          </div>
        </div>
        <div className="flex-2 max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">{productInfo.product_name}</h1>
          <h2 className="text-xl font-medium mb-2">
            Price: ${productInfo.price}{" "}
            <span className="line-through text-gray-500">
              ${productInfo.originalPrice}
            </span>
          </h2>
          <h3 className="text-lg mb-2">
            Min. Quantity: {productInfo.min_order_quantity}
          </h3>
          <p className="mb-4">Dimensions: ‎{productInfo.dimensions} inches</p>
          <div className="mb-6">
            <label htmlFor="quantity" className="block mb-2 font-medium">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min={productInfo.min_order_quantity}
              defaultValue="10"
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleAddToCart(productInfo.product_id)}
              disabled={loading === productInfo.product_id}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaCartPlus className="mr-2 text-white" />
              {loading === productInfo.product_id ? "Adding..." : "Add to Cart"}
            </button>
            <button
              onClick={() => handleBuyNow(product.product_id)}
              className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaCartPlus className="mr-2 text-white" />
              Add to WishList
            </button>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">
              Delivery Policies{" "}
              <FaShippingFast className="inline-block ml-2 text-blue-500" />
            </h4>
            <p>Shipping charges as per your order.</p>
            <p>Delivery date as per your requirement.</p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">
              Daily Capacity{" "}
              <FaBoxOpen className="inline-block ml-2 text-green-500" />
            </h4>
            <p>150 (Piece)</p>
            <h4 className="text-lg font-semibold mb-2">Monthly Capacity</h4>
            <p>5000 (Piece)</p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">
              Return Policies{" "}
              <FaUndoAlt className="inline-block ml-2 text-red-500" />
            </h4>
            <p>Returns & exchanges accepted within 14 days</p>
            <p>Free delivery</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full p-6 text-gray-800 box-border">
        <div className="flex-2 max-w-2xl bg-white p-6">
          <h4 className="text-xl font-semibold mb-4">
            Product Description
            <FaRegCheckCircle className="inline-block ml-2 text-yellow-500" />
          </h4>
          <p className="text-lg text-justify text-gray-700">
            {productInfo.long_description}
          </p>
        </div>
        <div className="flex-1 max-w-lg mb-6 md:mb-0 md:mr-6">
          <img
            src={`${imageURI + productInfo.description_img1}`}
            alt="Product Description"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full p-6 text-gray-800 box-border">
        <div className="flex-1 max-w-lg mb-6 md:mb-0 md:mr-6">
          <img
            src={`${imageURI + productInfo.description_img2}`}
            alt="Product Details"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex-2 max-w-2xl bg-white p-6">
          <h4 className="text-lg font-semibold mb-4">Product Details</h4>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Weight:</p>
            <p className="text-base text-gray-700">{productInfo.weight}</p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Brand:</p>
            <p className="text-base text-gray-700">{productInfo.brand}</p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Style:</p>
            <p className="text-base text-gray-700">{productInfo.style}</p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Model Name:</p>
            <p className="text-base text-gray-700">{productInfo.model_name}</p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Suggested Users:</p>
            <p className="text-base text-gray-700">
              {productInfo.suggested_users}
            </p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Material:</p>
            <p className="text-base text-gray-700">
              {productInfo.product_material}
            </p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Feature:</p>
            <p className="text-base text-gray-700">
              {productInfo.special_features}
            </p>
          </div>
        </div>
      </div>

      <SimilarProducts />
    </>
  );
};

export default ProductDetails;
