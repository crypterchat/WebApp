import React from 'react';

export default function PhoneMockup({ splashSide = "left" }: { splashSide?: "left" | "right" }) {
  return (
    <div className="relative flex justify-center items-center z-10">
      {/* Playful Orange Sunburst / Abstract Graphic */}
      <div className={`absolute bottom-[-180px] z-0 pointer-events-none hidden md:block ${splashSide === 'left' ? 'left-[-180px]' : 'right-[-180px] scale-x-[-1]'}`}>
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M300 600C300 600 200 400 100 420C100 420 180 320 20 260C20 260 210 220 100 80C100 80 260 170 280 20C280 20 320 180 440 60C440 60 380 240 540 220C540 220 400 300 520 450C520 450 350 380 300 600Z" fill="#F76219"/>
          <g transform="translate(190, 220) rotate(-15)">
            <circle cx="35" cy="35" r="18" fill="none" stroke="#2C3B32" strokeWidth="3"/>
            <path d="M28 28 Q30 25 32 28" fill="none" stroke="#2C3B32" strokeWidth="3" strokeLinecap="round"/>
            <path d="M42 28 Q40 25 38 28" fill="none" stroke="#2C3B32" strokeWidth="3" strokeLinecap="round"/>
            <path d="M30 42 Q35 48 40 42" fill="none" stroke="#2C3B32" strokeWidth="3" strokeLinecap="round"/>
          </g>
        </svg>
      </div>
      
      {/* Phone Mockup - Hardware */}
      <div className="relative w-[280px] sm:w-[320px] h-[580px] sm:h-[650px] bg-white rounded-[45px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] z-10 overflow-hidden flex flex-col ring-[10px] sm:ring-[12px] ring-black border-[4px] border-[#333] scale-95 sm:scale-100 transform origin-center">
        
        {/* Phone Notch */}
        <div className="absolute top-0 inset-x-0 h-6 sm:h-7 flex justify-center z-20">
          <div className="w-[120px] sm:w-[140px] h-6 sm:h-7 bg-black rounded-b-[20px] flex items-center justify-center">
            <div className="w-16 h-1.5 bg-[#222] rounded-full"></div>
          </div>
        </div>
        
        {/* Phone App UI - Header */}
        <div className="pt-14 pb-4 px-6 bg-white flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="font-[family-name:var(--font-lora)] text-[#1c2921] font-semibold text-lg">Hi, User</div>
          </div>
          <div className="text-[10px] text-gray-400 font-medium">Today&apos;s Totals</div>
        </div>
        
        {/* Phone App UI - Scrollable Body */}
        <div className="flex-1 bg-white p-5 flex flex-col gap-6 overflow-y-auto pb-10">
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-visible relative mt-2">
            <div className="bg-[#B8CAE0] px-5 py-3 rounded-t-3xl border-b border-[#a3b8d1]">
              <span className="font-[family-name:var(--font-lora)] text-[#395344] font-medium text-xl">Generate</span>
            </div>
            <div className="absolute right-4 top-10 w-9 h-9 rounded-full bg-[#395344] text-white flex items-center justify-center text-xl leading-none shadow-md z-10">+</div>
            <div className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F0F4F8] rounded-full flex items-center justify-center shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8ca3be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div>
                <div className="text-xl font-bold text-[#1c2921]">New Keys</div>
                <div className="text-[10px] text-gray-400">RSA 4096-bit</div>
              </div>
            </div>
            <div className="border-t border-gray-100 py-3 text-center text-xs text-gray-400 font-medium">Show More</div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-visible relative mt-2">
            <div className="bg-[#EACD63] px-5 py-3 rounded-t-3xl border-b border-[#d8bc54]">
              <span className="font-[family-name:var(--font-lora)] text-[#395344] font-medium text-xl">Encrypt</span>
            </div>
            <div className="absolute right-4 top-10 w-9 h-9 rounded-full bg-[#395344] text-white flex items-center justify-center text-xl leading-none shadow-md z-10">+</div>
            <div className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FCF9F0] rounded-full flex items-center justify-center shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4b43c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <div className="text-xl font-bold text-[#1c2921]">Messages</div>
                <div className="text-[10px] text-gray-400">Secure Text</div>
              </div>
            </div>
            <div className="border-t border-gray-100 py-3 text-center text-xs text-gray-400 font-medium">Show More</div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-visible relative mt-2">
            <div className="bg-[#D09696] px-5 py-3 rounded-t-3xl border-b border-[#bf8383]">
              <span className="font-[family-name:var(--font-lora)] text-[#395344] font-medium text-xl">Verify</span>
            </div>
            <div className="absolute right-4 top-10 w-9 h-9 rounded-full bg-[#395344] text-white flex items-center justify-center text-xl leading-none shadow-md z-10">+</div>
            <div className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F9F0F0] rounded-full flex items-center justify-center shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c08282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div>
                <div className="text-xl font-bold text-[#1c2921]">Signatures</div>
                <div className="text-[10px] text-gray-400">Detached Sigs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
