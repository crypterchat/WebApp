import Link from "next/link";
import Image from "next/image";

import type { CaseStudy } from "@/lib/cms-types";

export function CaseStudyCard({ data }: { data: CaseStudy & { logo?: { url?: string } | string | null } }) {
  // If logo is a relation, payload will return the object if depth is at least 1, else ID
  const logoUrl = data.logo && typeof data.logo === 'object' ? data.logo.url : null;
  
  return (
    <div className="border border-[--color-border] rounded-[10px] p-7 md:p-8 flex flex-col gap-3.5 transition-all hover:shadow-[0_4px_20px_rgba(60,64,67,0.13)] hover:-translate-y-0.5 cursor-pointer bg-white h-full">
      <div className="h-9 flex items-center">
        {logoUrl ? (
          <Image src={logoUrl} alt={data.title} width={130} height={36} className="max-h-9 w-auto" />
        ) : data.title.includes("Proton") ? (
          <svg width="130" height="36" viewBox="0 0 130 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4 L2 32 L10 32 L10 20 L17 32 L26 32 L18 19 C22 17 24 14 24 10 C24 6 21 4 17 4 Z M10 10 L16 10 C17.8 10 19 11.2 19 13 C19 14.8 17.8 16 16 16 L10 16 Z" fill="#6d4aff"/>
            <text x="30" y="24" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#6d4aff">Proton</text>
            <text x="90" y="24" fontSize="17" fontWeight="400" fontFamily="-apple-system,sans-serif" fill="#333">Mail</text>
          </svg>
        ) : data.title.includes("Keybase") ? (
          <svg width="120" height="36" viewBox="0 0 120 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="11" fill="none" stroke="#ff6c21" strokeWidth="2.5"/>
            <circle cx="14" cy="14" r="5" fill="#ff6c21"/>
            <rect x="22" y="12.5" width="14" height="3" rx="1.5" fill="#ff6c21"/>
            <rect x="31" y="12.5" width="3" height="6" rx="1" fill="#ff6c21"/>
            <rect x="26" y="12.5" width="3" height="5" rx="1" fill="#ff6c21"/>
            <text x="40" y="21" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#ff6c21">Keybase</text>
          </svg>
        ) : data.title.includes("Mailvelope") ? (
          <svg width="148" height="36" viewBox="0 0 148 36" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="7" width="28" height="22" rx="3.5" fill="none" stroke="#1a73e8" strokeWidth="2"/>
            <polyline points="0,9 14,20 28,9" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round"/>
            <text x="34" y="24" fontSize="17" fontWeight="700" fontFamily="-apple-system,sans-serif" fill="#1a73e8">Mailvelope</text>
          </svg>
        ) : (
          <div className="h-9 w-24 bg-gray-100 rounded animate-pulse" />
        )}
      </div>
      
      <h2 className="text-[17px] font-bold text-[--color-text-primary] leading-[1.35]">
        {data.title}
      </h2>
      
      <p className={`text-[14px] text-[--color-text-muted] leading-[1.65] flex-1 ${data.isQuote ? 'italic' : ''}`}>
        {data.isQuote ? `"${data.body}"` : data.body}
      </p>
      
      <Link href={data?.linkUrl || "#"} className="text-[13px] text-[--color-brand-blue] font-semibold inline-flex items-center gap-1 mt-1 hover:underline">
        {data?.linkText || "Read more"}
        <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[--color-brand-blue] fill-none stroke-[2.5] stroke-linecap-round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </Link>
    </div>
  );
}
