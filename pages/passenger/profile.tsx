"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, LogOut, Bell, Shield, Camera, ChevronRight, Save } from "lucide-react";
import Link from "next/link";

// Shared Components
import Header from "@/components/shared/Header";
import Button from "@/components/shared/Button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Toast, { ToastType } from "@/components/shared/Toast";

// --- Mock Async User Fetcher ---
const getUser = async () => {
  // Simulating network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { 
    id: "u_123456789", 
    email: "john.doe@example.com", 
    userType: "rider" 
  };
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    phone: "+1 (555) 012-3456",
  });

  // UI State
  const [isEditing, setIsEditing] = useState(false);
  const [toastState, setToastState] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setUserData(user);
        // In a real app, you might sync formData with user data here if the API returned names
      } catch (error) {
        console.error("Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setToastState({ visible: true, message: "Profile information updated successfully.", type: "success" });
  };

  const handleLogout = () => {
    setToastState({ visible: true, message: "Logging out...", type: "info" });
    // Add actual logout logic/redirect here
  };

  // Helper to get initials
  const getInitials = () => {
    if (formData.firstName) return formData.firstName[0].toUpperCase();
    if (userData?.email) return userData.email[0].toUpperCase();
    return "U";
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-neutral-900">
        <LoadingSpinner size={60} color="#FACC15" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 font-sans text-white">
      <Header />

      <main className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8"
        >
          {/* --- HEADER CARD --- */}
          <div className="bg-white text-black rounded-4xl p-8 shadow-2xl relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />

             <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                
                {/* Avatar Section */}
                <div className="relative group">
                   <div className="w-32 h-32 rounded-full bg-neutral-900 text-yellow-400 flex items-center justify-center text-5xl font-black font-sans shadow-xl border-4 border-white">
                      {getInitials()}
                   </div>
                   <button className="absolute bottom-0 right-0 p-2 bg-yellow-400 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
                      <Camera size={18} className="text-black" />
                   </button>
                </div>

                {/* Info Section */}
                <div className="flex-1 text-center md:text-left space-y-2">
                   <div className="flex items-center justify-center md:justify-start gap-3">
                      <h1 className="text-3xl font-black tracking-tight">{formData.firstName} {formData.lastName}</h1>
                      <span className="bg-black text-white text-xs font-bold font-condensed uppercase px-2 py-1 rounded tracking-wide">
                        {userData?.userType}
                      </span>
                   </div>
                   <p className="text-neutral-500 font-medium flex items-center justify-center md:justify-start gap-2">
                      <Mail size={16} /> {userData?.email}
                   </p>
                   <p className="text-neutral-400 text-sm font-medium">User ID: <span className="font-mono">{userData?.id}</span></p>
                </div>

                {/* Edit Toggle */}
                <div className="mt-4 md:mt-0">
                    {!isEditing ? (
                        <Button variant="outline" onClick={() => setIsEditing(true)} className="border-neutral-200! text-black! hover:bg-neutral-100!">
                           Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                             <Button variant="ghost" onClick={() => setIsEditing(false)} className="text-neutral-500!">
                                Cancel
                             </Button>
                             <Button variant="primary" onClick={handleSave} className="shadow-lg shadow-yellow-400/20">
                                <Save size={18} className="mr-2" /> Save
                             </Button>
                        </div>
                    )}
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* --- LEFT COL: PERSONAL INFO FORM --- */}
            <div className="md:col-span-2 bg-white text-black rounded-3xl p-8 shadow-xl">
               <h2 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2">
                  <User size={24} className="text-yellow-400" /> Personal Information
               </h2>

               <div className="grid md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold font-condensed uppercase tracking-wider text-neutral-500 ml-1">First Name</label>
                     <input 
                        name="firstName"
                        type="text" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-4 rounded-xl outline-none font-medium transition-all ${isEditing ? 'bg-neutral-50 border-2 border-neutral-200 focus:border-black' : 'bg-white border-b border-neutral-100 px-0'}`}
                     />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold font-condensed uppercase tracking-wider text-neutral-500 ml-1">Last Name</label>
                     <input 
                        name="lastName"
                        type="text" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-4 rounded-xl outline-none font-medium transition-all ${isEditing ? 'bg-neutral-50 border-2 border-neutral-200 focus:border-black' : 'bg-white border-b border-neutral-100 px-0'}`}
                     />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2 md:col-span-2">
                     <label className="text-xs font-bold font-condensed uppercase tracking-wider text-neutral-500 ml-1">Phone Number</label>
                     <div className="relative">
                        <Phone size={18} className={`absolute left-0 top-4 ${isEditing ? 'left-4' : ''} text-neutral-400`} />
                        <input 
                            name="phone"
                            type="tel" 
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full p-4 rounded-xl outline-none font-medium transition-all ${isEditing ? 'bg-neutral-50 border-2 border-neutral-200 focus:border-black pl-11' : 'bg-white border-b border-neutral-100 pl-8'}`}
                        />
                     </div>
                  </div>

                   {/* Email (Read Only) */}
                   <div className="space-y-2 md:col-span-2 opacity-60">
                     <label className="text-xs font-bold font-condensed uppercase tracking-wider text-neutral-500 ml-1">Email Address (Locked)</label>
                     <div className="relative">
                        <Mail size={18} className={`absolute left-0 top-4 ${isEditing ? 'left-4' : ''} text-neutral-400`} />
                        <input 
                            type="email" 
                            value={userData?.email}
                            disabled
                            className={`w-full p-4 rounded-xl outline-none font-medium transition-all cursor-not-allowed ${isEditing ? 'bg-neutral-100 border-2 border-transparent pl-11' : 'bg-white border-b border-neutral-100 pl-8'}`}
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* --- RIGHT COL: SETTINGS & ACTIONS --- */}
            <div className="space-y-6">
               
               {/* Quick Settings */}
               <div className="bg-neutral-800 rounded-3xl p-6 shadow-xl border border-neutral-700">
                  <h3 className="text-sm font-bold font-condensed uppercase tracking-widest text-neutral-400 mb-4">Preferences</h3>
                  
                  <div className="space-y-1">
                     <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-neutral-700 transition-colors group">
                        <div className="flex items-center gap-3">
                           <Bell size={20} className="text-white" />
                           <span className="font-medium text-sm">Notifications</span>
                        </div>
                        <div className="w-10 h-6 bg-yellow-400 rounded-full relative">
                           <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full shadow-sm" />
                        </div>
                     </button>
                     
                     <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-neutral-700 transition-colors group">
                        <div className="flex items-center gap-3">
                           <Shield size={20} className="text-white" />
                           <span className="font-medium text-sm">Security & Privacy</span>
                        </div>
                        <ChevronRight size={16} className="text-neutral-500 group-hover:text-white transition-colors" />
                     </button>
                  </div>
               </div>

               {/* Danger Zone / Logout */}
               <div className="bg-white text-black rounded-3xl p-6 shadow-xl">
                  <h3 className="text-sm font-bold font-condensed uppercase tracking-widest text-neutral-400 mb-4">Account</h3>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-4 rounded-xl font-bold hover:bg-red-100 transition-colors"
                  >
                     <LogOut size={20} />
                     Sign Out
                  </button>
               </div>

            </div>
          </div>
        </motion.div>
      </main>

      <Toast 
        message={toastState.message}
        type={toastState.type}
        isVisible={toastState.visible}
        onClose={() => setToastState(prev => ({ ...prev, visible: false }))}
      />
    </div>
  );
}