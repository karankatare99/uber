"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Navigation, User } from "lucide-react";

// Shared Components
import Header from "@/components/shared/Header";
import Button from "@/components/shared/Button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Toast, { ToastType } from "@/components/shared/Toast";

// Passenger Components
import RideRequest from "@/components/passenger/RideRequest";
import FareEstimate from "@/components/passenger/FareEstimate";
import RideStatus from "@/components/passenger/RideStatus";
import DriverInfo from "@/components/passenger/DriverInfo";
import Profile from "./profile";
import axios from "axios";
import { UserProp } from "@/lib/getUser";
import { useRouter } from "next/navigation";

// Separated Profile Component

// --- Sub-Component: Map Background ---
const DarkMapBackground = () => (
  <div className="absolute inset-0 bg-[#121212] overflow-hidden z-0 pointer-events-none select-none">
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `linear-gradient(#262626 2px, transparent 2px), linear-gradient(90deg, #262626 2px, transparent 2px)`,
        backgroundSize: '100px 100px'
      }}
    />
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `linear-gradient(#404040 1px, transparent 1px), linear-gradient(90deg, #404040 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}
    />
    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1a1a1a] rounded-full blur-3xl opacity-50" />
    <div className="absolute bottom-1/3 left-1/3 w-125 h-125 bg-[#0a0a0a] rounded-full blur-3xl opacity-80" />
  </div>
);

// --- Main Dashboard Component ---
type DashboardState = "REQUEST" | "ESTIMATE" | "SEARCHING" | "ACTIVE" | "PROFILE";

export default function Dashboard({ user }: { user: UserProp }) {
  const [viewState, setViewState] = useState<DashboardState>("REQUEST");
  const [toastState, setToastState] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false, message: "", type: "info"
  });
  const router = useRouter();

  const showToast = (message: string, type: ToastType) => setToastState({ visible: true, message, type });

  // Navigation Logic
  const handleRequestRide = () => setViewState("ESTIMATE");
  const handleConfirmFare = () => {
    setViewState("SEARCHING");
    setTimeout(() => setViewState("ACTIVE"), 2500);
  };
  const handleBack = () => setViewState("REQUEST");
  const toggleProfile = () => setViewState(viewState === "PROFILE" ? "REQUEST" : "PROFILE");
  
  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    showToast("Logged out successfully", "info");
    setViewState("REQUEST");
    router.refresh();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-neutral-900 font-sans relative flex flex-col overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Map Layer */}
      <DarkMapBackground />

      {/* Floating User Avatar Button (To toggle Profile) */}
      <div className="absolute top-24 right-4 z-40">
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleProfile}
            className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center border-2 transition-all duration-300 ${viewState === 'PROFILE' ? 'bg-yellow-400 border-white text-black' : 'bg-white border-transparent text-black'}`}
        >
            <User size={20} />
        </motion.button>
      </div>

      {/* Content Layer */}
      <main className="grow relative z-10 pt-24 px-4 pb-4 flex flex-col md:flex-row pointer-events-none">
        
        {/* Left Interactive Panel */}
        <div className="w-full md:w-112.5 flex flex-col justify-start pointer-events-auto h-[85vh] space-y-3">
          
          {/* Back Button (Contextual) */}
          <AnimatePresence>
            {viewState !== "REQUEST" && viewState !== "ACTIVE" && viewState !== "PROFILE" && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={handleBack}
                className="self-start bg-white p-2.5 rounded-full shadow-lg text-black hover:bg-neutral-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Panel Content Swapper */}
          <AnimatePresence mode="wait">
            
            {/* 1. Request */}
            {viewState === "REQUEST" && (
              <motion.div
                key="request"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                 <RideRequest />
              </motion.div>
            )}

            {/* 2. Estimate */}
            {viewState === "ESTIMATE" && (
              <motion.div
                key="estimate"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <FareEstimate />
              </motion.div>
            )}

            {/* 3. Searching */}
            {viewState === "SEARCHING" && (
               <motion.div
                key="searching"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center min-h-75"
               >
                  <LoadingSpinner size={60} color="#000000" />
                  <h3 className="text-xl font-black mt-6 tracking-tight">Connecting you...</h3>
                  <p className="text-neutral-500 font-medium">Finding nearby drivers</p>
               </motion.div>
            )}

            {/* 4. Active Ride */}
            {viewState === "ACTIVE" && (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <RideStatus />
                <DriverInfo />
                <Button variant="danger" fullWidth onClick={handleBack} className="mt-4">Cancel Ride</Button>
              </motion.div>
            )}

            {/* 5. Profile Panel (Imported) */}
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

        {/* Right Side / Map Elements */}
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
                        <div className="p-2 bg-black text-white rounded-full shadow-xl">
                             <Navigation size={20} fill="white" className="rotate-45" />
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
        </div>

      </main>

      <Toast 
        message={toastState.message}
        type={toastState.type}
        isVisible={toastState.visible}
        onClose={() => setToastState(prev => ({...prev, visible: false}))}
      />
    </div>
  );
}