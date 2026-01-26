"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const config = {
    success: { bg: "bg-black", border: "border-yellow-400", icon: CheckCircle, iconColor: "text-yellow-400" },
    error: { bg: "bg-red-50", border: "border-red-500", icon: AlertCircle, iconColor: "text-red-600" },
    info: { bg: "bg-white", border: "border-blue-500", icon: Info, iconColor: "text-blue-500" },
  };

  const style = config[type];
  const Icon = style.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 20, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`fixed top-4 left-1/2 z-[100] flex items-center p-4 rounded-lg shadow-xl min-w-[320px] border-l-4 font-condensed ${style.bg} ${style.border}`}
        >
          <Icon className={`w-5 h-5 mr-3 ${style.iconColor}`} />
          <p className={`flex-1 text-sm font-semibold tracking-wide ${type === 'success' ? 'text-white' : 'text-black'}`}>
            {message}
          </p>
          <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
            <X size={16} className={type === 'success' ? 'text-white' : 'text-black'} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;