import React from 'react';
import { UsersIcon } from '../icons/IconLibrary';

const CourseCard = ({ course, onAddToCart, onBuyNow }) => {
  const {
    title,
    description,
    price,
    category,
    level,
    enrollmentCount,
    isBestseller,
    isNew,
    thumbnail
  } = course;

  const getPlaceholderStyle = () => ({
    bgColor: 'bg-orange-100 dark:bg-orange-900/40',
    textColor: 'text-orange-700 dark:text-orange-300',
  });

  const { bgColor, textColor } = getPlaceholderStyle();

  return (
    <div
      className="
        bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 
        flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group
      "
    >
      {/* ======================= */}
      {/* THUMBNAIL IMAGE FIXED ✔ */}
      {/* ======================= */}
      <div className="relative w-full h-44 overflow-hidden">
        <img
          src={
            thumbnail
              ? thumbnail
              : "https://placehold.co/600x400/FF7A00/FFFFFF?text=No+Thumbnail"
          }
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {(isBestseller || isNew) && (
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {isBestseller && (
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                Bestseller
              </span>
            )}
            {isNew && (
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                New
              </span>
            )}
          </div>
        )}
      </div>

      {/* ======================= */}
      {/* CARD CONTENT */}
      {/* ======================= */}
      <div className="p-6 flex flex-col grow overflow-hidden">
        <div className="grow">
          <span
            className="
              inline-block text-xs font-semibold px-3 py-1 mb-3 rounded-full 
              bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300
            "
          >
            {category}
          </span>

          <h3
            className="
              text-xl font-bold text-gray-900 dark:text-white mb-2 
              group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200
            "
          >
            {title}
          </h3>

          <p
            className="
              text-gray-600 dark:text-gray-400 text-sm mb-4 
              line-clamp-3 leading-relaxed
            "
          >
            {description}
          </p>
        </div>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <UsersIcon className="w-4 h-4 mr-2" />
          <span>{Number(enrollmentCount || 0).toLocaleString()} students</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-extrabold text-orange-600 dark:text-orange-400">
              ₹{Number(price || 0).toLocaleString()}
            </span>

            <span
              className="
                text-xs font-medium text-gray-600 bg-gray-100 dark:bg-gray-700 
                dark:text-gray-300 px-3 py-1 rounded-full
              "
            >
              {level}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              className="
                flex-1 bg-orange-600 text-white font-semibold py-2.5 rounded-lg shadow-md 
                hover:bg-orange-700 active:scale-[0.98] transition-all
              "
              onClick={() => onBuyNow(course)}
            >
              Enroll Now
            </button>

            <button
              className="
                flex-1 border-2 border-orange-200 dark:border-orange-700 text-orange-600 
                dark:text-orange-300 font-medium py-2.5 rounded-lg 
                hover:bg-orange-50 dark:hover:bg-orange-900/40 active:scale-[0.98] transition-all
              "
              onClick={() => onAddToCart(course)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
