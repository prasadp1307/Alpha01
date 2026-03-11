import React, { useEffect, useState } from 'react';
import { getLeaves, updateLeaveStatus } from '../../services/api';
import { Check, X, Calendar, User, Clock, Loader2, Filter } from 'lucide-react';

const LeaveManagement = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaves = async () => {
        try {
            const { data } = await getLeaves();
            setLeaves(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleStatus = async (id, status) => {
        try {
            await updateLeaveStatus(id, status);
            fetchLeaves();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    const getStatusStyle = (status) => {
        if (status === 'Approved') return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        if (status === 'Rejected') return 'bg-red-500/10 text-red-500 border-red-500/20';
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    };

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h2 className="text-3xl font-black text-main tracking-tight">Leave <span className="text-primary-500">Requests</span></h2>
                    <p className="text-muted mt-1">Review and manage employee absence applications.</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded-2xl border border-white/5">
                    <button className="px-4 py-2 rounded-xl bg-primary-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary-900/20">All Requests</button>
                    <button className="px-4 py-2 rounded-xl text-muted hover:text-main text-xs font-bold uppercase tracking-widest transition-colors">Pending</button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {leaves.map((leave) => (
                    <div key={leave._id} className="glass-card group relative">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center font-black text-primary-400">
                                        {leave.employeeId?.name?.[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-main group-hover:text-primary-400 transition-colors uppercase tracking-tight">{leave.employeeId?.name}</h3>
                                        <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1">{leave.type} Leave</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${getStatusStyle(leave.status)}`}>
                                    {leave.status}
                                </span>
                            </div>

                            <div className="bg-slate-950/40 border border-white/5 rounded-[1.5rem] p-6 mb-6">
                                <p className="text-main/80 text-sm leading-relaxed mb-6 font-medium italic">"{leave.reason}"</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary-500">
                                            <Calendar size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">From</span>
                                            <span className="text-xs font-bold text-main">{new Date(leave.startDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary-500">
                                            <Calendar size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">To</span>
                                            <span className="text-xs font-bold text-main">{new Date(leave.endDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {leave.status === 'Pending' && (
                                <div className="flex gap-3 mt-6">
                                    <button 
                                        onClick={() => handleStatus(leave._id, 'Approved')}
                                        className="flex-1 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-600/20 text-emerald-500 hover:text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        <Check size={14} className="group-hover/btn:scale-125 transition-transform" /> Approve
                                    </button>
                                    <button 
                                        onClick={() => handleStatus(leave._id, 'Rejected')}
                                        className="flex-1 bg-red-600/10 hover:bg-red-600 border border-red-600/20 text-red-500 hover:text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        <X size={14} className="group-hover/btn:scale-125 transition-transform" /> Reject
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary-500 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaveManagement;
