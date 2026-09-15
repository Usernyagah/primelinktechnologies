import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import SectionHome from "./pages/SectionHome.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Checkout from "./pages/Checkout.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminMessages from "./pages/AdminMessages.tsx";
import { AdminLayout } from "@/components/admin/AdminLayout";
import NotFound from "./pages/NotFound.tsx";
import { SEO_PAGES } from "@/lib/seo/site-config";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<SectionHome metadata={SEO_PAGES.home} />} />
                  <Route
                    path="/products"
                    element={<SectionHome section="products" metadata={SEO_PAGES.products} />}
                  />
                  <Route
                    path="/services"
                    element={<SectionHome section="services" metadata={SEO_PAGES.services} />}
                  />
                  <Route
                    path="/about"
                    element={<SectionHome section="about" metadata={SEO_PAGES.about} />}
                  />
                  <Route
                    path="/contact"
                    element={<SectionHome section="contact" metadata={SEO_PAGES.contact} />}
                  />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Route>

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/messages" element={<AdminMessages />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
