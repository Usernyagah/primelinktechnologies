import { useCart } from "@/context/CartContext";
import { formatKES } from "@/data/products";
import { getProductPrimaryImage } from "@/lib/product-utils";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useEffect } from "react";

export const CartDrawer = () => {
  const { open, setOpen, items, inc, dec, remove, total, clear } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full sm:w-[420px] bg-surface border-l border-border flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-accent" />
            <h2 className="font-semibold">Your cart</h2>
            <span className="text-xs text-muted-foreground">({items.length})</span>
          </div>
          <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary transition-colors" aria-label="Close cart">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary mb-4">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add products to get started.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((i) => (
                <li key={i.product.id} className="p-5 flex gap-4">
                  <img src={getProductPrimaryImage(i.product)} alt={i.product.name} className="h-20 w-20 rounded-md object-cover bg-secondary" loading="lazy" width={80} height={80} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{i.product.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{i.product.specs}</p>
                    <p className="mt-2 text-sm font-semibold tabular-nums">{formatKES(i.product.price * i.qty)}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-border">
                        <button onClick={() => dec(i.product.id)} className="grid h-7 w-7 place-items-center hover:bg-secondary transition-colors" aria-label="Decrease quantity"><Minus className="h-3 w-3" /></button>
                        <span className="px-3 text-xs tabular-nums">{i.qty}</span>
                        <button onClick={() => inc(i.product.id)} className="grid h-7 w-7 place-items-center hover:bg-secondary transition-colors" aria-label="Increase quantity"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => remove(i.product.id)} className="text-xs text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1">
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border p-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-base tabular-nums">{formatKES(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
            <button className="w-full rounded-md accent-gradient px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all">
              Proceed to checkout
            </button>
            <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
              Clear cart
            </button>
          </footer>
        )}
      </aside>
    </>
  );
};
