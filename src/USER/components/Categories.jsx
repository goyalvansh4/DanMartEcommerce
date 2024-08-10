import React, { useState, useEffect, useRef } from "react";
import { FaFilter, FaTags, FaStar, FaTrophy, FaList } from "react-icons/fa";
import GlobalAxios from "../../../Global/GlobalAxios";

const Categories = () => {
  const [isSticky, setIsSticky] = useState(false);
  const categoriesRef = useRef(null);
  const [productCategory, setProductCategory] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const priceRanges = [
    { label: "$0 - $50", value: [0, 50] },
    { label: "$51 - $100", value: [51, 100] },
    { label: "$101 - $200", value: [101, 200] },
    { label: "$201 - $500", value: [201, 500] },
    { label: "$501 - $1000", value: [501, 1000] },
  ];

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

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRanges((prevRanges) =>
      prevRanges.includes(range)
        ? prevRanges.filter((r) => r !== range)
        : [...prevRanges, range]
    );
  };

  const categories = [
    { title: "All", icon: <FaList />, items: [] },
    { title: "Categories", icon: <FaTags />, items: productCategory },
    { title: "Products", icon: <FaStar />, items: ["Top Product","Feature Product","Best Seller"] },
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
                  className="text-gray-500 capitalize hover:text-blue-600 text-[17px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all"
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
          {priceRanges.map((range, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`price-range-${index}`}
                value={range.value}
                onChange={() => handlePriceRangeChange(range.value)}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <label
                htmlFor={`price-range-${index}`}
                className="ml-2 text-sm text-gray-600"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
