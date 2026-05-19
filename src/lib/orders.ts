import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import type { CartItem } from "@/context/CartContext";

export type OrderStatus = "pending" | "paid" | "failed";

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id?: string;
  items: OrderItem[];
  total: number;
  phone: string;
  customerName?: string;
  status: OrderStatus;
  checkoutRequestId?: string;
  merchantRequestId?: string;
  mpesaReceipt?: string;
}

export async function createOrder(
  items: CartItem[],
  total: number,
  phone: string,
  customerName?: string
): Promise<string> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Orders require Firebase. Configure VITE_FIREBASE_* in .env");
  }

  const orderItems: OrderItem[] = items.map((i) => ({
    productId: i.product.id,
    name: i.product.name,
    qty: i.qty,
    price: i.product.price,
  }));

  const docRef = await addDoc(collection(db, "orders"), {
    items: orderItems,
    total,
    phone,
    customerName: customerName?.trim() || null,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function requestMpesaPayment(
  orderId: string,
  phone: string,
  amount: number
): Promise<{ checkoutRequestId: string; customerMessage: string }> {
  const res = await fetch("/api/mpesa/stk-push", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId,
      phone,
      amount,
      accountReference: `PL-${orderId.slice(0, 8)}`,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Could not start M-Pesa payment");
  }

  return {
    checkoutRequestId: data.checkoutRequestId,
    customerMessage: data.customerMessage,
  };
}
