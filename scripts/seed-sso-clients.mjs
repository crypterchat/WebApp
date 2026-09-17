import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration from src/lib/firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSyAReMQaEL-sxJRXoD8dZaUJ7z-4uOfYtaI",
  authDomain: "com-eh.firebaseapp.com",
  projectId: "com-eh",
  storageBucket: "com-eh.firebasestorage.app",
  messagingSenderId: "422480867630",
  appId: "1:422480867630:web:719f6d436b2c5ee9b24abf",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("Starting SSO Client seeding...");
  
  const clients = [
    {
      id: "svi_secret_key_123",
      app_name: "SVI Platform",
      allowed_origins: ["http://localhost", "https://svi.ericksonholding.com"]
    },
    {
      id: "demo_app_key",
      app_name: "Erickson Demo App",
      allowed_origins: ["https://demo.ericksonholding.com"]
    }
  ];

  try {
    for (const client of clients) {
      await setDoc(doc(db, "sso_clients", client.id), {
        app_name: client.app_name,
        allowed_origins: client.allowed_origins,
        createdAt: new Date().toISOString()
      });
      console.log(`✅ Seeded client: ${client.app_name} (ID: ${client.id})`);
    }
    console.log("\nSeeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
  process.exit(0);
}

seed();
