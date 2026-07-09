"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Bookmark, ExternalLink, Volume2, VolumeX } from "lucide-react";

/**
 * VideoProjectCard
 * ---------------------------------------------------------------------------
 * Same motion language as the Pinterest-style pin video this was modeled on:
 *   - a slow, continuous Ken Burns zoom/pan on the media (never fully still)
 *   - a bottom gradient that deepens on hover to host the title reveal
 *   - a floating "save"-style pill that snaps in top-right on hover
 * ...reskinned into the terminal/HUD language used across the portfolio:
 * monospace repo tag, ring-highlight on hover/select, emerald "connected"
 * pulse instead of a red Pinterest save button.
 *
 * Props
 *  - title, subtitle, tags: string[]
 *  - videoSrc: mp4 src (muted, loops, autoplays on hover — or always, via `alwaysPlay`)
 *  - posterSrc: fallback/poster image
 *  - repoIndex: number, shown as "Repository_0N"
 *  - githubLink, liveLink: string
 *  - alwaysPlay: boolean — if true, video runs continuously like the source pin
 */
export default function VideoProjectCard({
  title = "Project Title",
  subtitle = "One-line description of what this ships.",
  tags = [],
  videoSrc,
  posterSrc,
  fallbackMock, // ReactNode — rendered as the media layer when no video/poster exists yet
  repoIndex = 1,
  githubLink = "#",
  liveLink = "#",
  alwaysPlay = true,
  isSelected = false,
  onSelect,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const active = isHovered || isSelected;

  const handleEnter = () => {
    setIsHovered(true);
    onSelect?.();
    if (!alwaysPlay && videoRef.current) videoRef.current.play();
  };
  const handleLeave = () => {
    setIsHovered(false);
    if (!alwaysPlay && videoRef.current) videoRef.current.pause();
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onSelect}
      className={`relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#121214] border border-white/10 shadow-2xl cursor-pointer transition-all duration-300 ${
        active ? "ring-4 ring-white/80 scale-[1.01] z-10" : "ring-0 opacity-80 hover:opacity-100"
      }`}
    >
      {/* ===================================================================
          MEDIA LAYER — continuous slow Ken Burns zoom, never fully static.
          Falls back to the device-mockup node when no real video/poster
          exists yet, so the motion still reads even with placeholder UI.
          Scale runs a bit faster/deeper on hover to add intent to the motion.
          =================================================================== */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: active ? 1.12 : 1.04 }}
        transition={{ duration: active ? 6 : 14, ease: "easeInOut" }}
      >
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            muted={muted}
            loop
            playsInline
            autoPlay={alwaysPlay}
            className="w-full h-full object-cover"
          />
        ) : posterSrc ? (
          <img src={posterSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6">
            {fallbackMock}
          </div>
        )}
      </motion.div>

      {/* Base gradient always present so text stays legible; deepens on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none"
        animate={{ opacity: active ? 0.95 : 0.75 }}
        transition={{ duration: 0.3 }}
      />

      {/* Scanline / grid texture to keep it consistent with the HUD theme */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* ===================================================================
          TOP BAR — repo tag (always visible) + save pill (snaps in on hover,
          same beat as the Pinterest "Save" button popping in top-right)
          =================================================================== */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded text-[9px] uppercase font-bold tracking-wider text-white flex items-center gap-1.5 border border-white/10">
          <FolderGit2 size={12} className="opacity-70" />
          Repository_0{repoIndex}
        </div>

        {videoSrc && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setMuted((m) => !m);
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: active ? 1 : 0.6,
              opacity: active ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
          >
            {muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </motion.button>
        )}
      </div>

      {/* ===================================================================
          BOTTOM REVEAL — title always present (like the pin caption baked
          into the video), subtitle + tags stagger up on hover for detail.
          =================================================================== */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <motion.h3
          animate={{ y: active ? -2 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-wide leading-tight"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            height: active ? "auto" : 0,
            marginTop: active ? 6 : 0,
          }}
          transition={{ duration: 0.25 }}
          className="text-[11px] text-zinc-300 leading-relaxed overflow-hidden"
        >
          {subtitle}
        </motion.p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.slice(0, 3).map((t, i) => (
            <motion.span
              key={t}
              initial={false}
              animate={
                active
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.6, y: 4 }
              }
              transition={{ delay: active ? i * 0.05 : 0, duration: 0.2 }}
              className="bg-white/10 backdrop-blur-sm text-[8px] font-bold px-2 py-0.5 rounded-sm text-white whitespace-nowrap"
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Action row — fades/lifts in last, same "final beat" feel as the
            source pin settling once the zoom finishes */}
        <motion.div
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : 10,
          }}
          transition={{ delay: active ? 0.1 : 0, duration: 0.25 }}
          className="flex items-center gap-2 mt-4"
        >
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-[10px] text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-colors font-bold"
          >
            <Bookmark size={11} />
            Codebase.git
          </a>
          <a
            href={liveLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-[10px] text-black bg-white hover:bg-zinc-200 px-3 py-2 rounded-xl transition-colors font-bold"
          >
            Live_System
            <ExternalLink size={10} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}