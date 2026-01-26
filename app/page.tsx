"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// Shared Components
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Button from "@/components/shared/Button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Toast, { ToastType } from "@/components/shared/Toast";

// Auth Components
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function Home() {
  // State for Page Preloader
  const [isPageLoading, setIsPageLoading] = useState(true);

  // State for Hero Section (Toggle between Login and Register)
  const [authView, setAuthView] = useState<"login" | "register">("register");

  // State for Toast Notification
  const [toastState, setToastState] = useState<{
    visible: boolean;
    message: string;
    type: ToastType;
  }>({
    visible: false,
    message: "",
    type: "info",
  });

  // Simulate initial asset loading
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Handler to show toast
  const showToast = (message: string, type: ToastType = "info") => {
    setToastState({ visible: true, message, type });
  };

  const handleToastClose = () => {
    setToastState((prev) => ({ ...prev, visible: false }));
  };

  // --- Animation Variants ---
  // Typed as 'Variants' to prevent TypeScript errors
  const switchVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 5 : -5,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotateY: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? 5 : -5,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  // If loading, show the Spinner centered on a black screen
  if (isPageLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <LoadingSpinner size={60} color="#FACC15" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* 1. Navigation */}
      <Header />

      <main className="grow pt-20">
        
        {/* 2. Hero Section (Split Screen) */}
        <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-black to-black z-0" />
          
          <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-16 items-center h-full py-12">
            
            {/* Left Column: Marketing Copy */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 px-6 md:px-12"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] font-sans">
                Go anywhere.<br />
                <span className="text-yellow-400">Get anything.</span>
              </h1>
              
              <p className="text-lg text-neutral-400 max-w-lg leading-relaxed font-medium">
                The best way to get wherever you’re going. Request a ride, hop in, and go. 
                Reliable rides, transparent pricing, and professional drivers.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  variant="primary"
                  onClick={() => showToast("Driver application flow started!", "success")}
                >
                  Start Driving
                </Button>
                <Button 
                  variant="outline"
                  className="text-white! border-white! hover:bg-white! hover:text-black!"
                  onClick={() => showToast("Please log in to schedule a ride.", "info")}
                >
                  Schedule a Ride
                </Button>
              </div>

              <div className="pt-8 border-t border-neutral-800 flex gap-8">
                <div>
                  <h3 className="text-3xl font-bold text-white font-condensed">10K+</h3>
                  <p className="text-sm text-neutral-500 font-medium">Cities</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white font-condensed">5.2B</h3>
                  <p className="text-sm text-neutral-500 font-medium">Rides</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Auth Widget */}
            <div className="flex flex-col items-center lg:items-end w-full">
              {/* Toggle Switch */}
              <div className="bg-neutral-900/80 backdrop-blur-sm p-1.5 rounded-full flex gap-1 mb-8 relative z-10 border border-neutral-800 shadow-2xl">
                <button
                  onClick={() => setAuthView("register")}
                  className={`px-8 py-2.5 rounded-full text-sm font-bold font-condensed uppercase tracking-wide transition-all duration-300 ${authView === 'register' ? 'bg-yellow-400 text-black shadow-lg' : 'text-neutral-400 hover:text-white'}`}
                >
                  Register
                </button>
                <button
                  onClick={() => setAuthView("login")}
                  className={`px-8 py-2.5 rounded-full text-sm font-bold font-condensed uppercase tracking-wide transition-all duration-300 ${authView === 'login' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'}`}
                >
                  Login
                </button>
              </div>

              {/* Dynamic Form Render */}
              {/* Added min-h-[620px] to prevent layout jumping when switching forms */}
              <div className="w-full max-w-120 relative perspective-1000 min-h-155 flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={authView === 'register' ? 1 : -1}>
                  {authView === "register" ? (
                    <motion.div
                      key="register"
                      custom={1}
                      variants={switchVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full z-20"
                    >
                      <RegisterForm />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="login"
                      custom={-1}
                      variants={switchVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full z-20"
                    >
                      <LoginForm />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Visual Glow behind card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-yellow-400/10 blur-[60px] rounded-full -z-10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Value Props */}
        <section className="bg-yellow-400 text-black py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="px-6 md:px-12">
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight font-sans">
                  Drive when you want, <br/> make what you need.
                </h2>
                <p className="text-lg mb-8 font-medium font-sans">
                  Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.
                </p>
                <div className="space-y-4 mb-8">
                  {["Flexible Schedule", "Instant Pay", "24/7 Support"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                       <CheckCircle2 className="text-black" />
                       <span className="font-bold text-lg font-condensed uppercase tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" className="bg-black! text-white! hover:bg-neutral-800! shadow-xl">
                   Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              
              <div className="h-96 w-full bg-black rounded-3xl relative overflow-hidden flex items-center justify-center shadow-2xl">
                  <div className="absolute w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                  <h3 className="text-neutral-500 font-black text-3xl relative z-10 text-center px-4 font-sans uppercase tracking-tighter">
                    Dashboard
                    <br/>
                    <span className="text-sm font-bold font-condensed text-yellow-400 tracking-wide mt-2 block">
                        Preview Mode
                    </span>
                  </h3>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Global Toast Notification */}
      <Toast 
        message={toastState.message}
        type={toastState.type}
        isVisible={toastState.visible}
        onClose={handleToastClose}
      />
    </div>
  );
}