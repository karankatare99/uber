"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Home, Dumbbell } from "lucide-react";
import Button from "@/components/shared/Button";

interface RideRequestProps {
  onRequest: () => void;
}

const RideRequest: React.FC<RideRequestProps> = ({ onRequest }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white p-6 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-neutral-100 font-sans relative z-20"
    >
      <h3 className="text-xl font-black tracking-tight mb-6 text-black">Where to?</h3>
      
      <div className="relative mb-6">
        {/* Visual Connector Line */}
        <div className="absolute left-[1.15rem] top-5 bottom-10 w-0.5 bg-neutral-200 z-0"></div>

        {/* Pickup Input */}
        <div className="relative mb-3 group z-10">
          <div className="absolute left-3 top-4">
            <div className="w-2.5 h-2.5 bg-black rounded-full ring-4 ring-white shadow-sm transition-transform group-focus-within:scale-110" />
          </div>
          <input 
            type="text" 
            placeholder="Pickup location" 
            className="w-full bg-neutral-50 pl-10 pr-4 py-3.5 rounded-xl text-sm font-semibold outline-none border border-transparent focus:border-black focus:bg-white transition-all placeholder:text-neutral-400 text-black shadow-sm"
          />
        </div>

        {/* Dropoff Input */}
        <div className="relative group z-10">
          <div className="absolute left-3 top-4">
            <div className="w-2.5 h-2.5 bg-black rounded-sm ring-4 ring-white shadow-sm transition-transform group-focus-within:scale-110" />
          </div>
          <input 
            type="text" 
            placeholder="Dropoff location" 
            className="w-full bg-neutral-50 pl-10 pr-4 py-3.5 rounded-xl text-sm font-semibold outline-none border border-transparent focus:border-black focus:bg-white transition-all placeholder:text-neutral-400 text-black shadow-sm"
          />
        </div>
      </div>

      {/* Quick Access / Saved Places */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2 mask-linear">
        {[
          { label: "Home", icon: Home }, 
          { label: "Work", icon: Briefcase }, 
          { label: "Gym", icon: Dumbbell }
        ].map((place) => (
          <button key={place.label} className="flex items-center gap-2 px-4 py-2.5 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors whitespace-nowrap active:scale-95 group">
            <place.icon size={14} className="text-neutral-500 group-hover:text-black transition-colors" />
            <span className="text-xs font-bold font-condensed uppercase tracking-wide text-neutral-600 group-hover:text-black transition-colors">{place.label}</span>
          </button>
        ))}
      </div>

      <Button 
        variant="primary" 
        fullWidth 
        onClick={onRequest} 
        className="shadow-lg shadow-yellow-400/20 py-4"
      >
        Find Driver
      </Button>
    </motion.div>
  );
};

export default RideRequest;