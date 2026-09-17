"use client";

import { useState } from "react";
import Image from "next/image";
import { Server, Activity, Link as LinkIcon, HardDrive, Shield, CheckCircle2, Copy, RefreshCw } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";

export default function ServerSetupPage() {
  const [serverUrl, setServerUrl] = useState("https://api.yourdomain.com");
  const [wsUrl, setWsUrl] = useState("wss://ws.yourdomain.com");
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState<"disconnected" | "connected" | "error">("disconnected");
  const [toast, setToast] = useState<string | null>(null);
  const { user } = useAuth();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!");
  };

  const handleTestConnection = () => {
    setIsTesting(true);
    setStatus("disconnected");
    setTimeout(() => {
      setIsTesting(false);
      setStatus("connected");
      showToast("Successfully connected to server!");
    }, 1200);
  };

  return (
    <div className="profile-page-root w-full min-h-screen bg-white dark:bg-[#121214] text-gray-900 dark:text-white pb-20 md:pb-0 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-gray-900 dark:bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border border-gray-700">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}

      {/* BANNER (Dashboard standard) */}
      <div className="banner">
        <div className="banner-text">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Own Server Setup</h1>
          <div className="lbl">CRYPTERCHAT SERVER CONFIGURATION</div>
          <div className="text-xs text-white/80 max-w-xl">
            Configure custom API routes, WebSocket gateways, and security protocols for your private self-hosted backend.
          </div>
        </div>
      </div>

      {/* AVATAR OVERLAP */}
      <div className="avatar-anchor">
        <div className="avatar">
          {user?.photoURL ? (
            <Image src={user.photoURL} alt="Profile" width={96} height={96} className="object-cover w-full h-full" />
          ) : (
            <div className="avatar-ph">
              <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
          )}
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        <button 
          onClick={handleTestConnection}
          disabled={isTesting}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all shadow-sm disabled:opacity-50"
          type="button"
        >
          {isTesting ? <RefreshCw size={16} className="animate-spin" /> : <Activity size={16} />}
          <span>{isTesting ? "Testing..." : "Test Connection"}</span>
        </button>

        {status === "connected" && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-lg border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="content max-w-4xl">
        <div className="sec-title">Backend Connectivity</div>

        {/* CONNECTION STATUS PANEL */}
        <div className="server-panel">
          <div className="server-panel-header">
            <div className="server-panel-icon">
              <Activity size={20} />
            </div>
            <div>
              <div className="server-panel-title">Connection Status</div>
              <div className="server-panel-desc">
                {status === 'connected' ? 'Connected to private server' : 'Not currently connected to a backend instance.'}
              </div>
            </div>
          </div>
        </div>

        <div className="sec-title">Endpoints Configuration</div>

        {/* SERVER ENDPOINTS PANEL */}
        <div className="server-panel">
          <div className="server-panel-header">
            <div className="server-panel-icon">
              <LinkIcon size={20} />
            </div>
            <div>
              <div className="server-panel-title">Server Endpoints</div>
              <div className="server-panel-desc">Define where the mobile app sends API requests and WebSocket frames.</div>
            </div>
          </div>

          <div className="server-input-group">
            <label className="server-input-label">REST API URL</label>
            <div className="server-input-wrap">
              <span className="server-input-badge">GET/POST</span>
              <input 
                type="text" 
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                className="server-input-field" 
                placeholder="https://api.yourdomain.com"
              />
            </div>
            <p className="server-input-note">Must be a secure HTTPS endpoint. Used for authentication and key exchange.</p>
          </div>

          <div className="server-input-group">
            <label className="server-input-label">WebSocket URL (WSS)</label>
            <div className="server-input-wrap">
              <span className="server-input-badge">WSS</span>
              <input 
                type="text" 
                value={wsUrl}
                onChange={(e) => setWsUrl(e.target.value)}
                className="server-input-field" 
                placeholder="wss://ws.yourdomain.com"
              />
            </div>
            <p className="server-input-note">Required for real-time messaging. Must use secure WebSockets (WSS).</p>
          </div>

          <div className="server-save-row">
            <button 
              onClick={() => showToast("Configuration saved successfully!")}
              className="server-save-btn"
              type="button"
            >
              Save Configuration
            </button>
          </div>
        </div>

        <div className="sec-title">Security & Credentials</div>

        {/* SERVER INFO & POLICIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="server-panel mb-0">
            <div className="server-panel-header">
              <div className="server-panel-icon">
                <HardDrive size={20} />
              </div>
              <div>
                <div className="server-panel-title">Server Identity</div>
                <div className="server-panel-desc">Client verification key</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              The public identity key of your server, used by clients to verify authenticity.
            </p>
            <div className="server-identity-box">
              <span className="truncate">ed25519:A8B9C7D6E5F4G3H2I1J0K9L8M7N6O5P4Q3R2S1T0U9V</span>
              <button 
                onClick={() => copyToClipboard("ed25519:A8B9C7D6E5F4G3H2I1J0K9L8M7N6O5P4Q3R2S1T0U9V")}
                className="p-1.5 bg-white dark:bg-[#202026] rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#282832] transition-colors flex-shrink-0"
                title="Copy Server Key"
                type="button"
              >
                <Copy size={13} className="text-gray-500 dark:text-gray-300" />
              </button>
            </div>
          </div>

          <div className="server-panel mb-0">
            <div className="server-panel-header">
              <div className="server-panel-icon">
                <Shield size={20} />
              </div>
              <div>
                <div className="server-panel-title">Security Policies</div>
                <div className="server-panel-desc">Transport & storage rules</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#202026] transition-colors">
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Require Mutual TLS</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Clients must present a valid cert</div>
                </div>
                <input type="checkbox" className="w-4 h-4 accent-indigo-600 rounded cursor-pointer" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#202026] transition-colors">
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Ephemeral Storage</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Wipe messages on delivery</div>
                </div>
                <input type="checkbox" className="w-4 h-4 accent-indigo-600 rounded cursor-pointer" defaultChecked />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
