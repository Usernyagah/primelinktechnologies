import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export const Deals = () => {
  const list = products.filter((p) => p.badge === "Best Seller" || p.badge === "Deal");
  return (
    <section className="py-20 lg:py-28 border-t border-border/60">
      <div className="container-px">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <span className="eyebrow">This week</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Best sellers & deals</h2>
          </div>
          <p className="text-sm text-muted-foreground">Top-rated picks moving fastest right now.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};
