import React, { useEffect, useState } from 'react';
import { getMyLeaves, applyLeave } from '../../services/api';
import { Calendar, Plus, Loader2, Clock, CheckCircle, XCircle, FileText, Send } from 'lucide-react';

const MyLeaves = () => {
    const [leaves, setLeaves] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ startDate: '', endDate: '', type: 'Personal', reason: '' });
    const [loading, setLoading] = useState(true);

    const fetchLeaves = async () => {
        try {
            const { data } = await getMyLeaves();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await applyLeave(formData);
            setShowModal(false);
            fetchLeaves();
            setFormData({ startDate: '', endDate: '', type: 'Personal', reason: '' });
        } catch (error) {
            alert('Failed to apply for leave');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    const getStatusIcon = (status) => {
        if (status === 'Approved') return <CheckCircle size={18} className="text-emerald-500" />;
        if (status === 'Rejected') return <XCircle size={18} className="text-red-500" />;
        return <Clock size={18} className="text-amber-500" />;
    };

    const getStatusStyle = (status) => {
        if (status === 'Approved') return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        if (status === 'Rejected') return 'bg-red-500/10 text-red-500 border-red-500/20';
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    };

    return (
        <div className="animate-fade-in">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-main tracking-tight">Absence <span className="text-primary-500">Center</span></h2>
                    <p className="text-muted mt-1">Manage your leave applications and request status history.</p>
                </div>
                
                <button 
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl group shadow-2xl active:scale-95"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span>Apply for Leave</span>
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leaves.map((leave) => (
                    <div key={leave._id} className="glass-card group relative hover:border-white/20">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/5 bg-slate-900/50 text-slate-400`}>
                                    {leave.type}
                                </span>
                                <div className="p-2 rounded-xl bg-slate-950/50">
                                    {getStatusIcon(leave.status)}
                                </div>
                            </div>
                            
                            <p className="text-main/80 text-sm font-medium leading-relaxed mb-8 h-12 overflow-hidden line-clamp-2 italic group-hover:text-primary-400 transition-colors">
                                "{leave.reason}"
                            </p>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-muted font-black uppercase tracking-[0.2em] mb-1">Duration</span>
                                    <div className="flex items-center gap-2 text-primary-400 font-bold text-xs">
                                        <Calendar size={12} />
                                        <span>{new Date(leave.startDate).toLocaleDateString()}</span>
                                        <span className="text-muted/40 mx-1">→</span>
                                        <span>{new Date(leave.endDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] ${getStatusStyle(leave.status)}`}>
                            {leave.status}
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="glass-card w-full max-w-lg rounded-[2.5rem] p-10 animate-fade-in text-white relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
                            <Plus className="rotate-45" size={24} />
                        </button>
                        
                        <h3 className="text-2xl font-black mb-2">Request <span className="text-primary-500">Absence</span></h3>
                        <p className="text-slate-500 mb-8">Submit your absence request for administrative review.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <select required className="glass-input w-full appearance-none bg-slate-900" 
                                value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                                <option value="Personal">Personal Leave</option>
                                <option value="Sick">Medical / Sick Leave</option>
                                <option value="Vacation">Annual Vacation</option>
                            </select>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Start Date</label>
                                    <input type="date" required className="glass-input w-full" 
                                        value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">End Date</label>
                                    <input type="date" required className="glass-input w-full" 
                                        value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                                </div>
                            </div>
                            
                            <textarea placeholder="Briefly explain the reason for your absence..." required className="glass-input w-full h-32 resize-none" 
                                value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} />
                            
                            <button type="submit" className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-lg mt-6 shadow-xl">
                                <Send size={20} />
                                <span>Submit Request</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyLeaves;
