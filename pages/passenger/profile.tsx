"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Mail, Save, LogOut, Shield, Bell, ChevronRight } from "lucide-react";
import Button from "@/components/shared/Button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { UserProp } from "@/lib/getUser";

interface ProfileProps {
  onLogout: () => void;
  user: UserProp
}

const Profile: React.FC<ProfileProps> = ({ onLogout, user }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<any>(user);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });

  // Initial Fetch
  useEffect(() => {
    setUserData(user);
    setFormData({ firstName: user.firstName, lastName: user.lastName });
    setLoading(false);
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
    setFormData({ firstName: userData.firstName, lastName: userData.lastName });
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

export default Profile;