import type { User } from "firebase/auth";

export interface WalletSession {
  address: string;
  chainId?: number;
  connector: "walletconnect" | "injected" | "demo";
}

const SESSION_KEY = "crypterchat_wallet_session";
let providerInstance: any = null;

export function getSavedWalletSession(): WalletSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WalletSession;
  } catch {
    return null;
  }
}

export function saveWalletSession(session: WalletSession) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent("wallet_session_change", { detail: session }));
}

export function clearWalletSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  if (providerInstance) {
    try {
      providerInstance.disconnect?.();
    } catch {
      // ignore error on disconnect
    }
  }
  window.dispatchEvent(new CustomEvent("wallet_session_change", { detail: null }));
}

export function onWalletSessionChange(cb: (session: WalletSession | null) => void) {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const custom = e as CustomEvent<WalletSession | null>;
    cb(custom.detail ?? null);
  };
  window.addEventListener("wallet_session_change", handler);
  return () => window.removeEventListener("wallet_session_change", handler);
}

export function createWalletUser(address: string): User {
  const cleanAddr = address.toLowerCase();
  const shortAddr = `${address.slice(0, 6)}...${address.slice(-4)}`;
  return {
    uid: cleanAddr,
    displayName: shortAddr,
    email: `${cleanAddr.slice(0, 8)}@wallet.crypto`,
    photoURL: `https://effigy.im/a/${cleanAddr}.svg`,
    emailVerified: true,
    isAnonymous: false,
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString(),
    },
    providerData: [],
    refreshToken: "",
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => `wallet-token-${cleanAddr}`,
    getIdTokenResult: async () => ({ token: `wallet-token-${cleanAddr}` }),
    reload: async () => {},
    toJSON: () => ({ address: cleanAddr }),
    providerId: "walletconnect",
  } as unknown as User;
}

export async function getWalletConnectProvider() {
  if (typeof window === "undefined") return null;
  if (providerInstance) return providerInstance;

  const { EthereumProvider } = await import("@walletconnect/ethereum-provider");
  // Free public fallback project ID for WalletConnect v2
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64";

  providerInstance = await EthereumProvider.init({
    projectId,
    chains: [1],
    optionalChains: [137, 42161, 8453, 10],
    showQrModal: true,
    metadata: {
      name: "CrypterChat",
      description: "Encrypted messaging platform & Developer API",
      url: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
      icons: ["https://crypterchat.com/crypterchat.svg"]
    }
  });

  return providerInstance;
}

export async function connectWalletConnect(): Promise<string> {
  const provider = await getWalletConnectProvider();
  if (!provider) throw new Error("Could not initialize WalletConnect");

  await provider.connect();
  const accounts = provider.accounts;
  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts received from WalletConnect");
  }
  const address = accounts[0];
  saveWalletSession({ address, connector: "walletconnect" });
  return address;
}

export async function connectInjectedWallet(): Promise<string> {
  if (typeof window === "undefined" || !(window as any).ethereum) {
    throw new Error("No browser wallet extension detected (e.g. MetaMask, Rabby, Coinbase).");
  }
  const eth = (window as any).ethereum;
  const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts provided by wallet");
  }
  const address = accounts[0];
  saveWalletSession({ address, connector: "injected" });
  return address;
}

export async function connectDemoWallet(sampleAddress: string = "0x71C836e4f3a2cE9b9b1E59C772159892F73A1cBc"): Promise<string> {
  saveWalletSession({ address: sampleAddress, connector: "demo" });
  return sampleAddress;
}
