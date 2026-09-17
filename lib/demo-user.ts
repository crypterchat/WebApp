import type { User } from "firebase/auth";

export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export function isDemoActive() {
  if (isDemoMode) return true;
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.has("demo")) {
      sessionStorage.setItem("demo", "1");
      return true;
    }
    return sessionStorage.getItem("demo") === "1";
  }
  return false;
}

export const demoUser = {
  uid: "demo-user-001",
  displayName: "Alex Developer",
  email: "alex@ericksonholding.com",
  photoURL: null,
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: "",
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => "demo-token",
  getIdTokenResult: async () => ({ token: "demo-token" }),
  reload: async () => {},
  toJSON: () => ({}),
  providerId: "demo",
} as unknown as User;
