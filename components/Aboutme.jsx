"use client";
import React from "react";
import { Terminal, Pin, CheckSquare, Sparkles, Award } from "lucide-react";

export default function AboutMe() {
  return (
    <section id="about" className="w-full bg-[#121212] py-16 md:py-20 px-4 md:px-16 relative z-10 font-mono">
      <div className="max-w-5xl mx-auto">
        
        {/* =========================================================================
            THE HAND-DRAWN GRID NOTEBOOK CONTAINER
            ========================================================================= */}
        <div className="bg-[#f0eff4] text-zinc-900 border-4 border-zinc-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-4 py-8 sm:p-6 md:p-12 relative overflow-hidden transform -rotate-0.5 md:-rotate-0.5">
          
          {/* Blueprint Engineering Graph Paper Grid Backing */}
          <div 
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #0044ff 1px, transparent 1px),
                linear-gradient(to bottom, #0044ff 1px, transparent 1px)
              `,
              backgroundSize: "22px 22px",
            }}
          />

          {/* Left Binder Margin Sheet Rule Line */}
          <div className="absolute left-6 sm:left-12 md:left-16 top-0 bottom-0 w-[2px] bg-red-400 opacity-40 pointer-events-none" />

          {/* Decorative Masking Tape Effect on Top Right */}
          <div className="absolute -top-3 right-12 w-24 h-8 bg-amber-100/60 border border-amber-200/80 shadow-sm mix-blend-multiply transform rotate-12 pointer-events-none hidden sm:block border-dashed" />

          {/* =========================================================================
              FOREGROUND SHEET ARCHITECTURE
              ========================================================================= */}
          <div className="pl-6 sm:pl-12 md:pl-12 relative z-10 space-y-6 md:space-y-8">
            
            {/* Header Stamp Box */}
            <div className="space-y-1">
              <div className="bg-zinc-900 text-white px-2.5 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider w-fit rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] flex items-center gap-1.5 transform -rotate-1">
                <Pin size={11} className="rotate-45" />
                <span>ABOUT ME:</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-zinc-900 pt-1 leading-tight">
                AMAN KUMAR CHHARI
              </h2>
            </div>

            {/* Core Bio Description Paragraph */}
            <p className="text-xs md:text-sm text-zinc-800 leading-relaxed max-w-3xl font-medium border-l-2 border-zinc-400 pl-3 md:pl-4 border-dashed">
              I am a <strong className="text-black font-bold">Full-Stack Developer & Agentic AI Engineer</strong> pursuing my B.Tech in Computer Science. Operating at the intersection of <strong className="underline decoration-zinc-900 underline-offset-4 font-bold">Product Design & Technical Development (UI + Developer)</strong>, I design intuitive user workflows and engineer complex backend engines under unified project ownership. My specialization centers on architecting autonomous engineering frameworks and asynchronous streaming pipelines built around <strong className="text-black font-bold">Agentic AI Architecture, LangChain, and LangGraph</strong>, transforming rapid product concepts into production-grade, highly optimized software architectures.
            </p>

            {/* =========================================================================
                THE RESUME SKILLS GRID WORKSPACE
                ========================================================================= */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">
                <Terminal size={12} />
                <span>COMPILED_TECHNICAL_INVENTORY</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* Panel 1: AI & Core Framework Runtimes */}
                <div className="bg-white/80 border-2 border-zinc-900 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors">
                  <h3 className="text-xs font-bold text-zinc-900 uppercase border-b-2 border-zinc-900 pb-1.5 mb-3 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-purple-600" />
                    <span>Agentic AI & Core Frameworks</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-700 font-bold">
                    <li className="flex items-center gap-1.5">
                      <CheckSquare size={12} className="text-zinc-900 shrink-0" />
                      <span>Agentic AI Architecture</span> 
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckSquare size={12} className="text-zinc-900 shrink-0" />
                      <span>LangChain</span> 
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckSquare size={12} className="text-zinc-900 shrink-0" />
                      <span>LangGraph</span> 
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckSquare size={12} className="text-zinc-900 shrink-0" />
                      <span>Next.js / React</span> 
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckSquare size={12} className="text-zinc-900 shrink-0" />
                      <span>Node.js / Express</span> 
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckSquare size={12} className="text-zinc-900 shrink-0" />
                      <span>Flask</span> 
                    </li>
                  </ul>
                </div>

                {/* Panel 2: Storage Architecture & System Ecosystems */}
                <div className="bg-white/80 border-2 border-zinc-900 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors">
                  <h3 className="text-xs font-bold text-zinc-900 uppercase border-b-2 border-zinc-900 pb-1.5 mb-3 flex items-center gap-1.5">
                    <Terminal size={13} className="text-emerald-600" />
                    <span>Databases & Ecosystem Tools</span>
                  </h3>
                  <ul className="space-y-2 text-[11px] text-zinc-700 font-bold">
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0">└─</span>
                      <span><span className="text-zinc-900">Databases:</span> MongoDB, Firebase Firestore, SQL</span> 
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0">└─</span>
                      <span><span className="text-zinc-900">Version Ops:</span> Git, GitHub Enterprise Infrastructure</span> 
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0">└─</span>
                      <span><span className="text-zinc-900">Design Matrices:</span> Figma Workspaces, Canva Studio</span> 
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* =========================================================================
                FOOTER BLUEPRINT WIDGET: HACKATHON OUTPUT PERFORMANCE LOG
                ========================================================================= */}
            <div className="bg-zinc-200/60 border-2 border-zinc-900 border-dashed rounded-lg p-3 max-w-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-bold text-zinc-700">
              <div className="flex items-center gap-2">
                <Award size={13} className="text-amber-600 shrink-0" />
                <span>ENGINEERING EVALUATION OUTPUT:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="bg-zinc-900 text-white px-2 py-0.5 rounded-sm whitespace-nowrap">National Finalist // HackGSon</span> 
                <span className="bg-zinc-300 border border-zinc-400 px-2 py-0.5 rounded-sm text-zinc-900 whitespace-nowrap">SIH Semi-Finalist</span> 
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
