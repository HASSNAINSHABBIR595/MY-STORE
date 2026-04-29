import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  const res = await axios.get(
    "https://fakestoreapiserver.reactbd.org/api/products",
  );
  // FakeStoreAPI direct array deta hai, isliye sirf res.data return karein
  console.log(res.data);

  return res.data;
});

const initialState = {
  items: [],
  status: "idle",
  error: null,
  selectedCategory: "All",
  searchQuery: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = Array.isArray(action.payload)
        ? action.payload
        : action.payload.data;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const { setCategory, setSearchQuery } = productSlice.actions;

export default productSlice.reducer;
