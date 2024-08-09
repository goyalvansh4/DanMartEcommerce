import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";
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

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const [mainImage, setMainImage] = useState("product1.jpg");

  const handleAddToCart = (product) => {
    setLoading(product.id);
    setTimeout(() => {
      dispatch(addItem(product));
      toast.success(`${product.name} added to cart!`);
      setLoading(null);
    }, 1000);
  };

  const handleBuyNow = (product) => {
    // Placeholder for Buy Now functionality
    toast.success(`Proceeding to buy ${product.name}!`);
  };

  const handleImageClick = (src) => {
    setMainImage(src);
  };

  const product = {
    id: 1,
    name: "Navigator Essential",
    price: 500,
    originalPrice: 750,
    imgSrc: "product1.jpg",
    smallImages: [
      "product1.jpg",
      "product2.jpg",
      "product3.jpg",
      "product4.jpg",
    ],
    description: `Navigate with Confidence: Trust in the reliability of your compass set to guide you through unfamiliar terrain, providing reassurance and peace of mind along the way. Share the Adventure: Gift this timeless compass set to a fellow explorer or travel enthusiast, inspiring them to embark on their own unforgettable adventures.`,
    details: {
      weight: "0.18 Kilograms",
      brand: "ANTIQUANA",
      style: "Leather Case",
      modelName: "ANTIQUANA-80",
      suggestedUsers: "ANTIQUANA",
      material: "Brass",
      feature: "Brass Compass with Leather Case",
    },
  };

  return (
    <>
    <Navbar />
      <div className="flex flex-col md:flex-row items-start justify-center w-full p-6 text-gray-800 shadow-lg box-border">
        <div className="flex-1 max-w-lg mb-6 md:mb-0 md:mr-6">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
          <div className="flex mt-4 space-x-2">
            {product.smallImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Small ${index + 1}`}
                className="w-16 h-16 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleImageClick(src)}
              />
            ))}
          </div>
        </div>
        <div className="flex-2 max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
          <h2 className="text-xl font-medium mb-2">
            Price: ${product.price}{" "}
            <span className="line-through text-gray-500">
              ${product.originalPrice}
            </span>
          </h2>
          <h3 className="text-lg mb-2">Min. Quantity: 10</h3>
          <p className="mb-4">Dimensions: ‎4.21 x 3.82 x 1.93 inches</p>
          <div className="mb-6">
            <label htmlFor="quantity" className="block mb-2 font-medium">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="10"
              defaultValue="10"
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleAddToCart(product)}
              disabled={loading === product.id}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaCartPlus className="mr-2 text-white" />
              {loading === product.id ? "Adding..." : "Add to Cart"}
            </button>
            <button
              onClick={() => handleBuyNow(product)}
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
            {product.description}
          </p>
        </div>
        <div className="flex-1 max-w-lg mb-6 md:mb-0 md:mr-6">
          <img
            src="product1.jpg"
            alt="Product Description"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full p-6 text-gray-800 box-border">
        <div className="flex-1 max-w-lg mb-6 md:mb-0 md:mr-6">
          <img
            src="product1.jpg"
            alt="Product Details"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex-2 max-w-2xl bg-white p-6">
          <h4 className="text-lg font-semibold mb-4">Product Details</h4>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Weight:</p>
            <p className="text-base text-gray-700">{product.details.weight}</p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Brand:</p>
            <p className="text-base text-gray-700">{product.details.brand}</p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Style:</p>
            <p className="text-base text-gray-700">{product.details.style}</p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Model Name:</p>
            <p className="text-base text-gray-700">
              {product.details.modelName}
            </p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Suggested Users:</p>
            <p className="text-base text-gray-700">
              {product.details.suggestedUsers}
            </p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Material:</p>
            <p className="text-base text-gray-700">{product.details.material}</p>
          </div>
          <div className="border-b border-gray-300 py-2 flex gap-2">
            <p className="text-lg font-medium">Feature:</p>
            <p className="text-base text-gray-700">{product.details.feature}</p>
          </div>
        </div>
      </div>
      
        <SimilarProducts />
    </>
  );
};

export default ProductDetails;
