"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Terminal, Layers, ArrowRight } from "lucide-react";

export default function Experience() {
  // Production chronology dataset hydrated from AMAN KUMAR CHHARI.pdf
  const positions = [
    {
      phase: "PHASE_01",
      stepName: "Research & Development",
      role: "Freelance Web Developer",
      company: "Self-Employed (Remote)",
      duration: "Feb 2023 – Present",
      tools: ["Git", "Figma", "React.js", "MERN Stack"],
      points: [
        "Engineering responsive, client-tailored web applications with an emphasis on performance optimization and security.",
        "Architecting intuitive user flows from initial requirements gathering down to structural interface staging and live hosting."
      ]
    },
    {
      phase: "PHASE_02",
      stepName: "System Scale & Optimization",
      role: "Web Development Intern",
      company: "Zidio Development (Remote)",
      duration: "Aug 2024 – sept 2024",
      tools: ["React.js", "Node.js", "MongoDB", "Express"],
      points: [
        "Developing real-time web solutions using React.js, Node.js, and MongoDB within full-stack production environments.",
        "Collaborating across engineering modules to design, build, test, and deploy scalable consumer applications.",
        "Implementing client-focused features, optimizing code delivery performance, and maintaining deployment health."
      ]
    }
  ];

  return (
    <section id="experience" className="w-full bg-[#0c0c0e] py-24 px-4 md:px-16 border-b border-[#1c1c1f] font-handwritten select-none text-white overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* =========================================================================
            HEADER TOOLBAR (Mirrors the top-right tool icon alignment from image_3d5c39.png)
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 tracking-widest block uppercase"> CHRONOLOGICAL_PRODUCT_JOURNEY</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">Journey Highlights</h2>
          </div>
          <div className="flex items-center gap-3 bg-[#141416] border border-zinc-800 px-4 py-2 rounded-xl text-xs text-zinc-400">
            <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Active_Stack:</span>
            <Terminal size={14} className="text-purple-400" />
            <Layers size={14} className="text-cyan-400" />
            <Briefcase size={14} className="text-emerald-400" />
          </div>
        </div>

        {/* =========================================================================
            THE STEP-BY-STEP HORIZONTAL STAGED TIMELINE (Directly captures image_3d5c39.png layout)
            ========================================================================= */}
        <div className="relative w-full overflow-x-auto no-scrollbar pb-6 pt-4">
          
          {/* Background Grid Incremental Lines */}
          <div className="absolute inset-x-0 top-16 bottom-0 grid grid-cols-2 pointer-events-none border-x border-dashed border-zinc-800/40">
            <div className="border-r border-dashed border-zinc-800/40 h-full w-full" />
          </div>

          {/* Flexible Row Flex Array */}
          <div className="flex flex-col md:flex-row items-stretch gap-6 min-w-full md:min-w-[800px]">
            {positions.map((pos, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex-1 bg-[#141416] border border-zinc-800/80 rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-xl relative group hover:border-zinc-700 transition-colors"
              >
                
                {/* Asymmetric Header Segment Rule mapping */}
                <div className="space-y-4">
                  
                  {/* Top Block Node: Filled Pill Capsule (Exact design match to image_3d5c39.png blocks) */}
                  <div className="flex items-center justify-between">
                    <div className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      {pos.stepName}
                    </div>
                    <span className="text-xs font-display text-zinc-600 tracking-widest font-bold">
                      {pos.phase}
                    </span>
                  </div>

                  {/* Core Professional Identity Meta */}
                  <div className="space-y-1 pt-2">
                    <h3 className="text-xl font-bold tracking-tight text-white font-sans">
                      {pos.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-zinc-400 font-medium">{pos.company}</span>
                      <span className="text-zinc-600 select-none">•</span>
                      <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
                        {pos.duration}
                      </span>
                    </div>
                  </div>

                  {/* Operational Capabilities List logs */}
                  <div className="pt-4 border-t border-zinc-900/80">
                    <ul className="space-y-2.5">
                      {pos.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-[11px] text-zinc-400 leading-relaxed flex items-start gap-2 font-sans font-medium">
                          <span className="text-zinc-700 shrink-0 mt-0.5">└─</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Footer Badges Array Sheet mapping */}
                <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-wrap gap-1.5 items-center justify-between w-full">
                  <div className="flex flex-wrap gap-1">
                    {pos.tools.map((tool, tIdx) => (
                      <span key={tIdx} className="bg-zinc-900 border border-zinc-800 text-zinc-500 text-[9px] px-2 py-0.5 rounded-sm font-sans">
                        {tool}
                      </span>
                    ))}
                  </div>
                  {idx < positions.length - 1 && (
                    <ArrowRight size={14} className="text-zinc-700 hidden md:block group-hover:translate-x-1 transition-transform" />
                  )}
                </div>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}