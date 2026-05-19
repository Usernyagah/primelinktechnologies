import type { VercelRequest, VercelResponse } from "@vercel/node";
import { initiateStkPush } from "../lib/mpesa";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { phone, amount, orderId, accountReference } = req.body ?? {};

    if (!phone || amount == null || !orderId) {
      return res.status(400).json({ error: "phone, amount, and orderId are required" });
    }

    const result = await initiateStkPush({
      phone: String(phone),
      amount: Number(amount),
      orderId: String(orderId),
      accountReference: accountReference || `PL-${String(orderId).slice(0, 8)}`,
      transactionDesc: "Prime Link Order",
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("STK push error:", error);
    const message = error instanceof Error ? error.message : "Payment request failed";
    return res.status(500).json({ error: message });
  }
}
