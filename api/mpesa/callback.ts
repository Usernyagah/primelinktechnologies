import type { VercelRequest, VercelResponse } from "@vercel/node";

/** Safaricom STK callback — updates order when Firebase Admin is configured. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ResultCode: 1, ResultDesc: "Method not allowed" });
  }

  try {
    const body = req.body?.Body?.stkCallback ?? req.body;
    const resultCode = Number(body?.ResultCode);
    const checkoutRequestId = body?.CheckoutRequestID as string | undefined;
    const metadata = body?.CallbackMetadata?.Item as
      | { Name: string; Value?: string | number }[]
      | undefined;

    let mpesaReceipt: string | undefined;
    if (metadata) {
      const receipt = metadata.find((i) => i.Name === "MpesaReceiptNumber");
      mpesaReceipt = receipt?.Value != null ? String(receipt.Value) : undefined;
    }

    const status = resultCode === 0 ? "paid" : "failed";

    if (checkoutRequestId && process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        const { initializeApp, cert, getApps } = await import("firebase-admin/app");
        const { getFirestore } = await import("firebase-admin/firestore");

        if (getApps().length === 0) {
          const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
          initializeApp({ credential: cert(serviceAccount) });
        }

        const db = getFirestore();
        const snap = await db
          .collection("orders")
          .where("checkoutRequestId", "==", checkoutRequestId)
          .limit(1)
          .get();

        if (!snap.empty) {
          await snap.docs[0].ref.update({
            status,
            mpesaReceipt: mpesaReceipt ?? null,
            paidAt: status === "paid" ? new Date() : null,
            failureReason: resultCode !== 0 ? body?.ResultDesc ?? "Payment failed" : null,
          });
        }
      } catch (adminError) {
        console.error("Firebase Admin order update failed:", adminError);
      }
    }

    console.log("M-Pesa callback:", { checkoutRequestId, resultCode, status, mpesaReceipt });

    return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("M-Pesa callback error:", error);
    return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}
