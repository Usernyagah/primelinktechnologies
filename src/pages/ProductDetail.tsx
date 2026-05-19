import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/db";
import { getProductImages } from "@/lib/product-utils";
import { formatKES } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { add } = useCart();
  const [imageIndex, setImageIndex] = useState(0);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.get(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container-px py-20 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container-px py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-muted-foreground">This item may have been removed or the link is incorrect.</p>
        <Button asChild variant="outline">
          <Link to="/#shop">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to shop
          </Link>
        </Button>
      </div>
    );
  }

  const images = getProductImages(product);
  const hasGallery = images.length > 1;

  return (
    <div className="container-px py-10 lg:py-16">
      <Link
        to="/#shop"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden border border-border bg-surface">
            <img
              src={images[imageIndex]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {hasGallery && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-md bg-background/80 backdrop-blur px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent border border-accent/30">
                {product.badge}
              </span>
            )}
          </div>

          {hasGallery && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((url, i) => (
                <button
                  key={url + i}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                    i === imageIndex ? "border-accent" : "border-border opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold tabular-nums">{formatKES(product.price)}</p>

          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Specifications
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">{product.specs}</p>
          </div>

          {product.featured && (
            <p className="mt-4 text-sm text-accent font-medium">Featured product</p>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 accent-gradient text-accent-foreground hover:brightness-110"
              onClick={() => add(product)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add to cart
            </Button>
            <Button size="lg" variant="outline" asChild className="flex-1">
              <Link to="/#contact">Request a quote</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 shrink-0" />
            Warranty-backed devices with business support from Prime Link Technologies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
