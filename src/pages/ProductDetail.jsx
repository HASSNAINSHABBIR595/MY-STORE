import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addItem, removeItem } from "../features/cartSlice";
import ProductCard from "../components/ProductCard";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.products || { items: [] });
  const cartItems = useSelector((state) => state.cart.items);

  const product = items.find((item) => item.id === parseInt(id));

  const suggestions = items
    .filter(
      (item) => item.category === product?.category && item.id !== product?.id,
    )
    .slice(0, 4);

  const isInCart = cartItems.some((item) => item.id === product?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return;
  <div className="text-white p-20 text-center">Product Not Found!</div>;

  return (
    <div className="bg-gray-950 min-h-screen text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* back button */}

        <Link
          to={"/"}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-500 mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Products
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ">
          {/* left image  */}

          <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-10 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* right content */}
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
              {product.category}
            </span>
            <h1 className="text-4xl font-black mt-4 mb-6 leading-tight">
              {product.title}
            </h1>
            <div className="flex item-center gap-4 mg-8">
              <div className="flex items-center gap-1 text-orange-400 bg-orange-500/10 px-3 py-1 border border-orange-500/20">
                <Star size={16} fill="currentColor" />
                <span className="font-bold">
                  {" "}
                  {product.rating?.rate || "4.5"}
                </span>
              </div>
              <span className="text-gray-500 ">
                ({product.rating?.count || "120"} reviews)
              </span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="flex items-center gap-10 mb-10">
              <div className="text-4xl font-black text-white">
                ${product.price}
              </div>
              {isInCart ? (
                <button
                  disabled
                  className="bg-gray-800 text-gray-500 px-8 py-4 rounded-2xl font-bold cursor-not-allowed"
                >
                  In Cart
                </button>
              ) : (
                <button
                  onClick={() => dispatch(addItem(product))}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  <ShoppingCart size={22} /> ADD TO CART
                </button>
              )}
            </div>
          </div>
        </div>
        {/* suggestion section */}

        <div className="mt-32">
          <h2 className="text-2xl font-black mb-10 flex items-center gap-3">
            <span className="w-10 h01 bg-orange-500 rounded-full"></span>
            YOU MIGHT ALSO <span className="text-orange-500">LIKE</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {suggestions.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                isInCart={cartItems.some((c) => c.id === item.id)}
                onAdd={(data) => dispatch(addItem(data))}
                onRemove={(id) => dispatch(removeItem(id))}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
