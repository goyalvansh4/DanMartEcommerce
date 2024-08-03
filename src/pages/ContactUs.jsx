import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="bg-white text-black p-8">
      {/* Map */}
      <div className="w-full h-64 mb-8 rounded-lg shadow-md overflow-hidden">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6918.722487944018!2d77.87710149758752!3d29.882690029314276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb47c767161f3%3A0x70250221f667a18!2sGulaab%20Nagar%2C%20Rampur%2C%20Roorkee%2C%20Uttarakhand%20247667%2C%20India!5e0!3m2!1sen!2sus!4v1722593947740!5m2!1sen!2sus"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-y-8 md:space-y-0 md:space-x-16">
        {/* Get in Touch Section */}
        <div className="md:w-1/3 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            We would love to hear from you! Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
          </p>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-xl mr-2 text-blue-500" />
            <span>Indian PG, Dehradun Road, Gulabnagar , Roorkee , Haridwar ,Uttarakhand 247667</span>
          </div>
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-xl mr-2 text-blue-500" />
            <span>+91 8279792033</span>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-xl mr-2 text-blue-500" />
            <span>visionoverseas37@gmail.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:w-2/5 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
