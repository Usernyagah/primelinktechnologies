import { categories } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

export const Categories = () => (
  <section id="categories" className="py-20 lg:py-28 border-t border-border/60 bg-surface/60">
    <div className="container-px">
      <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
        <div>
          <span className="eyebrow">Browse</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Shop by category</h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm">
          From personal devices to enterprise-grade business systems — find what fits.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <a
            key={c.name}
            href="#shop"
            className={`group card-hover relative overflow-hidden rounded-xl border border-border bg-card aspect-[4/3] ${
              i === 0 ? "lg:col-span-2 lg:row-span-1 lg:aspect-[8/3]" : ""
            }`}
          >
            <img src={c.image} alt={c.name} loading="lazy" width={800} height={800} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-xl font-semibold">{c.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                Shop {c.name} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
