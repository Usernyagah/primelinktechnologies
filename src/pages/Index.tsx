import { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Shop } from "@/components/site/Shop";
import { Categories } from "@/components/site/Categories";
import { Deals } from "@/components/site/Deals";
import { Business } from "@/components/site/Business";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Leadership } from "@/components/site/Leadership";
import { CartDrawer } from "@/components/site/CartDrawer";

const Index = () => {
  const [query, setQuery] = useState("");

  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar query={query} onSearch={setQuery} />
        <main>
          <Hero />
          <Shop query={query} />
          <Categories />
          <Deals />
          <Business />
          <Testimonials />
          <Contact />
        </main>
        <Leadership />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default Index;
