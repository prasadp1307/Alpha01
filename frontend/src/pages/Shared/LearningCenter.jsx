import React from 'react';
import { Youtube, ExternalLink, Cpu, Code, BarChart3, Globe } from 'lucide-react';

const LearningCenter = () => {
    const channels = [
        { 
            name: 'Fireship', 
            icon: <Code size={24} />, 
            link: 'https://www.youtube.com/@Fireship', 
            category: 'Development',
            description: 'High-intensity code tutorials for developers who want to ship fast.'
        },
        { 
            name: 'The Net Ninja', 
            icon: <Globe size={24} />, 
            link: 'https://www.youtube.com/@NetNinja', 
            category: 'Full Stack',
            description: 'Comprehensive web development tutorials from novice to pro ninja.'
        },
        { 
            name: 'StatQuest', 
            icon: <BarChart3 size={24} />, 
            link: 'https://www.youtube.com/@statquest', 
            category: 'Data Science',
            description: 'Breaking down complex statistics into easy-to-understand concepts.'
        },
        { 
            name: 'Computerphile', 
            icon: <Cpu size={24} />, 
            link: 'https://www.youtube.com/@computerphile', 
            category: 'Computer Science',
            description: 'Deep dives into the internal workings of computers and algorithms.'
        },
    ];

    return (
        <div className="animate-fade-in">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-main tracking-tight">Learning <span className="text-primary-500">Center</span></h2>
                <p className="text-muted mt-2">Curated high-quality resources to fuel your professional growth.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {channels.map((channel, index) => (
                    <a 
                        key={index} 
                        href={channel.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="glass-card group flex flex-col sm:flex-row items-center gap-6 p-8 hover:bg-white/[0.05] transition-all border border-white/5"
                    >
                        <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center text-primary-500 border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                            {channel.icon}
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                                <h3 className="text-xl font-bold text-main uppercase tracking-tight">{channel.name}</h3>
                                <div className="p-1 rounded bg-red-600/10 text-red-500">
                                    <Youtube size={14} />
                                </div>
                            </div>
                            <p className="text-sm text-muted font-medium mb-4 leading-relaxed">{channel.description}</p>
                            <div className="flex items-center justify-center sm:justify-start gap-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-400 bg-primary-500/10 px-2 py-1 rounded border border-primary-500/10">
                                    {channel.category}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-main transition-colors">
                                    Visit Channel <ExternalLink size={10} />
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="mt-12 p-8 rounded-[2rem] bg-slate-950/50 border border-white/5 text-center">
                <p className="text-muted text-sm italic">"The beautiful thing about learning is that no one can take it away from you."</p>
            </div>
        </div>
    );
};

export default LearningCenter;
