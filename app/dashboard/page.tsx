import { UserProp } from "@/lib/getUser";
import Dashboard from "@/pages/passenger/dashboard";
import React from "react";


// Mock Server-Side Data Fetching
async function getUser(): Promise<UserProp> {
  // Simulate DB latency
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    email: "rider@uberclone.com",
    userType: "rider",
    firstName: "Alex",
    lastName: "Morgan",
  };
}

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <main className="min-h-screen bg-neutral-900">
      <Dashboard user={user} />
    </main>
  );
}