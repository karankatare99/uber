"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LocateFixed, Loader2 } from "lucide-react";
import Button from "@/components/shared/Button";

interface RideRequestProps {
  onRequest: () => void;
}

const RideRequest: React.FC<RideRequestProps> = ({ onRequest }) => {
  // --- FUNCTIONALITY LOGIC (UNCHANGED) ---
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [animate, setAnimate] = useState(false);

  const onRequestHandler = () => {
    if (pickupAddress.length === 0 || dropAddress.length === 0) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    } else {
      onRequest();
    }
  };
  
  const fetchCurrentLocation = async () => {
      if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
      }

      setIsFetchingLocation(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lng } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
              { headers: { 'User-Agent': 'UberClone/1.0' } }
            );
            
            const data = await response.json();
            const address = data.display_name || "Current location";
            
            setPickupAddress(address);
            setIsFetchingLocation(false);
            
          } catch (error) {
            setPickupAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            setIsFetchingLocation(false);
          }
        },
        () => {
          setIsFetchingLocation(false);
          alert("Please enable location access");
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    };

  // --- STYLE LOGIC (UPDATED FOR FULLER LOOK) ---
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-neutral-100 font-sans relative z-20 min-h-112.5 flex flex-col justify-between"
    >
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-3xl font-black tracking-tighter mb-10 text-black">Where to?</h3>
        
        <div className="relative mb-8">
          {/* Visual Connector Line - Scaled up */}
          <div className="absolute left-[1.35rem] top-7 bottom-14 w-0.5 bg-neutral-200 z-0"></div>

          {/* Pickup Input */}
          <div className="relative mb-8 group z-10">
            <div className="absolute left-4 top-5 pointer-events-none">
              <div className={`w-3 h-3 bg-black rounded-full ring-4 ring-white shadow-sm transition-transform ${animate && pickupAddress.length === 0 ? "scale-150 bg-red-500" : "group-focus-within:scale-110"}`} />
            </div>
            
            <input
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              type="text" 
              placeholder="Pickup location" 
              className={`w-full bg-neutral-50 pl-14 pr-14 py-5 rounded-2xl text-lg font-semibold outline-none border transition-all placeholder:text-neutral-400 text-black shadow-sm ${animate && pickupAddress.length === 0 ? "border-red-500 bg-red-50" : "border-transparent focus:border-black focus:bg-white"}`}
            />
            
            {/* Current Location Button */}
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl text-neutral-400 hover:text-black hover:bg-neutral-200/50 transition-colors disabled:opacity-50"
              title="Use current location"
              onClick={fetchCurrentLocation}
              disabled={isFetchingLocation}
            >
              {isFetchingLocation ? (
                <Loader2 size={22} className="animate-spin text-black" />
              ) : (
                <LocateFixed size={22} />
              )}
            </button>
          </div>

          {/* Dropoff Input */}
          <div className="relative group z-10">
            <div className="absolute left-4 top-5 pointer-events-none">
              <div className={`w-3 h-3 bg-black rounded-sm ring-4 ring-white shadow-sm transition-transform ${animate && dropAddress.length === 0 ? "scale-150 bg-red-500" : "group-focus-within:scale-110"}`} />
            </div>
            <input
              value={dropAddress}
              onChange={(e) => setDropAddress(e.target.value)}
              type="text" 
              placeholder="Dropoff location" 
              className={`w-full bg-neutral-50 pl-14 pr-6 py-5 rounded-2xl text-lg font-semibold outline-none border transition-all placeholder:text-neutral-400 text-black shadow-sm ${animate && dropAddress.length === 0 ? "border-red-500 bg-red-50" : "border-transparent focus:border-black focus:bg-white"}`}
            />
          </div>
        </div>
      </div>

      <Button 
        variant="primary" 
        fullWidth 
        onClick={onRequestHandler} 
        className="shadow-xl shadow-yellow-400/20 py-5 text-xl font-bold tracking-tight mt-auto"
      >
        Find Driver
      </Button>
    </motion.div>
  );
};

export default RideRequest;