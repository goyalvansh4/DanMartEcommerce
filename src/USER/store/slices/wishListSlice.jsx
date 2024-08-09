import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GlobalAxios from "../../../../Global/GlobalAxios";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchWishlistThunk = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await GlobalAxios.get("/wishlist");
    return (response.data.data ? response.data.data : []);
  }
);

const wishlistSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addWishlistItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeWishlistItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addWishlistItem, removeWishlistItem } = wishlistSlice.actions;

export default wishlistSlice.reducer;