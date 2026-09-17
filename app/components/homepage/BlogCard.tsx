import Link from "next/link";

import type { BlogPost } from "@/lib/cms-types";

export function BlogCard({ data }: { data: BlogPost }) {
  const thumbColors: Record<string, string> = {
    'bt-blue': 'bg-[linear-gradient(145deg,#1a73e8,#4285f4)]',
    'bt-green': 'bg-[linear-gradient(145deg,#34a853,#5bb974)]',
    'bt-amber': 'bg-[linear-gradient(145deg,#f9ab00,#fbbc04)]',
  };
  
  const colorClass = thumbColors[data.thumbColor || "bt-blue"] || thumbColors["bt-blue"];
  
  const dateStr = data.date
    ? new Date(data.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Link href={`/blog/${data.slug || ''}`} className="flex flex-col group cursor-pointer h-full">
      <div className={`h-[160px] rounded-xl mb-4 flex items-center justify-center text-[48px] text-white/90 shadow-sm transition-transform duration-300 group-hover:shadow-md group-hover:-translate-y-1 ${colorClass}`}>
        {data.thumbIcon}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-[12px] font-bold tracking-[1px] uppercase text-[--color-text-faint] mb-2.5">
          {data.tag}
        </div>
        <h3 className="text-[18px] font-bold text-[--color-text-primary] leading-[1.3] mb-2.5 transition-colors group-hover:text-[--color-brand-blue]">
          {data.title}
        </h3>
        <p className="text-[14px] text-[--color-text-muted] leading-[1.6] flex-1 mb-4">
          {data.excerpt}
        </p>
        <div className="text-[13px] text-[--color-text-faint] mt-auto border-t border-[--color-border] pt-3 flex justify-between items-center">
          <span>{dateStr}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[--color-brand-blue] font-medium">Read</span>
        </div>
      </div>
    </Link>
  );
}
