import React, { useEffect, useState } from "react";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { ClipLoader, PuffLoader } from "react-spinners";
import GlobalAxios from "../../../../Global/GlobalAxios";

const imageURI = import.meta.env.VITE_IMAGE_BASE_URL;

const CheckOut = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loader
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address_lane1: "",
    address_lane2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await GlobalAxios.get("/cart");
        const carts = response.data.data.carts;
        setCartData(carts);
        setTotalPrice(Number(response.data.data.total_price));
        setTotalQuantity(carts.reduce((acc, item) => acc + item.quantity, 0));
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchShippingDetails = async () => {
      try {
        const response = await GlobalAxios.get("/shipping-details");
        setFormData(response.data.data.selected_details);
      } catch (error) {
        console.error("Failed to fetch shipping details:", error);
      }
    };
    fetchShippingDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response = await GlobalAxios.post("/order", formData);
      if (response.data.status === "success") {
        if (response.data.payment_link) {
          window.location.href = response.data.payment_link;
        }
      } else {
        console.error("Order not submitted successfully");
        setLoading(true);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setLoading(false);
    }
  };

  if (loading) {
    // Display PuffLoader while data is being fetched
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PuffLoader size={80} color="#123abc" />
      </div>
    );
  }

  if (cartData.length === 0) {
    // Display message if the cart is empty
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your cart is empty!
          </h2>
          <p className="text-lg text-gray-600">
            Please add some items to your cart before proceeding to checkout.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 bg-white p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center md:text-left">
            Checkout
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MdOutlineLocationOn className="text-blue-600" />
                Personal Details
              </h3>
              <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                />
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mt-6">
                  <MdOutlineLocationOn className="text-blue-600" />
                  Shipping Address
                </h3>
                <input
                  type="text"
                  name="address_lane1"
                  placeholder="Address Lane 1"
                  value={formData.address_lane1}
                  onChange={handleChange}
                  className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                />
                <input
                  type="text"
                  name="address_lane2"
                  placeholder="Address Lane 2"
                  value={formData.address_lane2}
                  onChange={handleChange}
                  className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="postal_code"
                    placeholder="Postal Code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="px-4 py-3 bg-gray-50 text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
                {/* <div>
                  <input type="checkbox" onChange={handleCheckBox} />
                  <label> Create an account?</label>
                </div> */}
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 flex justify-center items-center"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? (
                    <ClipLoader size={20} color={"#fff"} />
                  ) : (
                    "Place Order"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Details */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Order Details:
          </h3>
          <div className="flex flex-col gap-4 bg-gray-100 p-6 rounded-md shadow-sm">
            {cartData.map((item) => (
              <div key={item.product_id} className="flex items-center gap-4">
                <div className="w-24 h-24 bg-white p-2 rounded-md">
                  <img
                    src={`${imageURI + item.thumbnail}`}
                    className="w-full h-full object-contain"
                    alt={item.name}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">
                    {item.name}
                  </h3>
                  <div className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </div>
                  <h4 className="text-base font-bold text-gray-800">
                    Item Price: ${item.price}
                  </h4>
                  <h4 className="text-base font-bold text-gray-800">
                    Total: ${item.total}
                  </h4>
                </div>
              </div>
            ))}
            <hr className="border-gray-300 my-1" />
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
              Payment Details:
            </h3>
            <div className="text-lg font-normal">
              Total Amount: ${totalPrice}
            </div>
            <div className="text-lg font-normal">
              Total Quantity: {totalQuantity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
