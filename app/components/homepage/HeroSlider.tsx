"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import type { HeroSlide } from "@/lib/cms-types";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative overflow-hidden group">
      {slides.map((slide, idx) => {
        // bg classes based on idx matching the design tints
        const bgClass = idx === 0 ? 'bg-[--color-hero]' : idx === 1 ? 'bg-[#f0faf3]' : 'bg-[#fff8e6]';
        
        return (
          <div 
            key={idx} 
            className={`${bgClass} min-h-[280px] transition-opacity duration-500 ${idx === activeIdx ? 'block' : 'hidden'}`}
          >
            <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 min-h-[280px]">
              
              <div className="py-12">
                <p className="text-[11px] font-bold tracking-[1.4px] uppercase text-[--color-text-faint] mb-3">
                  {slide.eyebrow}
                </p>
                <h1 className="text-[30px] font-normal leading-[1.25] text-[--color-text-primary] mb-3 font-serif">
                  {slide.title}
                </h1>
                <p className="text-[14px] text-[--color-text-muted] leading-[1.7] max-w-[360px] mb-5">
                  {slide.body}
                </p>
                <Link href={slide?.linkUrl || "#"} className="text-[14px] text-[--color-brand-blue] font-semibold inline-flex items-center gap-1.5 hover:underline">
                  {slide?.linkText || "Learn more"}
                  <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-[--color-brand-blue] fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <div className="text-[54px] font-extrabold tracking-[-3px] font-mono leading-none select-none">
                  <span className="text-[--color-brand-blue]">P</span>
                  <span className="text-[--color-brand-red]">G</span>
                  <span className="text-[--color-brand-amber]">P</span>
                  <span className="text-[--color-brand-green]">J</span>
                  <span className="text-[--color-brand-blue]">S</span>
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center py-8 text-center text-[--color-text-muted]">
                {slide.visualType === 'illustration_1' && (
                  <svg width="260" height="190" viewBox="0 0 260 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="36" cy="95" r="20" stroke="#1a73e8" strokeWidth="2"/>
                    <circle cx="36" cy="95" r="10" fill="#e8f0fe"/>
                    <rect x="52" y="93" width="28" height="4" rx="2" fill="#1a73e8"/>
                    <rect x="72" y="93" width="4" height="9" rx="1.5" fill="#1a73e8"/>
                    <rect x="65" y="93" width="4" height="7" rx="1.5" fill="#1a73e8"/>
                    <path d="M84 95 L108 95" stroke="#9aa0a6" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <polyline points="105,91 109,95 105,99" stroke="#9aa0a6" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    <rect x="112" y="74" width="38" height="48" rx="7" fill="#fff" stroke="#34a853" strokeWidth="2"/>
                    <rect x="118" y="88" width="26" height="28" rx="4" fill="#e6f4ea"/>
                    <path d="M120 88 v-8 a11 11 0 0 1 22 0 v8" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="131" cy="103" r="4.5" fill="#34a853"/>
                    <rect x="129" y="103" width="4" height="8" rx="2" fill="#34a853"/>
                    <path d="M152 95 L176 95" stroke="#9aa0a6" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <polyline points="173,91 177,95 173,99" stroke="#9aa0a6" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    <path d="M205 74 L230 74 L230 108 C230 120 217.5 126 217.5 126 C217.5 126 205 120 205 108 Z" fill="#fce8e6" stroke="#ea4335" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M211 100 l5 6 11-13" stroke="#ea4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <text x="36" y="126" fontSize="10" fill="#9aa0a6" fontFamily="sans-serif" textAnchor="middle">Public Key</text>
                    <text x="131" y="132" fontSize="10" fill="#9aa0a6" fontFamily="sans-serif" textAnchor="middle">Encrypt</text>
                    <text x="217" y="138" fontSize="10" fill="#9aa0a6" fontFamily="sans-serif" textAnchor="middle">Verified</text>
                    <rect x="186" y="148" width="34" height="34" rx="7" fill="#f7df1e"/>
                    <text x="194" y="172" fontSize="20" fontWeight="800" fontFamily="'Courier New',monospace" fill="#1e2333">JS</text>
                    <rect x="16" y="30" width="42" height="18" rx="4" fill="#fff" stroke="#dadce0" strokeWidth="1"/>
                    <text x="37" y="43" fontSize="9" fill="#9aa0a6" fontFamily="sans-serif" textAnchor="middle">RSA-4096</text>
                    <line x1="36" y1="48" x2="36" y2="74" stroke="#dadce0" strokeWidth="1" strokeDasharray="3 3"/>
                  </svg>
                )}
                {slide.visualType === 'illustration_2' && (
                  <svg width="260" height="190" viewBox="0 0 260 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="20" width="220" height="150" rx="10" fill="#1e2333"/>
                    <rect x="30" y="30" width="200" height="12" rx="3" fill="#2d3452"/>
                    <rect x="36" y="34" width="6" height="4" rx="1" fill="#ff5f56"/>
                    <rect x="46" y="34" width="6" height="4" rx="1" fill="#ffbd2e"/>
                    <rect x="56" y="34" width="6" height="4" rx="1" fill="#27c93f"/>
                    <text x="36" y="60" fontFamily="'Courier New',monospace" fontSize="11" fill="#c792ea">import</text>
                    <text x="79" y="60" fontFamily="'Courier New',monospace" fontSize="11" fill="#89ddff">*</text>
                    <text x="88" y="60" fontFamily="'Courier New',monospace" fontSize="11" fill="#c792ea">as</text>
                    <text x="103" y="60" fontFamily="'Courier New',monospace" fontSize="11" fill="#82aaff">openpgp</text>
                    <text x="36" y="60" fontFamily="'Courier New',monospace" fontSize="11" fill="transparent"> </text>
                    <text x="36" y="76" fontFamily="'Courier New',monospace" fontSize="11" fill="#c792ea">const</text>
                    <text x="72" y="76" fontFamily="'Courier New',monospace" fontSize="11" fill="#f8f9fa">encrypted</text>
                    <text x="130" y="76" fontFamily="'Courier New',monospace" fontSize="11" fill="#89ddff">=</text>
                    <text x="36" y="92" fontFamily="'Courier New',monospace" fontSize="11" fill="#f78c6c">  await</text>
                    <text x="86" y="92" fontFamily="'Courier New',monospace" fontSize="11" fill="#82aaff">openpgp</text>
                    <text x="131" y="92" fontFamily="'Courier New',monospace" fontSize="11" fill="#89ddff">.</text>
                    <text x="136" y="92" fontFamily="'Courier New',monospace" fontSize="11" fill="#82aaff">encrypt</text>
                    <text x="36" y="108" fontFamily="'Courier New',monospace" fontSize="11" fill="#89ddff">    message</text>
                    <text x="36" y="124" fontFamily="'Courier New',monospace" fontSize="11" fill="#89ddff">    encryptionKeys</text>
                    <text x="36" y="140" fontFamily="'Courier New',monospace" fontSize="11" fill="#89ddff">  &#125;</text>
                    <text x="36" y="156" fontFamily="'Courier New',monospace" fontSize="11" fill="#c3e88d">{"// armored PGP output"}</text>
                  </svg>
                )}
                {slide.visualType === 'illustration_3' && (
                  <svg width="260" height="190" viewBox="0 0 260 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30" y="30" width="200" height="130" rx="12" fill="#fff" stroke="#e8eaed" strokeWidth="1.5"/>
                    <rect x="30" y="30" width="200" height="40" rx="12" fill="#6d4aff"/>
                    <rect x="30" y="58" width="200" height="12" fill="#6d4aff"/>
                    <circle cx="55" cy="50" r="12" fill="rgba(255,255,255,0.2)"/>
                    <text x="49" y="55" fontSize="14" fontFamily="sans-serif" fill="#fff">P</text>
                    <text x="73" y="47" fontSize="10" fontWeight="700" fontFamily="sans-serif" fill="#fff">ProtonMail</text>
                    <text x="73" y="59" fontSize="9" fontFamily="sans-serif" fill="rgba(255,255,255,0.7)">Encrypted Message</text>
                    <text x="48" y="96" fontSize="9" fill="#9aa0a6" fontFamily="monospace">-----BEGIN PGP MESSAGE-----</text>
                    <text x="48" y="108" fontSize="9" fill="#5f6368" fontFamily="monospace">hQEMAz4P8v3X2kQ0AQf/</text>
                    <text x="48" y="120" fontSize="9" fill="#5f6368" fontFamily="monospace">Tz8nK2pXQm+vRbLy...</text>
                    <text x="48" y="132" fontSize="9" fill="#9aa0a6" fontFamily="monospace">-----END PGP MESSAGE-----</text>
                    <rect x="48" y="144" width="60" height="8" rx="2" fill="#e8f0fe"/>
                    <rect x="116" y="144" width="40" height="8" rx="2" fill="#e6f4ea"/>
                    <circle cx="220" cy="55" r="10" fill="rgba(255,255,255,0.15)"/>
                    <path d="M215 55 l4 5 7-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                )}
              </div>

            </div>
          </div>
        );
      })}

      {slides.length > 1 && (
        <>
          <button 
            className="absolute top-1/2 -translate-y-1/2 left-3 w-8 h-8 rounded-full bg-white border border-[#dadce0] flex items-center justify-center cursor-pointer z-10 shadow-sm hover:shadow-md transition-shadow md:opacity-0 md:group-hover:opacity-100"
            onClick={() => setActiveIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[--color-text-muted] fill-none stroke-2 stroke-linecap-round stroke-linejoin-round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          
          <button 
            className="absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8 rounded-full bg-white border border-[#dadce0] flex items-center justify-center cursor-pointer z-10 shadow-sm hover:shadow-md transition-shadow md:opacity-0 md:group-hover:opacity-100"
            onClick={() => setActiveIdx((prev) => (prev + 1) % slides.length)}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[--color-text-muted] fill-none stroke-2 stroke-linecap-round stroke-linejoin-round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-colors ${idx === activeIdx ? 'bg-[--color-brand-blue]' : 'bg-[#dadce0]'}`}
                onClick={() => setActiveIdx(idx)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
