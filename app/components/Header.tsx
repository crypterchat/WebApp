import { getPayload } from "payload";
import configPromise from "@/payload.config";
import Link from "next/link";
import { ClientNav } from "./ClientNav";
import type { NavLink } from "@/lib/cms-types";

export async function Header() {
  const payload = await getPayload({ config: configPromise });
  const nav = await payload.findGlobal({ slug: "navigation" });
  const announcement = await payload.findGlobal({ slug: "announcement-bar" });

  return (
    <>
      {announcement.enabled && (
        <div className="bg-[--color-brand-blue] text-center p-2 text-[13px] text-white font-medium tracking-wide">
          {/* Note: Payload's Rich Text would need a serializer here, keeping it simple for the layout wrapper */}
          <div dangerouslySetInnerHTML={{ __html: announcement.content || '' }} />
        </div>
      )}
      
      <header className="border-b border-[--color-border] bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between h-[60px] max-w-[1200px] mx-auto px-8">
          <div className="flex items-center gap-9">
            <Link href="/" className="logo flex items-center gap-2">
              <img src="/crypterchat.svg" alt="CrypterChat" style={{ height: "30px", width: "auto" }} />
            </Link>
            
            <ul className="hidden md:flex gap-1 list-none">
              {nav.links?.map((link: NavLink, i: number) => (
                <li key={i}>
                  <Link 
                    href={link?.url || "#"}
                    className="text-[14px] text-[#3c4043] px-3 py-1.5 rounded font-medium hover:bg-[#f1f3f4] hover:text-[--color-brand-blue] transition-colors flex items-center gap-1"
                    target={link?.isExternal ? "_blank" : undefined}
                  >
                    {link?.label || "Link"}
                    {link?.isExternal && <span className="text-[11px] text-[--color-text-faint]">↗</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center gap-4">
            <a href={nav.githubUrl} target="_blank" className="flex items-center justify-center w-9 h-9 rounded-full text-[--color-text-muted] hover:bg-[#f1f3f4] transition-colors" title="GitHub">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href={nav.npmUrl} target="_blank" className="flex items-center justify-center w-9 h-9 rounded-full text-[--color-text-muted] hover:bg-[#f1f3f4] transition-colors" title="npm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><rect x="3" y="8" width="18" height="10" rx="1.5"/><path d="M7 18v-6h4v6"/><line x1="15" y1="12" x2="15" y2="18"/></svg>
            </a>
            
            <div className="hidden md:flex items-center gap-2 border border-[#dadce0] rounded-full px-3.5 py-1.5 text-[13px] text-[--color-text-faint] cursor-pointer hover:border-[--color-brand-blue] transition-all bg-white shadow-sm hover:shadow">
              <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search
              <span className="bg-[#f1f3f4] rounded px-1.5 py-[1px] text-[11px] text-[--color-text-muted] ml-1 font-mono">⌘K</span>
            </div>
            
            <ClientNav navLinks={nav.links} />
          </div>
        </div>
      </header>
    </>
  );
}
