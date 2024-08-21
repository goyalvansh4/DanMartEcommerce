import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const cartCountSlice = createSlice({
  name: 'cartCount',
  initialState,
  reducers: {
    setCartItemCount: (state, action) => {
      state.count = action.payload;
    },
    incrementCartItemCount: (state, action) => {
      state.count += action.payload;
    },
    decrementCartItemCount: (state, action) => {
      state.count = Math.max(0, state.count - action.payload);
    },
  },
});

export const { setCartItemCount, incrementCartItemCount, decrementCartItemCount } = cartCountSlice.actions;
export default cartCountSlice.reducer;