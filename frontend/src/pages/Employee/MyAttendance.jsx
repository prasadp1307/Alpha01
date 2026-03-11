import React, { useEffect, useState } from 'react';
import { getMyAttendance, markLogin, markLogout } from '../../services/api';
import { Clock, Calendar, CheckCircle2, PlayCircle, StopCircle, Loader2, ArrowUpRight } from 'lucide-react';

const MyAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchAttendance = async () => {
        try {
            const { data } = await getMyAttendance();
            setAttendance(data);
            const today = new Date().toISOString().split('T')[0];
            const todayAtt = data.find(a => a.date === today);
            setIsLoggedIn(!!todayAtt && !todayAtt.logoutTime);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleAttendance = async () => {
        try {
            if (isLoggedIn) await markLogout();
            else await markLogin();
            fetchAttendance();
        } catch (error) {
            alert('Action failed');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    return (
        <div className="animate-fade-in">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-main tracking-tight">Time <span className="text-primary-500">Tracker</span></h2>
                    <p className="text-muted mt-1">Monitor your daily activity and shift sessions.</p>
                </div>
                
                <button 
                    onClick={handleAttendance}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 ${
                        isLoggedIn 
                        ? 'bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' 
                        : 'bg-primary-600 hover:bg-primary-500 text-white'
                    }`}
                >
                    {isLoggedIn ? <StopCircle size={20} /> : <PlayCircle size={20} />}
                    {isLoggedIn ? 'Clock Out Now' : 'Clock In Now'}
                </button>
            </header>

            <div className="glass-card rounded-[2rem] overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3 text-slate-300">
                        <Clock size={20} className="text-primary-500" />
                         <span className="font-bold text-sm uppercase tracking-widest text-main">Recent Sessions</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                             <tr className="text-muted text-[11px] uppercase tracking-[0.2em] font-black border-b border-white/5 bg-white/[0.01]">
                                <th className="px-8 py-5">Shift Date</th>
                                <th className="px-8 py-5">Clock In</th>
                                <th className="px-8 py-5">Clock Out</th>
                                <th className="px-8 py-5">Net Duration</th>
                                <th className="px-8 py-5 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {attendance.map((log) => (
                                <tr key={log._id} className="text-slate-300 hover:bg-white/[0.03] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <Calendar size={16} className="text-slate-600 group-hover:text-primary-500 transition-colors" />
                                             <span className="font-bold text-main tracking-tight">{new Date(log.date).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="font-black text-emerald-500 bg-emerald-500/5 px-3 py-1 rounded-lg border border-emerald-500/10">
                                            {log.loginTime}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`font-black px-3 py-1 rounded-lg border ${
                                            log.logoutTime ? 'text-amber-500 bg-amber-500/5 border-amber-500/10' : 'text-slate-600 border-white/5'
                                        }`}>
                                            {log.logoutTime || '--:--'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 font-bold text-slate-400">
                                        {log.totalHours || 'Active...'}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            log.logoutTime ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-primary-500/10 text-primary-500 border-primary-500/20'
                                        }`}>
                                            <CheckCircle2 size={12} />
                                            {log.logoutTime ? 'Verified' : 'In Session'}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyAttendance;
