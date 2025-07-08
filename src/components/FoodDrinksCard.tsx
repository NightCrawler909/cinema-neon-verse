import { Button } from "@/components/ui/button";
import popcornCola from "@/assets/popcorn-cola.jpg";
import popcornCrisps from "@/assets/popcorn-crisps.jpg";

const foodItems = [
  {
    id: 1,
    name: "Popcorn & Cola",
    description: "Soft medium",
    price: 250,
    image: popcornCola
  },
  {
    id: 2,
    name: "Popcorn & Crisps", 
    description: "Cheese medium",
    price: 300,
    image: popcornCrisps
  }
];

export function FoodDrinksCard() {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 h-full">
      <h3 className="text-xl font-bold text-cinema-text mb-6">🍿 Food & Drinks</h3>
      <div className="space-y-4">
        {foodItems.map((item) => (
          <div key={item.id} className="glass-card rounded-xl p-4 shadow-card hover:shadow-glow transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 bg-cinema-card rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-cinema-text font-medium text-base truncate">{item.name}</h5>
                <p className="text-cinema-text-muted text-sm">{item.description}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cinema-text font-bold text-base">₹{item.price}</span>
              <Button 
                size="sm" 
                className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-full px-4 py-2 shadow-neon text-sm"
              >
                Order
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}