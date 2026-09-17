"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  getSavedWalletSession, 
  onWalletSessionChange, 
  connectWalletConnect, 
  connectInjectedWallet, 
  connectDemoWallet, 
  clearWalletSession,
  WalletSession
} from "@/lib/wallet-auth";
import { Wallet, QrCode, Globe, CheckCircle2, X, ExternalLink, ArrowRight, Loader2 } from "lucide-react";

interface WalletConnectNavProps {
  isMobile?: boolean;
}

export default function WalletConnectNav({ isMobile = false }: WalletConnectNavProps) {
  const router = useRouter();
  const [session, setSession] = useState<WalletSession | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [connectingType, setConnectingType] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setSession(getSavedWalletSession());
    const unsub = onWalletSessionChange((s) => {
      setSession(s);
    });
    return unsub;
  }, []);

  const handleConnect = async (type: "walletconnect" | "injected" | "demo") => {
    try {
      setConnectingType(type);
      setErrorMsg(null);
      let address = "";
      if (type === "walletconnect") {
        address = await connectWalletConnect();
      } else if (type === "injected") {
        address = await connectInjectedWallet();
      } else {
        address = await connectDemoWallet();
      }

      setModalOpen(false);
      // Redirect crypto wallet user to /api/key
      router.push("/api/key");
    } catch (err: any) {
      console.error("Wallet connection failed:", err);
      setErrorMsg(err.message || "Failed to connect wallet. Please try again.");
    } finally {
      setConnectingType(null);
    }
  };

  const handleDisconnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearWalletSession();
    setSession(null);
  };

  if (session) {
    const shortAddress = `${session.address.slice(0, 6)}...${session.address.slice(-4)}`;
    return (
      <div className={`wallet-connected-wrap ${isMobile ? "mobile" : ""}`}>
        <button 
          onClick={() => router.push("/api/key")}
          className="wallet-btn-connected"
          title={`Connected: ${session.address} (Click to open API keys)`}
        >
          <span className="wallet-dot-pulse"></span>
          <Wallet size={14} />
          <span>{shortAddress}</span>
        </button>
        <button 
          onClick={handleDisconnect}
          className="wallet-btn-disconnect" 
          title="Disconnect wallet"
          aria-label="Disconnect wallet"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  return (
    <>
      <button 
        type="button"
        onClick={() => {
          setErrorMsg(null);
          setModalOpen(true);
        }}
        className={`wallet-nav-btn ${isMobile ? "mobile" : ""}`}
        title="Connect crypto wallet to access API keys"
      >
        <Wallet size={14} className="wallet-icon-svg" />
        <span>Connect</span>
      </button>

      {/* WALLET CONNECT MODAL */}
      {modalOpen && (
        <div className="wallet-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="wallet-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="wallet-modal-header">
              <div className="wallet-modal-title-group">
                <div className="wallet-modal-icon">
                  <Wallet size={20} />
                </div>
                <div>
                  <h3 className="wallet-modal-title">Connect Crypto Wallet</h3>
                  <p className="wallet-modal-desc">Sign in with Web3 to access your API keys</p>
                </div>
              </div>
              <button 
                className="wallet-modal-close" 
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {errorMsg && (
              <div className="wallet-modal-error">
                {errorMsg}
              </div>
            )}

            <div className="wallet-options-list">
              {/* WALLETCONNECT */}
              <button
                type="button"
                className="wallet-option-btn"
                disabled={connectingType !== null}
                onClick={() => handleConnect("walletconnect")}
              >
                <div className="wallet-option-left">
                  <div className="wallet-option-badge wc-badge">
                    <QrCode size={18} />
                  </div>
                  <div className="wallet-option-info">
                    <div className="wallet-option-name">WalletConnect</div>
                    <div className="wallet-option-sub">Scan QR code with MetaMask, Rainbow, Trust Wallet</div>
                  </div>
                </div>
                {connectingType === "walletconnect" ? (
                  <Loader2 size={18} className="animate-spin text-blue-500" />
                ) : (
                  <ArrowRight size={16} className="wallet-option-arrow" />
                )}
              </button>

              {/* BROWSER EXTENSION (METAMASK, ETC) */}
              <button
                type="button"
                className="wallet-option-btn"
                disabled={connectingType !== null}
                onClick={() => handleConnect("injected")}
              >
                <div className="wallet-option-left">
                  <div className="wallet-option-badge browser-badge">
                    <Globe size={18} />
                  </div>
                  <div className="wallet-option-info">
                    <div className="wallet-option-name">Browser Extension</div>
                    <div className="wallet-option-sub">MetaMask, Rabby, Coinbase Wallet, Brave</div>
                  </div>
                </div>
                {connectingType === "injected" ? (
                  <Loader2 size={18} className="animate-spin text-blue-500" />
                ) : (
                  <ArrowRight size={16} className="wallet-option-arrow" />
                )}
              </button>

              {/* INSTANT DEMO / TEST WALLET */}
              <button
                type="button"
                className="wallet-option-btn dev-option"
                disabled={connectingType !== null}
                onClick={() => handleConnect("demo")}
              >
                <div className="wallet-option-left">
                  <div className="wallet-option-badge demo-badge">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="wallet-option-info">
                    <div className="wallet-option-name">Demo Crypto Account</div>
                    <div className="wallet-option-sub">Instant 1-click preview with address 0x71C8...1cBc</div>
                  </div>
                </div>
                {connectingType === "demo" ? (
                  <Loader2 size={18} className="animate-spin text-blue-500" />
                ) : (
                  <ArrowRight size={16} className="wallet-option-arrow" />
                )}
              </button>
            </div>

            <div className="wallet-modal-footer">
              <span>Redirects automatically to <strong>/api/key</strong></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
