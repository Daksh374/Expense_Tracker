import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ExpensePieChart } from '../components/charts/ExpensePieChart';

export const DashboardPage = ({ transactions, theme }) => {
    const { totalBalance, income, expense } = useMemo(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
        
        let totalBalance = 0;
        let income = 0;
        let expense = 0;

        transactions.forEach(t => {
            const tDate = new Date(t.date);
            if (t.type === 'income') {
                totalBalance += t.amount;
                if (tDate >= thirtyDaysAgo) {
                    income += t.amount;
                }
            } else {
                totalBalance -= t.amount;
                if (tDate >= thirtyDaysAgo) {
                    expense += t.amount;
                }
            }
        });
        return { totalBalance, income, expense };
    }, [transactions]);

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6 ">
                <StatCard title="Income" amount={income} icon={<TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />} color="bg-green-100 dark:bg-green-900/50" />
                <StatCard title="Expenses" amount={expense} icon={<TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />} color="bg-red-100 dark:bg-red-900/50" />
                <StatCard title="Total Balance" amount={totalBalance} icon={<TrendingUp className="h-6 w-6 text-blue-400" />} color="bg-blue-100 dark:bg-blue-900/50" />
            </div>
            <div className="flex justify-center pt-8">
                <ExpensePieChart transactions={transactions} theme={theme} />
            </div>
        </div>
    );
};


