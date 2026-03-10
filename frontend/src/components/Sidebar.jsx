import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CheckSquare, Calendar, Clock, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'Admin';

    const links = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        ...(isAdmin ? [
            { name: 'Employees', path: '/employees', icon: <Users size={20} /> },
            { name: 'Manage Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
            { name: 'Leave Requests', path: '/leaves', icon: <Calendar size={20} /> },
            { name: 'Attendance logs', path: '/attendance', icon: <Clock size={20} /> },
        ] : [
            { name: 'My Tasks', path: '/tasks/my', icon: <CheckSquare size={20} /> },
            { name: 'Apply Leave', path: '/leaves/my', icon: <Calendar size={20} /> },
            { name: 'My Attendance', path: '/attendance/my', icon: <Clock size={20} /> },
        ])
    ];

    return (
        <aside className="w-64 glass-card border-r border-white/5 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="py-8 px-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-6 px-4">Main Menu</p>
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                                        isActive ? 'nav-link-active' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                                    }`
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                                    <span className="font-medium">{link.name}</span>
                                </div>
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="mt-auto p-4 mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-600/20 to-transparent border border-primary-500/10">
                    <p className="text-xs font-bold text-primary-400 mb-1">Alpha One Pro</p>
                    <p className="text-[10px] text-slate-500">Unified Management System v2.0</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
