"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Clock, User, Zap } from "lucide-react";
import Button from "@/components/shared/Button";

interface FareEstimateProps {
  onConfirm: () => void;
}

const RIDES = [
  { id: "uberx", name: "UberX", time: "3 min", price: "$14.50", seats: 4, badge: "Best Value" },
  { id: "black", name: "Black", time: "5 min", price: "$28.00", seats: 4, badge: null },
  { id: "xl", name: "UberXL", time: "8 min", price: "$24.20", seats: 6, badge: null },
];

const FareEstimate: React.FC<FareEstimateProps> = ({ onConfirm }) => {
  const [selected, setSelected] = useState("uberx");

  return (
    <div className="bg-white p-6 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-neutral-100 font-sans relative z-20">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-black tracking-tight text-black flex items-center gap-2">
          Choose a ride
        </h3>
        <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg flex items-center gap-1">
            <Zap size={12} fill="currentColor" />
            <span className="text-[10px] font-bold uppercase tracking-wide">Fast</span>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {RIDES.map((ride) => {
          const isSelected = selected === ride.id;
          return (
            <motion.div
              key={ride.id}
              layout
              onClick={() => setSelected(ride.id)}
              whileTap={{ scale: 0.98 }}
              className={`
                relative flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all duration-300
                ${isSelected ? "border-black bg-neutral-50 shadow-md" : "border-transparent hover:bg-neutral-50/50"}
              `}
            >
              {/* Badge */}
              {ride.badge && (
                <div className="absolute -top-2.5 right-4 bg-black text-white text-[10px] font-bold font-condensed px-2 py-0.5 rounded-full uppercase tracking-wider shadow-lg z-10">
                  {ride.badge}
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-colors duration-300 ${isSelected ? "bg-yellow-400 text-black" : "bg-neutral-100 text-neutral-400"}`}>
                   <Car size={24} />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg leading-none text-black">{ride.name}</span>
                    <span className="flex items-center text-[10px] font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-md">
                      <User size={10} className="mr-0.5" /> {ride.seats}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-neutral-400 mt-1 font-medium">
                    <Clock size={12} className="mr-1" />
                    {ride.time} away
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-xl font-bold font-condensed tracking-tight text-black">{ride.price}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Button 
        variant="primary" 
        fullWidth 
        onClick={onConfirm} 
        className="shadow-xl shadow-yellow-400/20 py-4 text-base"
      >
        Confirm {RIDES.find(r => r.id === selected)?.name}
      </Button>
    </div>
  );
};

export default FareEstimate;