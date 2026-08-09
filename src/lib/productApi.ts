import type { Product } from "@/types/productType";
import {
  createAsyncThunk,
} from "@reduxjs/toolkit";




const API = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

// GET ALL
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json()
    return data.data as Product[];
  }
);

// GET SINGLE
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string) => {
    const res = await fetch(`${API}/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return (await res.json()) as Product;
  }
);

// CREATE
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: Omit<Product, "_id">) => {
    const res = await fetch(API, {
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
  }
);

// UPDATE
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<Product>;
  }) => {
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
  }
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
  }
);