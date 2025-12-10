'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const experiences = [
    {
        id: "ntu",
        year: "2024",
        role: "Data Systems Supervisor",
        company: "Northern Technical University",
        details: [
            "Supervised HEPIQ unit leading 17 academic staff.",
            "Managed 6000+ student records across 260 subjects.",
            "Automated certification workflows saving 6+ hours/day."
        ]
    },
    {
        id: "yakdar",
        year: "2024",
        role: "Data Engineer",
        company: "YakDar NGO",
        details: [
            "Managed 20k+ environmental data points.",
            "Built robust field operation reporting systems.",
            "Pipeline design for tree planting data."
        ]
    },
    {
        id: "sulav",
        year: "2023",
        role: "Production Manager",
        company: "Sulav Poultry",
        details: [
            "Directed 120+ workers & 20k daily units.",
            "Optimized yield via raw material analysis.",
            "Enforced QC protocols & automated daily reports."
        ]
    },
    {
        id: "uod",
        year: "2021",
        role: "Top Graduate",
        company: "Univ. of Duhok",
        details: [
            "Rank #1 in College of Agricultural Engineering.",
            "Specialized in biological systems engineering.",
            "Foundation in data analysis & research."
        ]
    }
];

export default function ExperienceTimeline() {
    const [selectedExp, setSelectedExp] = useState<typeof experiences[0] | null>(null);

    return (
        <section id="experience" className="py-32 relative z-10">
            <div className="container max-w-4xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-4xl font-bold text-white mb-16 border-l-4 border-primary pl-6"
                >
                    Working Experience
                </motion.h2>

                <div className="space-y-4">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                            whileHover={{ scale: 1.02, borderColor: "rgba(0, 255, 157, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedExp(exp)}
                            className="holo-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 group cursor-pointer"
                        >
                            <div className="w-full md:w-auto">
                                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                                <p className="text-sm md:text-base text-text-muted font-mono">{exp.company}</p>
                            </div>
                            <span className="text-3xl md:text-4xl font-bold text-white/5 group-hover:text-white/20 transition-colors self-end md:self-auto">{exp.year}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* MODAL POPUP */}
            <AnimatePresence>
                {selectedExp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedExp(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-surface border border-primary/20 p-8 rounded-2xl max-w-lg w-full relative shadow-[0_0_50px_rgba(0,255,157,0.1)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedExp(null)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white"
                            >
                                ✕
                            </motion.button>

                            <h3 className="text-3xl font-bold text-white mb-2 ml-1">{selectedExp.role}</h3>
                            <p className="text-primary font-mono mb-6 ml-1 flex items-center gap-2">
                                {selectedExp.company} <span className="text-white/20">|</span> {selectedExp.year}
                            </p>

                            <ul className="space-y-3">
                                {selectedExp.details.map((point, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-3 text-text-muted"
                                    >
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
