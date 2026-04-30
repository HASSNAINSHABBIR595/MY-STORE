import React from "react";
import {
  Tag,
  Star,
  ShoppingCart,
  X,
  PersonStandingIcon,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ item, isInCart, onAdd, onRemove }) => {
  return (
    <div className="group bg-gray-900/50 backdrop-blur-sm rounded-3xl transition-all duration-500 flex flex-col overflow-hidden border border-gray-800 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] relative">
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-gray-950/80 backdrop-blur-md text-orange-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-orange-500/20 flex items-center gap-1">
          <Tag size={10} /> {item.category}
        </span>
      </div>

      {/* Image */}
      <div className="h-64 w-full bg-gray-800/30 overflow-hidden flex justify-center items-center p-6 hover:bg-gray-800/50 transition-colors duration-500">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-2 flex justify-between items-center">
          <div className="flex items-center gap-1 text-orange-400">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-gray-400">
              {item.rating.rate}
            </span>
            <span className="text-xs font-bold  flex mx-3 py-1 gap-1 px-1 border border-orange-500 rounded-4xl text-white bg-orange-500 ">
              <User size={15} />
              {item.rating.count}
            </span>
          </div>
          <p className="text-white text-xl font-black">${item.price}</p>
        </div>
        <Link to={`/product/${item.id}`}>
          <h2 className="text-lg font-bold text-gray-100 line-clamp-1 group-hover:text-orange-400 transition-colors">
            {item.title}
          </h2>
        </Link>

        <div className="flex gap-3 mt-auto pt-6">
          {isInCart ? (
            <button
              disabled
              className="flex-4 bg-gray-800/50 text-gray-500 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest border border-gray-800 cursor-not-allowed flex items-center justify-center gap-2"
            >
              In Cart
            </button>
          ) : (
            <button
              onClick={() => onAdd(item)}
              className="flex-4 bg-orange-500 text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
          )}

          {/* Remove/X Icon Button - Balanced and Centered */}
          <button
            onClick={() => onRemove(item.id)}
            className="flex-1 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/20 flex items-center justify-center"
            title="Remove"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
