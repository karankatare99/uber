"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion"; // 1. Import Variants
import Button from "../shared/Button";
import { ArrowRight, Mail, Lock } from "lucide-react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  // 2. Explicitly type the variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    },
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-md bg-white rounded-4xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] border-4 border-white/20 relative overflow-hidden font-sans"
    >
      {/* Decorative Brand Accent Bar */}

      <div className="px-8 py-10 md:px-10 md:py-12">
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-4xl font-black font-sans tracking-tight text-black mb-3">Welcome back</h2>
          <p className="text-neutral-500 font-medium font-sans text-lg">Enter your details to sign in.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold font-condensed uppercase tracking-wider text-black ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-4 h-5 w-5 text-neutral-400 group-focus-within:text-yellow-600 transition-colors duration-300" />
              <input 
                type="email" 
                required
                placeholder="name@example.com"
                className="w-full bg-neutral-50 pl-12 pr-4 py-4 rounded-xl outline-none border-2 border-transparent focus:border-black focus:bg-white transition-all duration-300 placeholder:text-neutral-400 text-black font-sans font-medium"
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold font-condensed uppercase tracking-wider text-black">Password</label>
              <Link href="#" className="text-xs font-bold font-condensed uppercase tracking-wide text-neutral-400 hover:text-black hover:underline transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-4 h-5 w-5 text-neutral-400 group-focus-within:text-yellow-600 transition-colors duration-300" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-neutral-50 pl-12 pr-4 py-4 rounded-xl outline-none border-2 border-transparent focus:border-black focus:bg-white transition-all duration-300 placeholder:text-neutral-400 text-black font-sans font-medium"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2">
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              isLoading={loading}
              className="mt-4 shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-shadow"
            >
              Sign In <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="mt-10 text-center text-sm text-neutral-500 font-sans font-medium">
          Don't have an account?{" "}
          <span className="text-black font-black hover:underline decoration-yellow-400 decoration-2 underline-offset-4">
            Sign up for free
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginForm;