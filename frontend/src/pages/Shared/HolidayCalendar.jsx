import React from 'react';
import { Calendar, Star, Compass, Award } from 'lucide-react';

const HolidayCalendar = () => {
    const holidays = [
        { date: 'Jan 01', name: 'New Year\'s Day', type: 'Public' },
        { date: 'Jan 26', name: 'Republic Day', type: 'National' },
        { date: 'Mar 14', name: 'Holi Festival', type: 'Public' },
        { date: 'Aug 15', name: 'Independence Day', type: 'National' },
        { date: 'Oct 02', name: 'Gandhi Jayanti', type: 'National' },
        { date: 'Oct 20', name: 'Diwali Break', type: 'Public' },
        { date: 'Dec 25', name: 'Christmas Day', type: 'Public' },
    ];

    return (
        <div className="animate-fade-in">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-main tracking-tight">Holiday <span className="text-primary-500">Calendar</span></h2>
                <p className="text-muted mt-2">Annual schedule of company and national observances.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {holidays.map((holiday, index) => (
                    <div key={index} className="glass-card group relative hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex flex-col items-center justify-center font-black">
                                    <span className="text-primary-500 text-xs uppercase tracking-tighter">{holiday.date.split(' ')[0]}</span>
                                    <span className="text-main text-xl">{holiday.date.split(' ')[1]}</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                    holiday.type === 'National' 
                                    ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' 
                                    : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                }`}>
                                    {holiday.type}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-main mb-2 group-hover:text-primary-400 transition-colors uppercase tracking-tight">
                                {holiday.name}
                            </h3>
                            <p className="text-sm text-muted font-medium mb-6">Enjoy your well-deserved break with friends and family.</p>
                            
                            <div className="flex items-center gap-2 text-primary-500/60 font-black text-[10px] uppercase tracking-[0.2em] pt-4 border-t border-white/5">
                                <Star size={12} />
                                <span>Company Observed</span>
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 w-24 h-24 bg-primary-500/5 blur-3xl -z-10 group-hover:bg-primary-500/10 transition-colors" />
                    </div>
                ))}
            </div>
            
            <div className="mt-12 glass-card p-10 bg-gradient-to-br from-primary-600/10 to-transparent flex flex-col md:flex-row items-center gap-8 border border-primary-500/20">
                <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-2xl shadow-primary-500/40">
                    <Compass size={32} />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h4 className="text-2xl font-black text-main mb-2 italic">Looking for more downtime?</h4>
                    <p className="text-muted font-medium">Coordinate with your team lead through the Absence Center for additional personal leave requests.</p>
                </div>
                <button className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-3">
                    <Award size={20} />
                    <span>View Leave Policy</span>
                </button>
            </div>
        </div>
    );
};

export default HolidayCalendar;
