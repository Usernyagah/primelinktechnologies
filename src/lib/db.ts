import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  setDoc,
  serverTimestamp,
  orderBy,
  limit,
  increment,
  Timestamp,
  onSnapshot,
  type Unsubscribe,
  type Firestore,
} from "firebase/firestore";
import { db, isFirebaseConfigured, getFirebaseSetupMessage } from "./firebase";
import { products as seedProducts, type Product } from "@/data/products";
import { normalizeProduct } from "@/lib/product-utils";

export type { Product };

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmission extends ContactMessage {
  id: string;
  createdAt?: Timestamp | null;
}

export interface PageView {
  id: string;
  path: string;
  createdAt: Timestamp | null;
  visitorId?: string;
  sessionId?: string;
  durationSeconds?: number;
}

export interface AnalyticsSession {
  id: string;
  visitorId: string;
  startedAt: Timestamp;
  lastSeenAt: Timestamp;
  pageViews: number;
}

function filterSeedProducts(category?: string): Product[] {
  if (!category || category === "All") return [...seedProducts];
  if (category === "Featured") return seedProducts.filter((p) => p.featured);
  return seedProducts.filter((p) => p.category === category);
}

function requireDb(): Firestore {
  if (!db) {
    throw new Error(
      getFirebaseSetupMessage() ||
        "Firebase is not configured. Add your VITE_FIREBASE_* variables to .env"
    );
  }
  return db;
}

export const productsApi = {
  list: async (category?: string): Promise<Product[]> => {
    if (!isFirebaseConfigured || !db) {
      return filterSeedProducts(category);
    }

    const productsRef = collection(db, "products");
    let q = query(productsRef);

    if (category && category !== "All") {
      if (category === "Featured") {
        q = query(productsRef, where("featured", "==", true));
      } else {
        q = query(productsRef, where("category", "==", category));
      }
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((d) =>
      normalizeProduct({ id: d.id, ...d.data() })
    );
  },

  get: async (id: string): Promise<Product | null> => {
    if (!isFirebaseConfigured || !db) {
      const found = seedProducts.find((p) => p.id === id);
      return found ? normalizeProduct({ ...found }) : null;
    }

    const snap = await getDoc(doc(db, "products", id));
    if (!snap.exists()) return null;
    return normalizeProduct({ id: snap.id, ...snap.data() });
  },

  create: async (data: Product) => {
    const firestore = requireDb();
    const payload = { ...data, image: data.images[0] };
    if (data.id) {
      await setDoc(doc(firestore, "products", data.id), payload);
      return { id: data.id, ...data };
    }
    const docRef = await addDoc(collection(firestore, "products"), payload);
    return { id: docRef.id, ...data };
  },

  update: async (data: Product) => {
    const firestore = requireDb();
    const { id, image: _legacy, ...rest } = data;
    await updateDoc(doc(firestore, "products", id), {
      ...rest,
      image: data.images[0],
    });
  },

  delete: async (id: string) => {
    await deleteDoc(doc(requireDb(), "products", id));
  },
};

export const contactApi = {
  submit: async (data: ContactMessage) => {
    const firestore = requireDb();
    await addDoc(collection(firestore, "contactMessages"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  },

  list: async (): Promise<ContactSubmission[]> => {
    const firestore = requireDb();
    const q = query(
      collection(firestore, "contactMessages"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<ContactSubmission, "id">),
    }));
  },

  delete: async (id: string) => {
    await deleteDoc(doc(requireDb(), "contactMessages", id));
  },
};

export const pageViewsApi = {
  track: async (path: string, visitorId: string, sessionId: string): Promise<string> => {
    const view = await addDoc(collection(requireDb(), "pageViews"), {
      path,
      createdAt: serverTimestamp(),
      visitorId,
      sessionId,
    });
    return view.id;
  },

  updateDuration: async (id: string, durationSeconds: number) => {
    await updateDoc(doc(requireDb(), "pageViews", id), {
      durationSeconds: Math.min(1800, Math.max(0, durationSeconds)),
    });
  },

  subscribeSince: (
    start: Date,
    onViews: (views: PageView[]) => void,
    onError: (error: Error) => void
  ): Unsubscribe => {
    const q = query(
      collection(requireDb(), "pageViews"),
      where("createdAt", ">=", Timestamp.fromDate(start)),
      orderBy("createdAt", "desc"),
    );
    return onSnapshot(
      q,
      (snapshot) => {
        onViews(snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            path: data.path as string,
            createdAt: data.createdAt as Timestamp | null,
            visitorId: data.visitorId as string | undefined,
            sessionId: data.sessionId as string | undefined,
            durationSeconds: data.durationSeconds as number | undefined,
          };
        }));
      },
      onError
    );
  },

  touchSession: async (
    visitorId: string,
    sessionId: string,
    startedAt: Date,
    countPageView = false
  ) => {
    const sessionRef = doc(requireDb(), "analyticsSessions", sessionId);
    await setDoc(sessionRef, {
      visitorId,
      startedAt: Timestamp.fromDate(startedAt),
      lastSeenAt: serverTimestamp(),
      pageViews: increment(countPageView ? 1 : 0),
      }, { merge: true });
  },

  subscribeActiveSessions: (
    since: Date,
    onSessions: (sessions: AnalyticsSession[]) => void,
    onError: (error: Error) => void
  ): Unsubscribe => {
    const q = query(
      collection(requireDb(), "analyticsSessions"),
      where("lastSeenAt", ">=", Timestamp.fromDate(since)),
      limit(1000)
    );
    return onSnapshot(
      q,
      (snapshot) => {
        onSessions(snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            visitorId: data.visitorId as string,
            startedAt: data.startedAt as Timestamp,
            lastSeenAt: data.lastSeenAt as Timestamp,
            pageViews: data.pageViews as number,
          };
        }));
      },
      onError
    );
  },
};
