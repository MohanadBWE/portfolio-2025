'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Hero() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative pointer-events-none">
            <div className="container relative z-10 text-center">
                {/* 
                   Redesign: Cleaner, no background container. 
                   Massive typography with "Data Engineer" intersecting or glowing.
                */}

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative inline-block"
                >
                    {/* Main Name - Pure White */}
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference relative z-20">
                        MOHANAD <span className="text-primary">N.</span>
                    </h1>

                    {/* Subtitle - Overlapping/Behind styled text -> Resolved by moving it BELOW cleanly */}
                    <div className="md:-mt-4">
                        <p className="text-xl md:text-3xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent tracking-[0.5em] uppercase font-bold">
                            Data Engineer
                        </p>
                    </div>
                </motion.div>

                {/* CTAs - Clean Glass Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex justify-center gap-6 mt-16 pointer-events-auto"
                >
                    <motion.a
                        href="#experience"
                        whileHover={{ scale: 1.05, borderColor: "rgba(0, 184, 255, 0.5)", boxShadow: "0 0 20px rgba(0, 184, 255, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full backdrop-blur-md transition-all group relative overflow-hidden"
                    >
                        <span className="relative z-10 group-hover:text-accent transition-colors">View Work</span>
                        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.a>

                    {/* Contact Button triggers Modal with Effects */}
                    <motion.button
                        whileHover={{ scale: 1.05, borderColor: "rgba(0, 184, 255, 0.5)", boxShadow: "0 0 20px rgba(0, 184, 255, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsContactOpen(true)}
                        className="px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full backdrop-blur-md transition-all group relative overflow-hidden"
                    >
                        <span className="relative z-10 group-hover:text-accent transition-colors">Contact</span>
                        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent opacity-50" />
                <span className="text-[10px] text-white/30 tracking-widest uppercase">Scroll</span>
            </motion.div>

            {/* CONTACT MODAL */}
            <AnimatePresence>
                {isContactOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setIsContactOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-surface border border-primary/20 p-8 rounded-2xl max-w-md w-full relative shadow-[0_0_50px_rgba(0,255,157,0.1)] text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsContactOpen(false)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white"
                            >
                                ✕
                            </motion.button>

                            <h3 className="text-3xl font-bold text-white mb-8">Get In Touch</h3>

                            <div className="space-y-6">
                                {/* Email - Styled & Clickable */}
                                <div>
                                    <p className="text-sm text-text-muted uppercase tracking-widest mb-1">Email</p>
                                    <a
                                        href="mailto:mohanadbeduhi@gmail.com"
                                        className="text-xl md:text-2xl font-mono text-primary hover:text-accent transition-colors break-all"
                                    >
                                        mohanadbeduhi@gmail.com
                                    </a>
                                </div>

                                <div className="w-full h-px bg-white/10" />

                                {/* Phones */}
                                <div>
                                    <p className="text-sm text-text-muted uppercase tracking-widest mb-2">Phone</p>
                                    <p className="text-lg text-white font-mono">+964 (0)750- 351 - 9337</p>
                                    <p className="text-lg text-white font-mono mt-1">+964 (0)787- 051 - 9337</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <motion.a
                                    href="mailto:mohanadbeduhi@gmail.com"
                                    whileHover={{ scale: 1.02, backgroundColor: "#00b8ff" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-block w-full py-3 bg-primary text-black font-bold rounded-lg transition-colors"
                                >
                                    Send Email Now
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
