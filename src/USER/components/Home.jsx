import React from "react";
import Categories from "./Categories";
import Products from "./Products/Products";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-[20%]">
        <Categories />
      </div>
      <div className="w-full lg:w-[80%]">
        <Products />
      </div>
    </div>
  );
};

export default Home;
