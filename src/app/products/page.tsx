"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "@/components/product/Pagination";
import SearcFilterAndSort from "@/components/product/SearcFilterAndSort";

import { fetchProducts } from "@/lib/productApi";
import type { AppDispatch, RootState } from "@/store/store";
import {
  useProductFilterStore,
  type SortOption,
} from "@/store/themeStore";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Zustand
  const {
    search,
    category,
    sort,
    setSearch,
    setCategory,
    setSort,
    resetFilters,
  } = useProductFilterStore();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 12;

  // Redux
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // =========================
  // Search
  // =========================

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // =========================
  // Category
  // =========================

  const handleCategory = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  // =========================
  // Sort
  // =========================

  const handleSort = (value: SortOption) => {
    setSort(value);
    setCurrentPage(1);
  };

  // =========================
  // Reset Filters
  // =========================

  const handleResetFilters = () => {
    resetFilters();
    setCurrentPage(1);
  };

  // =========================
  // Filter + Search + Sort
  // =========================

  const filteredProducts = products
    .filter((product) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "name-az":
          return a.name.localeCompare(b.name);

        case "name-za":
          return b.name.localeCompare(a.name);

        default:
          return 0;
      }
    });

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE,
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <main className="min-h-screen bg-white py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= Header ================= */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            Our Products
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Discover our latest products and find everything you need in one
            place.
          </p>
        </div>

        {/* ================= Search / Filter / Sort ================= */}

        <SearcFilterAndSort
          search={search}
          setSearch={handleSearch}
          category={category}
          setCategory={handleCategory}
          sort={sort}
          setSort={handleSort}
          filteredProducts={filteredProducts}
          products={products}
          resetFilters={handleResetFilters}
        />

        {/* ================= Loading ================= */}

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

        {/* ================= Error ================= */}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950">
            <p className="font-medium text-red-600 dark:text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => dispatch(fetchProducts())}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ================= Empty ================= */}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              No Products Found
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              There are no products available right now.
            </p>
          </div>
        )}

        {/* ================= Products ================= */}

        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
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
                        type="button"
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

            {/* ================= Pagination ================= */}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </main>
  );
}