import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./site/Navbar";
import { Footer } from "./site/Footer";
import { CartDrawer } from "./site/CartDrawer";

const WHATSAPP_NUMBER = "254703617164";

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

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "3.25rem",
          height: "3.25rem",
          borderRadius: "9999px",
          backgroundColor: "#25D366",
          boxShadow: "0 4px 24px 0 rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.35)",
          transition: "transform 200ms cubic-bezier(0.22,1,0.36,1), box-shadow 200ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 6px 32px 0 rgba(37,211,102,0.6), 0 2px 8px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 4px 24px 0 rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.35)";
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.655 4.83 1.8 6.858L2 30l7.338-1.773A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.4a11.36 11.36 0 0 1-5.794-1.589l-.415-.247-4.352 1.052 1.086-4.24-.272-.435A11.36 11.36 0 0 1 4.6 16C4.6 9.7 9.7 4.6 16 4.6S27.4 9.7 27.4 16 22.3 27.4 16 27.4zm6.21-8.53c-.34-.17-2.015-1-2.328-1.112-.312-.113-.54-.17-.768.17-.228.34-.882 1.112-1.08 1.34-.2.228-.4.256-.74.086-.34-.17-1.435-.53-2.733-1.685-1.01-.9-1.692-2.01-1.89-2.35-.198-.34-.021-.524.148-.693.153-.152.34-.397.51-.595.17-.2.226-.34.34-.567.113-.228.057-.426-.028-.595-.085-.17-.768-1.854-1.053-2.54-.277-.667-.56-.577-.768-.587l-.653-.012c-.228 0-.595.085-.907.425-.312.34-1.19 1.163-1.19 2.836s1.218 3.29 1.388 3.518c.17.228 2.397 3.662 5.81 5.136.812.35 1.447.56 1.94.716.815.26 1.558.223 2.144.135.654-.098 2.015-.823 2.3-1.618.284-.794.284-1.475.198-1.617-.085-.142-.312-.228-.653-.397z" />
        </svg>
      </a>
    </div>
  );
};
