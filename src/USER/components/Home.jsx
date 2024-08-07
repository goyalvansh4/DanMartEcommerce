import React from "react";
import Categories from "./Categories";
import Products from "./Products/Products";

const Home = () => {
  return (
    <div className="flex">
      <div className="w-[20%]">
        <Categories />
      </div>
      <div className="w-[80%]">
        <Products />
      </div>
    </div>
  );
};

export default Home;
