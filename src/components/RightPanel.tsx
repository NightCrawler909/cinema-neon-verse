import { MapPin, Clock, Calendar, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import popcornCola from "@/assets/popcorn-cola.jpg";
import popcornCrisps from "@/assets/popcorn-crisps.jpg";

const seatRows = [
  { row: 'A', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { row: 'B', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { row: 'C', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { row: 'D', seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
];

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

export function RightPanel({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const selectedSeats = ['B7', 'B8'];
  
  return (
    <div className="w-96 h-screen glass-sidebar p-6 overflow-y-auto flex-shrink-0">
      {/* Movie Booking Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-20 glass-card rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src="/lovable-uploads/d33775cf-4021-4019-bc26-9117f7ac6a39.png" 
              alt="Mavka"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-cinema-text font-semibold text-base truncate">Mavka: Forest Song</h3>
            <div className="flex items-center gap-2 text-cinema-text-muted text-sm">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>10:30</span>
            </div>
            <div className="flex items-center gap-2 text-cinema-text-muted text-sm">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>21 Mar</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-neon-green text-cinema-dark px-4 lg:px-6 py-1.5 lg:py-2 rounded-full inline-block mb-3 lg:mb-4 font-semibold text-sm lg:text-base">
            Lux Hall
          </div>
        </div>
      </div>

      {/* Seat Selection */}
      <div className="mb-8">
        <h4 className="text-cinema-text font-semibold mb-4 text-base">Select Seats</h4>
        <div className="glass-card rounded-xl p-4 shadow-card">
          {/* Screen indicator */}
          <div className="w-full h-2 bg-neon-green rounded-full mb-6 opacity-50"></div>
          
          {/* Seat Map */}
          <div className="space-y-3">
            {seatRows.map((row) => (
              <div key={row.row} className="flex items-center gap-2">
                <span className="text-cinema-text-muted w-4 text-sm flex-shrink-0">{row.row}</span>
                <div className="flex gap-1 overflow-x-auto">
                  {row.seats.map((seatNumber) => {
                    const seatId = `${row.row}${seatNumber}`;
                    const isSelected = selectedSeats.includes(seatId);
                    return (
                      <button
                        key={seatId}
                        className={`w-6 h-6 rounded flex-shrink-0 ${
                          isSelected 
                            ? "bg-neon-green shadow-neon" 
                            : "bg-cinema-card hover:bg-cinema-card-hover"
                        } transition-all duration-200`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="mb-8">
        <div className="glass-card rounded-xl p-4 shadow-card">
          <h4 className="text-cinema-text font-semibold mb-4 text-base">Mavka: Forest Song</h4>
          <div className="text-cinema-text-muted text-sm mb-2">21th Mar, 10:30</div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-cinema-text-muted text-sm">Hall:</div>
              <div className="text-cinema-text-muted text-sm">Seats:</div>
            </div>
            <div className="text-right">
              <div className="text-cinema-text text-sm">Lux</div>
              <div className="text-cinema-text text-sm">B7, B8</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center gap-4">
            <span className="text-cinema-text text-2xl font-bold">₹2600</span>
            <Button className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-full px-6 py-2 shadow-neon text-base">
              Buy tickets
            </Button>
          </div>
        </div>
      </div>

      {/* Food and Drinks */}
      <div>
        <h4 className="text-cinema-text font-semibold mb-4 text-base">Food and Drinks</h4>
        <div className="space-y-4">
          {foodItems.map((item) => (
            <div key={item.id} className="glass-card rounded-xl p-4 shadow-card">
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
    </div>
  );
}