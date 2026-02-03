"use client";

import React from "react";
import { motion } from "framer-motion";

const RideStatus = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-neutral-100 font-sans relative z-20"
    >
      <div className="flex justify-between items-end mb-8">
         <div>
            <h3 className="text-[10px] font-bold font-condensed uppercase tracking-widest text-neutral-400 mb-1">Status</h3>
            <p className="text-3xl font-black tracking-tighter text-black">4 min <span className="text-lg font-medium text-neutral-400">away</span></p>
         </div>
         <div className="relative flex items-center justify-center w-12 h-12 bg-green-50 rounded-full">
            <span className="absolute w-full h-full bg-green-400/20 rounded-full animate-ping"></span>
            <span className="block w-3 h-3 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)] z-10"></span>
         </div>
      </div>

      {/* Progress Timeline */}
      <div className="relative pl-2 space-y-8">
        {/* Dotted Connecting Line */}
        <div className="absolute left-3.25 top-3 bottom-6 w-0.5 border-l-2 border-dashed border-neutral-200" />
        
        {/* Step 1: Active (Driver Assigned) */}
        <div className="relative flex items-start gap-4">
           <div className="w-3 h-3 rounded-full bg-black ring-4 ring-white z-10 shadow-sm mt-1" />
           <div>
              <p className="font-bold text-sm leading-none text-black">Driver assigned</p>
              <p className="text-xs text-neutral-500 font-medium mt-1">Michael is on the way</p>
           </div>
        </div>

        {/* Step 2: Next (Pickup) */}
        <div className="relative flex items-start gap-4 opacity-50 grayscale transition-all">
           <div className="w-3 h-3 rounded-full bg-yellow-400 ring-4 ring-white z-10 mt-1" />
           <div>
              <p className="font-bold text-sm leading-none text-black">Pickup</p>
              <p className="text-xs text-neutral-500 font-medium mt-1">123 Main Street</p>
           </div>
        </div>

        {/* Step 3: Destination (Future) */}
        <div className="relative flex items-start gap-4 opacity-30 grayscale transition-all">
           <div className="w-3 h-3 rounded-sm bg-black ring-4 ring-white z-10 mt-1" />
           <div>
              <p className="font-bold text-sm leading-none text-black">Dropoff</p>
              <p className="text-xs text-neutral-500 font-medium mt-1">Grand Central Terminal</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RideStatus;