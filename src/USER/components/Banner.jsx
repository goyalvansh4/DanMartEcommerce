import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
    cssEase: 'linear',
  };

  const slides = [
    {
      image: 'slider1.jpg',
      title: 'New To The Product World',
      description: 'Product line is a group of product related to one another',
    },
    {
      image: 'slider1.jpg',
      title: 'Attack Air with Products',
      description: 'Your audience and conduct market research',
    },
    {
      image: 'slider1.jpg',
      title: 'Air Time with Products',
      description: 'A selling point is a reason your customer may buy your product',
    },
  ];

  return (
    <div className="w-full h-auto  overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-[300px] md:h-[600px]" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-base md:text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
