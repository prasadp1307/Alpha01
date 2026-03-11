import React, { useEffect, useState } from 'react';
import { getMyTasks, getMyLeaves, getMyAttendance, markLogin, markLogout } from '../../services/api';
import { CheckSquare, Calendar, Clock, Loader2, Play, Square, ArrowUpRight, Activity } from 'lucide-react';

const EmployeeDashboard = () => {
    const [stats, setStats] = useState({ tasks: 0, leaves: 0, attendance: 0 });
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [task, leave, att] = await Promise.all([
                    getMyTasks(), getMyLeaves(), getMyAttendance()
                ]);
                setStats({
                    tasks: task.data.filter(t => t.status !== 'Completed').length,
                    leaves: leave.data.filter(l => l.status === 'Approved').length,
                    attendance: att.data.length
                });
                
                const today = new Date().toISOString().split('T')[0];
                const todayAtt = att.data.find(a => a.date === today);
                setIsLoggedIn(!!todayAtt && !todayAtt.logoutTime);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const handleAttendance = async () => {
        try {
            if (isLoggedIn) await markLogout();
            else await markLogin();
            window.location.reload();
        } catch (error) {
            alert('Failed to update attendance');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    const cards = [
        { label: 'Pending Tasks', value: stats.tasks, icon: <CheckSquare size={24} />, color: 'from-violet-600 to-violet-400' },
        { label: 'Approved Leaves', value: stats.leaves, icon: <Calendar size={24} />, color: 'from-amber-600 to-amber-400' },
        { label: 'Total Logs', value: stats.attendance, icon: <Clock size={24} />, color: 'from-emerald-600 to-emerald-400' },
    ];

    return (
        <div className="animate-fade-in">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-main tracking-tight">Active <span className="text-primary-500">Workspace</span></h2>
                    <p className="text-muted mt-1">Ready to start your session? Track your milestones here.</p>
                </div>
                
                <button 
                    onClick={handleAttendance}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 ${
                        isLoggedIn 
                        ? 'bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' 
                        : 'bg-primary-600 hover:bg-primary-500 text-white shadow-primary-900/40'
                    }`}
                >
                    {isLoggedIn ? <Square size={20} /> : <Play size={20} />}
                    {isLoggedIn ? 'Clock Out' : 'Start Session'}
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div key={card.label} className="glass-card p-8 group hover:scale-[1.02]">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-xl`}>
                                {card.icon}
                            </div>
                            <Activity className="text-slate-800 group-hover:text-primary-500 transition-colors" size={20} />
                        </div>
                        <h4 className="text-4xl font-black text-main mb-1 tracking-tight">{card.value}</h4>
                        <p className="text-xs font-bold text-muted uppercase tracking-[0.2em]">{card.label}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <h3 className="text-xl font-bold text-main mb-6">Daily Affirmation</h3>
                    <div className="p-6 rounded-2xl bg-primary-600/5 border border-primary-500/10 italic">
                        <p className="text-muted leading-relaxed font-medium">"Innovation distinguishes between a leader and a follower. Your contributions today shape our collective future."</p>
                        <p className="text-primary-500 font-bold mt-4 text-sm">— Team Alpha Leadership</p>
                    </div>
                </div>
                
                <div className="glass-card p-8 bg-gradient-to-br from-indigo-600/10 to-transparent">
                    <h3 className="text-xl font-bold text-main mb-6">Upcoming Deadlines</h3>
                    <div className="space-y-4">
                        {[1, 2].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/40 group hover:border-primary-500/30 transition-all cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                                    <span className="text-sm font-bold text-main">Sprint Review Submissions</span>
                                </div>
                                <span className="text-[10px] font-black text-muted uppercase tracking-widest">In 2 Days</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
