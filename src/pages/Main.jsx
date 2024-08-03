import React from 'react'
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import Products from '../components/Products';
import ImageWrapper from '../components/ImageWrapper';

const Main = () => {
  return (
    <>
     <Banner />
     <ImageWrapper />
      <div className="flex my-4 flex-wrap md:flex-nowrap">
        <Categories />
        <Products />
      </div>
    </>
  )
}

export default Main