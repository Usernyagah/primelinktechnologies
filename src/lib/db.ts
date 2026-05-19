import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  setDoc,
  serverTimestamp,
  orderBy,
  type Firestore,
  type Timestamp,
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
