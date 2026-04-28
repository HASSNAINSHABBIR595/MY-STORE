import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../features/cartSlice";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AddToCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Logic Fixes: Subtotal calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );
  const tax = subtotal * 0.1; // 10% Tax
  const total = subtotal + tax;

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black mb-10 flex items-center gap-3">
          <ShoppingBag className="text-orange-500" size={32} />
          YOUR <span className="text-orange-500">CART</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* 1. Items List Section */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 rounded-3xl flex flex-col sm:flex-row items-center gap-6 hover:border-gray-700 transition-all"
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-800 rounded-2xl p-2 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-lg font-bold text-white">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                    <p className="text-orange-400 font-bold mt-1">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity Input */}
                  <div className="flex items-center gap-3 bg-gray-950 px-4 py-2 rounded-2xl border border-gray-800">
                    <span className="text-xs text-gray-500 uppercase font-bold">
                      Qty
                    </span>
                    <input
                      type="number"
                      value={item.quantity || 1}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: parseInt(e.target.value || 1),
                          }),
                        )
                      }
                      min="1"
                      className="bg-transparent w-8 text-center font-bold text-white outline-none"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-dashed border-gray-800">
                <p className="text-gray-500">
                  Your cart is feeling a bit light...
                </p>
              </div>
            )}
          </div>

          {/* 2. Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 sticky top-10">
              <h2 className="text-xl font-bold mb-6 text-white">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Estimated Tax (10%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>

                <div className="border-t border-gray-800 pt-4 mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-black text-orange-500">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link to={"/checkout"}>
                <button className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
                  Checkout <ArrowRight size={20} />
                </button>
              </Link>

              <p className="text-[10px] text-gray-600 text-center mt-4 uppercase tracking-tighter">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
