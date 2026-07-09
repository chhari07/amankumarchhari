"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Terminal, Globe, Laptop, ChevronLeft, ChevronRight } from "lucide-react";
import VideoProjectCard from "../components/Videoprojectcard";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const rafId = useRef(null);

  const projectsList = [
    {
      id: "operant",
      title: "OPERANT.AI",
      subtitle: "AI Security & Agentic Runtime Defense Platform",
      githubLink: "https://github.com/chhari07/OPERANT.ai",
      liveLink: "https://operantai.netlify.app/",
      tech: ["LangChain Loop", "Firebase Firestore", "LLM Orchestration", "Cloud Security"],
      summary: "Designed an autonomous runtime protection framework centered around modern LLM orchestration and cloud security guardrails.",
      metrics: [
        "Engineered asynchronous telemetry pipeline using live stream triggers.",
        "Built multi-tenant database pathways to securely isolate data state graphs.",
        "Implemented adaptive security workflows for threat mitigation & tool-calling."
      ],
      videoSrc: null,
      posterSrc: null,
      fallbackMock: (
        <div className="w-full h-full bg-[#0b1120] border border-white/10 rounded-lg p-3 flex flex-col justify-between font-sans select-none text-[8px] text-zinc-400">
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
            <h5 className="text-[13px] font-extrabold text-white tracking-tight leading-none">OPERANT.ai</h5>
            <p className="text-[6px] text-zinc-400 max-w-[160px] mx-auto leading-tight mt-1">Discover breathtaking workflows across pipelines.</p>
          </div>
          <div className="flex justify-center gap-1 pb-0.5 scale-90">
            <span className="text-[6px] bg-white text-zinc-950 font-bold px-1.5 py-0.5 rounded-sm">Plan Agents</span>
          </div>
        </div>
      )
    },
    {
      id: "rentit",
      title: "Rent It",
      subtitle: "Vehicle Rental Platform",
      githubLink: "https://github.com/chhari07/RENT-IT",
      liveLink: "https://rentitcom.netlify.app/",
      tech: ["MERN Stack", "Tailwind CSS", "Framer Motion"],
      summary: "Developed a modular peer-to-peer vehicle rental application complete with dynamic, custom-filtered search capabilities.",
      metrics: [
        "Integrated robust identity authorization guards.",
        "Created step-by-step reservation paths.",
        "Deployed state-driven interface updates for fluid interactivity."
      ],
      videoSrc: null,
      posterSrc: null,
      fallbackMock: (
        <div className="w-full h-full bg-[#050505] border border-zinc-900 rounded-lg p-3 flex flex-col justify-between text-white font-sans relative overflow-hidden">
          <div className="flex justify-between items-center text-[8px] font-extrabold border-b border-zinc-900 pb-1">
            <span className="tracking-tighter">RENT IT</span>
            <div className="flex gap-1 text-zinc-400 text-[6px] scale-90">
              <span className="text-amber-400">Home</span>
              <span>Vehicles</span>
            </div>
          </div>
          <div className="text-center py-1">
            <h5 className="text-[14px] font-serif font-black tracking-tight leading-none text-white">RENT IT</h5>
            <div className="text-[7px] font-bold text-white mt-1">Your Journey, <span className="text-amber-400">Your Rules</span></div>
          </div>
          <div className="w-full h-0.5 bg-zinc-900 rounded-full" />
        </div>
      )
    },
    {
      id: "mnews",
      title: "M-News App",
      subtitle: "Next.js News Platform",
      githubLink: "https://github.com/chhari07/manadtimes",
      liveLink: "https://manad.vercel.app/",
      tech: ["Next.js", "React.js", "API Endpoints", "SSR Runtime"],
      summary: "Created a real-time news application utilizing server-side rendering (SSR) and automated layout routing parameters.",
      metrics: [
        "Integrated fast data aggregation endpoints.",
        "Hydrates and displays categorized live global event indexes efficiently.",
        "Optimized layout components for zero structural shifting."
      ],
      videoSrc: null,
      posterSrc: null,
      fallbackMock: (
        <div className="w-full h-full bg-black border border-zinc-900 rounded-lg p-3 flex flex-col justify-between text-zinc-200 font-sans relative overflow-hidden">
          <div className="flex justify-center bg-zinc-950 border border-zinc-900/60 rounded-full py-0.5 max-w-[100px] mx-auto scale-90">
            <div className="flex gap-1.5 text-[5px] text-zinc-400">
              <span>Home</span>
              <span className="text-white font-bold">News</span>
            </div>
          </div>
          <div className="text-center py-1">
            <h5 className="text-[12px] font-extrabold text-white tracking-tight font-serif leading-none">मांद Times</h5>
            <p className="text-[5px] text-zinc-400 italic mt-1">&quot;आज की खबरें, कल के विचार&quot;</p>
          </div>
          <div className="w-full bg-zinc-900 h-1.5 rounded-full" />
        </div>
      )
    },
    {
      id: "recipe",
      title: "Recipe Share DB",
      subtitle: "Media Database Platform",
      githubLink: "https://github.com/chhari07/all_recipe_app",
      liveLink: "https://all-recipe-app.vercel.app/",
      tech: ["MERN Stack", "Paginated Arrays", "Keyword Lookup Filters"],
      summary: "Designed a full-stack media database platform featuring paginated result arrays, document uploads, and keyword lookup filters.",
      metrics: [
        "Engineered lightweight query execution maps.",
        "Configured secure document ingestion routing rules.",
        "Responsive grid matrix scaling configurations."
      ],
      videoSrc: null,
      posterSrc: null,
      fallbackMock: (
        <div className="w-full h-full bg-white border border-zinc-200 rounded-lg p-3 flex flex-col justify-between text-zinc-900 font-sans relative overflow-hidden">
          <div className="flex items-center justify-between bg-black text-white px-1.5 py-0.5 rounded text-[6px] scale-90 origin-left">
            <span className="italic font-bold">All Recipes 🥄</span>
          </div>
          <div className="text-center py-1">
            <h5 className="text-[11px] font-black text-zinc-900 leading-none">Welcome to <span className="text-emerald-500">ALL RECIPES</span></h5>
            <p className="text-[8px] font-bold text-zinc-800 mt-1">around your product ?</p>
          </div>
          <div className="w-full h-1 bg-zinc-100 rounded" />
        </div>
      )
    }
  ];

  // Figure out which card sits closest to the track's center, throttled to
  // one measurement per animation frame so it stays smooth during momentum
  // scrolling / drag-flicks on touch devices.
  const handleScroll = useCallback(() => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const track = trackRef.current;
      if (!track) return;
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const cardCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(cardCenter - trackCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });
      setActiveProject((prev) => (prev === closestIdx ? prev : closestIdx));
    });
  }, []);

  useEffect(() => () => rafId.current && cancelAnimationFrame(rafId.current), []);

  const scrollToIndex = (idx) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const goPrev = () => scrollToIndex(Math.max(0, activeProject - 1));
  const goNext = () => scrollToIndex(Math.min(projectsList.length - 1, activeProject + 1));

  return (
    <section id="projects" className="w-full bg-[#0c0c0e] py-24 px-4 md:px-16 border-b border-[#1c1c1f] font-handwritten select-none overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Module HUD Header */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 tracking-widest block uppercase"> SYSTEM_DEPLOYMENT_REPOSITORIES</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">Featured Frameworks</h2>
          </div>

          {/* Prev/Next + counter, terminal-styled */}
          <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            <span>
              <span className="text-white font-bold">{String(activeProject + 1).padStart(2, "0")}</span> / {String(projectsList.length).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={goPrev}
                disabled={activeProject === 0}
                className="w-8 h-8 rounded-lg border border-zinc-800 bg-[#141416] flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={goNext}
                disabled={activeProject === projectsList.length - 1}
                className="w-8 h-8 rounded-lg border border-zinc-800 bg-[#141416] flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Next project"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CINEMATIC HORIZONTAL TRACK: centered card reads full-clarity, flanking
            cards recede in scale/opacity/blur for coverflow-style depth. Native
            scroll-snap drives it so it works with touch/trackpad/drag for free.
            ========================================================================= */}
        <div className="relative -mx-4 md:-mx-16 px-4 md:px-16">
          {/* Edge vignettes to sell the "cinematic" fade-into-dark framing */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-20 bg-gradient-to-r from-[#0c0c0e] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-20 bg-gradient-to-l from-[#0c0c0e] to-transparent" />

          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Spacers so the first/last card can still center within the track */}
            <div className="shrink-0 w-[calc(50%-160px)] md:w-[calc(50%-200px)]" aria-hidden />

            {projectsList.map((proj, idx) => {
              const isActive = activeProject === idx;
              const distance = Math.abs(activeProject - idx);
              return (
                <motion.div
                  key={proj.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="shrink-0 w-[280px] sm:w-[340px] md:w-[400px] snap-center"
                  animate={{
                    scale: isActive ? 1 : distance === 1 ? 0.86 : 0.78,
                    opacity: isActive ? 1 : distance === 1 ? 0.55 : 0.3,
                    filter: isActive ? "blur(0px)" : distance === 1 ? "blur(1px)" : "blur(2px)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  style={{ transformOrigin: "center center" }}
                >
                  <div
                    onClick={() => (isActive ? null : scrollToIndex(idx))}
                    className={isActive ? "" : "cursor-pointer"}
                  >
                    <VideoProjectCard
                      title={proj.title}
                      subtitle={proj.subtitle}
                      tags={proj.tech}
                      videoSrc={proj.videoSrc}
                      posterSrc={proj.posterSrc}
                      fallbackMock={proj.fallbackMock}
                      repoIndex={idx + 1}
                      githubLink={proj.githubLink}
                      liveLink={proj.liveLink}
                      isSelected={isActive}
                      onSelect={() => scrollToIndex(idx)}
                    />
                  </div>
                </motion.div>
              );
            })}

            <div className="shrink-0 w-[calc(50%-160px)] md:w-[calc(50%-200px)]" aria-hidden />
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-5">
            {projectsList.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to ${proj.title}`}
                className="p-1.5 -m-1.5"
              >
                <span
                  className={`block h-1 rounded-full bg-white transition-all duration-300 ${
                    activeProject === idx ? "w-6 opacity-100" : "w-1.5 opacity-30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            LIVE INSPECTOR PANEL: full-width now, stays synced to whichever
            card is centered in the cinematic track above.
            ========================================================================= */}
        <div className="bg-[#141416] border-2 border-zinc-800 p-6 rounded-3xl relative shadow-2xl overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: "15px 15px"
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Terminal size={12} /> Project_Inspector</span>
                <span className="text-emerald-500 animate-pulse">● Connected</span>
              </div>

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

            <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-2.5 w-full md:w-52 shrink-0">
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
    </section>
  );
}