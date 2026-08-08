
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  PackageOpen,
  ShoppingCart,
} from "lucide-react";
import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import ProductCart from "../product/ProductCart";

export default function Products() {
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  // Latest 6 products
  const latestProducts = [...products]
    .sort((a, b) => {
      if ("createdAt" in a && "createdAt" in b) {
        return (
          new Date(
            (b as typeof a & { createdAt: string }).createdAt
          ).getTime() -
          new Date(
            (a as typeof a & { createdAt: string }).createdAt
          ).getTime()
        );
      }

      return 0;
    })
    .slice(0, 6);

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
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

          {latestProducts.length > 0 && (
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

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-800" />

                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
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
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/40">
            <p className="font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && latestProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-950">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              <PackageOpen size={32} />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
              No Products Available
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
              We don&apos;t have any products available right now.
              Please check back later.
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

        {/* Products */}
        {!loading && !error && latestProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestProducts.map((product) => (
              <ProductCart key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
