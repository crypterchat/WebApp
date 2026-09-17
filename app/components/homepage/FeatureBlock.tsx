import type { Feature } from "@/lib/cms-types";

export function FeatureBlock({ data }: { data: Feature }) {
  // mapping background colors based on select values
  const bgColors: Record<string, string> = {
    'fi-blue': 'bg-[#e8f0fe] text-[--color-brand-blue]',
    'fi-green': 'bg-[#e6f4ea] text-[--color-brand-green]',
    'fi-red': 'bg-[#fce8e6] text-[--color-brand-red]',
    'fi-amber': 'bg-[#fef7e0] text-[--color-brand-amber]',
  };
  
  const colorClass = bgColors[data.iconColor || "fi-blue"] || bgColors["fi-blue"];

  return (
    <div className="flex flex-col gap-2.5">
      <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center mb-1 ${colorClass}`}>
        <div 
          className="w-[22px] h-[22px] [&_svg]:w-full [&_svg]:h-full [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[1.8] [&_svg]:stroke-linecap-round [&_svg]:stroke-linejoin-round"
          dangerouslySetInnerHTML={{ __html: data.iconSvg || "" }} 
        />
      </div>
      <div className="text-[15px] font-bold text-[--color-text-primary]">
        {data.title}
      </div>
      <div className="text-[14px] text-[--color-text-muted] leading-[1.65]">
        {data.body}
      </div>
    </div>
  );
}
