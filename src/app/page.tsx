"use client";

import Hero from "../components/Hero";
import ExperienceTimeline from "../components/ExperienceTimeline";
import Skills from "../components/Skills";
import InteractiveBackground from "../components/InteractiveBackground";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-primary/30">
      <InteractiveBackground />

      {/* Scrollable Content Layer */}
      <div className="relative z-10">
        <Hero />
        <ExperienceTimeline />
        <Skills />

        <footer className="py-20 text-center text-white/30 text-sm">
          <p>SYSTEM ONLINE // MOHANAD-V3</p>
        </footer>
      </div>
    </main>
  );
}
