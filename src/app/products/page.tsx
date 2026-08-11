"use client";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "@/components/product/Pagination";
import SearcFilterAndSort from "@/components/product/SearcFilterAndSort";

import { fetchProducts } from "@/lib/productApi";
import type { AppDispatch, RootState } from "@/store/store";

import { useProductFilterStore } from "@/store/themeStore";
import ProductCart from "@/components/product/ProductCart";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();


  const {
    search,
    category,
    sort,
    setSearch,
    setCategory,
    setSort,
    resetFilters,
  } = useProductFilterStore();


  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 12;


  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const filteredProducts = [...products]
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


  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE,
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );


  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleSortChange = (
    value: typeof sort,
  ) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    resetFilters();
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-white py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            ShopNest Collection
          </span>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Our Products
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
            Discover our latest products and find everything you need
            in one place.
          </p>
        </div>


        <SearcFilterAndSort
          search={search}
          setSearch={handleSearchChange}
          category={category}
          setCategory={handleCategoryChange}
          sort={sort}
          setSort={handleSortChange}
          filteredProducts={filteredProducts}
          products={products}
          resetFilters={handleResetFilters}
        />

        {loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Image */}
                <div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-800" />

                {/* Content */}
                <div className="space-y-4 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-6 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-7 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="flex gap-2">
                    <div className="h-10 flex-1 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                    <div className="h-10 flex-1 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-10 text-center dark:border-red-900 dark:bg-red-950/40">
            <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
              Failed to Load Products
            </h2>

            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>

            <button
              onClick={() => dispatch(fetchProducts())}
              className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}


        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-20 text-center dark:border-gray-800 dark:bg-gray-900">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                <ShoppingCart size={28} />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
                No Products Found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
                We couldn&apos;t find any products matching your search
                or filter.
              </p>

              {(search || category !== "All" || sort !== "default") && (
                <button
                  onClick={handleResetFilters}
                  className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}

        {!loading &&
          !error &&
          paginatedProducts.length > 0 && (
            <>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => <ProductCart key={product._id} product={product} />)}
              </div>

              {totalPages > 1 && (
                <div className="mt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
      </div>
    </main>
  );
}