export type MpesaEnv = "sandbox" | "production";

export function getMpesaBaseUrl(env: MpesaEnv = "sandbox"): string {
  return env === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

export function getMpesaConfig() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const shortCode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const env = (process.env.MPESA_ENV || "sandbox") as MpesaEnv;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;

  if (!consumerKey || !consumerSecret || !shortCode || !passkey || !callbackUrl) {
    return null;
  }

  return { consumerKey, consumerSecret, shortCode, passkey, env, callbackUrl };
}

export function normalizeKenyaPhone(input: string): string | null {
  let digits = input.replace(/\D/g, "");

  if (digits.startsWith("0") && digits.length === 10) {
    digits = `254${digits.slice(1)}`;
  } else if (digits.startsWith("7") && digits.length === 9) {
    digits = `254${digits}`;
  } else if (digits.startsWith("254") && digits.length === 12) {
    // ok
  } else {
    return null;
  }

  if (!/^254[17]\d{8}$/.test(digits)) return null;
  return digits;
}

export function mpesaTimestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  );
}

export function mpesaPassword(shortCode: string, passkey: string, timestamp: string): string {
  return Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");
}

export async function getMpesaAccessToken(
  baseUrl: string,
  consumerKey: string,
  consumerSecret: string
): Promise<string> {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const res = await fetch(
    `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  );

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.errorMessage || "Failed to get M-Pesa access token");
  }
  return data.access_token as string;
}

export interface StkPushParams {
  phone: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
  orderId: string;
}

export async function initiateStkPush(params: StkPushParams) {
  const config = getMpesaConfig();
  if (!config) {
    throw new Error("M-Pesa is not configured on the server");
  }

  const phone = normalizeKenyaPhone(params.phone);
  if (!phone) {
    throw new Error("Enter a valid Safaricom number (e.g. 0712 345 678)");
  }

  const amount = Math.round(params.amount);
  if (amount < 1) {
    throw new Error("Amount must be at least KES 1");
  }

  const baseUrl = getMpesaBaseUrl(config.env);
  const token = await getMpesaAccessToken(
    baseUrl,
    config.consumerKey,
    config.consumerSecret
  );

  const timestamp = mpesaTimestamp();
  const password = mpesaPassword(config.shortCode, config.passkey, timestamp);

  const body = {
    BusinessShortCode: config.shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: config.shortCode,
    PhoneNumber: phone,
    CallBackURL: config.callbackUrl,
    AccountReference: params.accountReference.slice(0, 12),
    TransactionDesc: params.transactionDesc.slice(0, 13),
  };

  const res = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok || data.ResponseCode !== "0") {
    throw new Error(
      data.errorMessage || data.ResponseDescription || "M-Pesa STK push failed"
    );
  }

  return {
    checkoutRequestId: data.CheckoutRequestID as string,
    merchantRequestId: data.MerchantRequestID as string,
    customerMessage: data.CustomerMessage as string,
  };
}
