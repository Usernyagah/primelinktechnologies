import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/db";
import { categories, Category, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

const filters: ("All" | "Featured" | Category)[] = ["All", "Featured", ...categories.map((c) => c.name)];

export const Shop = ({ query }: { query: string }) => {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", active],
    queryFn: () => productsApi.list(active),
  });

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    
    return products.filter((p: Product) => {
      return p.name.toLowerCase().includes(q) || 
             p.specs.toLowerCase().includes(q) || 
             p.category.toLowerCase().includes(q);
    });
  }, [products, query]);

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

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : list.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No products match your search.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
