import Link from "next/link";

import type { CodeBlockData } from "@/lib/cms-types";

export function CodeBlock({ data }: { data: CodeBlockData }) {
  // A simple syntax highlighter could be added, but for now we'll just render it exactly as requested in the design HTML
  // which implies manual classes, but since Payload gives us text, we might inject it or let the user write raw HTML with spans.
  // The design calls for .c-kw, .c-fn, etc. We will use dangerouslySetInnerHTML to allow them to author colored spans.
  
  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="md:pr-4">
            <h2 className="text-[28px] font-normal leading-[1.3] mb-3.5 font-serif text-[--color-text-primary]">
              {data.title}
            </h2>
            <p className="text-[15px] text-[--color-text-muted] leading-[1.7] mb-5">
              {data.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={data?.primaryBtnUrl || "#"} className="inline-flex items-center gap-2 text-[14px] font-semibold rounded-full px-5.5 py-2.5 transition-all bg-[--color-brand-blue] text-white hover:bg-[#1765cc] hover:shadow-[0_2px_8px_rgba(26,115,232,0.35)]">
                {data?.primaryBtnText || "Primary Button"}
              </Link>
              <Link href={data?.secondaryBtnUrl || "#"} className="inline-flex items-center gap-2 text-[14px] font-semibold rounded-full px-5.5 py-2.5 transition-all bg-transparent text-[--color-brand-blue] border-[1.5px] border-[--color-brand-blue] hover:bg-[#e8f0fe]">
                {data?.secondaryBtnText || "Secondary Button"}
              </Link>
            </div>
          </div>
          
          <div className="bg-[--color-code-bg] rounded-xl p-7 pb-5 font-mono text-[13px] leading-[1.65] overflow-x-auto relative">
            <div className="flex items-center gap-1.5 mb-4.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-auto text-[11px] text-[#6b7280] font-sans">
                {data?.codeTitle || "Code"}
              </span>
            </div>
            <pre className="m-0 whitespace-pre text-white/90">
              <code dangerouslySetInnerHTML={{ __html: data?.code || "No code snippet provided yet." }} />
            </pre>
          </div>
          
        </div>
      </div>
    </section>
  );
}
