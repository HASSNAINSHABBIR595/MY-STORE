import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { addItem, removeItem } from "../features/cartSlice";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchFilter from "../components/SearchFilter";

const ProductList = () => {
  const dispatch = useDispatch();

  // 1. Selectors
  const { items, selectedCategory, status, error, searchQuery } = useSelector(
    (state) => state.products,
  );
  const cartItems = useSelector((state) => state.cart.items);

  // 2. Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 3. Filter Logic
  const filteredItems = items.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  // 4. Pagination Calculation (filteredItems ke baad)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Effects
  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  if (status === "loading")
    return (
      <div className="text-white p-10 text-center animate-pulse text-2xl font-bold">
        Loading...
      </div>
    );

  return (
    <div className="bg-gray-950 min-h-screen pb-20">
      <SearchFilter />
      <CategoryFilter />

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-10">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentItems.map((item) => {
            const isInCart = cartItems.some((c) => c.id === item.id);
            return (
              <ProductCard
                key={item.id}
                item={item}
                isInCart={isInCart}
                onAdd={(data) => dispatch(addItem(data))}
                onRemove={(id) => dispatch(removeItem(id))}
              />
            );
          })}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center mt-16 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-30 transition-all hover:bg-gray-700"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-10 h-10 rounded font-bold transition-all ${
                    currentPage === pageNumber
                      ? "bg-white text-black scale-110 shadow-lg shadow-white/20"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-30 transition-all hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;