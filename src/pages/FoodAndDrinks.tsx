import React, { useState } from "react";
import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";
import popcornCola from "@/assets/popcorn-cola.jpg";
import popcornCrisps from "@/assets/popcorn-crisps.jpg";

const foodItems = [
  {
    id: 1,
    name: "Classic Popcorn & Cola",
    type: "Combo",
    description: "Medium popcorn with 500ml cola",
    price: 250,
    image: popcornCola,
    category: "combo"
  },
  {
    id: 2,
    name: "Cheese Popcorn & Crisps", 
    type: "Combo",
    description: "Cheese flavored popcorn with crisps",
    price: 300,
    image: popcornCrisps,
    category: "combo"
  },
  {
    id: 3,
    name: "Large Butter Popcorn",
    type: "Popcorn",
    description: "Fresh butter popcorn - Large size",
    price: 180,
    image: popcornCola,
    category: "popcorn"
  },
  {
    id: 4,
    name: "Caramel Popcorn",
    type: "Popcorn",
    description: "Sweet caramel flavored popcorn",
    price: 200,
    image: popcornCrisps,
    category: "popcorn"
  },
  {
    id: 5,
    name: "Coca Cola",
    type: "Drink",
    description: "500ml Coca Cola",
    price: 100,
    image: popcornCola,
    category: "drinks"
  },
  {
    id: 6,
    name: "Fresh Orange Juice",
    type: "Drink", 
    description: "Freshly squeezed orange juice",
    price: 120,
    image: popcornCrisps,
    category: "drinks"
  }
];

const categories = [
  { id: "all", name: "All Items" },
  { id: "combo", name: "Combos" },
  { id: "popcorn", name: "Popcorn" },
  { id: "drinks", name: "Drinks" }
];

const FoodAndDrinks = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const filteredItems = selectedCategory === "all" 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const getCartCount = (itemId: number) => cart[itemId] || 0;

  return (
    <div className="min-h-screen bg-gradient-main pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-10 glass-strong border-b border-cinema-card">
        <div className="flex items-center gap-4 p-4 lg:p-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-cinema-text hover:bg-cinema-card">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl lg:text-2xl font-bold text-cinema-text">Food & Drinks</h1>
        </div>
      </div>

      <div className="p-4 lg:p-8 max-w-6xl mx-auto">
        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-cinema-text" />
            <span className="text-cinema-text font-medium">Filter by category</span>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-neon-green text-cinema-dark hover:bg-neon-green-glow"
                    : "border-cinema-card text-cinema-text hover:bg-cinema-card"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="glass-card border-0 shadow-card hover:shadow-glow transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-cinema-card rounded-t-lg overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-cinema-text text-sm lg:text-base mb-1 line-clamp-1">
                        {item.name}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-neon-green/20 text-neon-green text-xs rounded-full mb-2">
                        {item.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg lg:text-xl font-bold text-cinema-text">₹{item.price}</div>
                    </div>
                  </div>
                  
                  <p className="text-cinema-text-muted text-xs lg:text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    {getCartCount(item.id) > 0 ? (
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0 border-neon-green text-neon-green hover:bg-neon-green hover:text-cinema-dark"
                          onClick={() => setCart(prev => ({
                            ...prev,
                            [item.id]: Math.max(0, (prev[item.id] || 0) - 1)
                          }))}
                        >
                          -
                        </Button>
                        <span className="text-cinema-text font-medium min-w-[20px] text-center">
                          {getCartCount(item.id)}
                        </span>
                        <Button
                          size="sm"
                          className="w-8 h-8 p-0 bg-neon-green text-cinema-dark hover:bg-neon-green-glow"
                          onClick={() => addToCart(item.id)}
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="bg-neon-green hover:bg-neon-green-glow text-cinema-dark rounded-full px-6 py-2 shadow-neon transition-all duration-300 hover:shadow-glow"
                        onClick={() => addToCart(item.id)}
                      >
                        Order Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {Object.keys(cart).length > 0 && (
          <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:w-80">
            <Card className="glass-card border-0 shadow-glow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-cinema-text">Cart Total</span>
                  <span className="text-xl font-bold text-neon-green">
                    ₹{Object.entries(cart).reduce((total, [itemId, quantity]) => {
                      const item = foodItems.find(i => i.id === parseInt(itemId));
                      return total + (item ? item.price * quantity : 0);
                    }, 0)}
                  </span>
                </div>
                <Button className="w-full bg-neon-green hover:bg-neon-green-glow text-cinema-dark font-medium">
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default FoodAndDrinks;