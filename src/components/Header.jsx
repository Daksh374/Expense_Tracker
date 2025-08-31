import React from 'react';
import { LogOut, Sun, Moon } from 'lucide-react';

export const Header = ({ page, setPage, handleLogout, theme, toggleTheme }) => {
    return (
        <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-sm rounded-2xl p-4 mb-8 sticky top-4 z-50">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoSbpWz8SUrRq7EZL-tE73XEN-oSUPFgA3KQ&s" 
                    alt="Logo" className='w-10 h-10 rounded-4xl' />
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Expense Tracker</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <nav className="bg-gray-100 dark:bg-gray-700 p-1.5 rounded-full">
                        <button onClick={() => setPage('tracker')} 
                        className={`px-5 py-1.5 text-sm font-semibold rounded-full transition-colors 
                            ${page === 'tracker' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                            Tracker
                        </button>
                        <button onClick={() => setPage('dashboard')} 
                        className={`px-5 py-1.5 text-sm font-semibold rounded-full transition-colors 
                        ${page === 'dashboard' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                            Dashboard
                        </button>
                    </nav>
                     <button onClick={toggleTheme} title="Toggle Theme" 
                     className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>
                    <button onClick={handleLogout} title="Logout" 
                    className="p-2 text-gray-500 dark:text-gray-400 hover:bg-red-100 
                    dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 rounded-full">
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};



