import { useMemo, useState } from "react";
import { products, categories, Category } from "@/data/products";
import { ProductCard } from "./ProductCard";

const filters: ("All" | Category)[] = ["All", ...categories.map((c) => c.name)];

export const Shop = ({ query }: { query: string }) => {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = active === "All" || p.category === active;
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [active, query]);

  return (
    <section id="shop" className="py-20 lg:py-28 border-t border-border/60">
      <div className="container-px">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="eyebrow">Shop</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Featured products</h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Curated devices and solutions trusted by businesses and professionals.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                  active === f
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-accent/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No products match your search.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
