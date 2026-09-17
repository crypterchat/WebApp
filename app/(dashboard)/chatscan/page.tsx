"use client";

import { BarChart, ShieldCheck } from "lucide-react";

export default function ChatScanPage() {
  return (
    <div className="profile-page-root w-full min-h-screen bg-white dark:bg-[#121214] text-gray-900 dark:text-white pb-20 md:pb-0 relative">
      {/* BANNER (Dashboard standard) */}
      <div className="banner">
        <div className="banner-text">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">ChatScan Telemetry</h1>
          <div className="lbl">SECURITY & TRAFFIC MONITORING</div>
          <div className="text-xs text-white/80 max-w-xl">
            Real-time payload inspection, anomaly detection, and rate-limiting metrics for active WebSocket sessions.
          </div>
        </div>
      </div>

      <div className="content max-w-4xl py-16 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-gray-100 dark:bg-[#1c1c20] rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-800">
            <BarChart size={30} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Active Scans</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            ChatScan is currently idle. Incoming message payloads are end-to-end encrypted and routed with zero-knowledge relaying.
          </p>
        </div>
      </div>
    </div>
  );
}
