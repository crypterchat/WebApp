"use client";

import { useState } from "react";
import Link from "next/link";

import type { NavLink } from "@/lib/cms-types";

export function ClientNav({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="md:hidden flex flex-col gap-[5px] w-9 h-9 items-center justify-center cursor-pointer bg-none border-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <span className={`block w-5 h-[2px] bg-[--color-text-muted] rounded-[2px] transition-all ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
        <span className={`block w-5 h-[2px] bg-[--color-text-muted] rounded-[2px] transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-5 h-[2px] bg-[--color-text-muted] rounded-[2px] transition-all ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
      </button>

      {isOpen && (
        <nav className="md:hidden fixed top-[60px] left-0 right-0 bottom-0 bg-white z-[199] p-6 overflow-y-auto border-t border-[--color-border] flex flex-col gap-1">
          {navLinks?.map((link: NavLink, i: number) => (
            <Link 
              key={i}
              href={link?.url || "#"}
              className="text-[16px] font-medium text-[#3c4043] p-4 rounded-lg block border-b border-[#f1f3f4] last:border-none hover:bg-[#f1f3f4] hover:text-[--color-brand-blue]"
              onClick={() => setIsOpen(false)}
              target={link?.isExternal ? "_blank" : undefined}
            >
              {link?.label || "Link"} {link?.isExternal && "↗"}
            </Link>
          ))}
          <a 
            href="https://github.com/pgpjs" 
            target="_blank"
            className="text-[16px] font-medium text-[#3c4043] p-4 rounded-lg block border-b border-[#f1f3f4] last:border-none hover:bg-[#f1f3f4] hover:text-[--color-brand-blue]"
          >
            GitHub ↗
          </a>
        </nav>
      )}
    </>
  );
}
