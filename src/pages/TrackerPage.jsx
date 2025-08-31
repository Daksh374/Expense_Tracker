import React, { useState, useMemo } from 'react';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { FilterControls } from '../components/FilterControls';

export const TrackerPage = ({ transactions, addTransaction, updateTransaction, deleteTransaction, setTransactionToEdit, transactionToEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');

    const processedTransactions = useMemo(() => {
        let filtered = [...transactions];

        // Search
        if (searchTerm) {
            filtered = filtered.filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Filter by type
        if (filterType !== 'all') {
            filtered = filtered.filter(t => t.type === filterType);
        }

        // Filter by category
        if (filterCategory !== 'all') {
            filtered = filtered.filter(t => t.category === filterCategory);
        }

        // Default sort by newest date
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        return filtered;
    }, [transactions, searchTerm, filterType, filterCategory]);

    return (
        <div className="space-y-8">
            <TransactionForm 
                onAddTransaction={addTransaction}
                onUpdateTransaction={updateTransaction}
                transactionToEdit={transactionToEdit}
                setTransactionToEdit={setTransactionToEdit}
            />
            <FilterControls 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterType={filterType}
                setFilterType={setFilterType}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
            />
            <TransactionList 
                transactions={processedTransactions} 
                onEdit={setTransactionToEdit} 
                onDelete={deleteTransaction}
            />
        </div>
    );
};



