import React from 'react';

const AboutUs = () => {
  return (
    <div className=" mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">About Us</h1>
        <p className='text-center text-lg text-gray-600 leading-relaxed'>At VisionOverseas, we've curated an immersive experience that transcends traditional shopping</p>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center gap-5 items-center">
        <div className="lg:w-[40%] ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Company</h2>
          <p className="text-lg text-gray-600 text-justify leading-relaxed">
          Every item in our carefully curated collection is not just an object; it's a gateway to another era, meticulously selected to showcase the epitome of craftsmanship, unparalleled elegance, and enduring beauty. Here, each artifact tells a story, weaving together the rich tapestry of human history and culture, inviting you to embark on a journey through time and aesthetics. Discover a world where the past and present coalesce, and every acquisition becomes a cherished piece of heritage.
          </p>
        </div>
        <div className="lg:w-[350px]">
          <img src="about.webp" alt="About DanMart" className="rounded-lg shadow-lg w-[100%]" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
