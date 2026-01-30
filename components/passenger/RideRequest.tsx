"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Search } from "lucide-react";
import Button from "../shared/Button";

const RideRequest = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-3xl shadow-xl border border-neutral-100 font-sans"
    >
      <h3 className="text-xl font-black tracking-tight mb-6">Where to?</h3>
      
      <div className="relative">
        {/* Connector Line */}
        <div className="absolute left-[1.15rem] top-4 bottom-10 w-0.5 bg-neutral-200" />

        {/* Pickup Input */}
        <div className="relative mb-4 group">
          <div className="absolute left-3 top-3.5 z-10">
            <div className="w-3 h-3 bg-black rounded-full ring-4 ring-white" />
          </div>
          <input 
            type="text" 
            placeholder="Pickup location" 
            className="w-full bg-neutral-50 pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all font-medium text-black placeholder:text-neutral-400"
          />
        </div>

        {/* Dropoff Input */}
        <div className="relative mb-6 group">
          <div className="absolute left-3 top-3.5 z-10">
            <div className="w-3 h-3 bg-black rounded-sm ring-4 ring-white" />
          </div>
          <input 
            type="text" 
            placeholder="Dropoff location" 
            className="w-full bg-neutral-50 pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all font-medium text-black placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Saved Places (Quick Access) */}
      <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
        {["Home", "Work", "Gym"].map((place) => (
          <button key={place} className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors whitespace-nowrap">
            <div className="w-2 h-2 bg-neutral-400 rounded-full" />
            <span className="text-xs font-bold font-condensed uppercase tracking-wide">{place}</span>
          </button>
        ))}
      </div>

      <Button variant="primary" fullWidth>
        Find Driver
      </Button>
    </motion.div>
  );
};

export default RideRequest;