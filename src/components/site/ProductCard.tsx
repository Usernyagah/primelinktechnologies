import { useState } from "react";
import { Link } from "react-router-dom";
import { Product, formatKES } from "@/data/products";
import { getProductImages } from "@/lib/product-utils";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  const images = getProductImages(product);
  const [index, setIndex] = useState(0);
  const hasGallery = images.length > 1;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <article className="group card-hover rounded-xl border border-border bg-card overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`} className="block flex-1 flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-surface">
          <img
            src={images[index]}
            alt={`${product.name} — ${product.category}`}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {hasGallery && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-4 bg-accent" : "w-1.5 bg-background/70"
                    }`}
                    aria-label={`Show image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
          {product.badge && (
            <span className="absolute top-3 left-3 rounded-md bg-background/80 backdrop-blur px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent border border-accent/30">
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3 p-5 flex-1">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.category}</p>
            <h3 className="mt-1 font-semibold text-base leading-snug group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.specs}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-3 px-5 pb-5 -mt-2">
        <span className="font-semibold tabular-nums">{formatKES(product.price)}</span>
        <button
          onClick={() => add(product)}
          className="inline-flex items-center gap-1.5 rounded-md accent-gradient px-3 py-2 text-xs font-semibold text-accent-foreground hover:brightness-110 transition-all"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
    </article>
  );
};
