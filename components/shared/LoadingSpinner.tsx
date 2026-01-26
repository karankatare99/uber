"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, color = "#FACC15" }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <motion.div
        style={{
          width: size,
          height: size,
          border: "4px solid rgba(128, 128, 128, 0.1)",
          borderTop: `4px solid ${color}`,
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;