"use client";

import Link from "next/link";
import {
  ArrowRight,
  Box,
  Camera,
  Shirt,
  Smartphone,
  Watch,
} from "lucide-react";
import { useEffect, useState } from "react";

import type { Product } from "@/types/productType";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

const categoryIcons = {
  electronics: Smartphone,
  fashion: Shirt,
  shoes: Box,
  accessories: Watch,
  default: Camera,
};

const getCategoryIcon = (category: string) => {
  const key = category.toLowerCase();

  if (key.includes("electronic")) {
    return categoryIcons.electronics;
  }

  if (key.includes("fashion") || key.includes("clothing")) {
    return categoryIcons.fashion;
  }

  if (key.includes("shoe")) {
    return categoryIcons.shoes;
  }

  if (key.includes("accessor")) {
    return categoryIcons.accessories;
  }

  return categoryIcons.default;
};

export default function Categories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json();

        setProducts(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  if (loading) {
    return (
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          {/* Header Skeleton */}
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="w-full">
              <div className="h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

              <div className="mt-3 h-10 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />

              <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="h-5 w-36 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Category Skeleton */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6"
              >
                <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />

                <div className="mt-5 h-6 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                <div className="mt-3 h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/30">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
              Failed to Load Categories
            </h3>

            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-900">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              No Categories Available
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Categories will appear here when products are available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 dark:bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Explore Collection
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
              Explore our wide range of products and find exactly what you are
              looking for.
            </p>
          </div>

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
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category);

            return (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-800 dark:hover:bg-gray-800 sm:p-6"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm transition duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/50 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                  <Icon size={24} />
                </div>

                {/* Category Name */}
                <h3 className="mt-5 text-base font-semibold capitalize text-gray-900 dark:text-white sm:text-lg">
                  {category}
                </h3>

                {/* Explore */}
                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-gray-500 transition group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
                  Explore
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
