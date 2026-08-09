import type { Product } from "@/types/productType";
import type { SortOption } from "@/store/themeStore";

type SearcFilterAndSortProps = {
  search: string;
  setSearch: (search: string) => void;

  category: string;
  setCategory: (category: string) => void;

  sort: SortOption;
  setSort: (sort: SortOption) => void;

  filteredProducts: Product[];
  products: Product[];

  resetFilters: () => void;
};

const SearcFilterAndSort = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  filteredProducts,
  products,
  resetFilters,
}: SearcFilterAndSortProps) => {
  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Search */}
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Search Products
          </label>

          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="All">All Categories</option>

            {Array.from(
              new Set(products.map((product) => product.category)),
            ).map((categoryName) => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label
            htmlFor="sort"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Sort By
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name: A → Z</option>
            <option value="name-za">Name: Z → A</option>
          </select>
        </div>
      </div>

      {/* Result */}
      <div className="mt-4 flex flex-col justify-between gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {filteredProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {products.length}
          </span>{" "}
          products
        </p>

        {(search || category !== "All" || sort !== "default") && (
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearcFilterAndSort;