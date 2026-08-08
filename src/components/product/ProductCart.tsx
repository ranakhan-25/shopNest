import type { Product } from "@/types/productType";
import { Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

const ProductCart = ({ product }: ProductCardProps) => {
  return (
    <div>
      <div
        key={product._id}
        className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Category */}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-gray-800 shadow-sm backdrop-blur dark:bg-gray-900/90 dark:text-white">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-white">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${product.price}
            </span>

            <span
              className={
                product.stock > 0
                  ? "text-xs font-medium text-green-600 dark:text-green-400"
                  : "text-xs font-medium text-red-600 dark:text-red-400"
              }
            >
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-5 flex gap-2">
            <Link
              href={`/products/${product._id}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Eye size={17} />
              Details
            </Link>

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
    </div>
  );
};

export default ProductCart;
