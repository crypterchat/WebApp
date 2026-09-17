import { getPayload } from "payload";
import configPromise from "@/payload.config";
import Link from "next/link";
import type { Footer, FooterColumn, FooterLink } from "@/lib/cms-types";

export async function Footer() {
  const payload = await getPayload({ config: configPromise });
  const footer = await payload.findGlobal({ slug: "footer" });

  return (
    <footer className="bg-[--color-surface] border-t border-[--color-border] pt-13 pb-8">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 mb-12">
          
          <div className="footer-brand">
            <Link href="/" className="font-mono text-[18px] font-extrabold tracking-tighter">
              <span className="text-[--color-brand-blue]">P</span>
              <span className="text-[--color-brand-red]">G</span>
              <span className="text-[--color-brand-amber]">P</span>
              <span className="text-[--color-brand-green]">J</span>
              <span className="text-[--color-brand-blue]">S</span>
              <span className="text-[--color-text-faint] font-normal">.</span>
            </Link>
            <p className="text-[13px] text-[--color-text-muted] leading-relaxed max-w-[220px] my-2.5 mb-4.5">
              {footer.brandDescription}
            </p>
            <div className="flex gap-2.5">
              <a href={footer.socialLinks?.github} className="w-[34px] h-[34px] rounded-full border border-[#dadce0] flex items-center justify-center bg-white cursor-pointer hover:border-[--color-brand-blue] hover:bg-[#e8f0fe] transition-colors text-[--color-text-muted]">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
              <a href={footer.socialLinks?.twitter} className="w-[34px] h-[34px] rounded-full border border-[#dadce0] flex items-center justify-center bg-white cursor-pointer hover:border-[--color-brand-blue] hover:bg-[#e8f0fe] transition-colors text-[--color-text-muted]">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href={footer.socialLinks?.npm} className="w-[34px] h-[34px] rounded-full border border-[#dadce0] flex items-center justify-center bg-white cursor-pointer hover:border-[--color-brand-blue] hover:bg-[#e8f0fe] transition-colors text-[--color-text-muted]">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><rect x="3" y="8" width="18" height="10" rx="1.5"/><path d="M7 18v-6h4v6"/><line x1="15" y1="12" x2="15" y2="18"/></svg>
              </a>
            </div>
          </div>
          
          {footer.columns?.map((col: FooterColumn, i: number) => (
            <div key={i} className="flex flex-col">
              <h4 className="text-[12px] font-bold tracking-[1px] uppercase text-[--color-text-faint] mb-3.5">
                {col?.title || "Links"}
              </h4>
              <ul className="list-none flex flex-col gap-2">
                {col.links?.map((link: FooterLink, j: number) => (
                  <li key={j}>
                    <Link href={link?.url || "#"} className="text-[14px] text-[#3c4043] hover:text-[--color-brand-blue] transition-colors">
                      {link?.label || "Link"}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
        </div>
        
        <div className="border-t border-[--color-border] pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="text-[13px] text-[--color-text-faint]">
            {footer.copyright || "© PGPJS"}
          </div>
          <div className="flex gap-5">
            {footer.bottomLinks?.map((link: FooterLink, i: number) => (
              <Link key={i} href={link?.url || "#"} className="text-[13px] text-[--color-text-faint] hover:text-[--color-brand-blue]">
                {link?.label || "Link"}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
