"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Navigation, User, Camera, Mail, Phone, 
  Save, LogOut, Shield, Bell, ChevronRight 
} from "lucide-react";

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

// --- Mock Data & Helpers ---
const getUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { 
    id: "u_99887766", 
    email: "rider@uberclone.com", 
    userType: "rider",
    firstName: "Alex",
    lastName: "Morgan",
    phone: "+1 (555) 019-2834"
  };
};

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

// --- Sub-Component: Profile Panel (Minimalist & Functional) ---
const ProfilePanel = ({ onLogout }: { onLogout: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "" });

  // Initial Fetch
  useEffect(() => {
    getUser().then((user) => {
      setUserData(user);
      setFormData({ firstName: user.firstName, lastName: user.lastName, phone: user.phone });
      setLoading(false);
    });
  }, []);

  // Save Handler
  const handleSave = async () => {
    setSaving(true);
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Update local "source of truth"
    setUserData({ ...userData, ...formData });
    setSaving(false);
    setIsEditing(false);
  };

  // Cancel Handler (Revert changes)
  const handleCancel = () => {
    setFormData({ firstName: userData.firstName, lastName: userData.lastName, phone: userData.phone });
    setIsEditing(false);
  };

  if (loading) return <div className="h-full flex items-center justify-center"><LoadingSpinner size={30} /></div>;

  const getInitials = () => formData.firstName ? formData.firstName[0].toUpperCase() : "U";

  // Reusable Minimal Input Field Component
  const ProfileField = ({ label, value, field, type = "text", disabled = false }: any) => (
    <div className="group">
      <label className="block text-[10px] font-bold font-condensed uppercase tracking-widest text-neutral-400 mb-1 group-focus-within:text-black transition-colors">
        {label}
      </label>
      {isEditing && !disabled ? (
        <input
          type={type}
          value={value}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className="w-full py-2 bg-transparent border-b border-neutral-200 text-sm font-semibold text-black focus:border-black focus:outline-none transition-all placeholder:text-neutral-300"
        />
      ) : (
        <p className={`text-sm font-semibold py-2 border-b border-transparent truncate ${disabled ? "text-neutral-400" : "text-black"}`}>
          {value}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-white h-full flex flex-col font-sans rounded-3xl shadow-2xl overflow-hidden">
      
      {/* 1. Minimalist Header */}
      <div className="shrink-0 px-8 pt-10 pb-8 bg-white border-b border-neutral-100">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
                {/* Avatar with Edit Icon */}
                <div className="relative">
                    <motion.div 
                        layoutId="avatar"
                        className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-3xl font-black text-white shadow-2xl"
                    >
                        {getInitials()}
                    </motion.div>
                    <AnimatePresence>
                        {isEditing && (
                            <motion.button
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute bottom-0 right-0 bg-yellow-400 p-1.5 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform shadow-sm"
                            >
                                <Camera size={12} className="text-black" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
                
                {/* Name & Badge */}
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-black">
                        {formData.firstName} {formData.lastName}
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                         <div className="flex items-center gap-1 bg-neutral-100 px-2 py-0.5 rounded-full">
                            <span className="text-[10px] font-bold font-condensed uppercase tracking-wide text-neutral-600">Gold Member</span>
                         </div>
                         <span className="text-xs font-bold text-neutral-400">4.92 ★</span>
                    </div>
                </div>
            </div>
            
            {/* Top Edit Toggle */}
            {!isEditing ? (
                <button 
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-bold font-condensed uppercase tracking-wider text-neutral-400 hover:text-black transition-colors"
                >
                    Edit
                </button>
            ) : (
                <button 
                    onClick={handleCancel}
                    className="text-xs font-bold font-condensed uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors"
                >
                    Cancel
                </button>
            )}
        </div>
      </div>

      {/* 2. Scrollable Content (No Scrollbar) */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-10">
        
        {/* Contact Info */}
        <section>
            <h3 className="text-sm font-black mb-6 flex items-center gap-2 text-black">
                Personal Details
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <ProfileField label="First Name" field="firstName" value={formData.firstName} />
                <ProfileField label="Last Name" field="lastName" value={formData.lastName} />
                <div className="col-span-2">
                    <ProfileField label="Phone Number" field="phone" value={formData.phone} type="tel" />
                </div>
                <div className="col-span-2">
                     <ProfileField label="Email Address" value={userData.email} disabled={true} />
                </div>
            </div>
        </section>

        {/* Account Settings */}
        <section>
            <h3 className="text-sm font-black mb-4 text-black">Settings</h3>
            <div className="space-y-1">
                {[
                    { icon: Bell, label: "Notifications" },
                    { icon: Shield, label: "Privacy & Security" },
                    { icon: Mail, label: "Communications" }
                ].map((item) => (
                    <button key={item.label} className="w-full flex items-center justify-between py-3 group">
                        <div className="flex items-center gap-3 text-neutral-500 group-hover:text-black transition-colors">
                            <item.icon size={18} strokeWidth={2} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <ChevronRight size={14} className="text-neutral-300 group-hover:text-black transition-colors" />
                    </button>
                ))}
            </div>
        </section>
      </div>

      {/* 3. Footer / Actions */}
      <div className="shrink-0 p-8 border-t border-neutral-100 bg-neutral-50/50">
        <AnimatePresence mode="wait">
            {isEditing ? (
                <motion.div 
                    key="save-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    <Button 
                        variant="primary" 
                        fullWidth 
                        onClick={handleSave} 
                        isLoading={saving}
                        className="shadow-lg shadow-yellow-400/20"
                    >
                        <Save size={16} className="mr-2" /> Save Changes
                    </Button>
                </motion.div>
            ) : (
                <motion.button
                    key="logout-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 py-3 rounded-xl transition-colors text-sm font-bold"
                >
                    <LogOut size={16} />
                    Sign Out
                </motion.button>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---
type DashboardState = "REQUEST" | "ESTIMATE" | "SEARCHING" | "ACTIVE" | "PROFILE";

export default function Dashboard() {
  const [viewState, setViewState] = useState<DashboardState>("REQUEST");
  const [toastState, setToastState] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false, message: "", type: "info"
  });

  const showToast = (message: string, type: ToastType) => setToastState({ visible: true, message, type });

  // Navigation Logic
  const handleRequestRide = () => setViewState("ESTIMATE");
  const handleConfirmFare = () => {
    setViewState("SEARCHING");
    setTimeout(() => setViewState("ACTIVE"), 2500);
  };
  const handleBack = () => setViewState("REQUEST");
  const toggleProfile = () => setViewState(viewState === "PROFILE" ? "REQUEST" : "PROFILE");
  
  const handleLogout = () => {
    showToast("Logged out successfully", "info");
    setViewState("REQUEST");
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

            {/* 5. Profile Panel */}
            {viewState === "PROFILE" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, scale: 0.95, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full"
              >
                <ProfilePanel onLogout={handleLogout} />
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