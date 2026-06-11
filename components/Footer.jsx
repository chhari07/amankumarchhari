"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const secureEmailPayload = "YW1hbmt1bWFyY2hoYXJpQGdtYWlsLmNvbQ==";
  const [resolvedEmail, setResolvedEmail] = useState("DECRYPT_COMMS.SYS");
  const [isRevealed, setIsRevealed] = useState(false);

  const handleEmailReveal = () => {
    if (!isRevealed) {
      setResolvedEmail(atob(secureEmailPayload));
      setIsRevealed(true);
    }
  };

  const handleMailto = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${atob(secureEmailPayload)}?subject=System Pipeline Integration`;
  };

  return (
    <footer className="w-full bg-[#f4f1de] pt-24 pb-6 px-4 md:px-16 font-handwritten text-zinc-900 overflow-hidden relative">
      
      {/* Subtle organic topography contour backdrop lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none mix-blend-multiply" 
        style={{
          backgroundImage: `radial-gradient(circle at 50% 120%, #000 1px, transparent 1px)`,
          backgroundSize: "32px 32px"
        }} 
      />

      {/* =========================================================================
          TOP PARTNERS STRIP (Captures the card row logic from image_3b86de.jpg)
          ========================================================================= */}
      <div className="max-w-6xl mx-auto space-y-8 mb-24 text-center relative z-10">
        <div className="space-y-1">
          <span className="text-[9px] font-sans font-bold text-zinc-400 uppercase tracking-widest">CORE_INTEGRATION_PARTNERS</span>
          <h4 className="text-2xl font-display font-extrabold tracking-tight uppercase text-zinc-800">Trusted Ecosystems</h4>
        </div>

        {/* Asymmetric sliding capsule row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 items-center justify-center">
          {["React", "Next.js", "Node", "MongoDB", "Tailwind", "LangChain"].map((partner, idx) => (
            <div key={idx} className="bg-[#1b4332] text-[#a3e635] rounded-xl py-4 px-2 font-sans font-bold text-[10px] tracking-wider uppercase shadow-sm border border-emerald-950/20 text-center transition-transform hover:scale-105">
              {partner}
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MAIN BLACK BILLBOARD CONTAINER BLOCK WITH FLUID TOP CURVE
          ========================================================================= */}
      <div className="max-w-6xl mx-auto bg-[#141416] text-white rounded-[40px] p-8 md:p-14 relative shadow-2xl overflow-visible border border-zinc-900">
        
        {/* =========================================================================
            CENTERED SIGNATURE LOGO MONUMENT FRAME (Exactly mirrors image_3affb9.png)
            ========================================================================= */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black border-4 border-[#141416] rounded-full flex items-center justify-center shadow-2xl overflow-hidden p-4 z-30">
          <div className="relative w-full h-full">
            <Image
              src="/logo.png"
              alt="Aman Kumar Chhari Insignia Logo"
              fill
              className="object-contain opacity-95 animate-pulse"
              priority
            />
          </div>
        </div>

        {/* Identity Headings Stack */}
        <div className="text-center pt-14 pb-12 space-y-3 relative z-10 border-b border-zinc-900/80">
          <h3 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight uppercase text-white font-sans">
            Aman Kumar Chhari
          </h3>
          <p className="text-[12px] font-sans italic text-zinc-400 font-medium tracking-wide">
            Where code architecture meets autonomous optimization.
          </p>
        </div>

        {/* =========================================================================
            THE 3 UNIQUE DELIVERABLE NODE ID BLOCKS
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 pb-6 relative z-10 items-stretch">
          
          {/* Node 1: GitHub Registry Vector Block */}
          <a 
            href="https://github.com/chhari07" 
            target="_blank" 
            rel="noreferrer"
            className="group bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">SYS_NODE_01</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-white transition-colors"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </div>
              <h5 className="text-xs font-bold uppercase tracking-wider font-sans text-zinc-400">Open_Source Registry</h5>
              <p className="text-[11px] text-zinc-500 leading-normal font-sans">Review active repository trees, agentic frameworks, and underlying operational source logic bundles.</p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs text-white font-bold group-hover:text-[#a3e635] transition-colors">
              <span>github.com/chhari07</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          {/* Node 2: LinkedIn Matrix Network Block */}
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noreferrer"
            className="group bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">SYS_NODE_02</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-white transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </div>
              <h5 className="text-xs font-bold uppercase tracking-wider font-sans text-zinc-400">Professional Pipeline</h5>
              <p className="text-[11px] text-zinc-500 leading-normal font-sans">Connect for technical engineering consultation metrics, career trajectories, or cross-functional team scaling.</p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs text-white font-bold group-hover:text-[#a3e635] transition-colors">
              <span>aman-kumar-chhari</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          {/* Node 3: Secure Obfuscated Decryptable Mail Gateway Block */}
          <div 
            onMouseEnter={handleEmailReveal}
            onTouchStart={handleEmailReveal}
            onClick={handleMailto}
            className="group bg-[#1a1a1c] border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-xl cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">SYS_NODE_03</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-white transition-colors"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <h5 className="text-xs font-bold uppercase tracking-wider font-sans text-zinc-400">Secure Direct Ingestion</h5>
              <p className="text-[11px] text-zinc-500 leading-normal font-sans">
                {isRevealed ? "🛡️ Scrape validation parameters verified." : "Interact with this terminal block layout container node to decrypt link vectors securely."}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs text-white font-bold group-hover:text-[#a3e635] transition-colors w-full">
              <span className="break-all tracking-tight font-mono text-[10px] pr-1">{resolvedEmail}</span>
              <span className="transform group-hover:translate-x-1 transition-transform shrink-0">→</span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM SUB-FOOTER PRIVACY SYSTEM STRIP
            ========================================================================= */}
        <div className="mt-10 pt-6 border-t border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 font-sans font-bold tracking-wide relative z-10">
          <div className="flex items-center gap-2">
            <span>© 2026 Aman Kumar Chhari.</span>
            <span>All System Logs Preserved.</span>
          </div>
          <div className="flex gap-4 uppercase tracking-wider text-[9px]">
            <span className="bg-[#1b4332] text-[#a3e635] px-2 py-0.5 rounded-md font-sans">Active_Location: India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}