"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Code2, Paintbrush, Database, Smartphone, GitBranch, ShieldCheck } from "lucide-react";

export default function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState("All Services");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Exact 7 core deliverables mapped to asymmetrical bento grid positions (inspired by image_475100.jpg)
  const servicesList = [
    {
      id: "ai",
      title: "Autonomous Agentic AI Architectures & Stateful Workflows",
      tag: "Agentic AI",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      color: "bg-[#7c3aed]/10 border-[#7c3aed]/30",
      tabColor: "bg-[#7c3aed]/20",
      // Wide folder block span configuration mirroring the blue folder item in image_475100.jpg
      gridSpan: "md:col-span-2 lg:col-span-2", 
      definition: "Designing and deploying self-governing, multi-agent systems engineered to handle complex logic loops, adaptive threat responses, or automated task optimization without human intervention.",
      deliverables: [
        "Custom LangGraph State Graphs & multi-tiered LangChain framework orchestrations.",
        "Structured tool-calling capabilities interfacing with secure infrastructure.",
        "Production-ready Flask or Node.js microservices acting as scalable LLM runtime endpoints."
      ]
    },
    {
      id: "fullstack",
      title: "End-to-End Full-Stack System Architecture",
      tag: "Full-Stack",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      color: "bg-[#0ea5e9]/10 border-[#0ea5e9]/30",
      tabColor: "bg-[#0ea5e9]/20",
      gridSpan: "md:col-span-1 lg:col-span-1", // Standard compact box block mirroring the white card item in image_475100.jpg
      definition: "Building highly performant, production-grade web applications from initial database schemas to server runtimes and client-side viewports.",
      deliverables: [
        "Highly optimized Next.js (App Router) setups utilizing Server-Side Rendering (SSR).",
        "Asynchronous RESTful API pipelines built using Express.js and Node.js.",
        "Secure identity authorization guards and middleware protection rings."
      ]
    },
    {
      id: "uiux",
      title: "High-Fidelity UI/UX & Interactive Product Design Staging",
      tag: "UI/UX Design",
      icon: <Paintbrush className="w-5 h-5 text-pink-400" />,
      color: "bg-[#ec4899]/10 border-[#ec4899]/30",
      tabColor: "bg-[#ec4899]/20",
      gridSpan: "md:col-span-1 lg:col-span-1",
      definition: "Translating rough product concepts into user-centric, high-conversion visual design frameworks before writing a single line of production code.",
      deliverables: [
        "Interactive prototype systems mapped in Figma Workspaces or Canva Studio Layouts.",
        "Complete typographic systems and adaptive style sheets using Tailwind CSS.",
        "Fluid, responsive layout matrices engineered to look stunning on every device viewport."
      ]
    },
    {
      id: "database",
      title: "Event-Driven Database Engineering & Storage Pipelines",
      tag: "Data Pipeline",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      color: "bg-[#10b981]/10 border-[#10b981]/30",
      tabColor: "bg-[#10b981]/20",
      gridSpan: "md:col-span-2 lg:col-span-2", // Horizontal stretch node element
      definition: "Setting up highly structured, distributed storage systems and live database event hooks optimized for rapid read/write performance.",
      deliverables: [
        "Scalable MongoDB Cluster configurations featuring custom database aggregation pipelines.",
        "Firebase Firestore Reactive Streams triggering asynchronous background actions.",
        "Securely partitioned multi-tenant database pathways to isolate data state graphs securely."
      ]
    },
    {
      id: "mobile",
      title: "Cross-Platform Responsive Mobile Product Deployment",
      tag: "Mobile UI",
      icon: <Smartphone className="w-5 h-5 text-amber-400" />,
      color: "bg-[#f59e0b]/10 border-[#f59e0b]/30",
      tabColor: "bg-[#f59e0b]/20",
      gridSpan: "md:col-span-1 lg:col-span-1",
      definition: "Packaging full-scale web features into lightweight, responsive interfaces designed specifically for mobile-first user environments.",
      deliverables: [
        "Clean layout paradigms adapting dynamically without cumulative layout shifts (CLS).",
        "Mobile-optimized navigation models and fluid touch gestures for thumb-reach usability.",
        "Fast client data hydration routines that minimize mobile bandwidth consumption."
      ]
    },

    {
      id: "consulting",
      title: "Direct Technical Consultation & End-to-End Product Ownership",
      tag: "Ownership",
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      color: "bg-[#3b82f6]/10 border-[#3b82f6]/30",
      tabColor: "bg-[#3b82f6]/20",
      gridSpan: "md:col-span-1 lg:col-span-1",
      definition: "Providing holistic project leadership by taking cross-functional requirements from the initial idea all the way to project delivery.",
      deliverables: [
        "Initial architectural requirements analysis down to technical stack planning.",
        "Rigorous test-driven validation scripts ensuring full security coverage.",
        "Scalable, component-driven source code repositories built to be easily maintained."
      ]
    }
  ];

  const filters = ["All Services", "Agentic AI", "Full-Stack", "UI/UX Design", ];

  const filteredServices = activeFilter === "All Services" 
    ? servicesList 
    : servicesList.filter(service => service.tag === activeFilter);

  return (
    <section id="services" className="w-full bg-[#0a0a0a] py-20 px-4 md:px-16 border-b border-[#1c1c1f] font-handwritten text-white select-none">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* =========================================================================
            TOP PROFILE BIO HEADER (Directly mirrors image_475100.jpg structure)
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-2xl text-center sm:text-left mb-16">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-800 border border-zinc-700 flex-shrink-0 shadow-lg overflow-hidden flex items-center justify-center">
            <span className="text-xl font-display font-bold text-zinc-400">AKC</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-white font-display uppercase">Aman Kumar Chhari</h2>
            <p className="text-xs text-zinc-400 font-medium tracking-wide">Full-Stack Developer & Agentic AI Product Engineer</p>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-lg">
              Operating at the intersection of design engineering and systemic autonomy. I construct fluid, scalable frontends, high-throughput microservices, and state-driven agent loops.
            </p>
            <div className="text-[10px] text-zinc-600 flex items-center justify-center sm:justify-start gap-1">
              <span>📍 Guna, Madhya Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ROUNDED NAVIGATION TAB FILTERS PILLS LINE
            ========================================================================= */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-3xl border-b border-zinc-900 pb-6 w-full">
          {filters.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeFilter === tab
                  ? "bg-white text-black shadow-md scale-[1.03]"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* =========================================================================
            ASYMMETRICAL FILE FOLDER ASYMMETRIC GRID MAPPING PARADIGM
            ========================================================================= */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 w-full items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => {
              const isHovered = hoveredIndex === idx;
              
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative group pt-4 flex flex-col justify-end ${service.gridSpan}`}
                >
                  
                  {/* SKEUOMORPHIC FOLDER TAB BACKDROP HEADER */}
                  <div 
                    className={`
                      absolute top-0 left-4 h-5 w-20 rounded-t-lg border-t border-x border-zinc-800/80 transition-all duration-300
                      ${service.tabColor} ${isHovered ? "-translate-y-1 h-6" : ""}
                    `} 
                  />

                  {/* MAIN FILE FOLDER BODY CARD PANEL */}
                  <div className={`w-full ${service.color} border border-zinc-800/80 rounded-2xl rounded-tl-none p-5 flex flex-col justify-between shadow-xl min-h-[320px] transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${isHovered ? "border-zinc-500/40 shadow-2xl -translate-y-0.5" : ""}`}>
                    
                    <div className="space-y-4">
                      {/* Top Control Track row */}
                      <div className="flex items-center justify-between w-full">
                        <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800">
                          {service.icon}
                        </div>
                        {/* Interactive highlighted tag layout shifting */}
                        <div className={`px-2.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase transition-all duration-300 ${isHovered ? "bg-white text-black scale-105" : "bg-zinc-900 text-zinc-500 border border-zinc-800"}`}>
                          {service.tag}
                        </div>
                      </div>

                      {/* Header Identity Text */}
                      <div className="space-y-1">
                        <h4 className="text-sm font-extrabold text-white leading-snug tracking-tight font-sans">
                          {service.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 font-medium leading-relaxed pt-1">
                          {service.definition}
                        </p>
                      </div>
                    </div>

                    {/* Operational system technical specs metrics loop */}
                    <div className="mt-4 pt-4 border-t border-zinc-800/60 space-y-2">
                      <span className="text-[9px] text-zinc-600 block tracking-widest font-bold">DELIVERABLE_METRICS</span>
                      <ul className="space-y-1.5 text-[10px] text-zinc-400 font-medium font-sans">
                        {service.deliverables.slice(0, 2).map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-1.5 leading-normal">
                            <span className="text-zinc-700 shrink-0">├─</span>
                            <span className="line-clamp-2">{item}</span>
                          </li>
                        ))}
                        {service.deliverables.length > 2 && (
                          <li className="text-[9px] text-zinc-500 italic pl-3">
                            + {service.deliverables.length - 2} more metrics in trace
                          </li>
                        )}
                      </ul>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}