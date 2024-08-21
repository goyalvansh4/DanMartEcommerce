import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const UUID = Cookies.get("guestUUID") || null;
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      "guest-uuid": UUID,
    };
    try {
      const response = await axios.post(
        "http://192.168.123.152:8000/api/v1/user/login",
        data
      );
      const token = response.data.data.token;

      if (response.data.status === "success") {
        setLoading(false);
        Cookies.set("authToken", token, { expires: 1 });
        Cookies.remove("guestUUID");
        dispatch(login());
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  return (
    <div className="font-sans flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <h1 className="text-center py-5 text-4xl text-black font-semibold">
        DanMart Global
      </h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md px-8 py-12">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-extrabold text-gray-800">Sign in</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-gray-800 text-sm mb-2 block">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="email"
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-gray-800 text-sm mb-2 block">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                viewBox="0 0 128 128"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                ) : (
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM64 96c31.854 0 50.535-24.795 55.293-32C114.535 56.795 95.854 32 64 32 32.146 32 13.465 56.795 8.707 63.994 13.465 71.205 32.146 96 64 96zM82.344 45.656a4 4 0 0 1 5.656 5.656l-8 8A23.896 23.896 0 0 1 88 64c0 13.234-10.766 24-24 24a23.896 23.896 0 0 1-4.688-.688l-8 8a4 4 0 0 1-5.656-5.656l8-8A23.896 23.896 0 0 1 40 64c0-13.234 10.766-24 24-24a23.896 23.896 0 0 1 4.688.688zm-6.626 15.373a16 16 0 1 0-21.746 21.746l21.746-21.746zm-9.374 9.374a16 16 0 0 0 21.746-21.746l-21.746 21.746z" />
                )}
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-black py-3 bg-blue-500 hover:bg-blue-600 font-medium rounded-md transition duration-150 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
          <div className="text-center mt-3">
            <span>Don't have an account?</span>
            <NavLink className="text-blue-500" to="/signup">
              {" "}
              Register Here
            </NavLink>
          </div>
          <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Home
        </Link>
        </form>
        
      </div>
    </div>
  );
};

export default Login;