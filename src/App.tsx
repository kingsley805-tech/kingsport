import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import Admin from "./pages/Admin.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Prevent right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Prevent common inspection shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
      }
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
      }
      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
      }
      // Ctrl+S (Save)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
