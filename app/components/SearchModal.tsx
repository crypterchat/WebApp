"use client";

import { useState, useEffect, useTransition } from "react";
import { Search, Key, BarChart, Book, Activity, ArrowRight, X, Server } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { searchSystem, SearchResult } from "@/app/actions/search-actions";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!isOpen || !searchQuery.trim()) return;

    const timer = setTimeout(() => {
      startTransition(async () => {
        const results = await searchSystem(user?.uid || "", searchQuery);
        setSearchResults(results);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, user?.uid, isOpen]);

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    onClose();
  };

  const handleSelectResult = (url: string) => {
    handleClose();
    router.push(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center px-4" onClick={handleClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 transform animate-in slide-in-from-bottom-4 zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center p-4 border-b border-gray-100 gap-3">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search APIs, tools, docs..." 
            className="flex-1 outline-none text-lg bg-transparent text-gray-900"
            autoFocus
          />
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-900 bg-gray-100 p-1 rounded-md">
            <X size={16} />
          </button>
        </div>
        <div className="p-4 bg-gray-50 h-64 overflow-y-auto relative">
          {isPending && (
            <div className="absolute top-4 right-4 text-xs text-indigo-500 font-medium flex items-center gap-2">
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
                    className="flex items-center gap-3 w-full p-2 hover:bg-white rounded-md text-left text-sm text-gray-700 transition-colors group"
                  >
                    {result.icon === 'Server' && <Server size={16} className="text-gray-400" />}
                    {result.icon === 'Key' && <Key size={16} className="text-gray-400" />}
                    {result.icon === 'BarChart' && <BarChart size={16} className="text-gray-400" />}
                    {result.icon === 'Book' && <Book size={16} className="text-gray-400" />}
                    {result.icon === 'Activity' && <Activity size={16} className="text-gray-400" />}
                    
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{result.title}</div>
                      <div className="text-xs text-gray-500">{result.subtitle}</div>
                    </div>
                    <ArrowRight size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              No results found for {searchQuery}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
