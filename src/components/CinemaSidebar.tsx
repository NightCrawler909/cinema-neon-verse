import { Home, Heart, Gift, Utensils, Bell, LogOut, Plus, User } from "lucide-react";
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Heart, label: "Favorite", active: false },
  { icon: Gift, label: "Bonuses", active: false },
  { icon: Utensils, label: "Food And Drinks", active: false },
  { icon: Bell, label: "Reminder", active: false, badge: "3" },
];

export function CinemaSidebar() {
  const { user } = useUser();
  
  return (
    <div className="w-full lg:w-80 h-auto lg:h-screen bg-cinema-sidebar p-4 lg:p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6 lg:mb-8">
        <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center">
          <span className="text-cinema-dark font-bold">🐸</span>
        </div>
        <h1 className="text-cinema-text text-lg lg:text-xl font-bold">CINEMACITY</h1>
      </div>

      {/* User Profile Card */}
      <SignedIn>
        <div className="bg-gradient-card rounded-2xl p-3 lg:p-4 mb-6 lg:mb-8 shadow-card">
          <div className="flex items-center gap-3 mb-3 lg:mb-4">
            <Avatar className="w-10 h-10 lg:w-12 lg:h-12">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="bg-neon-green text-cinema-dark">
                {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-cinema-text font-semibold text-sm lg:text-base truncate">
                {user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'User'}
              </h3>
              <p className="text-cinema-text-muted text-xs lg:text-sm truncate">
                {user?.primaryPhoneNumber?.phoneNumber || user?.primaryEmailAddress?.emailAddress || 'No contact info'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cinema-text-muted text-xs">Balance</p>
              <p className="text-neon-green font-bold text-base lg:text-lg">$56.00</p>
            </div>
            <Button 
              size="sm" 
              className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-neon-green hover:bg-neon-green-glow text-cinema-dark shadow-neon flex-shrink-0"
            >
              <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
            </Button>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="bg-gradient-card rounded-2xl p-3 lg:p-4 mb-6 lg:mb-8 shadow-card">
          <div className="flex items-center gap-3 mb-3 lg:mb-4">
            <Avatar className="w-10 h-10 lg:w-12 lg:h-12">
              <AvatarFallback className="bg-neon-green text-cinema-dark">
                <User className="w-5 h-5 lg:w-6 lg:h-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-cinema-text font-semibold text-sm lg:text-base truncate">Guest User</h3>
              <p className="text-cinema-text-muted text-xs lg:text-sm truncate">Please sign in</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cinema-text-muted text-xs">Balance</p>
              <p className="text-neon-green font-bold text-base lg:text-lg">$0.00</p>
            </div>
            <Button 
              size="sm" 
              className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-neon-green hover:bg-neon-green-glow text-cinema-dark shadow-neon flex-shrink-0"
              disabled
            >
              <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
            </Button>
          </div>
        </div>
      </SignedOut>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 lg:space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-xl transition-all duration-300 text-sm lg:text-base ${
              item.active 
                ? "bg-neon-green text-cinema-dark shadow-neon" 
                : "text-cinema-text-muted hover:text-cinema-text hover:bg-cinema-card-hover"
            }`}
          >
            <item.icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
            <span className="font-medium truncate">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-neon-green text-cinema-dark text-xs px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full flex-shrink-0">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <button className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 text-cinema-text-muted hover:text-cinema-text transition-colors text-sm lg:text-base">
        <LogOut className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}