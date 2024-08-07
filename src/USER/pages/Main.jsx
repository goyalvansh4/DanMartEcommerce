import React from 'react'
import Banner from '../components/Banner';
import ImageWrapper from '../components/ImageWrapper';
import Home from '../components/Home';
import Banner2 from '../components/Banner2';
import TopProducts from '../components/Products/TopProducts';

const Main = () => {
  return (
    <>
     <Banner />
     {/* <ImageWrapper /> */}
      <Home />
      <Banner2 />
      <TopProducts />
    </>
  )
}

export default Main