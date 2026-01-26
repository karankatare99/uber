"use client";

import React, { useRef } from "react";
import { Loader2 } from "lucide-react";
import gsap from "gsap";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (!props.disabled && !isLoading && variant === "primary") {
      gsap.to(buttonRef.current, { scale: 1.02, duration: 0.2, ease: "power1.out" });
    }
  };

  const handleMouseLeave = () => {
    if (!props.disabled && !isLoading && variant === "primary") {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.2, ease: "power1.out" });
    }
  };

  // Using font-condensed for a stronger, more actionable feel
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold font-condensed tracking-wide uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-yellow-400 border border-transparent",
    secondary: "bg-neutral-100 text-black hover:bg-neutral-200 focus:ring-neutral-200 border border-transparent",
    outline: "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white focus:ring-black",
    ghost: "bg-transparent text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-200",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} px-6 py-3 text-sm md:text-base ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;