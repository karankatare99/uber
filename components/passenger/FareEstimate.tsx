"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Car, Clock, User } from "lucide-react";

const RIDES = [
  { id: "uberx", name: "UberX", time: "3 min", price: "$14.50", seats: 4 },
  { id: "black", name: "Black", time: "5 min", price: "$28.00", seats: 4 },
  { id: "xl", name: "UberXL", time: "8 min", price: "$24.20", seats: 6 },
];

const FareEstimate = () => {
  const [selected, setSelected] = useState("uberx");

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-neutral-100 font-sans">
      <h3 className="text-xl font-black tracking-tight mb-4">Choose a ride</h3>
      
      <div className="space-y-3">
        {RIDES.map((ride) => {
          const isSelected = selected === ride.id;
          return (
            <motion.div
              key={ride.id}
              onClick={() => setSelected(ride.id)}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all duration-200
                ${isSelected ? "border-black bg-yellow-50" : "border-transparent hover:bg-neutral-50"}
              `}
            >
              <div className="flex items-center gap-4">
                {/* Vehicle Icon Placeholder */}
                <div className={`p-3 rounded-full ${isSelected ? "bg-yellow-400" : "bg-neutral-100"}`}>
                   <Car size={24} className="text-black" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg leading-none">{ride.name}</span>
                    <span className="flex items-center text-xs text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded font-medium">
                      <User size={10} className="mr-0.5" /> {ride.seats}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500 mt-1 font-medium">
                    <Clock size={12} className="mr-1" />
                    {ride.time} away
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-xl font-bold font-condensed tracking-tight">{ride.price}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FareEstimate;