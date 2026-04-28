import { Tag } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../features/productSlice";

const CategoryFilter = () => {
  const dispatch = useDispatch();

  // plural 'items' use karein
  const { items, selectedCategory } = useSelector((state) => state.products);

  const availableCategories = [
    "All",
    ...new Set((items || []).map((item) => item.category)),
  ];

  return (
    <div className="flex flex-wrap gap-3 pb-6 mt-3 mb-5 p-3 rounded-2xl max-w-7xl mx-auto md:max-w-5xl border-b border-gray-800">
      <Tag className="w-5 h-5 text-orange-500 mt-2 mr-2 hidden sm:block" />

      {availableCategories.map((category) => (
        <button
          key={category}
          onClick={() => dispatch(setCategory(category))}
          className={`text-white text-sm md:text-lg px-4 py-1.5 border rounded-3xl transition-all duration-300 capitalize
            ${
              selectedCategory === category
                ? "bg-orange-600 border-orange-600 shadow-lg shadow-orange-900/40"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-orange-400 border-gray-700"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
