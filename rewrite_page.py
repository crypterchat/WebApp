import re

with open("app/(app)/page.tsx", "r") as f:
    content = f.read()

# 1. Replace imports and top level function
top_pattern = re.compile(r'"use client";\n\nimport \{ useEffect \} from "react";\nimport "\.\./globals\.css";\n\nexport default function HomePage\(\) \{.*?(?=  return \(\n    <>\n      \{/\* TOPBAR \*/\})', re.DOTALL)

top_replacement = """import { getPayload } from "payload";
import configPromise from "@/payload.config";
import "../globals.css";
import HomePageScripts from "./HomePageScripts";

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise });
  const nav = await payload.findGlobal({ slug: "navigation" });
  const footer = await payload.findGlobal({ slug: "footer" });
  const announcement = await payload.findGlobal({ slug: "announcement-bar" });

"""
content = top_pattern.sub(top_replacement, content)

# 2. Replace TOPBAR and NAV
nav_pattern = re.compile(r'      \{/\* TOPBAR \*/\}(.*?)</nav>\n\n      <nav className="mobile-nav" id="mobileNav">(.*?)</nav>', re.DOTALL)
nav_replacement = """      {/* TOPBAR */}
      {announcement.enabled && (
        <div className="topbar">
          <div dangerouslySetInnerHTML={{ __html: announcement.content || '' }} />
        </div>
      )}

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <div className="nav-left">
            <a href="/" className="logo">
              <span className="logo-p1">P</span><span className="logo-g">G</span><span className="logo-p2">P</span><span className="logo-j">J</span><span className="logo-s">S</span><span className="logo-dot">.</span>
            </a>
            <ul className="nav-links">
              {nav.links?.map((link: any, i: number) => (
                <li key={i}>
                  <a 
                    href={link?.url || "#"} 
                    className={i === 0 ? "active" : ""}
                    target={link?.isExternal ? "_blank" : undefined}
                  >
                    {link?.label} {link?.isExternal && <span className="ext-icon">↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-right">
            <a href={nav.githubUrl} target="_blank" className="nav-icon-btn" title="GitHub">
              <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href={nav.npmUrl} target="_blank" className="nav-icon-btn" title="npm">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><path d="M7 18v-6h4v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="15" y1="12" x2="15" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </a>
            <button className="nav-icon-btn" title="Toggle theme">
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
      </nav>

      <nav className="mobile-nav" id="mobileNav">
        {nav.links?.map((link: any, i: number) => (
          <a key={i} href={link?.url || "#"} target={link?.isExternal ? "_blank" : undefined}>
            {link?.label} {link?.isExternal && "↗"}
          </a>
        ))}
        <a href={nav.githubUrl} target="_blank">GitHub ↗</a>
      </nav>"""
content = nav_pattern.sub(nav_replacement, content)

# 3. Add <HomePageScripts /> at the very beginning of <>
content = content.replace("  return (\n    <>\n      {/* TOPBAR */}", "  return (\n    <>\n      <HomePageScripts />\n      {/* TOPBAR */}")

# 4. Replace FOOTER
footer_pattern = re.compile(r'      \{/\* FOOTER \*/\}(.*?)</footer>', re.DOTALL)
footer_replacement = """      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">

            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-p1">P</span><span className="logo-g">G</span><span className="logo-p2">P</span><span className="logo-j">J</span><span className="logo-s">S</span><span className="logo-dot">.</span>
              </div>
              <p>{footer.brandDescription}</p>
              <div className="footer-social">
                <a href={footer.socialLinks?.github} className="social-btn">
                  <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </a>
                <a href={footer.socialLinks?.twitter} className="social-btn">
                  <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
                <a href={footer.socialLinks?.npm} className="social-btn">
                  <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="10" rx="1.5" stroke="#5f6368" strokeWidth="1.8"/><path d="M7 18v-6h4v6" stroke="#5f6368" strokeWidth="1.8" strokeLinecap="round"/><line x1="15" y1="12" x2="15" y2="18" stroke="#5f6368" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </a>
                <a href={footer.socialLinks?.discord} className="social-btn">
                  <svg viewBox="0 0 24 24"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963a.075.075 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z" stroke="none" fill="#5f6368"/></svg>
                </a>
              </div>
            </div>

            {footer.columns?.map((col: any, i: number) => (
              <div key={i} className="footer-col">
                <h4>{col?.title}</h4>
                <ul>
                  {col.links?.map((link: any, j: number) => (
                    <li key={j}><a href={link?.url || "#"}>{link?.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-left">{footer.copyright}</div>
            <div className="footer-bottom-right">
              {footer.bottomLinks?.map((link: any, i: number) => (
                <a key={i} href={link?.url || "#"}>{link?.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>"""
content = footer_pattern.sub(footer_replacement, content)

with open("app/(app)/page.tsx", "w") as f:
    f.write(content)
