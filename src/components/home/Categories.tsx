"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  Box,
  Camera,
  Shirt,
  Smartphone,
  Watch,
} from "lucide-react";

import type { RootState } from "@/store/store";

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
  const products = useSelector(
    (state: RootState) => state.products.products
  );

  // Dynamic unique categories
  const categories = [...new Set(products.map((product) => product.category))];

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 dark:bg-gray-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

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
              Explore our wide range of products and find exactly what
              you are looking for.
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
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-900 dark:hover:bg-gray-800 sm:p-6"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm transition duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-gray-800 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                  <Icon size={24} />
                </div>

                {/* Category Name */}
                <h3 className="mt-5 text-base font-semibold capitalize text-gray-900 dark:text-white sm:text-lg">
                  {category}
                </h3>

                {/* Link */}
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500 transition group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
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
