import Link from "next/link";

import type { CtaData } from "@/lib/cms-types";

export function CtaBanner({ data }: { data: CtaData }) {
  return (
    <section className="bg-[--color-surface] py-16 border-y border-[--color-border]">
      <div className="max-w-[800px] mx-auto px-8 text-center">
        <h2 className="text-[32px] font-normal leading-[1.2] font-serif text-[--color-text-primary] mb-4">
          {data.title}
        </h2>
        <p className="text-[16px] text-[--color-text-muted] leading-[1.7] mb-7 mx-auto max-w-[600px]">
          {data.body}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href={data?.primaryBtnUrl || "#"} className="inline-flex items-center gap-2 text-[14px] font-semibold rounded-full px-5.5 py-2.5 transition-all bg-[--color-brand-blue] text-white hover:bg-[#1765cc] hover:shadow-[0_2px_8px_rgba(26,115,232,0.35)]">
            {data?.primaryBtnText || "Primary Button"}
          </Link>
          <Link href={data?.secondaryBtnUrl || "#"} className="inline-flex items-center gap-2 text-[14px] font-semibold rounded-full px-5.5 py-2.5 transition-all bg-transparent text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]">
            {data?.secondaryBtnText || "Secondary Button"}
          </Link>
        </div>
      </div>
    </section>
  );
}
