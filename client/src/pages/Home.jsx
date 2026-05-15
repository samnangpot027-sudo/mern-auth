import React from "react";
import Image from "./images/download.jpg";

const Home = () => {
  // 1. Move your card data into a clean, reusable array
  const products = [
    {
      id: 1,
      name: "iPhone Blue",
      price: 150,
      bg: "bg-blue-50",
      text: "text-blue-600",
      tag: "Blue Edition",
    },
    {
      id: 2,
      name: "iPhone Red",
      price: 150,
      bg: "bg-red-50",
      text: "text-red-600",
      tag: "Pro Red",
    },
    {
      id: 3,
      name: "iPhone Yellow",
      price: 150,
      bg: "bg-amber-50",
      text: "text-amber-600",
      tag: "Limited Yellow",
    },
    {
      id: 4,
      name: "iPhone Green",
      price: 150,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      tag: "Eco Green",
    },
    {
      id: 4,
      name: "iPhone Green",
      price: 150,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      tag: "Eco Green",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full md:w-[85%] max-w-7xl m-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-center text-3xl font-extrabold text-slate-800 mb-8 tracking-tight">
        Welcome to Auth App
      </h1>

      {/* 2. The Grid Container */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          /* 3. Reusable Card Wrapper */
          <div
            key={product.id}
            className="group relative bg-white border border-slate-100 flex flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              {/* Image Container with Dynamic background tints */}
              <div
                className={`relative w-full h-48 ${product.bg} rounded-xl overflow-hidden flex items-center justify-center`}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={Image}
                  alt={product.name}
                />
                {/* Micro-interaction: Wishlist Button */}
                <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-400 hover:text-rose-500 shadow-sm transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="mt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  {product.tag}
                </span>
                <h2 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                  {product.name}
                </h2>
              </div>
            </div>

            {/* Price & Call to Action Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-xl font-extrabold ${product.text}`}>
                ${product.price}
              </span>

              <button className="px-3 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-blue-600 active:scale-95 transition-all shadow-sm">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
