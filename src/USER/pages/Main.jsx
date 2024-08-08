import React from 'react'
import Banner from '../components/Banner';
import ImageWrapper from '../components/ImageWrapper';
import Home from '../components/Home';
import Banner2 from '../components/Banner2';
import TopProducts from '../components/Products/TopProducts';
import Navbar from '../components/NavBar/NavBar';
import NewArrival from '../components/Products/NewArrival';

const Main = () => {
  return (
    <>
     <Navbar />
     <Banner />
     <ImageWrapper />
      <Home />
      <Banner2 src="banner.jpeg" />
      <TopProducts />
      <Banner2 src="banner2.jpg" />
      <NewArrival />
    </>
  )
}

export default Main