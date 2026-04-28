import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { addItem, removeItem } from "../features/cartSlice";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchFilter from "../components/SearchFilter";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, selectedCategory, status, error, searchQuery } = useSelector(
    (state) => state.products,
  );
  const cartItems = useSelector((state) => state.cart.items);

  const filteredItems = items.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* FIX 2: 'items' ki jagah 'filteredItems' par map chalayein */}
          {filteredItems.map((item) => {
            const isInCart = cartItems.some(
              (cartItem) => cartItem.id === item.id,
            );

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
      </div>
    </div>
  );
};
export default ProductList;
