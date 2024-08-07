import { createSlice } from '@reduxjs/toolkit';

const products = [
  { id: 1, name: 'Navigator Essential', price: 500, originalPrice: 750, imgSrc: 'product1.jpg' },
  { id: 2, name: 'Vintage Brass Compass Set', price: 500, originalPrice: 1350, imgSrc: 'product2.jpg' },
  { id: 3, name: 'Navigate with Confidence', price: 500, originalPrice: 850, imgSrc: 'product3.jpg' },
  { id: 4, name: 'Navigate Your Destiny with Grace', price: 500, originalPrice: 1200, imgSrc: 'product4.jpg' },
  { id: 5, name: 'Vanilla Velvet Brew', price: 500, originalPrice: 1050, imgSrc: 'product5.jpg' },
];


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: products,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      console.log("Removing item from cart");
      console.log(action.payload);
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
