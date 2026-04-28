import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const AddCartIcon = () => {
  const selector = useSelector((state) => state.cart.items);

  return (
    <div className="relative cursor-pointer">
      <ShoppingCart className="w-6 h-6 text-orange-400" />
      <span
        className="absolute -top-5 -right-4 border border-orange-400 w-5 h-5 rounded-full 
                 flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
      >
        {selector.length}
      </span>
    </div>
  );
};

export default AddCartIcon;
