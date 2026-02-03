"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Star, ShieldCheck, Check, Copy } from "lucide-react";

const DriverInfo = () => {
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const driverPhone = "+1 (555) 123-4567";

  const handleCallDriver = () => {
    // 1. Copy to clipboard
    navigator.clipboard.writeText(driverPhone);
    
    // 2. Show Toast
    setShowCopiedToast(true);

    // 3. Hide Toast after 2 seconds
    setTimeout(() => {
      setShowCopiedToast(false);
    }, 2000);
  };

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

      {/* Action Button Container */}
      <div className="mt-4 relative z-10">
         <button 
            onClick={handleCallDriver}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold hover:bg-neutral-200 transition-colors active:scale-95 text-sm shadow-lg shadow-white/5 relative overflow-hidden"
         >
            <Phone size={18} />
            <span>Call Driver</span>
         </button>

         {/* --- COPIED TOAST (Pops right of button content) --- */}
         <AnimatePresence>
            {showCopiedToast && (
              <motion.div
                initial={{ x: 20, opacity: 0, y: "-50%" }}
                animate={{ x: 0, opacity: 1, y: "-50%" }}
                exit={{ x: 20, opacity: 0, y: "-50%" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute right-2 top-1/2 z-20 bg-neutral-900 text-white pl-2 pr-3 py-1.5 rounded-lg flex items-center gap-2 shadow-xl pointer-events-none border border-neutral-700"
              >
                <div className="bg-green-500 rounded-full p-0.5">
                   <Check size={10} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-[10px] font-bold font-condensed uppercase tracking-wider">Copied</span>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DriverInfo;