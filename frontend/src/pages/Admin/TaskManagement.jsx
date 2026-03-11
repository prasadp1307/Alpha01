import React, { useEffect, useState } from 'react';
import { getTasks, getEmployees, createTask, deleteTask } from '../../services/api';
import { Plus, Trash2, CheckCircle, Clock, AlertTriangle, Loader2, Calendar } from 'lucide-react';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', assignedTo: '', priority: 'Medium', dueDate: '' });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [tData, eData] = await Promise.all([getTasks(), getEmployees()]);
            setTasks(tData.data);
            setEmployees(eData.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTask(formData);
            setShowModal(false);
            fetchData();
            setFormData({ title: '', description: '', assignedTo: '', priority: 'Medium', dueDate: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create task');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(id);
            fetchData();
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    const getPriorityStyle = (p) => {
        if (p === 'High') return 'text-red-400 bg-red-500/10 border-red-500/20';
        if (p === 'Medium') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-black text-main tracking-tight">Mission <span className="text-primary-500">Control</span></h2>
                    <p className="text-muted mt-1">Distribute objectives and monitor deployment status.</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)} 
                    className="btn-primary flex items-center gap-2 px-6 py-3 rounded-2xl group shadow-2xl"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span>Post New Task</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {tasks.map((task) => (
                    <div key={task._id} className="glass-card flex flex-col group hover:border-white/20">
                        <div className="p-6 flex-1">
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getPriorityStyle(task.priority)}`}>
                                    {task.priority} Priority
                                </span>
                                <button onClick={() => handleDelete(task._id)} className="text-slate-700 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            
                            <h3 className="text-lg font-black text-main mb-2 leading-tight group-hover:text-primary-400 transition-colors">{task.title}</h3>
                            <p className="text-muted text-sm font-medium line-clamp-3 leading-relaxed mb-6">{task.description}</p>
                            
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-white/5 border-dashed">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center font-bold text-[10px] text-white">
                                        {task.assignedTo?.name?.[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-main capitalize">{task.assignedTo?.name}</span>
                                        <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Assignee</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-muted px-3 py-1 bg-slate-950/50 rounded-lg border border-white/5">
                                <Calendar size={14} className="text-primary-500" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest ${
                                task.status === 'Completed' ? 'border-green-500/20 text-green-500 bg-green-500/5' :
                                task.status === 'In Progress' ? 'border-blue-500/20 text-blue-500 bg-blue-500/5' : 'border-slate-800 text-slate-600 bg-slate-900/50'
                            }`}>
                                <Clock size={12} />
                                <span>{task.status}</span>
                            </div>
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
                        
                        <h3 className="text-2xl font-black mb-2">Create <span className="text-primary-500">Objective</span></h3>
                        <p className="text-slate-500 mb-8">Set the parameters for this task deployment.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input type="text" placeholder="Objective Title" required className="glass-input w-full" 
                                value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                            <textarea placeholder="Mission details and requirements..." className="glass-input w-full h-32 resize-none" 
                                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                            <div className="grid grid-cols-2 gap-4">
                                <select required className="glass-input appearance-none bg-slate-900"
                                    value={formData.assignedTo} onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}>
                                    <option value="">Choose Agent...</option>
                                    {employees.map(e => <option key={e._id} value={e._id}>{e.name}</option>)}
                                </select>
                                <select className="glass-input appearance-none bg-slate-900"
                                    value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                                    <option value="Low">Low Priority</option>
                                    <option value="Medium">Medium Priority</option>
                                    <option value="High">High Priority</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Mission Deadline</label>
                                <input type="date" required className="glass-input w-full" 
                                    value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} />
                            </div>
                            <button type="submit" className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-lg mt-6 shadow-xl">
                                <Plus size={20} />
                                <span>Deploy Task</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskManagement;
