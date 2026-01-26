"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../shared/Button";
import { ArrowRight } from "lucide-react";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"rider" | "driver">("rider");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-neutral-100"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-black font-sans tracking-tight text-black mb-2">Create account</h2>
        <p className="text-neutral-500 font-medium font-sans">Join us and start moving today.</p>
      </div>

      {/* Role Toggle Switch */}
      <div className="flex bg-neutral-100 p-1 rounded-xl mb-6">
        {(["rider", "driver"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold font-condensed uppercase tracking-wide transition-all duration-300 ${
              role === r ? "bg-black text-white shadow-md" : "text-neutral-500 hover:text-black"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
             <label className="text-xs font-bold font-condensed uppercase text-black ml-1">First Name</label>
             <input type="text" className="w-full bg-neutral-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all font-sans font-medium text-black" />
          </div>
          <div className="space-y-1">
             <label className="text-xs font-bold font-condensed uppercase text-black ml-1">Last Name</label>
             <input type="text" className="w-full bg-neutral-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all font-sans font-medium text-black" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold font-condensed uppercase text-black ml-1">Email Address</label>
          <input type="email" className="w-full bg-neutral-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all font-sans font-medium text-black" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold font-condensed uppercase text-black ml-1">Password</label>
          <input type="password" className="w-full bg-neutral-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all font-sans font-medium text-black" />
        </div>

        <div className="pt-2">
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              isLoading={loading}
            >
              Get Started <ArrowRight size={18} className="ml-2" />
            </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-xs text-neutral-400 leading-relaxed font-medium font-sans">
        By signing up as a {role}, you agree to our <Link href="#" className="underline hover:text-black font-bold">Terms</Link> and <Link href="#" className="underline hover:text-black font-bold">Privacy Policy</Link>.
      </p>

      <div className="mt-4 text-center text-sm text-neutral-500 font-medium font-sans">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-black font-bold hover:underline">
          Log in
        </Link>
      </div>
    </motion.div>
  );
};

export default RegisterForm;