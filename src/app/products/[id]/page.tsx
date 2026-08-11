"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Tag } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

import { fetchProductById } from "@/lib/productApi";
import type { AppDispatch, RootState } from "@/store/store";

export default function ProductDetailsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();
  const id = params.id as string;

  const { selectedProduct, detailsLoading, detailsError } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (!id) return;

    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (detailsLoading) {
    return (
      <main className="min-h-screen bg-gray-50 py-10 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="h-[500px] animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-5">
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

              <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

              <div className="h-9 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>

              <div className="h-20 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />

              <div className="h-12 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (detailsError || !selectedProduct) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900/50 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Product Not Found
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {detailsError || "The product you are looking for does not exist."}
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const product = selectedProduct;

  const isInStock = product.stock > 0;

  return (
    <main className="min-h-screen bg-gray-50 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4">
        {/* Back */}
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Products
        </Link>

        {/* Product */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="grid lg:grid-cols-2">
            {/* =========================
                Image
            ========================= */}

            <div className="relative min-h-[400px] bg-gray-100 dark:bg-gray-800 lg:min-h-[600px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Category */}

              <div className="absolute left-5 top-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold capitalize text-gray-800 shadow-sm backdrop-blur dark:bg-gray-950/90 dark:text-white">
                  <Tag size={15} />

                  {product.category}
                </span>
              </div>
            </div>

            {/* =========================
                Content
            ========================= */}

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {product.category}
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {product.name}
              </h1>

              {/* Price */}

              <div className="mt-6">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  ${product.price}
                </span>
              </div>

              {/* Description */}

              <div className="mt-7">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                  Description
                </h2>

                <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
              </div>

              {/* Stock */}

              <div className="mt-7 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm dark:bg-gray-800 dark:text-blue-400">
                      <Package size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Availability
                      </p>

                      <p
                        className={`mt-0.5 text-sm ${
                          isInStock
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {isInStock
                          ? `${product.stock} items available`
                          : "Out of stock"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isInStock
                        ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                    }`}
                  >
                    {isInStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Continue Shopping */}

              <Link
                href="/products"
                className="mt-8 flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
