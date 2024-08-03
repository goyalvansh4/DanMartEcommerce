import React from 'react';

const ImageWrapper = () => {
  const images = [
    { src: 'image1.jpg', text: 'TELESCOPE' },
    { src: 'image2.jpg', text: 'COMPASS WITH LEATHER CASE' },
    { src: 'image3.jpg', text: 'ANTIQUE COMPASS WITH WOODEN BOX' },
  ];

  return (
    <div className="w-full flex flex-col justify-around items-center lg:flex-row gap-5 px-5 py-10">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative images w-full lg:size-[28%]  shadow-2xl rounded-lg overflow-hidden"
        >
          <img src={image.src} alt={`placeholder ${index + 1}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-white text-md md:text-lg lg:text-xl text-center font-bold mb-4">
              {image.text}
            </h2>
            <button className="text-white bg-black hover:bg-gray-800 py-2 px-4 rounded-lg font-medium transition duration-150">
              Shop Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageWrapper;
