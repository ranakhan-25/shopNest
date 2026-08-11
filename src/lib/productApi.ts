import type { Product } from "@/types/productType";
import { createAsyncThunk } from "@reduxjs/toolkit";

type ProductsResponse = {
  success: boolean;
  count: number;
  data: Product[];
};
type ProductResponse = {
  success: boolean;
  data: Product;
  message?: string;
};

const API = process.env.NEXT_PUBLIC_API_URL;

// GET ALL
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API}/api/products`);

    if (!res.ok) {
      return rejectWithValue("Failed to fetch products");
    }

    const result: ProductsResponse = await res.json();

    if (!result.success) {
      return rejectWithValue("Failed to load products");
    }

    return result.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
});

// GET SINGLE
export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/fetchProductById", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API}/api/product/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const result: ProductResponse = await res.json();

    if (!result.success || !result.data) {
      return rejectWithValue("Product not found");
    }

    return result.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Something went wrong",
    );
  }
});

// CREATE
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: Omit<Product, "_id">) => {
    const res = await fetch(`${API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      throw new Error("Failed to create product");
    }

    return (await res.json()) as Product;
  },
);

// UPDATE
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }: { id: string; data: Partial<Product> }) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update product");
    }

    return (await res.json()) as Product;
  },
);

// DELETE
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    return id;
  },
);
