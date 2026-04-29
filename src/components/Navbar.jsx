import { ShoppingBag, ShoppingCart, Store } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import AddCartIcon from "./CartIcon";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur-md text-white shadow-2xl shadow-gray-950/70 border-b border-orange-900">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={"/"}>
          <div className="flex items-center space-x-3 cursor-pointer">
            <Store
              className="w-8 h-8 text-orange-400 drop-shadow-lg
            "
            />
            <h1 className="text-4xl font-extrabold tracking-widest uppercase">
              MY<span className="text-orange-400 ">STORE</span>
            </h1>
          </div>
        </Link>
        <Link to={"/product"}>
          <h2
            className="flex gap-3 bg-orange-500/10 
          border border-orange-400/50
          hover:bg-orange-500/20
          text-orange-400
          transition duration-200  shadow-lg cursor-pointer p-2 rounded-xl text- "
          >
            <ShoppingBag />
            Products
          </h2>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            className="relative p-3 bg-orange-500/10 rounded-xl hover:bg-orange-500/20 transition duration-200 border border-orange-400/50 shadow-lg cursor-pointer"
            to={"/cart"}
          >
            <AddCartIcon />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
