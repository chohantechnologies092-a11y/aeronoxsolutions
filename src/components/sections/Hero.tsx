"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, TrendingUp, Users, ShieldCheck, Activity, BarChart3, Globe2, X, CheckCircle2 } from 'lucide-react';
import { submitLead } from '@/lib/actions';

function Particles() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [particles, setParticles] = useState<any[]>([]);
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles(Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            size: Math.random() * 6 + 2, 
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            color: Math.random() > 0.5 ? '#24182e' : '#ffbe00',
            animX: Math.random() * 100 - 50,
            animY: Math.random() * 100 - 50
        })));
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0 }}
                    animate={{
                        x: [0, p.animX, 0],
                        y: [0, p.animY, 0],
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut"
                    }}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        boxShadow: `0 0 ${p.size * 3}px ${p.color}`
                    }}
                />
            ))}
        </div>
    );
}

function DashboardMockup() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto mt-16 relative"
        >
            {/* Glow behind dashboard */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-[#ffbe00]/20 to-[#24182e]/20 blur-[100px] -z-10" />

            {/* Dashboard Container */}
            <div className="rounded-t-3xl border border-gray-200/60 bg-white/40 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.08)] overflow-hidden relative" style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}>
                
                {/* Top Bar */}
                <div className="h-12 border-b border-gray-200/60 bg-white/50 flex items-center px-6 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <div className="ml-4 h-6 w-64 bg-white rounded-md border border-gray-100 flex items-center px-3">
                        <Globe2 size={12} className="text-gray-400 mr-2" />
                        <span className="text-[10px] text-gray-400 font-medium">aeronox-analytics.com</span>
                    </div>
                </div>

                {/* Dashboard Layout */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
                    
                    {/* Left Sidebar Stats */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#ffbe00]/10 flex items-center justify-center">
                                <TrendingUp size={24} className="text-[#ffbe00]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Organic Traffic</p>
                                <h4 className="text-2xl font-black text-gray-900">+342.5%</h4>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#24182e]/10 flex items-center justify-center">
                                <Activity size={24} className="text-[#24182e]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Conversion Rate</p>
                                <h4 className="text-2xl font-black text-gray-900">8.4%</h4>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <BarChart3 size={24} className="text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Domain Auth</p>
                                <h4 className="text-2xl font-black text-gray-900">76/100</h4>
                            </div>
                        </div>
                    </div>

                    {/* Main Chart Area */}
                    <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-gray-900">Revenue Growth</h3>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">+ $124k MRR</span>
                        </div>
                        {/* Fake Line Chart using SVG */}
                        <svg className="w-full h-48 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ffbe00" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#ffbe00" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <motion.path 
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                                d="M0,80 Q10,70 20,75 T40,50 T60,40 T80,20 T100,10" 
                                fill="none" 
                                stroke="#ffbe00" 
                                strokeWidth="3" 
                                strokeLinecap="round"
                            />
                            <motion.path 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 2.5 }}
                                d="M0,80 Q10,70 20,75 T40,50 T60,40 T80,20 T100,10 L100,100 L0,100 Z" 
                                fill="url(#gradient)" 
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

    const handleAnalyzeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (websiteUrl) {
            setIsModalOpen(true);
        }
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("phone", formData.phone);
            data.append("email", formData.email);
            data.append("message", formData.message);
            data.append("websiteUrl", websiteUrl);
            
            await submitLead(data);
            setIsSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setIsSuccess(false);
                setWebsiteUrl("");
                setFormData({ name: "", phone: "", email: "", message: "" });
            }, 3000);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-start bg-mesh px-4 md:px-6 pt-40 pb-0 overflow-hidden">
            {/* Animated Particles */}
            <Particles />

            {/* Floating UI Elements (Parallax effect) */}
            <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="hidden lg:flex absolute top-40 left-10 xl:left-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 items-center gap-3 z-20"
            >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <ShieldCheck className="text-emerald-500" size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Google Partner</p>
                    <p className="font-black text-gray-900 text-sm">Verified Agency</p>
                </div>
            </motion.div>

            <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="hidden lg:flex absolute top-60 right-10 xl:right-20 bg-[#24182e] p-4 rounded-2xl shadow-2xl items-center gap-3 z-20"
            >
                <div className="w-10 h-10 rounded-full bg-[#ffbe00] flex items-center justify-center">
                    <Users className="text-[#24182e]" size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-white/60 uppercase">Clients Scaled</p>
                    <p className="font-black text-white text-sm">250+ Brands</p>
                </div>
            </motion.div>

            <div className="container mx-auto max-w-5xl relative z-10 w-full flex flex-col items-center text-center">
                
                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-200 shadow-sm mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-[#ffbe00] animate-pulse" />
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.25em]">
                        The Ultimate Growth Engine
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-gray-950 leading-[1.05] tracking-tighter mb-6 relative"
                >
                    We Scale Brands To <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24182e] via-[#ffbe00] to-[#24182e] bg-300% animate-gradient relative inline-block">
                        Total Domination.
                        {/* Underline swoosh */}
                        <svg className="absolute w-full h-4 -bottom-2 left-0 text-[#ffbe00]" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <motion.path 
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                d="M0,10 Q50,20 100,5" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="4" 
                                strokeLinecap="round" 
                            />
                        </svg>
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-medium"
                >
                    Data-driven SEO, Performance Ads, and Content Architecture. We don&apos;t just increase traffic—we multiply your revenue.
                </motion.p>

                {/* Domain Audit Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="w-full max-w-2xl mb-4 relative z-30"
                >
                    <form 
                        onSubmit={handleAnalyzeSubmit}
                        className="relative flex items-center w-full bg-white rounded-full border-2 border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden transition-all focus-within:border-[#ffbe00] focus-within:shadow-[0_20px_60px_rgba(255,190,0,0.15)] p-2"
                    >
                        <div className="pl-6 text-gray-400">
                            <Search size={24} />
                        </div>
                        <input 
                            type="url" 
                            placeholder="https://yourwebsite.com" 
                            required
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            className="w-full bg-transparent border-none outline-none px-4 py-4 text-gray-900 text-lg placeholder:text-gray-300 font-medium"
                        />
                        <button 
                            type="submit"
                            className="shrink-0 bg-gray-950 hover:bg-[#24182e] text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                            Analyze Now
                            <ArrowRight size={16} />
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 font-bold mt-4">100% Free Audit. No Credit Card Required.</p>
                </motion.div>

            </div>

            {/* Dashboard Mockup Layer */}
            <DashboardMockup />

            {/* Lead Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                            onClick={() => !isSubmitting && setIsModalOpen(false)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#050505] border border-white/10 rounded-3xl p-8 z-[101] shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col"
                        >
                            {isSuccess ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-10 text-center gap-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <CheckCircle2 size={32} className="text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Request Received</h3>
                                    <p className="text-white/60">Our team will contact you soon with your free audit.</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white tracking-tight mb-1">Let's Get Started</h3>
                                            <p className="text-sm text-white/50">Enter your details below to receive your free audit for <span className="text-[#ffbe00] font-medium">{websiteUrl}</span></p>
                                        </div>
                                        <button 
                                            onClick={() => setIsModalOpen(false)}
                                            className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    
                                    <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">Full Name</label>
                                            <input 
                                                type="text" required
                                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#ffbe00]/50 focus:bg-white/10 transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">Phone Number</label>
                                            <input 
                                                type="tel" required
                                                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#ffbe00]/50 focus:bg-white/10 transition-all"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">Email Address</label>
                                            <input 
                                                type="email" required
                                                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#ffbe00]/50 focus:bg-white/10 transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 block">Message (Optional)</label>
                                            <textarea 
                                                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#ffbe00]/50 focus:bg-white/10 transition-all min-h-[100px] resize-none"
                                                placeholder="Tell us about your goals..."
                                            />
                                        </div>
                                        
                                        <button 
                                            type="submit" disabled={isSubmitting}
                                            className="w-full bg-[#ffbe00] hover:bg-[#ffbe00]/90 text-black font-bold py-4 rounded-xl mt-4 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? "Submitting..." : "Get Free Audit"}
                                            {!isSubmitting && <ArrowRight size={18} />}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
