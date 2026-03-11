import React, { useEffect, useState } from 'react';
import { getAttendance } from '../../services/api';
import { Clock, Search, Filter, ArrowDownToLine, Loader2, MapPin } from 'lucide-react';

const AttendanceReport = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const { data } = await getAttendance();
                setAttendance(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h2 className="text-3xl font-black text-main tracking-tight">Pulse <span className="text-primary-500">Logs</span></h2>
                    <p className="text-muted mt-1">Real-time attendance tracking and session activity.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-white/5 hover:border-primary-500/50 text-slate-300 hover:text-white transition-all text-sm font-bold shadow-2xl">
                    <ArrowDownToLine size={18} className="text-primary-500" />
                    <span>Export Report</span>
                </button>
            </div>

            <div className="glass-card rounded-[2rem] overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center bg-white/[0.02] gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-600/10 flex items-center justify-center text-primary-500 border border-primary-500/10">
                            <Clock size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-main">Daily Logs</h3>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-muted text-[11px] uppercase tracking-[0.2em] font-black border-b border-white/5 bg-white/[0.01]">
                                <th className="px-8 py-5">Employee</th>
                                <th className="px-8 py-5">Shift Date</th>
                                <th className="px-8 py-5">Check In</th>
                                <th className="px-8 py-5">Check Out</th>
                                <th className="px-8 py-5">Total Hours</th>
                                <th className="px-8 py-5 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {attendance.map((log) => (
                                <tr key={log._id} className="text-slate-300 hover:bg-white/[0.03] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-[10px] text-primary-400">
                                                {log.employeeId?.name?.[0]}
                                            </div>
                                            <span className="font-bold text-main uppercase tracking-tight">{log.employeeId?.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 font-medium text-muted">{new Date(log.date).toLocaleDateString()}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-emerald-500 font-black">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            {log.loginTime}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-amber-500 font-black">
                                            {log.logoutTime ? (
                                                <>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                    {log.logoutTime}
                                                </>
                                            ) : '-'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-slate-400 font-bold">{log.totalHours || '0h'}</td>
                                    <td className="px-8 py-5 text-right">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            log.logoutTime ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-primary-500/10 text-primary-500 border-primary-500/20'
                                        }`}>
                                            {log.logoutTime ? 'Completed' : 'Active Session'}
                                        </span>
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

export default AttendanceReport;
