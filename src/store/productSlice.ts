import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/lib/productApi";
import type { Product } from "@/types/productType";
import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      // CREATE
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id,
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload,
        );
      });
  },
});

export default productSlice.reducer;
