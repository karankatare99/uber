"use client";

import React from "react";
import { motion } from "framer-motion";

const RideStatus = () => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-neutral-100 font-sans">
      <div className="flex justify-between items-end mb-6">
         <div>
            <h3 className="text-sm font-bold font-condensed uppercase tracking-wider text-neutral-500">Status</h3>
            <p className="text-2xl font-black tracking-tight">Arriving in 4 mins</p>
         </div>
         <div className="animate-pulse">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
         </div>
      </div>

      {/* Progress Timeline */}
      <div className="relative pl-4 space-y-8">
        {/* Line */}
        <div className="absolute left-4.75 top-2 bottom-6 w-0.5 bg-neutral-100" />
        
        {/* Step 1: Current */}
        <div className="relative flex items-center gap-4">
           <div className="w-3 h-3 rounded-full bg-black ring-4 ring-white z-10 shadow-sm" />
           <div>
              <p className="font-bold text-sm">Driver assigned</p>
              <p className="text-xs text-neutral-400 font-medium">12:42 PM</p>
           </div>
        </div>

        {/* Step 2: Active */}
        <div className="relative flex items-center gap-4 opacity-50">
           <div className="w-3 h-3 rounded-full bg-neutral-300 ring-4 ring-white z-10" />
           <div>
              <p className="font-bold text-sm">Driver at pickup</p>
              <p className="text-xs text-neutral-400 font-medium">Estimated 12:46 PM</p>
           </div>
        </div>

        {/* Step 3: Future */}
        <div className="relative flex items-center gap-4 opacity-30">
           <div className="w-3 h-3 rounded-sm bg-neutral-300 ring-4 ring-white z-10" />
           <div>
              <p className="font-bold text-sm">Destination</p>
              <p className="text-xs text-neutral-400 font-medium">Estimated 1:05 PM</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RideStatus;