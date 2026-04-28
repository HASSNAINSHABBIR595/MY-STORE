import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
import emailjs from "@emailjs/browser";
import {
  CheckCircle2,
  User,
  Mail,
  CreditCard,
  ShoppingBag,
  Edit2,
  AlertTriangle,
  ArrowLeft,
  Truck,
  LoaderCircle,
  MapPin,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// --- Form Input Component ---
const Input = ({
  label,
  icon: Icon,
  error,
  colSpan = "col-span-1",
  ...props
}) => (
  <div className={`space-y-2 ${colSpan}`}>
    <label className="text-xs text-gray-500 uppercase font-bold tracking-wider">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
          size={18}
        />
      )}
      <input
        {...props}
        className={`w-full bg-gray-900 border ${
          error ? "border-red-500" : "border-gray-800"
        } ${Icon ? "pl-12" : "px-4"} py-4 rounded-2xl outline-none focus:border-orange-500 transition-all text-white`}
      />
    </div>
    {error && (
      <div className="flex items-center gap-2 text-red-500 text-xs px-2 pt-1 font-bold">
        <AlertTriangle size={14} /> This field is required
      </div>
    )}
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // --- States ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isOrdered, setIsOrdered] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  // --- Calculations ---
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.email.includes("@")) {
      setShowEmailError(true);
      return;
    }
    setShowEmailError(false);

    // EmailJS Parameters
    const templateParams = {
      user_name: `${formData.firstName} ${formData.lastName}`,
      user_email: formData.email,
      user_address: `${formData.address}, ${formData.city}`,
      order_items: cartItems
        .map((item) => `${item.title} (x${item.quantity || 1})`)
        .join(", "),
      total_amount: total.toFixed(2),
      order_id: `HD-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    // Send Email
    emailjs
      .send(
        "service_svbrk2c",
        "template_x04pkxa",
        templateParams,
        "xGM7DXZT8hVbfs-LQ",
      )
      .then((result) => {
        console.log("SUCCESS!", result.text);
        setIsOrdered(true);
        dispatch(clearCart());
        // Redirect home after 5 seconds
        setTimeout(() => navigate("/"), 5000);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        alert("Order sending failed. Check console for details.");
      });
  };

  // --- Success UI ---
  if (isOrdered) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 text-center">
        <div className="bg-gray-900 border border-gray-800 p-12 rounded-3xl max-w-md shadow-[0_20px_50px_-20px_rgba(249,115,22,0.3)]">
          <CheckCircle2
            size={100}
            className="text-orange-500 mx-auto mb-6 animate-pulse"
          />
          <h2 className="text-4xl font-black text-white mb-4">CONFIRMED!</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Thank you {formData.firstName}! Your order has been placed. Check
            your email for details.
          </p>
          <div className="flex items-center justify-center gap-2 text-orange-500">
            <LoaderCircle size={20} className="animate-spin" />
            <span className="text-sm font-bold uppercase tracking-widest">
              Redirecting home...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // --- Empty Cart UI ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 text-center">
        <div className="space-y-6">
          <ShoppingBag size={80} className="text-gray-800 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-500">
            Your cart is empty
          </h2>
          <Link
            to="/"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white pt-10 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Navigation / Progress */}
        <div className="flex items-center justify-between mb-16 border-b border-gray-900 pb-6">
          <Link
            to="/"
            className="text-orange-500 font-black text-2xl flex items-center gap-2 hover:opacity-80 transition-all"
          >
            <ArrowLeft size={20} className="text-gray-700" /> HASSNAIN{" "}
            <span className="text-white">DEV</span>
          </Link>
          <div className="hidden md:flex items-center gap-4 text-xs font-bold tracking-widest text-gray-700">
            <span>01 CART</span>
            <div className="w-8 h-[1px] bg-gray-900"></div>
            <span className="text-orange-500">02 CHECKOUT</span>
            <div className="w-8 h-[1px] bg-gray-900"></div>
            <span>03 FINISH</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr,1.2fr] gap-16 items-start">
          {/* LEFT: Forms */}
          <form onSubmit={handlePlaceOrder} className="space-y-12">
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500/10 p-3 rounded-2xl">
                  <Truck className="text-orange-500" size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  Billing Details
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  icon={User}
                  placeholder="Enter first name"
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  icon={User}
                  placeholder="Enter last name"
                  required
                />
                <Input
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                  type="email"
                  placeholder="hassnain@example.com"
                  error={showEmailError}
                  colSpan="col-span-2"
                  required
                />
                <Input
                  label="Street Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  icon={MapPin}
                  placeholder="House #, Street name..."
                  colSpan="col-span-2"
                  required
                />
                <Input
                  label="Town / City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Bahawalpur"
                  required
                />
                <Input
                  label="Zip Code"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  type="number"
                  placeholder="63100"
                  required
                />
              </div>
            </section>

            {/* Payment Selection */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-gray-500 uppercase tracking-[0.2em]">
                Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === "card" ? "border-orange-500 bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.1)]" : "border-gray-900 hover:border-gray-700"}`}
                >
                  <span
                    className={`font-bold ${paymentMethod === "card" ? "text-white" : "text-gray-500"}`}
                  >
                    Credit Card
                  </span>
                  <CreditCard
                    size={20}
                    className={
                      paymentMethod === "card"
                        ? "text-orange-500"
                        : "text-gray-700"
                    }
                  />
                </div>
                <div
                  onClick={() => setPaymentMethod("paypal")}
                  className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === "paypal" ? "border-orange-500 bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.1)]" : "border-gray-900 hover:border-gray-700"}`}
                >
                  <span
                    className={`font-bold ${paymentMethod === "paypal" ? "text-white" : "text-gray-500"}`}
                  >
                    PayPal
                  </span>
                  <div className="text-xs italic font-black text-gray-700">
                    Paypal
                  </div>
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-orange-950/20 active:scale-[0.98]"
            >
              Place Order Now — ${total.toFixed(2)}
            </button>
          </form>

          {/* RIGHT: Summary Sidebar */}
          <aside className="lg:sticky lg:top-10">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-[2rem] space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-gray-400 uppercase tracking-widest text-sm">
                  Order Summary
                </h3>
                <Link
                  to="/cart"
                  className="bg-gray-800 p-2 rounded-xl text-orange-500 hover:bg-orange-500 hover:text-white transition-all"
                >
                  <Edit2 size={16} />
                </Link>
              </div>

              {/* Scrollable Items Container */}
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start gap-4"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-600 uppercase font-black">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-orange-500">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-8 border-t border-gray-800 space-y-4">
                <div className="flex justify-between text-xs font-bold text-gray-600 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-gray-300">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-600 uppercase tracking-widest">
                  <span>Shipping & Tax</span>
                  <span className="text-gray-300">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-800">
                  <span className="text-xl font-black text-white uppercase tracking-tighter">
                    Total Due
                  </span>
                  <span className="text-3xl font-black text-orange-500">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-center text-gray-700 uppercase font-bold tracking-widest">
                🛡️ Encrypted & Secure Checkout
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
