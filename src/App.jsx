import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TrackerPage } from './pages/TrackerPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthPage } from './pages/AuthPage';
import { Header } from './components/Header';




export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [page, setPage] = useState('tracker');
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    
    useEffect(() => {
        const loggedInUser = sessionStorage.getItem('currentUser');
        if (loggedInUser) {
            setCurrentUser(loggedInUser);
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const transactionKey = currentUser ? `transactions-${currentUser}` : 'transactions-guest';
    const [transactions, setTransactions] = useLocalStorage(transactionKey, []);
    
    const [transactionToEdit, setTransactionToEdit] = useState(null);

    const handleSignup = (username, password, setError) => {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            setError('Username already exists.');
            return;
        }
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        setCurrentUser(username);
        sessionStorage.setItem('currentUser', username);
    };

    const handleLogin = (username, password, setError) => {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (!users[username] || users[username] !== password) {
            setError('Invalid username or password.');
            return;
        }
        setCurrentUser(username);
        sessionStorage.setItem('currentUser', username);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('currentUser');
    };

    const addTransaction = (transaction) => {
        setTransactions(prev => [...prev, transaction]);
    };

    const updateTransaction = (updatedTransaction) => {
        setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
        setTransactionToEdit(null);
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };
    
    const handleSetTransactionToEdit = (transaction) => {
        setTransactionToEdit(transaction);
        setPage('tracker');
        window.scrollTo(0, 0);
    };

    if (!currentUser) {
        return <AuthPage onLogin={handleLogin} onSignup={handleSignup} />;
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans 
        text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="container mx-auto p-4 md:p-8">
                <Header 
                    page={page}
                    setPage={setPage}
                    handleLogout={handleLogout}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />
                <main>
                    {page === 'tracker' ? (
                        <TrackerPage 
                            transactions={transactions} 
                            addTransaction={addTransaction}
                            updateTransaction={updateTransaction}
                            deleteTransaction={deleteTransaction}
                            transactionToEdit={transactionToEdit}
                            setTransactionToEdit={handleSetTransactionToEdit}
                        />
                    ) : (
                        <DashboardPage transactions={transactions} theme={theme} />
                    )}
                </main>
            </div>
        </div>
    );
}




