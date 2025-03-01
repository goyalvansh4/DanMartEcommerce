import React from 'react';

const Banner2 = ({src,title}) => {
  const slide = {
    // image: 'banner.jpeg',
    // title: 'New Arrival Product',
    description: 'Product line is a group of products related to one another',
  };

  return (
    <div className="w-full h-[40vh] my-6 overflow-hidden relative">
      <img 
        src={src} 
        alt="Banner" 
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-base md:text-lg">{slide.description}</p>
        <button className='text-md font-light text-center px-4 py-2 bg-gray-700 text-white mt-3 rounded-md'>Shop Now</button>
      </div>
    </div>
  );
};

export default Banner2;
