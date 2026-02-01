import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";

interface ProfileHeaderProps {
  initials: string;
  firstName: string;
  lastName: string;
  isEditing: boolean;
  onEditToggle: () => void;
  onCancel: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  initials,
  firstName,
  lastName,
  isEditing,
  onEditToggle,
  onCancel
}) => (
  <div className="shrink-0 px-8 pt-10 pb-8 bg-white border-b border-neutral-100">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        {/* Avatar with Edit Icon */}
        <div className="relative">
          <motion.div 
            layoutId="avatar"
            className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-3xl font-black text-white shadow-2xl"
          >
            {initials}
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
            {firstName} {lastName}
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1 bg-neutral-100 px-2 py-0.5 rounded-full">
              <span className="text-[10px] font-bold font-condensed uppercase tracking-wide text-neutral-600">
                Gold Member
              </span>
            </div>
            <span className="text-xs font-bold text-neutral-400">4.92 ★</span>
          </div>
        </div>
      </div>
      
      {/* Top Edit Toggle */}
      {!isEditing ? (
        <button 
          onClick={onEditToggle}
          className="text-xs font-bold font-condensed uppercase tracking-wider text-neutral-400 hover:text-black transition-colors"
        >
          Edit
        </button>
      ) : (
        <button 
          onClick={onCancel}
          className="text-xs font-bold font-condensed uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  </div>
);
