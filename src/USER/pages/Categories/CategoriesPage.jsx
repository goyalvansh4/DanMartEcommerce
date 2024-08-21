import React from 'react'
import ProductCategories from './ProductCategories';
import Categories from '../../components/Categories';

const CategoriesPage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-[20%]">
        <Categories />
      </div>
      <div className="w-full lg:w-[80%]">
        <ProductCategories />
      </div>
    </div>
  );
};


export default CategoriesPage