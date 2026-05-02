import { Product, formatKES } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  return (
    <article className="group card-hover rounded-xl border border-border bg-card overflow-hidden flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={`${product.name} — ${product.category}`}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-md bg-background/80 backdrop-blur px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent border border-accent/30">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 font-semibold text-base leading-snug">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.specs}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="font-semibold tabular-nums">{formatKES(product.price)}</span>
          <button
            onClick={() => add(product)}
            className="inline-flex items-center gap-1.5 rounded-md accent-gradient px-3 py-2 text-xs font-semibold text-accent-foreground hover:brightness-110 transition-all"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </article>
  );
};
