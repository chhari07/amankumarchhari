"use client";
import React, { useState } from "react";

export default function ContactSection() {
  // Anti-scraping strategy: Obfuscating 'amankumarchhari@gmail.com'
  const secureEmailPayload = "YW1hbmt1bWFyY2hoYXJpQGdtYWlsLmNvbQ==";
  const [resolvedEmail, setResolvedEmail] = useState("DECRYPTING_TARGET.SYS");
  const [isRevealed, setIsRevealed] = useState(false);

  // Runtime response message tracking states
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'SUCCESS' | 'ERROR' | null

  const handleEmailScrapeProtection = () => {
    if (!isRevealed) {
      const plainTextEmail = atob(secureEmailPayload);
      setResolvedEmail(plainTextEmail);
      setIsRevealed(true);
    }
  };

  // 🛠️ Pure Native FormData Submission Handling Architecture from your script
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setSubmitStatus(null);

    // Dynamic browser target payload generation
    const formData = new FormData(event.target);
    // Explicit token authorization string binding sequence
    formData.append("access_key", "1b34ff84-aa13-401a-b588-2ae6e92e46ba");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData // Directly handling streaming structures
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("SUCCESS");
        event.target.reset(); // Safely clears out form buffer states instantly
      } else {
        setSubmitStatus("ERROR");
      }
    } catch (error) {
      console.error("Payload transmission crash:", error);
      setSubmitStatus("ERROR");
    } finally {
      setIsSending(false);
      // Automatically fade notification tray out after 5 seconds to preserve canvas layout
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const executeMailtoAction = (e) => {
    e.preventDefault();
    const plainTextEmail = atob(secureEmailPayload);
    window.location.href = `mailto:${plainTextEmail}?subject=General Inquiry - Engineering Hub`;
  };

  return (
    <section 
      id="contact" 
      className="w-full bg-white text-zinc-950 py-24 px-4 md:px-16 border-b border-zinc-200 font-handwritten select-none"
    >
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Header Block Row */}
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-5xl md:text-8xl font-display font-extrabold tracking-tight uppercase leading-none text-zinc-950">
            CONTACT US
          </h2>
          <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-medium">
            Have any projects in mind? Don&apos;t hesitate to reach out, and let&apos;s have a conversation regarding multi-agent frameworks, scalable architectures, and system design pipelines.
          </p>
        </div>

        {/* Bento Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-6 items-stretch">
          
          {/* LEFT PANEL: Anti-Scrape Credential Deck */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase font-sans"> GET_IN_TOUCH</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Simply want to connect or have a quick query? Interact with the telemetry link layer below to decrypt connection keys safely.
              </p>
              
              <div 
                onMouseEnter={handleEmailScrapeProtection}
                onTouchStart={handleEmailScrapeProtection}
                onClick={executeMailtoAction}
                className="group pt-2 block cursor-pointer"
              >
                <div className="text-xl sm:text-2xl font-display font-black tracking-tight uppercase text-zinc-950 transition-colors group-hover:text-zinc-600 flex items-center gap-1.5 flex-wrap">
                  <span className="break-all">{isRevealed ? resolvedEmail : "HOVER_TO_DECRYPT_EMAIL"}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 opacity-60"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </div>
                <span className="text-[9px] text-zinc-400 font-mono block mt-1 uppercase tracking-wider">
                  {isRevealed ? "● Terminal bridge validated" : "🛡️ Cryptographic scrape filter active"}
                </span>
              </div>
            </div>

            {/* Social Trays */}
            <div className="flex items-center gap-3 pt-6 lg:pt-0">
              <a href="https://github.com/chhari07" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-800 transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-800 transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-800 transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* MIDDLE COLUMN: IN-APP SECURITY TERMINAL WITH INTEGRATED FORM PROPERTIES */}
          <div className="lg:col-span-8 bg-[#0c0c0e] rounded-3xl border border-zinc-800 p-5 md:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
            
            <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10 w-full">
              
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5 text-[10px] font-bold font-sans text-zinc-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  E-Mail Client Sub-system
                </span>
                <span>v1.5_FormData</span>
              </div>

              {/* Input Layout Track Blocks - Custom mapping of your exact variables names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider font-sans">Sender Name *</label>
                  <input 
                    type="text" name="name" required placeholder="e.g., John Doe"
                    className="w-full bg-[#141417] border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-zinc-600 transition-colors font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider font-sans">Your Email Address *</label>
                  <input 
                    type="email" name="email" required placeholder="e.g., client@company.com"
                    className="w-full bg-[#141417] border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-zinc-600 transition-colors font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider font-sans">Message Subject</label>
                <input 
                  type="text" name="subject" placeholder="e.g., Custom AI Integration Architecture"
                  className="w-full bg-[#141417] border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-zinc-600 transition-colors font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider font-sans">Message Body *</label>
                <textarea 
                  name="message" rows={4} required placeholder="Describe your product requirements, scope timeline, or architectural staging guidelines..."
                  className="w-full bg-[#141417] border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-zinc-600 transition-colors font-sans resize-none leading-relaxed"
                />
              </div>

              {/* Status Diagnostic Message Tray (Replaced framer animation with stable CSS transition) */}
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  submitStatus ? "max-h-16 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                {submitStatus && (
                  <div
                    className={`p-3 rounded-xl text-center text-xs font-bold font-sans ${
                      submitStatus === "SUCCESS" 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {submitStatus === "SUCCESS" 
                      ? "✓ Success! Package logged into Aman's inbox safely." 
                      : "✕ Error! Transmission drop. Please check deployment settings."}
                  </div>
                )}
              </div>

              {/* Submit Capsule Trigger Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-wider hidden sm:inline">
                  {isSending ? "Compiling transmission packet..." : "// ready_for_ingestion"}
                </span>
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-zinc-950 hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 px-6 py-2.5 rounded-xl text-xs font-bold font-sans tracking-wide transition-all shadow-md active:scale-95"
                >
                  {isSending ? (
                    <>
                      <span className="w-3 h-3 border-2 border-zinc-600 border-t-zinc-950 rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>

        {/* Big Footer Billboard Card Block */}
        <div className="w-full bg-zinc-950 rounded-3xl p-8 md:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl mt-12">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <h3 className="text-4xl sm:text-6xl md:text-[85px] font-display font-extrabold tracking-tight text-white leading-none uppercase">
            LET&apos;S WORK TOGETHER.
          </h3>
          <div className="w-full max-w-md mx-auto h-[1px] bg-zinc-800 my-4" />
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-zinc-400 font-sans font-bold tracking-wider">
            <span onClick={executeMailtoAction} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              E-Mail
            </span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/chhari07" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>

      </div>
    </section>
  );
}