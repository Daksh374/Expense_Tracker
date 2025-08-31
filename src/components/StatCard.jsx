import React from 'react';

export const StatCard = ({ title, amount, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">₹{amount.toLocaleString('en-IN')}</p>
        </div>
    </div>
);

