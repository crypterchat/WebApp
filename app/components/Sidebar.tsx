"use client";

import { useState, useEffect, useTransition } from "react";
import { Search, PanelLeft, Key, BarChart, Book, Activity, GitMerge, X, ArrowRight, LogOut, Server } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { searchSystem, SearchResult } from "@/app/actions/search-actions";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!searchQuery.trim()) return;
    const timer = setTimeout(() => {
      startTransition(async () => {
        if (user?.uid) {
          const results = await searchSystem(user.uid, searchQuery);
          setSearchResults(results);
        }
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, user?.uid]);

  const handleSelectResult = (url: string) => {
    setSearchOpen(false);
    router.push(url);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <aside className={`dash-sidebar ${collapsed ? 'collapsed' : ''}`}>
        {/* Header with Brand & Actions */}
        <div className="dash-sidebar-header">
          {!collapsed ? (
            <>
              <Link href="/" className="dash-sidebar-brand" title="CrypterChat Home">
                <img src="/crypterchat.svg" alt="CrypterChat" className="dash-sidebar-logo-img" />
              </Link>
              <div className="dash-sidebar-actions">
                <button 
                  onClick={() => setCollapsed(true)} 
                  className="dash-sidebar-icon-btn"
                  title="Collapse sidebar"
                  type="button"
                >
                  <PanelLeft size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="dash-sidebar-actions">
              <button 
                onClick={() => setCollapsed(false)} 
                className="dash-sidebar-icon-btn"
                title="Expand sidebar"
                type="button"
              >
                <PanelLeft size={18} />
              </button>
              <button 
                onClick={() => setSearchOpen(true)} 
                className="dash-sidebar-icon-btn"
                title="Search (⌘K)"
                type="button"
              >
                <Search size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Quick Search Button (when expanded) */}
        {!collapsed && (
          <button 
            onClick={() => setSearchOpen(true)}
            className="dash-sidebar-search-btn"
            type="button"
          >
            <Search size={15} />
            <span>Search console...</span>
            <span className="dash-sidebar-search-key">⌘K</span>
          </button>
        )}

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <nav className="dash-sidebar-nav">
            <SidebarItem href="/api/key" icon={<Key size={18} />} label="API Keys" collapsed={collapsed} active={pathname === '/api/key'} />
            <SidebarItem href="/chatscan" icon={<BarChart size={18} />} label="ChatScan" collapsed={collapsed} active={pathname === '/chatscan'} />
            <SidebarItem href="/server" icon={<Server size={18} />} label="Server Setup" collapsed={collapsed} active={pathname === '/server'} />
            <SidebarItem href="/docs" icon={<Book size={18} />} label="Documentation" collapsed={collapsed} active={pathname === '/docs'} />
          </nav>

          {!collapsed && (
            <div className="dash-sidebar-section animate-in fade-in duration-300">
              <h3 className="dash-sidebar-section-title">Communication Log</h3>
              <div className="dash-sidebar-log-list">
                <a href="#" className="dash-sidebar-log-item">
                  <Activity size={14} className="text-emerald-500 flex-shrink-0" />
                  <span className="truncate">Production API deployed</span>
                </a>
                <a href="#" className="dash-sidebar-log-item">
                  <GitMerge size={14} className="text-indigo-400 flex-shrink-0" />
                  <span className="truncate">Production API deploy...</span>
                  <span className="dash-log-badge">+35</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer / User Profile */}
        <div className="dash-sidebar-footer">
          <div className={`dash-user-card ${collapsed ? 'collapsed' : ''}`}>
            <div className="dash-user-info">
              {user?.photoURL ? (
                <Image 
                  src={user.photoURL} 
                  alt="Profile" 
                  width={32} 
                  height={32} 
                  className="dash-user-avatar" 
                />
              ) : (
                <div className="dash-user-avatar-placeholder">
                  {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : "AL"}
                </div>
              )}
              {!collapsed && (
                <div className="dash-user-meta">
                  <span className="dash-user-name truncate">{user?.displayName || "Alex Developer"}</span>
                  <span className="dash-user-badge">Pro</span>
                </div>
              )}
            </div>
            <button 
              onClick={logout} 
              className="dash-logout-btn" 
              title="Log out"
              type="button"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navbar */}
      <nav className="mobile-bottom-nav md:hidden">
         <MobileNavItem href="/api/key" icon={<Key size={20} />} label="Keys" active={pathname === '/api/key'} />
         <MobileNavItem href="/chatscan" icon={<BarChart size={20} />} label="ChatScan" active={pathname === '/chatscan'} />
         <MobileNavItem href="/server" icon={<Server size={20} />} label="Server" active={pathname === '/server'} />
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSearchOpen(false)}>
          <div className="dash-search-modal-box transform animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="dash-search-header">
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search APIs, tools, docs..." 
                className="dash-search-input"
                autoFocus
              />
              <button 
                onClick={() => setSearchOpen(false)} 
                className="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                type="button"
              >
                <X size={16} />
              </button>
            </div>
            <div className="dash-search-results relative">
              {isPending && (
                <div className="absolute top-3 right-4 text-xs text-indigo-500 font-medium flex items-center gap-2">
                  <Activity size={12} className="animate-spin" /> Searching...
                </div>
              )}
              {searchQuery.trim() === "" ? (
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Search to find pages and data</div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Search Results</div>
                  <div className="flex flex-col gap-1">
                    {searchResults.map((result) => (
                      <button 
                        key={result.id}
                        onClick={() => handleSelectResult(result.url)}
                        className="flex items-center gap-3 w-full p-2.5 hover:bg-white dark:hover:bg-[#202026] rounded-lg text-left text-sm text-gray-700 dark:text-gray-200 transition-colors group"
                        type="button"
                      >
                        {result.icon === 'Server' && <Server size={16} className="text-gray-400" />}
                        {result.icon === 'Key' && <Key size={16} className="text-gray-400" />}
                        {result.icon === 'BarChart' && <BarChart size={16} className="text-gray-400" />}
                        {result.icon === 'Book' && <Book size={16} className="text-gray-400" />}
                        {result.icon === 'Activity' && <Activity size={16} className="text-gray-400" />}
                        
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">{result.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{result.subtitle}</div>
                        </div>
                        <ArrowRight size={14} className="text-gray-300 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No results found for &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SidebarItem({ href, icon, label, collapsed, active }: { href: string, icon: React.ReactNode, label: string, collapsed: boolean, active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`dash-nav-item ${active ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
      title={collapsed ? label : undefined}
    >
      <span className="dash-nav-icon">{icon}</span>
      {!collapsed && <span className="dash-nav-label truncate">{label}</span>}
      {!collapsed && active && <span className="dash-nav-indicator" />}
    </Link>
  );
}

function MobileNavItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${active ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white'}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
