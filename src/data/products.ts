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

export type Category =
  | "Phones"
  | "Laptops & Desktops"
  | "Tablets"
  | "ETR Machines"
  | "Business Software";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  specs: string;
  image: string;
  badge?: "Best Seller" | "New" | "Deal";
  featured?: boolean;
}

export const categories: { name: Category; description: string; image: string }[] = [
  { name: "Phones", description: "Flagship and mid-range smartphones", image: catPhones },
  { name: "Laptops & Desktops", description: "Productivity and workstation builds", image: catLaptops },
  { name: "Tablets", description: "Portable productivity for any workflow", image: catTablets },
  { name: "ETR Machines", description: "KRA-compliant tax registers", image: catEtr },
  { name: "Business Software", description: "POS, accounting and inventory", image: catSoftware },
];

export const products: Product[] = [
  { id: "phn-01", name: "Prime Edge X9 Pro", category: "Phones", price: 89900, specs: "6.7\" AMOLED · 256GB · 12GB RAM", image: phone, badge: "Best Seller", featured: true },
  { id: "lap-01", name: "Prime Studio 14 Ultra", category: "Laptops & Desktops", price: 154900, specs: "Intel Core Ultra 7 · 16GB · 1TB SSD", image: laptop, badge: "New", featured: true },
  { id: "tab-01", name: "Prime Slate 11", category: "Tablets", price: 64500, specs: "11\" 2.5K · 128GB · Stylus included", image: tablet, featured: true },
  { id: "etr-01", name: "PrimeFiscal ETR Lite", category: "ETR Machines", price: 24500, specs: "KRA-approved · GPRS · Thermal printer", image: etr, badge: "Best Seller", featured: true },
  { id: "dsk-01", name: "Prime Tower W5", category: "Laptops & Desktops", price: 119000, specs: "27\" QHD · Ryzen 7 · 32GB · 1TB", image: desktop, badge: "Deal" },
  { id: "pos-01", name: "PrimePOS Counter Pro", category: "Business Software", price: 89000, specs: "POS terminal + 12-mo software license", image: pos, badge: "New" },
  { id: "phn-02", name: "Prime Lite 6", category: "Phones", price: 32900, specs: "6.5\" 90Hz · 128GB · 8GB RAM", image: phone, badge: "Deal" },
  { id: "lap-02", name: "Prime Book 13 Air", category: "Laptops & Desktops", price: 84900, specs: "Core i5 · 16GB · 512GB SSD", image: laptop },
];

export const formatKES = (n: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);
