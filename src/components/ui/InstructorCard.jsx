import React from 'react';
import { ArrowRightIcon } from '../icons/IconLibrary';

function InstructorCard({ name, title, bio, avatar, onLearnMore }) {
  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 text-center flex flex-col items-center">
      <img className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary-200 dark:border-primary-700 object-cover" src={avatar} alt={name} />

      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-primary-600 dark:text-primary-400 font-semibold mb-4">{title}</p>
      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        {bio}
      </p>

      <button
        onClick={onLearnMore}
        className="
          mt-4 inline-flex items-center gap-2
          bg-primary-600 
          text-gray-900 dark:text-white
          font-medium py-2 px-5 rounded-lg
          hover:bg-primary-700 transition
        "
      >
        Learn More <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default InstructorCard;
