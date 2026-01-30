"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Star, ShieldCheck } from "lucide-react";

const DriverInfo = () => {
  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-neutral-900 text-white p-6 rounded-3xl shadow-2xl border border-neutral-800 font-sans relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="flex justify-between items-start mb-6">
        <div>
           <p className="text-neutral-400 text-xs font-bold font-condensed uppercase tracking-wider mb-1">Your Driver</p>
           <h3 className="text-2xl font-black tracking-tight">Michael D.</h3>
           <div className="flex items-center gap-1 mt-1 text-yellow-400">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-bold">4.98</span>
              <span className="text-neutral-500 text-sm ml-1 font-medium">(2,400+ rides)</span>
           </div>
        </div>
        <div className="w-14 h-14 bg-neutral-800 rounded-full border-2 border-yellow-400 flex items-center justify-center overflow-hidden">
            {/* Avatar Placeholder */}
            <span className="text-xl font-bold text-neutral-500">MD</span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-neutral-800/50 p-4 rounded-xl mb-6 backdrop-blur-sm">
         <div>
            <p className="text-white font-bold">Toyota Camry</p>
            <p className="text-neutral-400 text-sm">Grey • Sedan</p>
         </div>
         <div className="bg-white text-black px-3 py-1 rounded border-2 border-neutral-200">
            <span className="font-bold font-condensed tracking-widest text-lg">HKS 928</span>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
         <button className="flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-bold hover:bg-neutral-200 transition-colors">
            <Phone size={18} />
            <span>Call</span>
         </button>
         <button className="flex items-center justify-center gap-2 bg-neutral-800 text-white py-3 rounded-xl font-bold hover:bg-neutral-700 transition-colors">
            <MessageSquare size={18} />
            <span>Message</span>
         </button>
      </div>
    </motion.div>
  );
};

export default DriverInfo;