import React from "react";

export default function CategoryCard({ navigate, category, icon: Icon, description }) {
  return (
    <div
      onClick={() => navigate(`/courses?category=${category}`)}
      className="
        group cursor-pointer
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-700
        rounded-2xl shadow-md hover:shadow-2xl
        p-8 text-center
        transform hover:-translate-y-3 transition-all duration-300 ease-in-out
        relative overflow-hidden
      "
    >
      {/* Glow effect background */}
      <div className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-linear-to-r from-orange-500/10 to-orange-600/10
        blur-xl transition-opacity duration-500
      "></div>

      {/* Icon */}
      <div
        className="
          relative w-20 h-20 mx-auto mb-6 flex items-center justify-center
          rounded-full
          bg-gradient-to-tr from-orange-500 to-orange-600
          text-white shadow-lg
          transition-transform duration-300 group-hover:scale-110
        "
      >
        <Icon className="w-10 h-10" />
      </div>

      {/* Title */}
      <h3 className="relative text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {category}
      </h3>

      {/* Description */}
      <p className="relative text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* Button */}
      <button
        className="
          relative bg-gradient-to-r from-orange-500 to-orange-600
          hover:from-orange-600 hover:to-orange-700
          text-white font-semibold py-2.5 px-8 rounded-full
          shadow-md hover:shadow-lg active:scale-95 transition-all
        "
      >
        Explore
      </button>
    </div>
  );
}
