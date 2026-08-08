import type { Metadata } from "next";
import { DashboardHeader } from "@/components/admin/header/Header";
import { DashboardSidebar } from "@/components/admin/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Payzones Admin Dashboard",
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden w-full">
        <div className="w-full flex-none md:w-64">
          <DashboardSidebar />
        </div>
        <div className="flex flex-col flex-1">
          <DashboardHeader />
          <div className="grow p-6 md:overflow-y-auto">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;