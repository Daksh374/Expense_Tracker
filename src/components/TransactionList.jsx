import React from 'react';
import { TransactionItem } from './TransactionItem';

export const TransactionList = ({ transactions, onEdit, onDelete }) => {
    if (transactions.length === 0) {
        return <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"><p className="text-gray-500 dark:text-gray-400">
            No transactions match the current filters.</p></div>
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Transactions</h2>
            <ul className="space-y-3">
                {transactions.map(t => <TransactionItem key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />)}
            </ul>
        </div>
    );
};




