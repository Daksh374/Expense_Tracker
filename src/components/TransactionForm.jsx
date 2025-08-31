import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';

const categories = {
    income: ['Salary', 'Freelance','Other'],
    expense: ['Food', 'Housing', 'Transport', 'Health', 'Shopping', 'Other']
};

export const TransactionForm = ({ onAddTransaction, onUpdateTransaction, transactionToEdit, setTransactionToEdit }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (transactionToEdit) {
            setDescription(transactionToEdit.description);
            setAmount(transactionToEdit.amount);
            setType(transactionToEdit.type);
            setCategory(transactionToEdit.category);
            setDate(transactionToEdit.date);
            setError('');
        } else {
            resetForm();
        }
    }, [transactionToEdit]);
    
    useEffect(() => {
        setCategory('');
    }, [type]);

    const resetForm = () => {
        setDescription('');
        setAmount('');
        setType('expense');
        setCategory('');
        setDate(new Date().toISOString().split('T')[0]);
        setTransactionToEdit(null);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount || !category || !date) {
            setError("Please fill out all fields.");
            return;
        }
        const newTransaction = {
            id: transactionToEdit ? transactionToEdit.id : Date.now(),
            description,
            amount: parseFloat(amount),
            type,
            category,
            date
        };
        
        if (transactionToEdit) {
            onUpdateTransaction(newTransaction);
        } else {
            onAddTransaction(newTransaction);
        }
        resetForm();
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{transactionToEdit ? 'Edit Transaction' : 'Add New Transaction'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-4xl">
                    <button type="button" onClick={() => setType('expense')} 
                    className={`px-4 py-2 text-lg font-semibold rounded-3xl cursor-pointer 
                    ${type === 'expense' ? 'bg-red-500 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>Expense</button>
                    <button type="button" onClick={() => setType('income')} 
                    className={`px-4 py-2 text-lg font-semibold rounded-3xl cursor-pointer 
                    ${type === 'income' ? 'bg-green-500 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>Income</button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} 
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200
                     dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100" />
                    <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} 
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2
                     focus:ring-blue-500 text-gray-900 dark:text-gray-100" />
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border
                     border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100">
                        <option value="" disabled>Select Category</option>
                        {categories[type].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border
                     border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100" 
                     style={{ colorScheme: 'dark' }} />
                </div>
                
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <div className="flex items-center justify-end space-x-3">
                    {transactionToEdit && <button type="button" onClick={resetForm} className="px-6 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300
                     bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500">Cancel</button>}
                    <button type="submit" className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow flex items-center">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        {transactionToEdit ? 'Update' : 'Add'} Transaction
                    </button>
                </div>
            </form>
        </div>
    );
};



