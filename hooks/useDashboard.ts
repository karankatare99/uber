"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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

  const handleRequestRide = () => setViewState("ESTIMATE");
  
  const handleConfirmFare = () => {
    setViewState("SEARCHING");
    setTimeout(() => setViewState("ACTIVE"), 2500);
  };
  
  const handleBack = () => setViewState("REQUEST");
  
  const toggleProfile = () => 
    setViewState(viewState === "PROFILE" ? "REQUEST" : "PROFILE");
  
  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    showToast("Logged out successfully", "info");
    setViewState("REQUEST");
    router.refresh();
    router.push("/");
  };

  const closeToast = () => 
    setToastState(prev => ({...prev, visible: false}));

  return {
    viewState,
    toastState,
    showToast,
    handleRequestRide,
    handleConfirmFare,
    handleBack,
    toggleProfile,
    handleLogout,
    closeToast
  };
}
