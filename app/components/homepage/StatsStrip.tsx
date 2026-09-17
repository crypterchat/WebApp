import type { Stat } from "@/lib/cms-types";

export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-[--color-brand-blue] py-14">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-[32px] md:text-[40px] font-extrabold text-white tracking-[-1px] leading-none mb-1.5">
                {stat.number}
              </div>
              <div className="text-[14px] text-white/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
