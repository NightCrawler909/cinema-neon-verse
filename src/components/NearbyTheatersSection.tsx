import { Clock, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const theaters = [
  {
    id: 1,
    name: "PVR Phoenix MarketCity",
    distance: "1.2 km",
    shows: [
      { movie: "Oppenheimer", time: "5:30 PM" },
      { movie: "Barbie", time: "8:15 PM" },
      { movie: "Mission Impossible", time: "10:45 PM" }
    ]
  },
  {
    id: 2,
    name: "INOX Forum Mall",
    distance: "2.8 km",
    shows: [
      { movie: "Spider-Man", time: "4:00 PM" },
      { movie: "Fast X", time: "7:30 PM" },
      { movie: "John Wick 4", time: "10:15 PM" }
    ]
  },
  {
    id: 3,
    name: "Cinepolis Fun Republic",
    distance: "3.5 km",
    shows: [
      { movie: "Guardians Galaxy", time: "6:00 PM" },
      { movie: "The Flash", time: "9:30 PM" }
    ]
  },
  {
    id: 4,
    name: "Multiplex Seasons Mall",
    distance: "4.1 km",
    shows: [
      { movie: "Transformers", time: "5:45 PM" },
      { movie: "Indiana Jones", time: "8:45 PM" }
    ]
  }
];

export function NearbyTheatersSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-cinema-text">🏙️ Nearby Theaters</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {theaters.map((theater) => (
          <Card key={theater.id} className="glass-card border-0 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-cinema-text">{theater.name}</h3>
                  <div className="flex items-center gap-1 text-neon-green text-sm">
                    <MapPin className="w-3 h-3" />
                    {theater.distance}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-cinema-text-muted">Today's Shows:</div>
                  {theater.shows.slice(0, 2).map((show, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-cinema-text">{show.movie}</span>
                      <div className="flex items-center gap-1 text-cinema-text-muted">
                        <Clock className="w-3 h-3" />
                        {show.time}
                      </div>
                    </div>
                  ))}
                  {theater.shows.length > 2 && (
                    <div className="text-xs text-cinema-text-muted">
                      +{theater.shows.length - 2} more shows
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-neon-green text-neon-green hover:bg-neon-green hover:text-cinema-dark"
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  View All Shows
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}