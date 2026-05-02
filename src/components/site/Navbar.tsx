import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface Props {
  onSearch: (q: string) => void;
  query: string;
}

export const Navbar = ({ onSearch, query }: Props) => {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/80 backdrop-blur-xl">
      <div className="container-px flex h-16 items-center gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="Prime Link Logo" className="h-10 w-10 object-cover rounded-md" />
          <span className="hidden sm:block text-sm font-semibold tracking-tight">
            Prime Link <span className="text-muted-foreground font-normal">Technologies</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <Link key={l.href} to={l.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <div className="hidden md:flex items-center gap-2 rounded-md border border-border bg-secondary/60 px-3 py-1.5 w-64 focus-within:border-accent transition-colors">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search products…"
              className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
              aria-label="Search products"
            />
          </div>
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="md:hidden grid h-9 w-9 place-items-center rounded-md hover:bg-secondary transition-colors"
            aria-label="Toggle search"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={() => setOpen(true)}
            className="relative grid h-9 w-9 place-items-center rounded-md hover:bg-secondary transition-colors"
            aria-label={`Cart with ${count} items`}
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-4 min-w-4 px-1 place-items-center rounded-full accent-gradient text-[10px] font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden grid h-9 w-9 place-items-center rounded-md hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden border-t border-border/60 px-5 py-3">
          <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/60 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search products…"
              className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      {mobileOpen && (
        <nav className="lg:hidden border-t border-border/60 px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
