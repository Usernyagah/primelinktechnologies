export const SITE_URL = "https://primelinktechnologies.co.ke";
export const SITE_NAME = "Prime Link Technologies";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;
export const DEFAULT_TWITTER_HANDLE = "@primelinktech";

export const SEO_PAGES = {
  home: {
    title:
      "Prime Link Technologies | Laptops, Networking, Software & Cloud Solutions in Kenya",
    description:
      "Buy quality laptops, office networking equipment, business software, cloud solutions and mobile apps from Prime Link Technologies. Call/WhatsApp 0703 617164",
    path: "/",
  },
  products: {
    title: "Shop Laptops, Phones & Tablets | Prime Link Technologies Kenya",
    description:
      "Browse quality laptops, smartphones, tablets, ETR machines and POS systems. Competitive prices, warranty-backed devices and business support across Kenya.",
    path: "/products",
  },
  services: {
    title: "IT Services, Networking & Cloud Solutions | Prime Link Technologies",
    description:
      "Professional IT services including office networking, business software setup, cloud solutions, mobile app development and ongoing tech support in Kenya.",
    path: "/services",
  },
  about: {
    title: "About Prime Link Technologies | Kenya IT Solutions Partner",
    description:
      "Learn about Prime Link Technologies — a Kenyan tech company delivering digital solutions, hardware and expert support for businesses and individuals.",
    path: "/about",
  },
  contact: {
    title: "Contact Prime Link Technologies | Call/WhatsApp 0703 617164",
    description:
      "Get in touch with Prime Link Technologies for quotes, product enquiries and IT support. Call or WhatsApp 0703 617164. We respond quickly.",
    path: "/contact",
  },
  checkout: {
    title: "Checkout | Prime Link Technologies",
    description: "Complete your order securely with Prime Link Technologies.",
    path: "/checkout",
    noindex: true,
  },
  notFound: {
    title: "Page Not Found | Prime Link Technologies",
    description: "The page you are looking for could not be found.",
    noindex: true,
  },
  adminLogin: {
    title: "Admin Login | Prime Link Technologies",
    description: "Administration login for Prime Link Technologies.",
    path: "/admin/login",
    noindex: true,
  },
  adminDashboard: {
    title: "Admin Dashboard | Prime Link Technologies",
    description: "Administration dashboard for Prime Link Technologies.",
    path: "/admin",
    noindex: true,
  },
  adminMessages: {
    title: "Admin Messages | Prime Link Technologies",
    description: "Contact messages for Prime Link Technologies.",
    path: "/admin/messages",
    noindex: true,
  },
} as const;

export type SeoPageKey = keyof typeof SEO_PAGES;
