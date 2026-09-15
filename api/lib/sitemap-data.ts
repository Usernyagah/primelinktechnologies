/** Seed product IDs used when Firestore is unavailable at build/runtime. */
export const SEED_PRODUCT_IDS = [
  "phn-01",
  "lap-01",
  "tab-01",
  "lap-02",
  "phn-02",
  "lap-03",
] as const;

export const STATIC_SITEMAP_ROUTES = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/products", changefreq: "weekly", priority: 0.9 },
  { path: "/services", changefreq: "monthly", priority: 0.8 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
  { path: "/contact", changefreq: "monthly", priority: 0.8 },
] as const;

export const SITE_URL = "https://primelinktechnologies.co.ke";
