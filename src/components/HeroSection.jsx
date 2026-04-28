import { Link } from "react-router";
import { ShoppingBag, ArrowRight, Star, Zap, ShieldCheck } from "lucide-react";
import img1 from "../assets/1.png";

const HeroSection = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero section here */}
      <section className="relative bg-gray-950 py-20 px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between ">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            {/* Changed gray-900 to white and #5b85a3 to orange-400 */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Upgrade Your <span className="text-orange-400">Lifestyle</span>{" "}
              Today
            </h1>
            {/* Changed gray-600 to gray-400 for better readability on dark bg */}
            <p className="text-gray-400 text-lg">
              Explore our latest collection of premium products. Quality meets
              affordability in every category. From beauty to tech, we've got
              you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start ">
              <Link
                to="/product"
                // Changed bg-[#5b85a3] to orange-500
                className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center
                gap-2 hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
              >
                <ShoppingBag size={20} /> Shop Now
              </Link>
              <button className="border-2 border-orange-400/50 text-orange-400 px-8 py-4 rounded-full flex font-bold items-center justify-center gap-2 hover:bg-orange-500/10 transition-all">
                Learn More <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative">
              {/* Added a subtle glow effect behind the image to match the navbar vibe */}

              <img
                src={img1}
                alt="Featured Product"
                className="relative rounded-2xl w-70 max-w-sm object-cover mt-10 "
              />
            </div>
          </div>
        </div>
      </section>

      {/* feature sections here */}
      <section className="py-20 w-full bg-gray-950 ">
        {/* Added px-6 to the inner container so it doesn't touch edges on mobile, but takes full space on desktop */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-6 space-y-4">
            <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-orange-400/20">
              <Zap className="text-orange-400" size={30} />
            </div>
            <h3 className="text-lg font-bold text-white">Fast Delivery</h3>
            <p className="text-gray-400">
              Get your products delivered at your doorstep within 24 hours.
            </p>
          </div>

          <div className="text-center p-6 space-y-4">
            <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-orange-400/20">
              <ShieldCheck className="text-orange-400" size={30} />
            </div>
            <h3 className="text-xl font-bold text-white"> Secure Payment</h3>
            <p className="text-gray-400">
              Your transactions are 100% secure and encrypted with us.
            </p>
          </div>

          <div className="text-center p-6 space-y-4">
            <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-orange-400/20">
              <Star className="text-orange-400" size={30} />
            </div>
            <h3 className="text-xl font-bold text-white"> Best Quality</h3>
            <p className="text-gray-400">
              We provide only the best and original products from top brands.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
