import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice'; // Adjust the path according to your project structure

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate an async login request
    setTimeout(() => {
      dispatch(login()); // Dispatch the login action
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="font-sans">
      <div className="grid lg:grid-cols-2 gap-4 bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-12 h-[320px]">
        <div>
          <span className="text-4xl text-white font-bold">VisionOverseas</span>
          <div className="max-w-lg mt-16 hidden lg:block">
            <h3 className="text-3xl font-bold text-white">Sign in</h3>
            <p className="text-sm mt-4 text-white">
              Embark on a seamless journey as you sign in to your account. Unlock a realm of opportunities and possibilities that await you.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl px-4 sm:px-6 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] mx-auto lg:mx-0">
          <form onSubmit={handleLogin}>
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold text-gray-800">Sign in</h3>
            </div>
            <div className="flex items-center space-x-4 mb-8">
              <button
                type="button"
                className="py-2.5 px-4 text-sm font-semibold rounded-md text-blue-500 bg-blue-100 hover:bg-blue-200 focus:outline-none w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" className="inline mr-4" viewBox="0 0 512 512">
                  <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" />
                  <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" />
                  <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" />
                  <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" />
                  <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" />
                  <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" />
                </svg>
                Sign in with Google
              </button>
            </div>

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
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
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
              className="w-full text-white py-3 bg-blue-500 hover:bg-blue-600 font-medium rounded-md transition duration-150 flex items-center justify-center"
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
                'Sign In'
              )}
            </button>
            <div className='text-center mt-3'>
              <span>Don't have an account?</span>
              <NavLink className="text-blue-500" to="/signup"> Register Here</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;