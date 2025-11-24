import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, iconColorClass }) => (
    <div className="flex flex-col items-center text-center p-6 sm:p-8">
        <div className={`p-4 rounded-full ${iconColorClass} bg-opacity-10 mb-4`}>
            <Icon className={`w-8 h-8 ${iconColorClass}`} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
);

export default FeatureCard;
