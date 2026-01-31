"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Button from "@/components/shared/Button";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    console.log("Login Payload:", formData);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-105 bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative"
      >
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-yellow-400" />

        <div className="p-10">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black tracking-tighter text-black mb-2">Welcome Back</h1>
            <p className="text-neutral-400 font-medium text-sm">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold font-condensed uppercase tracking-widest text-neutral-500 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-3.5 text-neutral-400 group-focus-within:text-black transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-50 border-b-2 border-transparent focus:border-black focus:bg-white text-black font-semibold placeholder:text-neutral-300 py-3 pl-12 pr-4 outline-none transition-all rounded-t-lg"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold font-condensed uppercase tracking-widest text-neutral-500">
                  Password
                </label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-[10px] font-bold font-condensed uppercase tracking-widest text-yellow-600 hover:text-black transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-3.5 text-neutral-400 group-focus-within:text-black transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-neutral-50 border-b-2 border-transparent focus:border-black focus:bg-white text-black font-semibold placeholder:text-neutral-300 py-3 pl-12 pr-12 outline-none transition-all rounded-t-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-neutral-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                variant="primary" 
                fullWidth 
                type="submit" 
                disabled={isLoading}
                className="shadow-lg shadow-yellow-400/20"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" /> Signing In...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight size={18} />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 p-6 text-center border-t border-neutral-100">
          <p className="text-xs font-medium text-neutral-500">
            Don't have an account?{" "}
            <Link 
              href="/auth/register" 
              className="text-black font-bold hover:underline decoration-yellow-400 decoration-2 underline-offset-2"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}