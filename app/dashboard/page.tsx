import { Metadata } from "next";
import Dashboard from "@/pages/passenger/dashboard";
import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Uber Clone",
  description: "Request a ride, track your driver, and manage your profile.",
};

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  return <Dashboard user={user} />;
}