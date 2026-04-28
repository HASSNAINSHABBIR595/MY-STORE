import { Search } from "lucide-react";
import { useState } from "react";
import { setSearchQuery } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.products.searchQuery);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.feature.some((f) =>
          f.toLowerCase().includes(value.toLowerCase()),
        ),
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="mt-3 mb-5 p-3 bg-gray-900 rounded-2xl shadow-xl border border-y-gray-800 focus-within:border-x-amber-600/80 max-w-7xl mx-auto md:max-w-5xl">
      <div className="flex items-center border border-gray-700 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-orange-400/80 transition duration-300 bg-gray-800">
        <Search className="w-8 h-8 text-gray-500 ml-4" />
        <input
          value={query}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          type="text"
          placeholder="Search High-Performance Product by name or Feature..."
          className="outline-none w-full h-15  text-white bg-gray-800 placeholder-gray-500 text-base font-medium"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
