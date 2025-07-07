import React from "react";
import { ArrowLeft, QrCode, MapPin, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";
import shazamPoster from "@/assets/shazam-poster.jpg";
import screamPoster from "@/assets/scream-poster.jpg";

const upcomingBookings = [
  {
    id: 1,
    title: "Shazam: Fury of the Gods",
    date: "21st Mar",
    time: "10:30",
    hall: "Lux Hall",
    seats: "B7, B8",
    poster: shazamPoster,
    qrCode: "QR123456"
  },
  {
    id: 2,
    title: "Scream VI",
    date: "25th Mar", 
    time: "19:45",
    hall: "Premium Hall",
    seats: "C5, C6",
    poster: screamPoster,
    qrCode: "QR789012"
  }
];

const pastBookings = [
  {
    id: 3,
    title: "The Ritual Killer",
    date: "15th Mar",
    time: "16:20",
    hall: "Standard Hall",
    seats: "D3, D4",
    poster: shazamPoster,
    qrCode: "QR345678"
  }
];

const MyBookings = () => {
  return (
    <div className="min-h-screen bg-gradient-main pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-cinema-sidebar/80 backdrop-blur-md border-b border-cinema-card">
        <div className="flex items-center gap-4 p-4 lg:p-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-cinema-text hover:bg-cinema-card">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl lg:text-2xl font-bold text-cinema-text">My Bookings</h1>
        </div>
      </div>

      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        {/* Upcoming Bookings */}
        <div className="mb-8">
          <h2 className="text-lg lg:text-xl font-semibold text-cinema-text mb-4">Upcoming Shows</h2>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id} className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 lg:w-20 lg:h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={booking.poster} 
                        alt={booking.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-cinema-text text-sm lg:text-base mb-2 truncate">
                        {booking.title}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-2 text-cinema-text-muted text-xs lg:text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span>{booking.hall}</span>
                        </div>
                        <div>
                          <span>Seats: {booking.seats}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-neon-green text-neon-green hover:bg-neon-green hover:text-cinema-dark flex items-center gap-2"
                        >
                          <QrCode className="w-4 h-4" />
                          Show QR
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          Cancel Booking
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Bookings */}
        <div>
          <h2 className="text-lg lg:text-xl font-semibold text-cinema-text mb-4">Past Shows</h2>
          <div className="space-y-4">
            {pastBookings.map((booking) => (
              <Card key={booking.id} className="bg-gradient-card border-0 shadow-card opacity-75">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 lg:w-20 lg:h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={booking.poster} 
                        alt={booking.title}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-cinema-text text-sm lg:text-base mb-2 truncate">
                        {booking.title}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-2 text-cinema-text-muted text-xs lg:text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span>{booking.hall}</span>
                        </div>
                        <div>
                          <span>Seats: {booking.seats}</span>
                        </div>
                      </div>
                      
                      <div className="text-cinema-text-muted text-xs lg:text-sm">
                        Booking Completed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MyBookings;