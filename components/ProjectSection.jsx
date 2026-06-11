"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FolderGit2, Terminal, Globe, Laptop, Smartphone } from "lucide-react";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0);

  const projectsList = [
    {
      id: "operant",
      title: "OPERANT.AI",
      subtitle: "AI Security & Agentic Runtime Defense Platform",
      color: "bg-[#7c3aed]", // Lavender Purple from image_4925c4.jpg
      textColor: "text-white",
      githubLink: "https://github.com/chhari07/OPERANT.ai",
      liveLink: "https://operantai.netlify.app/",
      tech: ["LangChain Loop", "Firebase Firestore", "LLM Orchestration", "Cloud Security"],
      summary: "Designed an autonomous runtime protection framework centered around modern LLM orchestration and cloud security guardrails.",
      metrics: [
        "Engineered asynchronous telemetry pipeline using live stream triggers.",
        "Built multi-tenant database pathways to securely isolate data state graphs.",
        "Implemented adaptive security workflows for threat mitigation & tool-calling."
      ],
      // Desktop Preview Card (op_ai_desktop_view.png)
      desktopMock: (
        <div className="w-full h-full bg-[#0b1120] border border-white/10 p-2 flex flex-col justify-between font-sans select-none text-[8px] text-zinc-400">
          <div className="flex items-center justify-between border-b border-white/5 pb-1 bg-white/5 px-2 rounded-md">
            <div className="flex items-center gap-1 scale-90 origin-left">
              <div className="w-1.5 h-1.5 rounded-sm bg-purple-400" />
              <span className="text-[7px] font-bold text-white tracking-tight">OPERANT.ai</span>
            </div>
            <div className="flex gap-1.5 text-[5px] text-zinc-400 font-mono scale-75">
              <span>Agent Engine</span>
              <span>Pipelines</span>
              <span>Architecture</span>
            </div>
          </div>
          <div className="text-center py-1">
            <h5 className="text-[11px] font-extrabold text-white tracking-tight leading-none">OPERANT.ai</h5>
            <p className="text-[5px] text-zinc-400 max-w-[140px] mx-auto leading-tight mt-0.5">Discover breathtaking workflows across pipelines.</p>
          </div>
          <div className="flex justify-center gap-1 pb-0.5 scale-90">
            <span className="text-[5px] bg-white text-zinc-950 font-bold px-1.5 py-0.5 rounded-sm">Plan Agents</span>
          </div>
        </div>
      ),
      // Mobile Preview Overlay (op_ai_mobileview.png)
      mobileMock: (
        <div className="w-full h-full bg-[#0b1120] p-1.5 flex flex-col justify-between font-sans text-white select-none">
          <div className="flex justify-between border-b border-white/5 pb-0.5 text-[6px]">
            <span className="font-bold">OPERANT.ai</span>
            <span className="text-[5px] text-zinc-500">☰</span>
          </div>
          <div className="text-center my-auto space-y-0.5">
            <div className="text-[9px] font-black leading-tight">OPERANT.ai</div>
            <div className="text-[4px] text-zinc-400 max-w-[50px] mx-auto leading-tight">Hassle-free autonomous operations.</div>
          </div>
          <div className="bg-white text-black font-bold text-center text-[4px] py-0.5 rounded-sm">Launch Console</div>
        </div>
      )
    },
    {
      id: "rentit",
      title: "Rent It",
      subtitle: "Vehicle Rental Platform",
      color: "bg-[#ff6b8b]", // Coral Rose from image_4925c4.jpg
      textColor: "text-white",
      githubLink: "https://github.com/chhari07/RENT-IT",
      liveLink: "https://rentitcom.netlify.app/",
      tech: ["MERN Stack", "Tailwind CSS", "Framer Motion"],
      summary: "Developed a modular peer-to-peer vehicle rental application complete with dynamic, custom-filtered search capabilities.",
      metrics: [
        "Integrated robust identity authorization guards.",
        "Created step-by-step reservation paths.",
        "Deployed state-driven interface updates for fluid interactivity."
      ],
      // Desktop Preview Card (rentit_desktop_view.png)
      desktopMock: (
        <div className="w-full h-full bg-[#050505] border border-zinc-900 p-2 flex flex-col justify-between text-white font-sans relative overflow-hidden">
          <div className="flex justify-between items-center text-[7px] font-extrabold border-b border-zinc-900 pb-1">
            <span className="tracking-tighter">RENT IT</span>
            <div className="flex gap-1 text-zinc-400 text-[5px] scale-90">
              <span className="text-amber-400">Home</span>
              <span>Vehicles</span>
            </div>
          </div>
          <div className="text-center py-1">
            <h5 className="text-[12px] font-serif font-black tracking-tight leading-none text-white">RENT IT</h5>
            <div className="text-[6px] font-bold text-white mt-0.5">Your Journey, <span className="text-amber-400">Your Rules</span></div>
          </div>
          <div className="w-full h-0.5 bg-zinc-900 rounded-full" />
        </div>
      ),
      // Mobile Preview Overlay (rent_it_mobileview.png)
      mobileMock: (
        <div className="w-full h-full bg-[#050505] p-1.5 flex flex-col justify-between text-white font-sans">
          <div className="flex justify-between items-center text-[6px] font-bold border-b border-zinc-900 pb-0.5">
            <span>RENT IT</span>
            <span>☰</span>
          </div>
          <div className="my-auto text-center scale-90">
            <div className="text-[8px] font-serif font-black">RENT IT</div>
            <div className="text-[4px] text-amber-400 font-bold">Your Rules</div>
          </div>
          <div className="bg-amber-400 text-black text-center text-[4px] font-bold py-0.5 rounded-sm">Book Now</div>
        </div>
      )
    },
    {
      id: "mnews",
      title: "M-News App",
      subtitle: "Next.js News Platform",
      color: "bg-[#a3e635]", // Sage Green from image_4925c4.jpg
      textColor: "text-zinc-950",
      githubLink: "https://github.com/chhari07/manadtimes",
      liveLink: "https://manad.vercel.app/",
      tech: ["Next.js", "React.js", "API Endpoints", "SSR Runtime"],
      summary: "Created a real-time news application utilizing server-side rendering (SSR) and automated layout routing parameters.",
      metrics: [
        "Integrated fast data aggregation endpoints.",
        "Hydrates and displays categorized live global event indexes efficiently.",
        "Optimized layout components for zero structural shifting."
      ],
      // Desktop Preview Card (mnews_desktop.png)
      desktopMock: (
        <div className="w-full h-full bg-black border border-zinc-900 p-2 flex flex-col justify-between text-zinc-200 font-sans relative overflow-hidden">
          <div className="flex justify-center bg-zinc-950 border border-zinc-900/60 rounded-full py-0.5 max-w-[90px] mx-auto scale-90">
            <div className="flex gap-1.5 text-[4px] text-zinc-400">
              <span>Home</span>
              <span className="text-white font-bold">News</span>
            </div>
          </div>
          <div className="text-center py-1">
            <h5 className="text-[10px] font-extrabold text-white tracking-tight font-serif leading-none">मांद Times</h5>
            <p className="text-[4px] text-zinc-400 italic mt-0.5">&quot;आज की खबरें, कल के विचार&quot;</p>
          </div>
          <div className="w-full bg-zinc-900 h-1.5 rounded-full" />
        </div>
      ),
      // Mobile Preview Overlay (mnew_mobile.png)
      mobileMock: (
        <div className="w-full h-full bg-black p-1.5 flex flex-col justify-between text-zinc-200 font-sans border border-zinc-900">
          <div className="flex justify-center bg-zinc-950 rounded-full py-0.5 max-w-[50px] mx-auto scale-75">
            <span className="text-[4px] text-white">News</span>
          </div>
          <div className="text-center my-auto scale-95">
            <div className="text-[8px] font-bold text-white font-serif">मांद Times</div>
          </div>
          <div className="bg-purple-500 w-2 h-2 rounded-full mx-auto" />
        </div>
      )
    },
    {
      id: "recipe",
      title: "Recipe Share DB",
      subtitle: "Media Database Platform",
      color: "bg-[#1e1e1f]", // Charcoal from image_4925c4.jpg
      textColor: "text-white",
      githubLink: "https://github.com/chhari07/all_recipe_app",
      liveLink: "https://all-recipe-app.vercel.app/",
      tech: ["MERN Stack", "Paginated Arrays", "Keyword Lookup Filters"],
      summary: "Designed a full-stack media database platform featuring paginated result arrays, document uploads, and keyword lookup filters.",
      metrics: [
        "Engineered lightweight query execution maps.",
        "Configured secure document ingestion routing rules.",
        "Responsive grid matrix scaling configurations."
      ],
      // Desktop Preview Card (recipe_desktop.png)
      desktopMock: (
        <div className="w-full h-full bg-white border border-zinc-200 p-2 flex flex-col justify-between text-zinc-900 font-sans relative overflow-hidden">
          <div className="flex items-center justify-between bg-black text-white px-1.5 py-0.5 rounded text-[5px] scale-90 origin-left">
            <span className="italic font-bold">All Recipes 🥄</span>
          </div>
          <div className="text-center py-1">
            <h5 className="text-[9px] font-black text-zinc-900 leading-none">Welcome to <span className="text-emerald-500">ALL RECIPES</span></h5>
            <p className="text-[7px] font-bold text-zinc-800 mt-0.5">around your product ?</p>
          </div>
          <div className="w-full h-1 bg-zinc-100 rounded" />
        </div>
      ),
      // Mobile Preview Overlay (recipe_mobile.png)
      mobileMock: (
        <div className="w-full h-full bg-white p-1 flex flex-col justify-between text-zinc-900 font-sans border border-zinc-200">
          <div className="w-2 h-2 rounded-full bg-zinc-900 mx-auto" />
          <div className="text-center my-auto scale-75 origin-center">
            <div className="text-[7px] font-black">ALL RECIPES</div>
          </div>
          <div className="h-1 bg-zinc-200 rounded-full" />
        </div>
      )
    }
  ];

  return (
    <section id="projects" className="w-full bg-[#0c0c0e] py-24 px-4 md:px-16 border-b border-[#1c1c1f] font-handwritten select-none">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Module HUD Header */}
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-500 tracking-widest block uppercase"> SYSTEM_DEPLOYMENT_REPOSITORIES</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">Featured Frameworks</h2>
        </div>

        {/* =========================================================================
            BENTO GRID MATRIX SYSTEM (Directly captures image_4925c4.jpg layout)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          
          {/* LEFT COLUMN: Project Bento Cards with Dual-View Device Mockups (2/3 width) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:col-span-2">
            {projectsList.map((proj, idx) => {
              const isSelected = activeProject === idx;
              return (
                <div
                  key={proj.id}
                  onMouseEnter={() => setActiveProject(idx)}
                  onClick={() => setActiveProject(idx)}
                  className={`${proj.color} ${proj.textColor} p-6 rounded-3xl min-h-[380px] flex flex-col justify-between transition-all duration-300 transform cursor-pointer relative overflow-hidden shadow-2xl ${
                    isSelected ? "ring-4 ring-white scale-[1.01] z-10" : "opacity-75 md:opacity-60 hover:opacity-95"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-30 pointer-events-none" />

                  {/* Header Strip */}
                  <div className="flex items-center justify-between relative z-10 w-full">
                    <div className="bg-black/10 px-2.5 py-1 rounded text-[9px] uppercase font-bold tracking-wider">
                      Repository_0{idx + 1}
                    </div>
                    <FolderGit2 size={15} className="opacity-60" />
                  </div>

                  {/* =========================================================================
                      SCREENSHOT WRAPPER PLATES LAYER: Direct multi-device template overlay
                      ========================================================================= */}
                  <div className="w-full h-36 my-4 relative z-10 rounded-xl overflow-visible">
                    
                    {/* 💻 Desktop Screen Plate Module (Positioned Left Bottom Corner) */}
                    <div className="absolute left-0 bottom-0 w-[72%] h-[82%] bg-[#121214] rounded-lg border border-white/10 shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.01]">
                      {proj.desktopMock}
                    </div>

                    {/* 📱 Mobile Phone Device Frame Template (Positioned Right Top Corner) */}
                    <div className="absolute right-2 top-0 w-[24%] h-[90%] bg-[#08080a] rounded-xl border-2 border-[#2d2d30] shadow-2xl overflow-hidden transform rotate-2 transition-transform duration-300 hover:rotate-0 z-20 p-0.5">
                      <div className="w-full h-full rounded-lg overflow-hidden relative bg-black">
                        {proj.mobileMock}
                      </div>
                    </div>

                  </div>

                  {/* Identity Header Stack */}
                  <div className="space-y-1 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-display font-bold leading-none uppercase tracking-wide">
                      {proj.title}
                    </h3>
                    <p className="text-[10px] font-bold opacity-95 leading-none">
                      {proj.subtitle}
                    </p>
                  </div>

                  {/* =========================================================================
                      LEFT BOTTOM CORNER DESCRIPTION BADGES STRIP
                      ========================================================================= */}
                  <div className="flex flex-wrap gap-1 pt-3 relative z-10">
                    {proj.tech.slice(0, 3).map((t, tIdx) => (
                      <span key={tIdx} className="bg-black/15 text-[8px] font-bold px-2 py-0.5 rounded-sm whitespace-nowrap">
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Live Inspector Card Panel containing Action Links (1/3 width)
              ========================================================================= */}
          <div className="w-full lg:col-span-1">
            <div className="bg-[#141416] border-2 border-zinc-800 p-6 rounded-3xl h-full flex flex-col justify-between relative shadow-2xl overflow-hidden min-h-[420px]">
              
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "15px 15px"
                }}
              />

              <div className="space-y-4 relative z-10 w-full">
                {/* Tracker Sub-header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Terminal size={12} /> Project_Inspector</span>
                  <span className="text-emerald-500 animate-pulse">● Connected</span>
                </div>

                {/* Animated Node Log Output Terminal */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                        {projectsList[activeProject].title} Configuration
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                        {projectsList[activeProject].summary}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] text-zinc-600 block tracking-widest font-bold">SYSTEM_METRICS_LOG</span>
                      <ul className="space-y-1.5 text-[11px] text-zinc-300">
                        {projectsList[activeProject].metrics.map((metric, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-1.5 leading-tight">
                            <span className="text-zinc-600 shrink-0">└─</span>
                            <span>{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Buttons Link Footer Bar */}
              <div className="pt-6 relative z-10 border-t border-zinc-900 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
                
                {/* Source Code Git Link */}
                <a 
                  href={projectsList[activeProject].githubLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-xl transition-colors font-bold shadow-md"
                >
                  <Laptop size={12} />
                  <span>Codebase.git</span>
                  <ExternalLink size={10} />
                </a>

                {/* Live Sandbox Deploy Link */}
                <a 
                  href={projectsList[activeProject].liveLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] text-black bg-white hover:bg-zinc-200 px-3 py-2 rounded-xl transition-colors font-bold shadow-md"
                >
                  <Globe size={12} />
                  <span>Live_System</span>
                  <ExternalLink size={10} />
                </a>

              </div>

            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}