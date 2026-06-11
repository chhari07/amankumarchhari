"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Code2, Layers, Cpu, Globe, ArrowDown, Terminal } from "lucide-react";

// 🛡️ SAFE FEATURE ISOLATION LAYER: Loads the canvas only on client environments
const SafeHeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[35vh] md:h-full flex items-center justify-center font-mono text-[10px] text-gray-600 tracking-wider">
      SYSTEM_BOOTING_CORE...
    </div>
  ),
});

export default function HeroSection() {

    const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  handleResize();

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <section className="relative w-full min-h-screen bg-[#121212] overflow-hidden flex flex-col md:flex-row items-center justify-between p-4 md:p-16 border-b border-[#222222]">
      
     {/* Unified Responsive Video Layer */}
<div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
  <video
    src={
      isMobile
        ? "/aman_for_the_mobile_view.mp4"
        : "/aman_.mp4"
    }
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    className="w-full h-full object-cover opacity-25 object-center"
    style={{ transform: "translateZ(0)" }}
  />

  <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#121212]/80 via-transparent to-[#121212]/70" />
</div>

      {/* =========================================================================
          HUD FOREGROUND CONTENT COMPONENT BLOCKS
          ========================================================================= */}

      {/* Left Column: Core Infrastructure Terminal Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center z-10 space-y-5 mt-14 md:mt-0 order-2 md:order-1">
        
        {/* Hardware & Runtime Status Overlay Tag */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-[#1c1c1c]/90 border border-[#2d2d2d] px-2.5 py-1.5 rounded text-[10px] text-gray-400 w-fit backdrop-blur-md font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>sys_status: active // cluster_nodes_secure</span>
        </motion.div>

        {/* Identity Headings */}
        <div className="space-y-1">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white font-mono leading-none">
            AMAN KUMAR <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 via-gray-300 to-gray-500">
              CHHARI
            </span>
          </h1>
         
        </div>

        {/* Core Architecture Matrix Widget */}
        <div className="bg-[#1c1c1c]/80 border border-[#2d2d2d] p-3.5 rounded-lg max-w-md text-xs text-gray-300 space-y-2 shadow-2xl backdrop-blur-md font-mono">
          <div className="flex items-center justify-between border-b border-[#2d2d2d] pb-2 text-gray-500 text-[10px]">
            <span className="flex items-center gap-1.5"><Terminal size={12} /> runtime_core_metrics</span>
            <span>v1.0.0</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
            <div className="bg-[#242424]/70 p-2 rounded border border-[#333333] flex items-center gap-1.5">
              <Cpu size={12} className="text-purple-400 shrink-0" />
              <span>Agentic: LangGraph / Flask</span>
            </div>
            <div className="bg-[#242424]/70 p-2 rounded border border-[#333333] flex items-center gap-1.5">
              <Code2 size={12} className="text-blue-400 shrink-0" />
              <span>Fullstack: Next.js / MERN</span>
            </div>
          </div>
        </div>

        {/* Interactive Workspace CTAs */}
        <div className="flex items-center gap-3 pt-1">
          <a 
            href="#skills" 
            className="px-4 py-2 bg-white text-black text-[11px] font-semibold rounded hover:bg-gray-200 transition-colors font-mono shadow-md"
          >
            Inspect_Stack
          </a>
          <a 
            href="mailto:amankumarchhari@gmail.com" 
            className="px-4 py-2 border border-[#333333] text-gray-300 text-[11px] rounded bg-[#1c1c1c]/40 hover:bg-[#282828] transition-colors backdrop-blur-sm font-mono"
          >
            Contact.sys
          </a>
        </div>
      </div>

      {/* Right Column: Safe Device Viewport Mesh Canvas */}
      <div className="w-full md:w-1/2 h-[35vh] md:h-full relative flex items-center justify-center mt-4 md:mt-0 z-10 order-1 md:order-2">
        
        {/* Render Canvas safe-shield context wrapper */}
        <SafeHeroCanvas />

        {/* HUD Utilities Status Control Strip Overlay */}
        <div className="absolute bottom-0 right-0 md:bottom-4 md:right-4 bg-[#1c1c1c]/90 border border-[#2d2d2d] px-2.5 py-1.5 rounded flex items-center gap-3.5 text-gray-500 text-[11px] backdrop-blur-sm font-mono">
          <Layers size={12} className="text-gray-300 hover:text-white cursor-pointer transition-colors" />
          <Cpu size={12} className="hover:text-white cursor-pointer transition-colors" />
          <Globe size={12} className="hover:text-white cursor-pointer transition-colors" />
          <span className="text-[9px] border-l border-[#2d2d2d] pl-2 text-gray-400">GRID: 44px</span>
        </div>
      </div>

      {/* Desktop Down-Scroll Hint indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-35 text-[9px] z-10 font-mono tracking-wider">
        <span>SCROLL_WORKSPACE</span>
        <ArrowDown size={11} className="animate-bounce" />
      </div>
    </section>
  );
}