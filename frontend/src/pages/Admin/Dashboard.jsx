import React, { useEffect, useState } from 'react';
import { getEmployees, getTasks, getLeaves, getAttendance } from '../../services/api';
import { Users, CheckSquare, Calendar, Clock, Loader2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ employees: 0, tasks: 0, leaves: 0, attendance: 0 });
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [emp, task, leave, att] = await Promise.all([
                    getEmployees(), getTasks(), getLeaves(), getAttendance()
                ]);
                setStats({
                    employees: emp.data.length,
                    tasks: task.data.length,
                    leaves: leave.data.filter(l => l.status === 'Pending').length,
                    attendance: att.data.filter(a => a.date === new Date().toISOString().split('T')[0]).length
                });
                setActivities(att.data.slice(-5).reverse());
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    const cards = [
        { label: 'Total Employees', value: stats.employees, icon: <Users size={24} />, color: 'from-blue-600 to-blue-400', shadow: 'shadow-blue-500/20' },
        { label: 'Active Tasks', value: stats.tasks, icon: <CheckSquare size={24} />, color: 'from-violet-600 to-violet-400', shadow: 'shadow-violet-500/20' },
        { label: 'Pending Leaves', value: stats.leaves, icon: <Calendar size={24} />, color: 'from-amber-600 to-amber-400', shadow: 'shadow-amber-500/20' },
        { label: 'Today Online', value: stats.attendance, icon: <Clock size={24} />, color: 'from-emerald-600 to-emerald-400', shadow: 'shadow-emerald-500/20' },
    ];

    return (
        <div className="animate-fade-in">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-main tracking-tight">System <span className="text-primary-500">Overview</span></h2>
                <p className="text-muted mt-2">Manage your workforce activities and metrics in real-time.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div key={card.label} className="glass-card group hover:scale-[1.02] active:scale-[0.98]">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg ${card.shadow}`}>
                                    {card.icon}
                                </div>
                                <ArrowUpRight className="text-slate-700 group-hover:text-primary-500 transition-colors" size={20} />
                            </div>
                            <h4 className="text-4xl font-extrabold text-main mb-1">{card.value}</h4>
                            <p className="text-sm font-semibold text-muted tracking-wide uppercase">{card.label}</p>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800/50 rounded-b-2xl overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${card.color} w-2/3 opacity-50`} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-8">
                    <h3 className="text-xl font-bold text-main mb-6">Recent Activities</h3>
                    <div className="flex flex-col gap-4">
                        {activities.length > 0 ? activities.map((act, i) => (
                            <div key={act._id || i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary-400 font-bold border border-white/10">
                                    {act.employeeId?.name?.split(' ').map(n=>n[0]).join('') || '??'}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-main">
                                        {act.employeeId?.name || 'Unknown'} {act.logoutTime ? 'clocked out' : 'clocked in'}
                                    </p>
                                    <p className="text-xs text-muted">
                                        {act.logoutTime || act.loginTime} • {act.date}
                                    </p>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                                    act.logoutTime ? 'text-amber-500 bg-amber-500/10' : 'text-green-500 bg-green-500/10'
                                }`}>
                                    {act.logoutTime ? 'Logged Out' : 'Active'}
                                </span>
                            </div>
                        )) : (
                            <div className="p-8 text-center text-muted italic">No recent activity found.</div>
                        )}
                    </div>
                </div>
                <div className="glass-card p-8 bg-gradient-to-br from-primary-600/10 to-transparent">
                    <h3 className="text-xl font-bold text-main mb-6">Quick Links</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { name: 'Register Employee', path: '/employees' },
                            { name: 'Post Task', path: '/tasks' },
                            { name: 'Review Leaves', path: '/leaves' },
                            { name: 'Audit Logs', path: '/attendance' }
                        ].map(link => (
                            <Link 
                                key={link.name} 
                                to={link.path}
                                className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/40 hover:bg-primary-600/20 hover:border-primary-500/30 transition-all text-slate-300 hover:text-white font-medium group text-sm"
                            >
                                {link.name}
                                <ArrowUpRight size={16} className="text-muted group-hover:text-primary-400" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
