import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/db";
import { ProductCard } from "./ProductCard";

export const Deals = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "deals"],
    queryFn: () => productsApi.list(),
  });

  const list = useMemo(
    () => products.filter((p) => p.badge === "Best Seller" || p.badge === "Deal"),
    [products]
  );

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
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent" />
          </div>
        ) : list.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No deals right now — check back soon.</p>
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
