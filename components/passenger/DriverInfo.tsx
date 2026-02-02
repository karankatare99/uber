"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Star, ShieldCheck } from "lucide-react";

const DriverInfo = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-neutral-900 text-white p-6 rounded-3xl shadow-2xl border border-neutral-800 font-sans relative overflow-hidden"
    >
      {/* Background Glow Accent */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-[50px] pointer-events-none" />

      {/* Header: Driver Name & Rating */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             <p className="text-neutral-400 text-[10px] font-bold font-condensed uppercase tracking-widest">Arriving Now</p>
           </div>
           <h3 className="text-2xl font-black tracking-tight text-white">Michael D.</h3>
           <div className="flex items-center gap-1.5 mt-1 bg-neutral-800/50 w-fit px-2 py-1 rounded-lg border border-neutral-700">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-white">4.98</span>
              <span className="text-[10px] text-neutral-500 font-medium ml-1">· 2.4k rides</span>
           </div>
        </div>
        <div className="relative">
            <div className="w-16 h-16 bg-neutral-800 rounded-full border-2 border-yellow-400 flex items-center justify-center overflow-hidden shadow-lg">
                <span className="text-xl font-bold text-neutral-500">MD</span>
            </div>
            <div className="absolute -bottom-2 -right-1 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded border border-neutral-200 shadow-sm flex items-center gap-0.5">
                <ShieldCheck size={10} /> Pro
            </div>
        </div>
      </div>

      {/* Vehicle Plate Info */}
      <div className="flex items-center justify-between bg-neutral-800/80 p-4 rounded-2xl mb-6 backdrop-blur-md border border-white/5 shadow-inner">
         <div>
            <p className="text-white font-bold text-lg leading-tight">Toyota Camry</p>
            <p className="text-neutral-400 text-xs font-medium mt-0.5">Grey • Sedan</p>
         </div>
         <div className="bg-yellow-400 text-black px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(250,204,21,0.2)]">
            <span className="font-bold font-condensed tracking-widest text-lg">HKS 928</span>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
         <button className="flex items-center justify-center gap-2 bg-white text-black py-3.5 rounded-xl font-bold hover:bg-neutral-200 transition-colors active:scale-95 text-sm">
            <Phone size={18} />
            <span>Call Driver</span>
         </button>
         <button className="flex items-center justify-center gap-2 bg-neutral-800 text-white py-3.5 rounded-xl font-bold hover:bg-neutral-700 transition-colors active:scale-95 border border-neutral-700 text-sm">
            <MessageSquare size={18} />
            <span>Message</span>
         </button>
      </div>
    </motion.div>
  );
};

export default DriverInfo;