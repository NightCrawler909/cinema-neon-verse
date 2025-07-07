import React from "react";
import { Home, Calendar, Heart, Utensils, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "Bookings", path: "/bookings" },
  { icon: Heart, label: "Favourites", path: "/favourites" },
  { icon: Utensils, label: "Snacks", path: "/food-drinks" },
  { icon: User, label: "Profile", path: "/profile" }
];

export function BottomNavigation() {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-cinema-sidebar/95 backdrop-blur-md border-t border-cinema-card">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "text-neon-green bg-neon-green/10" 
                    : "text-cinema-text-muted hover:text-cinema-text"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_8px_hsl(var(--neon-green))]" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}