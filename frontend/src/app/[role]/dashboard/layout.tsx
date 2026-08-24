import type { Metadata } from "next";
import { DashboardHeader } from "@/modules/admin/components/header/Header";
import { DashboardSidebar } from "@/modules/admin/components/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RoutePermissionGuard } from "@/components/shared/route-permission-guard";

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
    <RoutePermissionGuard>
      <SidebarProvider>
        <DashboardSidebar />
        <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
          <DashboardHeader />
          <div className="grow px-8 pt-5 md:overflow-y-auto">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </RoutePermissionGuard>
  );
};

export default DashboardLayout;
