import React, { useState } from 'react';
import { TrendingUp, TrendingDown, MoreVertical, Edit, Trash2 } from 'lucide-react';

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const TransactionItem = ({ transaction, onEdit, onDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const isIncome = transaction.type === 'income';

    return (
        <li className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${isIncome ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}>
                    {isIncome ? <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" /> : <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />}
                </div>
                <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category} &bull; {formatDate(transaction.date)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <p className={`font-bold text-lg ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {isIncome ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                </p>
                <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-lg shadow-xl z-10 border dark:border-gray-600">
                            <button onClick={() => { onEdit(transaction); setMenuOpen(false); }} 
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
                                <Edit className="h-4 w-4 mr-2" /> Edit
                            </button>
                            <button onClick={() => { onDelete(transaction.id); setMenuOpen(false); }} 
                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};




