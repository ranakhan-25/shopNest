"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, PackageOpen } from "lucide-react";

import ProductCart from "../product/ProductCart";
import type { Product } from "@/types/productType";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

type ProductsResponse = {
  success: boolean;
  count: number;
  data: Product[];
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result: ProductsResponse = await response.json();

        if (!result.success) {
          throw new Error("Failed to load products");
        }

        setProducts(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);
  const latestProducts = [...products]
    .sort((a, b) => {
      if ("createdAt" in a && "createdAt" in b) {
        const dateA = new Date(
          (a as Product & { createdAt: string }).createdAt,
        ).getTime();

        const dateB = new Date(
          (b as Product & { createdAt: string }).createdAt,
        ).getTime();

        return dateB - dateA;
      }

      return 0;
    })
    .slice(0, 6);

  return (
    <section className="py-16 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Latest Collection
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Latest Products
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
              Discover our newest products, carefully selected for you.
            </p>
          </div>

          {!loading && latestProducts.length > 0 && (
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View All Products
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
              >
                {/* Image Skeleton */}
                <div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-800" />

                {/* Content Skeleton */}
                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-6 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-7 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/40">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
              Failed to Load Products
            </h3>

            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && latestProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-950">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              <PackageOpen size={32} />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
              No Products Available
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
              We don&apos;t have any products available right now. Please check
              back later.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Products
              <ArrowRight size={17} />
            </Link>
          </div>
        )}

        {!loading && !error && latestProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestProducts.map((product) => (
                <ProductCart key={product._id} product={product} />
              ))}
            </div>

            {/* View All */}
            <div className="mt-10 flex justify-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-blue-600 dark:hover:text-white"
              >
                View All Products
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
