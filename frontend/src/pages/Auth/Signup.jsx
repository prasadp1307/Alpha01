import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Loader2, User, Mail, Lock, UserPlus, Activity, ShieldCheck } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Employee' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await signup(formData);
            loginUser(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-1/2 h-1/2 bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-lg animate-fade-in relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/20 mb-6 group hover:scale-110 transition-transform cursor-pointer">
                        <Activity className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Access <span className="text-primary-500">Request</span></h2>
                    <p className="text-slate-500 mt-2 text-center">Join the Alpha One ecosystem and manage your workspace</p>
                </div>

                <div className="glass-card p-10 rounded-[2.5rem]">
                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary-500 transition-colors" size={16} />
                                    <input type="text" required className="glass-input w-full pl-10 py-2.5 text-sm" placeholder="John Doe"
                                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary-500 transition-colors" size={16} />
                                    <input type="email" required className="glass-input w-full pl-10 py-2.5 text-sm" placeholder="john@alpha.com"
                                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Secure Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary-500 transition-colors" size={16} />
                                <input type="password" required className="glass-input w-full pl-10 py-2.5 text-sm" placeholder="••••••••"
                                    value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                                <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500/50" size={16} />
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Select Your Role</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({...formData, role: 'Employee'})}
                                    className={`py-3 px-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest ${
                                        formData.role === 'Employee' 
                                        ? 'bg-primary-600/10 border-primary-500 text-primary-400 shadow-[0_0_20px_rgba(139,92,246,0.1)]' 
                                        : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/10'
                                    }`}
                                >
                                    Employee
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({...formData, role: 'Admin'})}
                                    className={`py-3 px-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest ${
                                        formData.role === 'Admin' 
                                        ? 'bg-primary-600/10 border-primary-500 text-primary-400 shadow-[0_0_20px_rgba(139,92,246,0.1)]' 
                                        : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/10'
                                    }`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-lg mt-6 shadow-xl"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : (
                                <>
                                    <span>Create Account</span>
                                    <UserPlus size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-500 font-medium">
                            Already part of the team? {' '}
                            <Link to="/login" className="text-primary-500 hover:text-primary-400 font-bold underline transition-all underline-offset-4">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
