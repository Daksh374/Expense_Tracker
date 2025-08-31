import React from 'react';
import { Search } from 'lucide-react';

const allCategories = [
    ...new Set([ 
        'Food', 'Housing', 'Transport', 'Health', 'Shopping', 'Salary', 'Freelance', 'Other'
    ])
].sort();

export const FilterControls = ({ searchTerm, setSearchTerm, filterType, setFilterType, filterCategory, setFilterCategory }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg mb-8 space-y-4 
        md:space-y-0 md:flex md:items-center md:justify-between">
            
            <div className="relative w-full md:w-2/5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200
                     dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                />
            </div>

            {/* Filters */}
            <div className="flex items-center justify-end space-x-2">
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="p-3
                 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2
                  focus:ring-blue-500 text-sm text-gray-900 dark:text-gray-100">
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="p-3 bg-gray-50
                 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 
                 text-sm text-gray-900 dark:text-gray-100">
                    <option value="all">All Categories</option>
                    {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
        </div>
    );
};






