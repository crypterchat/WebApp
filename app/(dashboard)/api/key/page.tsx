"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, RefreshCw, Trash2, MoreVertical, Shield, Globe, Lock, ExternalLink, CheckCircle2, X, Server } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { fetchApiKey, generateApiKey, revokeApiKey, toggleKeyStatus, updateAllowedIps, updateAccessScopes, fetchApiLogs } from "@/app/actions/api-key-actions";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./api-key.css";

type ApiKeyData = {
  key: string;
  secretKey: string;
  status: string;
  allowedIps: string[];
  accessScopes: string[];
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [apiKeyData, setApiKeyData] = useState<ApiKeyData | null>(null);
  const [loadingKey, setLoadingKey] = useState(true);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Modal states
  const [showIpModal, setShowIpModal] = useState(false);
  const [tempIps, setTempIps] = useState<string>("");

  const [showScopeModal, setShowScopeModal] = useState(false);
  const [tempScopes, setTempScopes] = useState<Record<string, boolean>>({});

  const availableScopes = [
    { id: 'read_users', label: 'Read Users' },
    { id: 'write_users', label: 'Write Users' },
    { id: 'admin', label: 'Admin Access' }
  ];

  useEffect(() => {
    if (!user) return;
    
    const fetchKey = async () => {
      try {
        const data = await fetchApiKey(user.uid);
        if (data) {
          setApiKeyData(data as ApiKeyData);
        } else {
          setApiKeyData(null);
        }
      } catch (err) {
        console.error("Error fetching API key:", err);
      } finally {
        setLoadingKey(false);
      }
    };
    
    fetchKey();
  }, [user]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
    setMenuOpen(false);
  };

  const handleGenerateKey = async (isRegeneration = false) => {
    if (!user) return;
    setLoadingKey(true);
    try {
      const data = await generateApiKey(user.uid);
      setApiKeyData(data as ApiKeyData);
      showToast(isRegeneration ? "API Key successfully regenerated." : "API Key generated.");
    } catch (err) {
      console.error(err);
      showToast("Error generating key.");
    } finally {
      setLoadingKey(false);
      setMenuOpen(false);
    }
  };

  const handleRevokeKey = async () => {
    if (!user) return;
    setLoadingKey(true);
    try {
      await revokeApiKey(user.uid);
      setApiKeyData(null);
      showToast("API Key access revoked.");
    } catch (err) {
      console.error(err);
      showToast("Error revoking key.");
    } finally {
      setLoadingKey(false);
      setMenuOpen(false);
    }
  };

  const handleToggleStatus = async (checked: boolean) => {
    if (!user || !apiKeyData) return;
    const newStatus = checked ? 'active' : 'inactive';
    try {
      await toggleKeyStatus(user.uid, newStatus);
      setApiKeyData({ ...apiKeyData, status: newStatus });
      showToast(checked ? "Key Status set to Active" : "Key Status set to Inactive");
    } catch (err) {
      console.error(err);
      showToast("Error updating key status.");
    }
  };

  const copyToClipboard = (type: 'public' | 'secret') => {
    if (apiKeyData) {
      const textToCopy = type === 'public' ? apiKeyData.key : apiKeyData.secretKey;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        showToast(type === 'public' ? "Public API Key copied to clipboard!" : "Secret Key copied to clipboard!");
      } else {
        showToast("Key not available to copy.");
      }
    }
  };

  const openIpModal = () => {
    if (apiKeyData) {
      setTempIps(apiKeyData.allowedIps.join(", "));
      setShowIpModal(true);
    }
  };

  const saveIps = async () => {
    if (!user || !apiKeyData) return;
    const ipArray = tempIps.split(",").map(ip => ip.trim()).filter(ip => ip.length > 0);
    try {
      await updateAllowedIps(user.uid, ipArray);
      setApiKeyData({ ...apiKeyData, allowedIps: ipArray });
      setShowIpModal(false);
      showToast("Allowed IP addresses updated.");
    } catch (err) {
      console.error(err);
      showToast("Error saving IP addresses.");
    }
  };

  const openScopeModal = () => {
    if (apiKeyData) {
      const scopeMap: Record<string, boolean> = {};
      availableScopes.forEach(s => {
        scopeMap[s.id] = apiKeyData.accessScopes.includes(s.id);
      });
      setTempScopes(scopeMap);
      setShowScopeModal(true);
    }
  };

  const saveScopes = async () => {
    if (!user || !apiKeyData) return;
    const selectedScopes = Object.keys(tempScopes).filter(k => tempScopes[k]);
    try {
      await updateAccessScopes(user.uid, selectedScopes);
      setApiKeyData({ ...apiKeyData, accessScopes: selectedScopes });
      setShowScopeModal(false);
      showToast("Access scopes updated.");
    } catch (err) {
      console.error(err);
      showToast("Error saving access scopes.");
    }
  };

  const handleDownloadLogs = async () => {
    if (!user?.uid) return;
    setIsDownloadingPdf(true);
    setMenuOpen(false);
    showToast("Generating PDF...");
    
    try {
      const logs = await fetchApiLogs(user.uid);
      if (logs.length === 0) {
        showToast("No logs found.");
        setIsDownloadingPdf(false);
        return;
      }

      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text("CrypterChat Server Logs", 14, 22);
      
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
      doc.text(`Public Key: ${apiKeyData?.key || "N/A"}`, 14, 36);

      // Data formatting
      const tableData = logs.map(log => [
        new Date(log.createdAt).toLocaleString(),
        log.endpoint,
        log.statusCode.toString(),
        `${log.responseTimeMs}ms`
      ]);

      autoTable(doc, {
        startY: 45,
        head: [['Date/Time', 'Endpoint', 'Status', 'Response Time']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [79, 70, 229] }, // Indigo 600
        styles: { fontSize: 9 }
      });

      doc.save("api_hub_logs.pdf");
      showToast("PDF Downloaded successfully!");
    } catch (error) {
      console.error(error);
      showToast("Failed to download logs.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="profile-page-root w-full min-h-screen bg-white dark:bg-[#121214] text-gray-900 dark:text-white pb-20 md:pb-0 relative">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-gray-900 dark:bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border border-gray-700">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}

      {/* IP MODAL */}
      {showIpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 border border-gray-100 dark:border-[#27272a]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Allowed IP Addresses</h3>
              <button onClick={() => setShowIpModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Enter a comma-separated list of IP addresses that are allowed to use this API key. Leave empty to allow all IPs.</p>
            <textarea
              className="w-full h-24 p-3 border border-gray-200 dark:border-gray-700 dark:bg-[#121214] rounded-lg text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="192.168.1.1, 10.0.0.1"
              value={tempIps}
              onChange={(e) => setTempIps(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowIpModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#27272a] hover:bg-gray-200 dark:hover:bg-[#323238] rounded-lg">Cancel</button>
              <button onClick={saveIps} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm">Save IPs</button>
            </div>
          </div>
        </div>
      )}

      {/* SCOPE MODAL */}
      {showScopeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 border border-gray-100 dark:border-[#27272a]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Access Scopes</h3>
              <button onClick={() => setShowScopeModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Select which resources this API key is allowed to access.</p>
            <div className="space-y-3">
              {availableScopes.map(scope => (
                <label key={scope.id} className="flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-[#222226] cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-indigo-600 rounded border-gray-300 dark:border-gray-700 focus:ring-indigo-500"
                    checked={tempScopes[scope.id] || false}
                    onChange={(e) => setTempScopes({...tempScopes, [scope.id]: e.target.checked})}
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{scope.label}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowScopeModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#27272a] hover:bg-gray-200 dark:hover:bg-[#323238] rounded-lg">Cancel</button>
              <button onClick={saveScopes} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm">Save Scopes</button>
            </div>
          </div>
        </div>
      )}

      {/* BANNER — styles from api-key.css (cityscape, fixed height, avatar overlap) */}
      <div className="banner">
        <div className="banner-text">
          <div className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-sm">CrypterChat Server Hub</div>
          <div className="lbl">Your Server Keys</div>
          
          <div className="flex flex-col gap-1 mt-1">
            <div>
              <div className="text-[10px] text-white/70 font-medium tracking-wide uppercase">Public Key</div>
              <div className="key-val" title={apiKeyData?.key}>
                {loadingKey ? "Loading..." : apiKeyData?.key || "No key generated"}
              </div>
            </div>
            
            {apiKeyData?.secretKey && (
              <div>
                <div className="text-[10px] text-white/70 font-medium tracking-wide uppercase">Secret Key</div>
                <div className="key-val" title={apiKeyData.secretKey}>
                  {apiKeyData.secretKey}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AVATAR (overlaps banner) */}
      <div className="avatar-anchor">
        <div className="avatar">
          {user?.photoURL ? (
            <Image src={user.photoURL} alt="Profile" width={96} height={96} />
          ) : (
            <div className="avatar-ph">
              <svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="40" cy="26" rx="16" ry="18"/>
                <path d="M8 90 C8 60 72 60 72 90Z"/>
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        {!apiKeyData ? (
          <button 
            onClick={() => handleGenerateKey(false)}
            disabled={loadingKey}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Generate Key</span>
          </button>
        ) : (
          <>
            <button 
              onClick={() => copyToClipboard('public')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
            >
              <Copy size={16} />
              <span className="hidden sm:inline">Copy Public Key</span>
            </button>
            <button 
              onClick={() => copyToClipboard('secret')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 active:scale-95 transition-all shadow-sm"
            >
              <Copy size={16} />
              <span className="hidden sm:inline">Copy Secret</span>
            </button>
            <button 
              onClick={() => handleGenerateKey(true)}
              disabled={loadingKey}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-[#27272a] text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#323238] active:scale-95 transition-all disabled:opacity-50"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
            <button 
              onClick={handleRevokeKey}
              disabled={loadingKey}
              className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-950/50 active:scale-95 transition-all disabled:opacity-50"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Revoke</span>
            </button>
          </>
        )}
        
        <div className="ml-auto relative">
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#27272a] rounded-full transition-colors active:scale-95 text-gray-600 dark:text-gray-300" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical size={20} />
          </button>

          {/* Popup Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-[#1c1c20] rounded-xl shadow-lg border border-gray-100 dark:border-[#2e2e33] py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <button 
                onClick={handleDownloadLogs} 
                disabled={isDownloadingPdf}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-2 disabled:opacity-50"
              >
                <ExternalLink size={14} /> {isDownloadingPdf ? "Generating..." : "Download Logs (PDF)"}
              </button>
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  setShowScopeModal(true);
                }} 
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#27272a] flex items-center gap-2"
              >
                <Shield size={14} /> Edit Permissions
              </button>
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-1"></div>
              {apiKeyData && (
                <button onClick={handleRevokeKey} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2">
                  <Trash2 size={14} /> Delete Key
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SETTINGS CONTENT */}
      {apiKeyData ? (
        <div className="content max-w-3xl">
          <div className="sec-title">CrypterChat Server Settings</div>
          
          <div className="card-stack">
            {/* Setting Row 1 */}
            <div className="setting-card flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="setting-icon-box w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="setting-title text-sm font-bold text-gray-900">Key Status</div>
                  <div className="setting-desc text-xs text-gray-500">
                    {apiKeyData.status === 'active' ? 'Currently active and accepting requests' : 'Currently inactive. Requests will be blocked.'}
                  </div>
                </div>
              </div>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  name="toggle" 
                  id="toggleStatus" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                  checked={apiKeyData.status === 'active'} 
                  onChange={(e) => handleToggleStatus(e.target.checked)}
                />
                <label htmlFor="toggleStatus" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${apiKeyData.status === 'active' ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-700'}`}></label>
              </div>
            </div>

            {/* Setting Row 2 */}
            <div className="setting-card flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="setting-icon-box w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="setting-title text-sm font-bold text-gray-900">Allowed IP Addresses</div>
                  <div className="setting-desc text-xs text-gray-500">
                    {apiKeyData.allowedIps && apiKeyData.allowedIps.length > 0 ? 
                      apiKeyData.allowedIps.join(', ') : 'Restrict usage to specific IPs'}
                  </div>
                </div>
              </div>
              <button 
                onClick={openIpModal}
                className="setting-btn text-sm font-medium text-indigo-600 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200 active:scale-95 transition-all"
              >
                Configure
              </button>
            </div>

            {/* Setting Row 3 */}
            <div className="setting-card flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="setting-icon-box w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600">
                  <Lock size={20} />
                </div>
                <div>
                  <div className="setting-title text-sm font-bold text-gray-900">Access Scopes</div>
                  <div className="setting-desc text-xs text-gray-500">
                    {apiKeyData.accessScopes && apiKeyData.accessScopes.length > 0 ? 
                      apiKeyData.accessScopes.join(', ') : 'No scopes selected'}
                  </div>
                </div>
              </div>
              <button 
                onClick={openScopeModal}
                className="setting-btn text-sm font-medium text-indigo-600 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200 active:scale-95 transition-all"
              >
                Edit Scopes
              </button>
            </div>
          </div>

          <div className="sec-title mt-8">Private Server Settings</div>
          <div className="card-stack">
            <div className="setting-card flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="setting-icon-box w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600">
                  <Server size={20} />
                </div>
                <div>
                  <div className="setting-title text-sm font-bold text-gray-900">Own Server Setup</div>
                  <div className="setting-desc text-xs text-gray-500">
                    Configure API routes for your private self-hosted server
                  </div>
                </div>
              </div>
              <Link 
                href="/server"
                className="setting-btn text-sm font-medium text-indigo-600 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200 active:scale-95 transition-all"
              >
                Configure
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="content max-w-3xl">
          <div className="sec-title">Getting Started</div>
          <div className="card-stack mb-8">
            <div className="setting-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-base font-bold text-gray-900 dark:text-white mb-1">Generate your server API key</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
                  Click the <strong>Generate Key</strong> button in the toolbar above to provision your public and secret keys for self-hosting CrypterChat.
                </p>
              </div>
              <button
                onClick={() => handleGenerateKey(false)}
                disabled={loadingKey}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all whitespace-nowrap active:scale-95"
              >
                <RefreshCw size={16} />
                Generate Key
              </button>
            </div>
          </div>

          <div className="sec-title">Private Server Settings</div>
          <div className="card-stack">
            <div className="setting-card flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="setting-icon-box w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600">
                  <Server size={20} />
                </div>
                <div>
                  <div className="setting-title text-sm font-bold text-gray-900">Own Server Setup</div>
                  <div className="setting-desc text-xs text-gray-500">
                    Configure API routes for your private self-hosted server
                  </div>
                </div>
              </div>
              <Link 
                href="/server"
                className="setting-btn text-sm font-medium text-indigo-600 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200 active:scale-95 transition-all"
              >
                Configure
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Required styles for the toggle */}
      <style dangerouslySetInnerHTML={{__html: `
        .toggle-checkbox:checked { right: 0; border-color: #6366f1; }
        .toggle-checkbox { right: 50%; border-color: #d1d5db; z-index: 1; transition: all 0.2s; }
        .toggle-label { transition: all 0.2s; }
      `}} />
    </div>
  );
}
