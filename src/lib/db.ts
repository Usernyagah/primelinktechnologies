import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  setDoc
} from "firebase/firestore";
import { db } from "./firebase";

export const productsApi = {
  list: async (category?: string) => {
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
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  create: async (data: any) => {
    // If ID is provided (like in our form), use setDoc, otherwise addDoc
    if (data.id) {
      await setDoc(doc(db, "products", data.id), data);
      return { id: data.id, ...data };
    }
    const docRef = await addDoc(collection(db, "products"), data);
    return { id: docRef.id, ...data };
  },
  
  update: async (data: any) => {
    const { id, ...rest } = data;
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, rest);
  },
  
  delete: async (id: string) => {
    await deleteDoc(doc(db, "products", id));
  }
};
