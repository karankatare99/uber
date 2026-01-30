import React from "react";
import { Metadata } from "next";
import Dashboard from "@/pages/passenger/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Uber Clone",
  description: "Request a ride, track your driver, and manage your profile.",
};

export default function DashboardPage() {
  return <Dashboard />;
}