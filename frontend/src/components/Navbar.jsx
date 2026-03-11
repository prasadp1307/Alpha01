import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Activity, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="h-16 glass-card border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                    <Activity className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
                    Alpha<span className="text-primary-400 font-black">EMS</span>
                </h1>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                <button 
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-300 active:scale-95"
                    title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="hidden sm:flex items-center gap-3 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/60 hover:bg-slate-800/60 px-4 py-2 rounded-2xl border border-white/5 transition-all text-sm group">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <div className="flex flex-col">
                        <span className="font-bold text-main leading-none">{user?.name}</span>
                        <span className="text-[10px] text-muted font-medium uppercase tracking-widest mt-1 group-hover:text-primary-400 transition-colors">{user?.role}</span>
                    </div>
                </div>
                <button 
                    onClick={logoutUser}
                    className="flex items-center gap-2 p-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 active:scale-95"
                    title="Sign Out"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
