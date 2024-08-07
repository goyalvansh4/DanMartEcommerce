import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import GlobalAxios from '../../../../Global/GlobalAxios';

// Define an async thunk for fetching products
export const fetchProductsThunk = createAsyncThunk(
  'cart/fetchProducts',
  async () => {
    const response = await GlobalAxios.get('/products');
    return response.data.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
