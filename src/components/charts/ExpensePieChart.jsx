import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];

export const ExpensePieChart = ({ transactions, theme }) => {
    const data = useMemo(() => {
        const expenseByCategory = transactions
            .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
            .reduce((acc, curr) => {
                acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
                return acc;
            }, {});
        
        return Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));
    }, [transactions]);

    if (data.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg w-full h-60 flex flex-col 
            items-center justify-center max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">This Month's Expense Breakdown</h3>
                <p className="text-gray-500 dark:text-gray-400">No expense data for this month.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg w-full h-104 flex 
        flex-col max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 
            text-center">This Month's Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                            borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb'
                        }}
                        formatter={(value) => `₹${value.toLocaleString('en-IN')}`} 
                    />
                    <Legend wrapperStyle={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}/>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={110}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};




