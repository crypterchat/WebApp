import { getPayload } from "payload";
import type { NavLink } from "@/lib/cms-types";
import configPromise from "@/payload.config";
import Link from "next/link";
import "./globals.css";
import AppleFooter from "./components/AppleFooter";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  const payload = await getPayload({ config: configPromise });
  
  const nav = await payload.findGlobal({ slug: "navigation" });
  const footer = await payload.findGlobal({ slug: "footer" });
  const announcement = await payload.findGlobal({ slug: "announcement-bar" });

  return (
    <>
      {/* TOPBAR */}
      {announcement.enabled && (
        <div className="topbar">
          <div dangerouslySetInnerHTML={{ __html: announcement.content || '' }} />
        </div>
      )}

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <div className="nav-left">
            <Link href="/" className="logo">
              <img src="/crypterchat.svg" alt="CrypterChat" style={{ height: "30px", width: "auto" }} />
            </Link>
            <ul className="nav-links">
              {nav.links?.map((link: NavLink, i: number) => (
                <li key={i}>
                  <Link 
                    href={link?.url || "#"} 
                    target={link?.isExternal ? "_blank" : undefined}
                  >
                    {link?.label} {link?.isExternal && <span className="ext-icon">↗</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-right">
            <a href={nav.githubUrl} target="_blank" className="nav-icon-btn" title="GitHub">
              <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <button className="nav-icon-btn theme-toggle" title="Toggle theme">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </button>
            <div className="search-pill">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search
              <span className="kbd">⌘K</span>
            </div>
            <button className="hamburger" id="hamburger" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <div className="mobile-nav" id="mobileNav">
          {nav.links?.map((link: NavLink, i: number) => (
            <Link key={i} href={link?.url || "#"} target={link?.isExternal ? "_blank" : undefined}>
              {link?.label} {link?.isExternal && "↗"}
            </Link>
          ))}
          <a href={nav.githubUrl} target="_blank">GitHub ↗</a>
        </div>
      </nav>

      {/* 404 CONTENT */}
      <section className="bg-[#F6F4ED] min-h-[70vh] flex items-center justify-center relative overflow-hidden py-24 text-center">
        <div className="container mx-auto px-6 z-10 relative flex flex-col items-center">
          <h1 className="text-8xl md:text-[8rem] text-[#395344] font-[family-name:var(--font-lora)] font-medium leading-tight mb-4 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl text-[#395344] font-bold mb-6 uppercase tracking-wide">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md leading-relaxed mb-10">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed in the first place.
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-10 py-4 bg-[#395344] text-white rounded-full hover:bg-[#2b3f33] transition-colors text-lg font-medium shadow-md">
            Return to Homepage
          </Link>
        </div>
        {/* Decorative Sunburst in the background */}
        <div className="absolute top-[-100px] right-[-100px] z-0 opacity-20 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M300 600C300 600 200 400 100 420C100 420 180 320 20 260C20 260 210 220 100 80C100 80 260 170 280 20C280 20 320 180 440 60C440 60 380 240 540 220C540 220 400 300 520 450C520 450 350 380 300 600Z" fill="#F76219"/>
          </svg>
        </div>
      </section>

      {/* FOOTER */}
      <AppleFooter footer={footer} />
    </>
  );
}
