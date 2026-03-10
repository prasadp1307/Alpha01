import React, { useEffect, useState } from 'react';
import { getMyTasks, updateTaskStatus } from '../../services/api';
import { CheckSquare, Clock, AlertTriangle, Loader2, PlayCircle, CheckCircle2, MoreVertical, Calendar } from 'lucide-react';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const { data } = await getMyTasks();
            setTasks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleStatus = async (id, status) => {
        try {
            await updateTaskStatus(id, status);
            fetchTasks();
        } catch (error) {
            alert('Failed to update task');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    const getPriorityBorder = (p) => {
        if (p === 'High') return 'border-red-500/30';
        if (p === 'Medium') return 'border-amber-500/30';
        return 'border-emerald-500/30';
    };

    return (
        <div className="animate-fade-in">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-white tracking-tight">Mission <span className="text-primary-500">Board</span></h2>
                <p className="text-slate-500 mt-1">Objectives assigned by your lead. Focus and deliver excellence.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                    <div key={task._id} className={`glass-card flex flex-col group border-t-4 ${getPriorityBorder(task.priority)}`}>
                        <div className="p-8 flex-1">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Assigned By</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[8px] font-bold text-primary-500">{task.assignedBy?.name?.[0]}</div>
                                        <span className="text-xs font-bold text-slate-300">{task.assignedBy?.name}</span>
                                    </div>
                                </div>
                                <button className="text-slate-700 hover:text-white transition-colors"><MoreVertical size={16} /></button>
                            </div>

                            <h3 className="text-xl font-black text-white mb-2 leading-tight group-hover:text-primary-400 transition-colors">{task.title}</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{task.description}</p>

                            <div className="flex items-center gap-4 text-slate-400">
                                <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-xl border border-white/5">
                                    <Calendar size={14} className="text-primary-500" />
                                    <span className="text-[10px] font-black uppercase tracking-wider">{new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${
                                    task.status === 'Completed' ? 'border-green-500/20 text-green-500 bg-green-500/5' :
                                    task.status === 'In Progress' ? 'border-primary-500/20 text-primary-400 bg-primary-500/5' : 'border-slate-800 text-slate-600'
                                }`}>
                                    <Clock size={12} />
                                    <span>{task.status}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white/[0.02] border-t border-white/5 grid grid-cols-2 gap-3">
                            {task.status === 'To Do' && (
                                <button 
                                    onClick={() => handleStatus(task._id, 'In Progress')}
                                    className="col-span-2 bg-primary-600/10 hover:bg-primary-600 border border-primary-600/20 text-primary-400 hover:text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                                >
                                    <PlayCircle size={14} className="group-hover/btn:scale-110 transition-transform" /> Commence Mission
                                </button>
                            )}
                            {task.status === 'In Progress' && (
                                <button 
                                    onClick={() => handleStatus(task._id, 'Completed')}
                                    className="col-span-2 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-600/20 text-emerald-500 hover:text-white font-black uppercase tracking-widest text-[10px] py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                                >
                                    <CheckCircle2 size={14} className="group-hover/btn:scale-110 transition-transform" /> Mission Complete
                                </button>
                            )}
                            {task.status === 'Completed' && (
                                <div className="col-span-2 text-center py-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Objective Secured</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTasks;
