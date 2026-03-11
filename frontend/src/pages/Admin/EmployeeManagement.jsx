import React, { useEffect, useState } from 'react';
import { getEmployees, createEmployee, deleteEmployee } from '../../services/api';
import { Plus, Trash2, Loader2, UserPlus, Search, Filter, MoreHorizontal } from 'lucide-react';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', department: '', designation: '' });
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            const { data } = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEmployee(formData);
            setShowModal(false);
            fetchEmployees();
            setFormData({ name: '', email: '', password: '', department: '', designation: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create employee');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            await deleteEmployee(id);
            fetchEmployees();
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-main tracking-tight">Employee <span className="text-primary-500">Directory</span></h2>
                    <p className="text-muted mt-1">Manage and monitor your team member profiles.</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center gap-2 px-6 py-3 rounded-2xl group"
                >
                    <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
                    <span>Hire Employee</span>
                </button>
            </div>

            <div className="glass-card rounded-[2rem] overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/[0.02]">
                    <div className="relative flex-1 w-full max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name, email or department..." 
                            className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-12 pr-4 py-2 text-sm text-main focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-muted"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-xl bg-slate-950/50 border border-white/5 text-slate-400 hover:text-white transition-colors">
                            <Filter size={18} />
                        </button>
                        <button className="p-2 rounded-xl bg-slate-950/50 border border-white/5 text-slate-400 hover:text-white transition-colors">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-muted text-[11px] uppercase tracking-[0.2em] font-black border-b border-white/5 bg-white/[0.01]">
                                <th className="px-8 py-5">Full Name</th>
                                <th className="px-8 py-5">Corporate Email</th>
                                <th className="px-8 py-5">Department</th>
                                <th className="px-8 py-5">Current Design.</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {employees.map((emp) => (
                                <tr key={emp._id} className="text-slate-300 hover:bg-white/[0.03] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center font-bold text-xs text-primary-400">
                                                {emp.name.split(' ').map(n=>n[0]).join('')}
                                            </div>
                                            <span className="font-bold text-main group-hover:text-primary-400 transition-colors uppercase tracking-tight">{emp.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 font-medium text-muted">{emp.email}</td>
                                    <td className="px-8 py-5">
                                        <span className="bg-slate-800/50 border border-white/5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            {emp.department || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-muted font-medium">{emp.designation || 'Active Member'}</td>
                                    <td className="px-8 py-5 text-right">
                                        <button 
                                            onClick={() => handleDelete(emp._id)} 
                                            className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="glass-card w-full max-w-lg rounded-[2.5rem] p-10 animate-fade-in relative">
                        <div className="absolute top-8 right-8">
                            <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors">
                                <Plus className="rotate-45" size={24} />
                            </button>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">Onboard <span className="text-primary-500">Talent</span></h3>
                        <p className="text-slate-500 mb-8">Fill in the professional details to create a new profile.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Full Name" required className="glass-input" 
                                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                <input type="email" placeholder="Email Address" required className="glass-input" 
                                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                            </div>
                            <input type="password" placeholder="Secure Password" required className="glass-input w-full" 
                                value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Department" className="glass-input" 
                                    value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
                                <input type="text" placeholder="Designation" className="glass-input" 
                                    value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} />
                            </div>
                            <button type="submit" className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-lg mt-6 shadow-xl">
                                <UserPlus size={20} />
                                <span>Register Member</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;
