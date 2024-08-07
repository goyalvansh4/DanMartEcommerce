import React, { useState, useEffect, useRef } from "react";
import { FaFilter, FaTags, FaStar, FaTrophy, FaList } from "react-icons/fa";
import GlobalAxios from "../../../Global/GlobalAxios";

const Categories = () => {
  const [isSticky, setIsSticky] = useState(false);
  const categoriesRef = useRef(null);
  const [productCategory, setProductCategory] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const offsetTop = categoriesRef.current.getBoundingClientRect().top;
      setIsSticky(offsetTop <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GlobalAxios.get('/product-categories');
        console.log(response.data.data);
        if (response.data.status === 'success') {
          setProductCategory(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const categories = [
    { title: "All", icon: <FaList />, items: [] },
    { title: "Categories", icon: <FaTags />, items: productCategory },
    { title: "Our Top Products", icon: <FaStar />, items: [] },
    { title: "Feature Products", icon: <FaTrophy />, items: [] },
    { title: "The Best Product", icon: <FaTrophy />, items: [] },
  ];

  return (
    <div
      ref={categoriesRef}
      className={`bg-white py-6 px-4 font-[sans-serif] overflow-auto transition-all duration-300 ${
        isSticky ? "sticky top-0 z-50" : ""
      }`}
      style={{ height: "calc(100vh)" }} // Subtracting 80px for header and 80px for footer
    >
      {categories.map((category, index) => (
        <div className="mt-4" key={index}>
          <h6 className="text-gray-600 text-lg font-light px-4 flex items-center">
            {category.icon} <span className="ml-2">{category.title}</span>
          </h6>
          <ul className="mt-2">
            {category.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <a
                  href="#"
                  className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all"
                >
                  {item.name || item} {/* Assuming items have a `name` property */}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-4">
        <h6 className="text-gray-600 text-lg font-light px-4 flex items-center">
          <FaFilter /> <span className="ml-2">Price Filter</span>
        </h6>
        <div className="mt-2 px-4">
          <input
            type="range"
            min="0"
            max="1000"
            className="w-full"
            aria-label="Price Filter"
          />
          <div className="flex justify-between text-sm">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;