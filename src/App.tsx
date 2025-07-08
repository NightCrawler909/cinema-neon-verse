import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MyBookings from "./pages/MyBookings";
import Favourites from "./pages/Favourites";
import FoodAndDrinks from "./pages/FoodAndDrinks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Gradient Lights Background */}
      <div className="dashboard-gradient-lights">
        <div className="gradient-light cyan topleft" />
        <div className="gradient-light green center-right" />
        <div className="gradient-light purple bottomleft" />
        <div className="gradient-light pink hero" />
        <div className="gradient-light orange upperright" />
        <div className="gradient-light purple center" />
        {/* Center Panel Extra Lights */}
        <div className="gradient-light purple center-featured" />
        <div className="gradient-light cyan carousel-left" />
        <div className="gradient-light green carousel-right" />
        <div className="gradient-light pink banner-bottom" />
        <div className="gradient-light cyan centerpanel-searchbar" />
        {/* Right Panel Extra Lights */}
        <div className="gradient-light cyan rightpanel-seatmap" />
        <div className="gradient-light purple rightpanel-summary" />
        <div className="gradient-light green rightpanel-food" />
      </div>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/food-drinks" element={<FoodAndDrinks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
