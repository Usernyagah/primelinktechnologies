import type { Product } from "@/data/products";

type RawProduct = Record<string, unknown> & { id: string };

/** Normalize Firestore / legacy docs to always use `images[]`. */
export function normalizeProduct(raw: RawProduct): Product {
  const images =
    Array.isArray(raw.images) && raw.images.length > 0
      ? (raw.images as string[])
      : typeof raw.image === "string" && raw.image
        ? [raw.image]
        : [];

  const { image: _legacy, ...rest } = raw;
  return { ...rest, images } as Product;
}

export function getProductImages(product: Pick<Product, "images"> & { image?: string }): string[] {
  if (product.images?.length) return product.images;
  if (product.image) return [product.image];
  return ["/placeholder.svg"];
}

export function getProductPrimaryImage(
  product: Pick<Product, "images"> & { image?: string }
): string {
  return getProductImages(product)[0];
}
