import { Home, Heart, Gift, Utensils, Bell, LogOut, Plus, User, Calendar, X } from "lucide-react";
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "My Bookings", path: "/bookings" },
  { icon: Heart, label: "Favorite", path: "/favourites" },
  { icon: Gift, label: "Bonuses", path: "#", badge: "Coming Soon" },
  { icon: Utensils, label: "Food And Drinks", path: "/food-drinks" },
  { icon: Bell, label: "Reminder", path: "#", badge: "3" },
];

export function CinemaSidebar({ theme, toggleTheme }: { 
  theme: string; 
  toggleTheme: () => void; 
}) {
  const { user } = useUser();
  const location = useLocation();
  
  return (
    <div className="h-screen bg-cinema-sidebar p-6 flex flex-col transition-all duration-300 ease-in-out w-80 flex-shrink-0">
      {/* Header with Logo */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-cinema-dark font-bold">🐸</span>
          </div>
          <h1 className="text-cinema-text text-xl font-bold">
            CINEMACITY
          </h1>
        </div>
      </div>

      {/* User Profile Card */}
      <SignedIn>
        <div className="bg-gradient-card rounded-2xl p-4 mb-8 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="bg-neon-green text-cinema-dark">
                {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-cinema-text font-semibold text-base truncate">
                {user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'User'}
              </h3>
              <p className="text-cinema-text-muted text-sm truncate">
                {user?.primaryPhoneNumber?.phoneNumber || user?.primaryEmailAddress?.emailAddress || 'No contact info'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cinema-text-muted text-xs">Balance</p>
              <p className="text-neon-green font-bold text-lg">₹56.00</p>
            </div>
            <Button 
              size="sm" 
              className="w-8 h-8 rounded-full bg-neon-green hover:bg-neon-green-glow text-cinema-dark shadow-neon flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="bg-gradient-card rounded-2xl p-4 mb-8 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarFallback className="bg-neon-green text-cinema-dark">
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-cinema-text font-semibold text-base truncate">Guest User</h3>
              <p className="text-cinema-text-muted text-sm truncate">Please sign in</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cinema-text-muted text-xs">Balance</p>
              <p className="text-neon-green font-bold text-lg">₹0.00</p>
            </div>
            <Button 
              size="sm" 
              className="w-8 h-8 rounded-full bg-neon-green hover:bg-neon-green-glow text-cinema-dark shadow-neon flex-shrink-0"
              disabled
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SignedOut>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {navigationItems.map((item) => (
          const isActive = location.pathname === item.path;
          const isDisabled = item.path === "#";
          
          if (isDisabled) {
            return (
              <div
                key={item.label}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-base text-cinema-text-muted opacity-50 cursor-not-allowed"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium truncate">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="ml-auto bg-cinema-text-muted text-cinema-dark text-xs px-2 py-1 rounded-full flex-shrink-0">
                    {item.badge}
                  </span>
                )}
              </div>
            );
          }
          
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-base hover:scale-105 ${
                isActive 
                  ? "bg-neon-green text-cinema-dark shadow-neon" 
                  : "text-cinema-text-muted hover:text-cinema-text hover:bg-cinema-card-hover"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium truncate">
                {item.label}
              </span>
              {item.badge && (
                <span className={`ml-auto text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                  isActive 
                    ? "bg-cinema-dark text-neon-green" 
                    : "bg-neon-green text-cinema-dark"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button 
        className="flex items-center gap-3 p-3 text-cinema-text-muted hover:text-cinema-text transition-colors text-base"
        onClick={() => {
          // Add logout functionality here if needed
          console.log("Logout clicked");
        }}
      >
        <LogOut className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">
          Logout
        </span>
      </button>
    </div>
  );
}