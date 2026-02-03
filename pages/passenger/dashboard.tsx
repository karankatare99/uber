"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Navigation, User } from "lucide-react";

// Shared Components
import Header from "@/components/shared/Header";
import Button from "@/components/shared/Button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Toast from "@/components/shared/Toast";

// Passenger Components
import RideRequest from "@/components/passenger/RideRequest";
import FareEstimate from "@/components/passenger/FareEstimate";
import RideStatus from "@/components/passenger/RideStatus";
import DriverInfo from "@/components/passenger/DriverInfo";
import { DarkMapBackground } from "@/components/passenger/DarkMapBackground";

// Types & Hooks
import { UserProp } from "@/lib/getUser";
import { useDashboard } from "@/hooks/useDashboard";
import Profile from "./profile";

export default function Dashboard({ user }: { user: UserProp }) {
  const {
    viewState,
    toastState,
    handleRequestRide,
    handleConfirmFare,
    handleBack,
    toggleProfile,
    handleLogout,
    closeToast
  } = useDashboard();

  return (
    <div className="min-h-screen bg-neutral-900 font-sans relative flex flex-col overflow-hidden text-black">
      {/* 1. Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* 2. Map Layer */}
      <DarkMapBackground />

      {/* 3. Floating User Avatar Button */}
      <div className="absolute top-24 right-4 z-40">
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleProfile}
            className={`w-12 h-12 rounded-full shadow-2xl flex items-center justify-center border-2 transition-all duration-300 ${
              viewState === 'PROFILE' 
                ? 'bg-yellow-400 border-white text-black' 
                : 'bg-white border-transparent text-black'
            }`}
        >
            <User size={20} />
        </motion.button>
      </div>

      {/* 4. Main Content Layer */}
      <main className="grow relative z-10 pt-24 px-4 pb-4 flex flex-col md:flex-row pointer-events-none">
        
        {/* LEFT PANEL: Interactive Area */}
        <div className="w-full md:w-112.5 flex flex-col justify-start pointer-events-auto h-[85vh] space-y-3">
          
          {/* Back Button (Contextual) */}
          <AnimatePresence>
            {viewState !== "REQUEST" && viewState !== "ACTIVE" && viewState !== "PROFILE" && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={handleBack}
                className="self-start bg-white p-2.5 rounded-full shadow-lg text-black hover:bg-neutral-100 transition-colors mb-2"
              >
                <ArrowLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Dynamic Content Switcher */}
          <AnimatePresence mode="wait">
            
            {/* --- STATE: REQUEST --- */}
            {viewState === "REQUEST" && (
              <motion.div
                key="request"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                 <RideRequest onRequest={handleRequestRide} />
              </motion.div>
            )}

            {/* --- STATE: ESTIMATE --- */}
            {viewState === "ESTIMATE" && (
              <motion.div
                key="estimate"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <FareEstimate onConfirm={handleConfirmFare} />
              </motion.div>
            )}

            {/* --- STATE: SEARCHING --- */}
            {viewState === "SEARCHING" && (
               <motion.div
                key="searching"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center min-h-75"
               >
                  <LoadingSpinner size={60} color="#000000" />
                  <h3 className="text-xl font-black mt-6 tracking-tight text-black">Connecting you...</h3>
                  <p className="text-neutral-500 font-medium">Finding nearby drivers</p>
               </motion.div>
            )}

            {/* --- STATE: ACTIVE RIDE --- */}
            {viewState === "ACTIVE" && (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <RideStatus />
                <DriverInfo />
                <Button variant="danger" fullWidth onClick={handleBack} className="mt-4">
                  Cancel Ride
                </Button>
              </motion.div>
            )}

            {/* --- STATE: PROFILE --- */}
            {viewState === "PROFILE" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, scale: 0.95, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full"
              >
                <Profile onLogout={handleLogout} user={user} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* RIGHT PANEL: Visual Map Markers */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
             
             {/* Map Marker - User */}
             <motion.div 
                animate={{ 
                    scale: viewState === "PROFILE" ? 0.8 : 1, 
                    opacity: viewState === "PROFILE" ? 0.5 : 1 
                }}
                className="absolute top-[45%] left-[60%] -translate-x-1/2 -translate-y-1/2"
             >
                <div className="relative">
                    <div className="w-16 h-16 bg-yellow-400/30 rounded-full animate-ping absolute inset-0" />
                    <div className="w-4 h-4 bg-black border-2 border-white rounded-full relative z-10 shadow-lg" />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 rounded shadow text-[10px] font-bold uppercase whitespace-nowrap">You</div>
                </div>
             </motion.div>

             {/* Map Marker - Driver (Only Active) */}
             <AnimatePresence>
                {viewState === "ACTIVE" && (
                    <motion.div 
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="absolute top-[38%] left-[50%] -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="p-2 bg-black text-white rounded-full shadow-xl relative">
                             <Navigation size={20} fill="white" className="rotate-45" />
                             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded shadow text-[10px] font-bold uppercase whitespace-nowrap">Michael</div>
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
        </div>

      </main>

      {/* Global Notifications */}
      <Toast 
        message={toastState.message}
        type={toastState.type}
        isVisible={toastState.visible}
        onClose={closeToast}
      />
    </div>
  );
}