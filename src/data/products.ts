import phone from "@/assets/p-phone1.jpg";
import laptop from "@/assets/p-laptop1.jpg";
import tablet from "@/assets/p-tablet1.jpg";
import etr from "@/assets/p-etr1.jpg";
import desktop from "@/assets/p-desktop1.jpg";
import pos from "@/assets/p-pos1.jpg";
import catPhones from "@/assets/cat-phones.jpg";
import catLaptops from "@/assets/cat-laptops.jpg";
import catTablets from "@/assets/cat-tablets.jpg";
import catEtr from "@/assets/cat-etr.jpg";
import catSoftware from "@/assets/cat-software.jpg";

export type Category = "Phones" | "Laptops" | "Tablets";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  specs: string;
  images: string[];
  /** @deprecated Legacy field — use `images`. Kept for older Firestore docs. */
  image?: string;
  badge?: "Best Seller" | "New" | "Deal";
  featured?: boolean;
}

export const categories: { name: Category; description: string; image: string }[] = [
  { name: "Phones", description: "Flagship and mid-range smartphones", image: catPhones },
  { name: "Laptops", description: "Productivity and workstation builds", image: catLaptops },
  { name: "Tablets", description: "Portable productivity for any workflow", image: catTablets },
];

export const products: Product[] = [
  { id: "phn-01", name: "Prime Edge X9 Pro", category: "Phones", price: 89900, specs: "6.7\" AMOLED · 256GB · 12GB RAM", images: [phone], badge: "Best Seller", featured: true },
  { id: "lap-01", name: "Prime Studio 14 Ultra", category: "Laptops", price: 154900, specs: "Intel Core Ultra 7 · 16GB · 1TB SSD", images: [laptop], badge: "New", featured: true },
  { id: "tab-01", name: "Prime Slate 11", category: "Tablets", price: 64500, specs: "11\" 2.5K · 128GB · Stylus included", images: [tablet], featured: true },
  { id: "lap-02", name: "Prime Tower W5", category: "Laptops", price: 119000, specs: "27\" QHD · Ryzen 7 · 32GB · 1TB", images: [desktop], badge: "Deal" },
  { id: "phn-02", name: "Prime Lite 6", category: "Phones", price: 32900, specs: "6.5\" 90Hz · 128GB · 8GB RAM", images: [phone], badge: "Deal" },
  { id: "lap-03", name: "Prime Book 13 Air", category: "Laptops", price: 84900, specs: "Core i5 · 16GB · 512GB SSD", images: [laptop] },
];

export const formatKES = (n: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);
