// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import wishListReducer from './slices/wishListSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    wish: wishListReducer,
  },
});

export default store;
