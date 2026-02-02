"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastType } from "@/components/shared/Toast";

export type DashboardState = "REQUEST" | "ESTIMATE" | "SEARCHING" | "ACTIVE" | "PROFILE";

export function useDashboard() {
  const [viewState, setViewState] = useState<DashboardState>("REQUEST");
  const [toastState, setToastState] = useState<{ 
    visible: boolean; 
    message: string; 
    type: ToastType 
  }>({
    visible: false, 
    message: "", 
    type: "info"
  });
  
  const router = useRouter();

  const showToast = (message: string, type: ToastType) => 
    setToastState({ visible: true, message, type });

  const closeToast = () => 
    setToastState(prev => ({...prev, visible: false}));

  // --- Actions ---

  const handleRequestRide = () => setViewState("ESTIMATE");
  
  const handleConfirmFare = () => {
    setViewState("SEARCHING");
    // Simulate finding a driver delay
    setTimeout(() => {
        showToast("Driver found! Michael is on the way.", "success");
        setViewState("ACTIVE");
    }, 3000);
  };
  
  const handleBack = () => {
      // If cancelling an active ride
      if (viewState === "ACTIVE") {
          showToast("Ride cancelled.", "info");
      }
      setViewState("REQUEST");
  };
  
  const toggleProfile = () => 
    setViewState(viewState === "PROFILE" ? "REQUEST" : "PROFILE");
  
  const handleLogout = async () => {
    // Simulate API logout
    await new Promise(resolve => setTimeout(resolve, 500));
    showToast("Logged out successfully", "info");
    setViewState("REQUEST");
    // Redirect to home/login
    router.refresh();
    router.push("/");
  };

  return {
    viewState,
    toastState,
    showToast,
    closeToast,
    handleRequestRide,
    handleConfirmFare,
    handleBack,
    toggleProfile,
    handleLogout
  };
}