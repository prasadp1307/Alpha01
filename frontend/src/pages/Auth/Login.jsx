import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Loader2, Mail, Lock, LogIn, Activity } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await login(formData);
            loginUser(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md animate-fade-in relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/20 mb-6 group hover:scale-110 transition-transform cursor-pointer">
                        <Activity className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Welcome <span className="text-primary-500">Back</span></h2>
                    <p className="text-slate-500 mt-2 text-center">Enter your credentials to access your management dashboard</p>
                </div>

                <div className="glass-card p-10 rounded-[2rem]">
                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-center gap-3 animate-shake">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input 
                                    type="email" 
                                    required 
                                    className="glass-input w-full pl-12"
                                    placeholder="name@company.com"
                                    value={formData.email} 
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 ml-1">Secure Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    required 
                                    className="glass-input w-full pl-12"
                                    placeholder="••••••••"
                                    value={formData.password} 
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-lg mt-8"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : (
                                <>
                                    <span>Sign in to Dashboard</span>
                                    <LogIn size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-500 font-medium">
                            Don't have an account? {' '}
                            <Link to="/signup" className="text-primary-500 hover:text-primary-400 font-bold underline transition-colors underline-offset-4">
                                Contact Admin
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
