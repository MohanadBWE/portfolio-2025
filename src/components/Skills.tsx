'use client';

import { motion } from 'framer-motion';

const skills = [
    "Python", "SQL", "Airflow", "dbt", "Pandas", "Spark",
    "AWS", "Docker", "PostgreSQL", "Redis", "Odoo", "Bash"
];

export default function Skills() {
    return (
        <section className="py-32 relative z-10">
            <div className="container max-w-4xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-white mb-16"
                >
                    Skills
                </motion.h2>

                <div className="flex flex-wrap justify-center gap-4">
                    {skills.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,255,157,0.1)", borderColor: "#00ff9d" }}
                            className="holo-tag text-lg px-6 py-3"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
}
