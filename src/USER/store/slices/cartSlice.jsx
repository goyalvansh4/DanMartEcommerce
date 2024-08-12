import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import GlobalAxios from '../../../../Global/GlobalAxios';

// Fetch cart items from the backend
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    const response = await GlobalAxios.get('/cart');
    return response.data.data;
  }
);  

// Remove cart item from the backend and state
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await GlobalAxios.delete(`/cart/${itemId}`);
      return itemId; // Returning the id so we can remove it from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
    addCartItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload || 'Failed to remove the item';
      });
  }
});

export const { addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
