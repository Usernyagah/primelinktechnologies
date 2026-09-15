import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  SEED_PRODUCT_IDS,
  SITE_URL,
  STATIC_SITEMAP_ROUTES,
} from "./lib/sitemap-data";

async function getProductIds(): Promise<string[]> {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    return [...SEED_PRODUCT_IDS];
  }

  try {
    const { initializeApp, cert, getApps } = await import("firebase-admin/app");
    const { getFirestore } = await import("firebase-admin/firestore");

    if (getApps().length === 0) {
      initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
      });
    }

    const snapshot = await getFirestore().collection("products").get();
    if (snapshot.empty) return [...SEED_PRODUCT_IDS];

    return snapshot.docs.map((doc) => doc.id);
  } catch (error) {
    console.error("Sitemap: failed to fetch products from Firestore", error);
    return [...SEED_PRODUCT_IDS];
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapXml(urls: { loc: string; changefreq: string; priority: number }[]): string {
  const urlEntries = urls
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const productIds = await getProductIds();

  const urls = [
    ...STATIC_SITEMAP_ROUTES.map((route) => ({
      loc: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
      changefreq: route.changefreq,
      priority: route.priority,
    })),
    ...productIds.map((id) => ({
      loc: `${SITE_URL}/product/${id}`,
      changefreq: "weekly",
      priority: 0.8,
    })),
  ];

  // Normalize homepage URL
  urls[0].loc = SITE_URL;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).send(buildSitemapXml(urls));
}
