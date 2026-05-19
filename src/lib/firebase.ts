import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const PLACEHOLDER_VALUES = new Set([
  "your_api_key",
  "your_project_id",
  "your_sender_id",
  "your_app_id",
]);

const REQUIRED_ENV_KEYS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
] as const;

function isPlaceholder(value: string | undefined): boolean {
  if (!value) return true;
  return PLACEHOLDER_VALUES.has(value) || value.includes("your_");
}

export function getMissingFirebaseEnvVars(): string[] {
  return REQUIRED_ENV_KEYS.filter((key) =>
    isPlaceholder(import.meta.env[key])
  );
}

export const isFirebaseConfigured = getMissingFirebaseEnvVars().length === 0;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let auth: Auth | null = null;
let db: Firestore | null = null;
let firebaseInitError: string | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    firebaseInitError =
      error instanceof Error ? error.message : "Firebase initialization failed";
    console.error("Firebase initialization failed:", error);
  }
}

export function getFirebaseSetupMessage(): string {
  const missing = getMissingFirebaseEnvVars();
  if (missing.length > 0) {
    return `Missing in .env: ${missing.join(", ")}. Save .env in the project root and restart the dev server (npm run dev).`;
  }
  if (firebaseInitError) {
    return `Firebase failed to start: ${firebaseInitError}`;
  }
  if (!auth || !db) {
    return "Firebase did not initialize. Restart the dev server after updating .env.";
  }
  return "";
}

export { auth, db, firebaseInitError };
