import { Home, Heart, Gift, Utensils, Bell, LogOut, Plus, User } from "lucide-react";
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
  return (
    <div className="w-80 h-screen bg-cinema-sidebar p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center">
          <span className="text-cinema-dark font-bold">🐸</span>
        </div>
        <h1 className="text-cinema-text text-xl font-bold">CINEMACITY</h1>
      </div>

      {/* User Profile Card */}
      <div className="bg-gradient-card rounded-2xl p-4 mb-8 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/lovable-uploads/d33775cf-4021-4019-bc26-9117f7ac6a39.png" />
            <AvatarFallback className="bg-neon-green text-cinema-dark">NT</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-cinema-text font-semibold">Nikitin Team</h3>
            <p className="text-cinema-text-muted text-sm">+185 55 65 45 85</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-cinema-text-muted text-xs">Balance</p>
            <p className="text-neon-green font-bold text-lg">$56.00</p>
          </div>
          <Button 
            size="sm" 
            className="w-8 h-8 rounded-full bg-neon-green hover:bg-neon-green-glow text-cinema-dark shadow-neon"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
              item.active 
                ? "bg-neon-green text-cinema-dark shadow-neon" 
                : "text-cinema-text-muted hover:text-cinema-text hover:bg-cinema-card-hover"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-neon-green text-cinema-dark text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <button className="flex items-center gap-3 p-3 text-cinema-text-muted hover:text-cinema-text transition-colors">
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}