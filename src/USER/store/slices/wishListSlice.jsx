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
    console.log(response.data.data);
    return response.data.data;
  }
);

export const addWishlistThunk = createAsyncThunk(
  "wishlist/addWishlist",
  async (productId) => {
    const response = await GlobalAxios.post("/wishlist", { product_id: productId });
    return response.data.data;
  }
);

export const removeWishlistThunk = createAsyncThunk(
  "wishlist/removeWishlist",
  async (productId) => {
    const response = await GlobalAxios.delete(`/wishlist/${productId}`);
    return response.data.data;
  }
);

const wishlistSlice = createSlice({
  name: "wish",
  initialState,
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
      })
      .addCase(addWishlistThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWishlistThunk.fulfilled, (state, action) => {
        state.items.push(action.payload); 
        state.loading = false;
      })
      .addCase(addWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeWishlistThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeWishlistThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.product_id !== action.meta.arg); // Corrected line
        state.loading = false;
      })
      .addCase(removeWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});


export default wishlistSlice.reducer;
