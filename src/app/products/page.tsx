"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "@/lib/productApi";
import type { AppDispatch, RootState } from "@/store/store";


export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  return (
    <main>
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Our Products
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
              Discover our latest products and find everything you need in one
              place.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-800" />

                  <div className="space-y-3 p-5">
                    <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                    <div className="h-6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                    <div className="h-10 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950">
              <p className="font-medium text-red-600 dark:text-red-400">
                {error}
              </p>

              <button
                onClick={() => dispatch(fetchProducts())}
                className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && products.length === 0 && (
            <div className="py-20 text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                No Products Found
              </h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                There are no products available right now.
              </p>
            </div>
          )}

          {/* Products */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Category */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur dark:bg-gray-900/90 dark:text-white">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 min-h-10 text-sm text-gray-600 dark:text-gray-400">
                      {product.description}
                    </p>

                    {/* Price & Stock */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${product.price}
                      </span>

                      <span
                        className={`text-xs font-medium ${
                          product.stock > 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} available`
                          : "Out of stock"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex gap-2">
                      {/* Details */}
                      <Link
                        href={`/products/${product._id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <Eye size={17} />
                        Details
                      </Link>

                      {/* Add Cart */}
                      <button
                        disabled={product.stock === 0}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        <ShoppingCart size={17} />
                        Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
