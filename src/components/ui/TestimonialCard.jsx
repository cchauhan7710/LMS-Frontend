import React from 'react';

const TestimonialCard = ({ quote, name, title, avatar }) => {
  return (
    <div
      className="
        bg-white dark:bg-gray-800 
        p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 
        transition-all duration-300 ease-in-out
        hover:shadow-xl hover:-translate-y-2 hover:border-orange-500/40
      "
    >
      <div className="relative z-10">
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed italic transition-colors">
          “{quote}”
        </p>

        <div className="flex items-center">
          <img
            className="
              w-16 h-16 rounded-full mr-4 object-cover
              border-4 border-white dark:border-gray-700
              shadow-md
              transition-all duration-300
              hover:shadow-orange-400/40 hover:border-orange-500
            "
            src={avatar}
            alt={name}
          />

          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-base">
              {name}
            </p>
            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
