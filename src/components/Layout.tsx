import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./site/Navbar";
import { Footer } from "./site/Footer";
import { CartDrawer } from "./site/CartDrawer";

export const Layout = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar query={query} onSearch={setQuery} />
      <main className="flex-1">
        <Outlet context={{ query }} />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
