import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk } from '../store/slices/productsSlice';
const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;
// const products = [
//   {
//     id: 1,
//     name: "Vintage Clock",
//     description: "A beautiful vintage clock from the 19th century, perfect for adding a touch of elegance to any room.",
//     image: "vintage_clock.webp",
//   },
//   {
//     id: 2,
//     name: "Antique Vase",
//     description: "An exquisite antique vase, a true representation of fine craftsmanship and artistic design.",
//     image: "antique_vase.webp",
//   },
//   {
//     id: 3,
//     name: "Classic Painting",
//     description: "A stunning classic painting that captures the essence of historical artistry and aesthetic appeal.",
//     image: "classic_painting.webp",
//   },
//   // Add more products as needed
// ];

const AboutUs = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [randomProduct, setRandomProduct] = useState({
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

  return (
    <div className="mx-auto px-4 py-10">
      {/* Our Company Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">About Us</h1>
        <p className='text-center text-lg text-gray-600 leading-relaxed mt-5'>At DanMart, we've curated an immersive experience that transcends traditional shopping</p>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-evenly gap-5 items-center mb-12">
        <div className="lg:w-[40%] ">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Company</h2>
          <p className="text-lg text-gray-600 text-justify leading-relaxed">
            Every item in our carefully curated collection is not just an object; it's a gateway to another era, meticulously selected to showcase the epitome of craftsmanship, unparalleled elegance, and enduring beauty. Here, each artifact tells a story, weaving together the rich tapestry of human history and culture, inviting you to embark on a journey through time and aesthetics. Discover a world where the past and present coalesce, and every acquisition becomes a cherished piece of heritage.
          </p>
        </div>
        <div className="lg:w-[350px]">
          <img src="about.webp" alt="About VisionOverseas" className="rounded-lg shadow-lg w-[100%]" />
        </div>
      </div>
      <hr />
      <div>
        <h2 className="text-4xl my-5 text-center font-bold text-gray-800 mb-4">Our Products</h2>
      </div>
      {/* Random Product Section */}
      <div className="w-full mt-4 flex flex-col lg:flex-row justify-center gap-5 items-center">
      <div className="lg:w-[30vw]">
          <img src={`product1.jpg`}  className="rounded-lg shadow-lg w-[100%]" />
        </div>
        <div className="lg:w-[40%]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Brass Compass Unique Print</h2>
          <p className="text-lg text-gray-600 text-justify leading-relaxed">
            Leather casing provides protection and adds a touch of elegance.ngraved with the inspiring quote "Go Confidently" for added motivation. Perfect gift choice for hikers, travelers, and loved ones with a passion for exploration.Utilize for navigation on land or sea, offering reliable directional guidance
          </p>
        </div>
      </div> 
    </div>
  );
};

export default AboutUs;