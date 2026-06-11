"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Layers, Code2, Database, HardDrive, ShieldCheck, Compass } from "lucide-react";

export default function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  const getEndPoint = (path) => {
    const values = path.match(/-?\d+\.?\d*/g);
    if (!values) return { x: 0, y: 0 };
    return {
      x: Number(values[values.length - 2]),
      y: Number(values[values.length - 1]),
    };
  };

  // Naming coordinates from image_4a067d.png optimized for responsive layout engines
  const taskbarApps = [
    {
      id: "ai",
      title: "agentic ai engine",
      icon: <Cpu className="w-5 h-5 text-purple-400 md:w-6 md:h-6" />,
      bgGradient: "from-purple-600 to-indigo-900",
      skills: ["Agentic AI Architecture", "LangChain Frameworks", "LangGraph State Graphs", "Flask Microservices"],
      arrowPath: "M 360 360 Q 200 400 120 450", 
      bubblePos: "md:left-[5%] md:top-[450px]",
      textPos: "md:left-[5%] md:top-[510px] text-left"
    },
    {
      id: "frontend",
      title: "UI & Presentation",
      icon: <Layers className="w-5 h-5 text-cyan-400 md:w-6 md:h-6" />,
      bgGradient: "from-sky-500 to-blue-600",
      skills: ["React.js Applications", "Next.js (App Router)", "Tailwind CSS Layouts", "Responsive Frontend UI"],
      arrowPath: "M 410 360 Q 320 440 310 490",
      bubblePos: "md:left-[26%] md:top-[490px]",
      textPos: "md:left-[21%] md:top-[550px] text-center"
    },
    {
      id: "backend",
      title: "Backend Core",
      icon: <Code2 className="w-5 h-5 text-emerald-400 md:w-6 md:h-6" />,
      bgGradient: "from-zinc-800 to-zinc-950",
      skills: ["Node.js Production Environment", "Express.js REST APIs", "Asynchronous Pipelines", "Server Optimization"],
      arrowPath: "M 460 340 Q 440 240 350 180",
      bubblePos: "md:left-[28%] md:top-[180px]",
      textPos: "md:left-[15%] md:top-[70px] md:text-right"
    },
    {
      id: "data",
      title: "Storage Systems",
      icon: <Database className="w-5 h-5 text-amber-400 md:w-6 md:h-6" />,
      bgGradient: "from-emerald-600 to-teal-800",
      skills: ["MongoDB Aggregations", "Firebase Firestore Streams", "SQL Database Architecture", "Vector Data Pathways"],
      arrowPath: "M 510 340 Q 530 240 600 180",
      bubblePos: "md:right-[28%] md:top-[180px]",
      textPos: "md:right-[15%] md:top-[50px] text-left"
    },
    {
      id: "ops",
      title: "DevOps & Tooling",
      icon: <HardDrive className="w-5 h-5 text-orange-400 md:w-6 md:h-6" />,
      bgGradient: "from-orange-500 to-red-600",
      skills: ["Git Distributed Version", "GitHub Code Repository", "Figma Product Mockups", "Canva Layout Graphic"],
      arrowPath: "M 560 340 Q 640 260 740 190",
      bubblePos: "md:right-[15%] md:top-[190px]",
      textPos: "md:right-[5%] md:top-[40px] text-left"
    },
    {
      id: "architecture",
      title: "Product Execution",
      icon: <ShieldCheck className="w-5 h-5 text-pink-400 md:w-6 md:h-6" />,
      bgGradient: "from-pink-500 to-rose-600",
      skills: ["UI/UX Product Design", "Technical Development", "Event-Driven Architecture", "End-to-End Ownership"],
      arrowPath: "M 610 360 Q 750 400 850 420",
      bubblePos: "md:right-[5%] md:top-[420px]",
      textPos: "md:right-[5%] md:top-[480px] text-left"
    }
  ];

  // Active terminal lookup index fallback defaults to zero for mobile setups
  const activeMobileIndex = hoveredIndex !== null ? hoveredIndex : 0;

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="w-full min-h-[600px] md:min-h-[750px] bg-[#0c0c0e] py-16 px-4 relative overflow-hidden flex flex-col items-center justify-start border-b border-[#1c1c1f] font-mono select-none"
    >
         <div className="space-y-1">
          <span className="text-[10px] text-zinc-500 tracking-widest block uppercase"> SKILLS_AREA_REPOSITORIES</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">Featured Skills</h2>
        </div>
      {/* Desktop Canvas Help Tooltip Text */}
      <div className="absolute top-4 text-center text-[10px] text-zinc-600 w-full tracking-wider pointer-events-none px-4 hidden md:block">
        To move canvas, hold <span className="border border-zinc-700 px-1 rounded">Scroll wheel</span> or <span className="border border-zinc-700 px-1 rounded">Space</span> while dragging, or use the hand tool
      </div>

      {/* =========================================================================
          DESKTOP HUD CONNECTOR LAYER: Renders live line tracing physics
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 1000 700" fill="none">
          <rect x="330" y="325" width="340" height="70" rx="14" stroke="#2a2a2e" strokeWidth="2" opacity="0.4" />
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && (
              <motion.g key={taskbarApps[hoveredIndex].id}>
                {(() => {
                  const end = getEndPoint(taskbarApps[hoveredIndex].arrowPath);
                  return (
                    <>
                      <motion.path
                        d={taskbarApps[hoveredIndex].arrowPath}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="8 5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.9 }}
                        exit={{ pathLength: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                      <motion.circle
                        cx={end.x}
                        cy={end.y}
                        r="4"
                        fill="#ffffff"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: 0.25, duration: 0.2 }}
                      />
                    </>
                  );
                })()}
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* =========================================================================
          DESKTOP VIEWPORT BLOCK MATRIX: Renders full diagram configurations
          ========================================================================= */}
      <div className="w-full max-w-7xl h-[620px] relative mt-12 hidden md:block">
        {taskbarApps.map((app, index) => {
          const isActive = hoveredIndex === index;
          return (
            <div key={app.id} className="contents">
              <div className={`absolute ${app.bubblePos} z-20 transition-all duration-300 transform ${isActive ? "scale-105 opacity-100" : "scale-95 opacity-15"}`}>
                <div className="border-2 border-white bg-[#121214] text-white px-5 py-2 rounded-full text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.05)] tracking-wide">
                  {app.title}
                </div>
              </div>
              <div className={`absolute ${app.textPos} z-20 transition-all duration-300 w-[320px] ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
                <div className="space-y-1 bg-[#0c0c0e]/90 p-2 rounded border border-zinc-800/40 backdrop-blur-sm">
                  {app.skills.map((skill, sIdx) => (
                    <p key={sIdx} className="text-xs text-zinc-300 font-medium tracking-wide">
                      &quot;{skill}&quot;{sIdx < app.skills.length - 1 ? "," : ""}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          📱 MOBILE DEPLOYMENT VIEWPORT: Simplified, Tap-Responsive HUD Grid
          ========================================================================= */}
      <div className="w-full max-w-md mx-auto space-y-6 mt-4 block md:hidden z-20 pb-20">
        
        {/* Active Category Header Display Bubble */}
        <div className="w-full flex justify-center">
          <div className="border-2 border-white bg-[#121214] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xl tracking-wide text-center uppercase">
            {taskbarApps[activeMobileIndex].title}
          </div>
        </div>

        {/* Dynamic Mobile Output Content Logs Block */}
        <div className="w-full bg-[#141417] border border-zinc-800 p-4 rounded-xl shadow-2xl space-y-2">
          <div className="text-[10px] text-zinc-500 border-b border-zinc-800 pb-1.5 mb-2 uppercase tracking-widest flex items-center justify-between">
            <span> terminal_output_logs</span>
            <span className="text-emerald-500 animate-pulse">● online</span>
          </div>
          {taskbarApps[activeMobileIndex].skills.map((skill, sIdx) => (
            <motion.p 
              key={sIdx}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sIdx * 0.05 }}
              className="text-xs text-zinc-300 font-medium tracking-wide py-0.5"
            >
              &quot;{skill}&quot;{sIdx < taskbarApps[activeMobileIndex].skills.length - 1 ? "," : ""}
            </motion.p>
          ))}
        </div>
      </div>

      {/* =========================================================================
          CENTRAL MACBOOK STYLE UTILITY APPS TASKBAR DOCK
          ========================================================================= */}
      <div className="absolute bottom-6 md:top-[330px] md:bottom-auto left-1/2 transform -translate-x-1/2 z-40 w-auto max-w-[95vw]">
        <div className="bg-[#1a1a1e]/80 border border-zinc-800/80 px-3.5 py-3 rounded-2xl flex items-end gap-3.5 md:gap-4 backdrop-blur-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
          {taskbarApps.map((app, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={app.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                className="relative cursor-pointer flex flex-col items-center justify-end transition-all duration-200"
                style={{
                  width: isHovered ? "56px" : "44px",
                  height: isHovered ? "56px" : "44px",
                }}
              >
                <div className={`w-full h-full rounded-xl bg-gradient-to-b ${app.bgGradient} p-2 flex items-center justify-center border border-white/5 shadow-md relative overflow-hidden group transition-all duration-200 ${isHovered ? "ring-2 ring-white/20" : ""}`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-40 pointer-events-none" />
                  <div className="transform transition-transform duration-200 group-hover:scale-105 flex items-center justify-center w-full h-full">
                    {app.icon}
                  </div>
                </div>
                <div className="absolute -bottom-1.5 flex justify-center w-full">
                  <div className={`h-1 rounded-full bg-white transition-all duration-300 ${isHovered ? "w-2.5 opacity-100" : "w-1 opacity-30"}`} />
                </div>
              </div>
            );
          })}

          <div className="w-[1px] h-8 bg-zinc-800 self-center shrink-0" />

          <div 
            onClick={() => window.open("mailto:amankumarchhari@gmail.com")}
            className="w-11 h-11 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 p-2 flex items-center justify-center border border-white/5 shadow-md hover:scale-110 transition-transform cursor-pointer shrink-0"
          >
            <Compass className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
          </div>
        </div>
      </div>

    </section>
  );
}