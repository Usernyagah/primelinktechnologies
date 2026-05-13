import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "./pages/Home.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                {/* Redirect old routes to home — sections are accessible by scrolling */}
                <Route path="/products" element={<Navigate to="/" replace />} />
                <Route path="/services" element={<Navigate to="/" replace />} />
                <Route path="/about" element={<Navigate to="/" replace />} />
                <Route path="/contact" element={<Navigate to="/" replace />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

