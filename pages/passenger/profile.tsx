"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, LogOut } from "lucide-react";
import Button from "@/components/shared/Button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { UserProp } from "@/lib/getUser";

// Custom Hook
import { useProfile } from "@/hooks/useProfile";
import { ProfileHeader } from "@/components/passenger/ProfileHeader";
import { ProfileField } from "@/components/passenger/ProfileField";
import { SettingsSection } from "@/components/passenger/SettingsSection";

// Sub-components


interface ProfileProps {
  onLogout: () => void;
  user: UserProp;
}

const Profile: React.FC<ProfileProps> = ({ onLogout, user }) => {
  const {
    loading,
    saving,
    userData,
    formData,
    isEditing,
    updateFirstName,
    updateLastName,
    handleSave,
    handleCancel,
    startEditing,
    getInitials
  } = useProfile(user);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <div className="bg-white h-full flex flex-col font-sans rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <ProfileHeader
        initials={getInitials()}
        firstName={formData.firstName}
        lastName={formData.lastName}
        isEditing={isEditing}
        onEditToggle={startEditing}
        onCancel={handleCancel}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-10">
        
        {/* Contact Info */}
        <section>
          <h3 className="text-sm font-black mb-6 flex items-center gap-2 text-black">
            Personal Details
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <ProfileField
              label="First Name" 
              value={formData.firstName}
              onChange={updateFirstName}
              isEditing={isEditing}
            />
            <ProfileField 
              label="Last Name" 
              value={formData.lastName}
              onChange={updateLastName}
              isEditing={isEditing}
            />
            <div className="col-span-2">
              <ProfileField 
                label="Email Address" 
                value={userData.email || ""} 
                disabled={true}
                isEditing={isEditing}
              />
            </div>
          </div>
        </section>

        {/* Account Settings */}
        <SettingsSection />
      </div>

      {/* Footer / Actions */}
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
