import type { Metadata } from "next";
import { DashboardHeader } from "@/modules/merchant/components/header/Header";
import { DashboardSidebar } from "@/modules/merchant/components/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { RoutePermissionGuard } from "@/components/shared/route-permission-guard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "ASL Wallets Dashboard",
  icons: {
    icon: "/logo/asl_logo.png",
    shortcut: "/logo/asl_logo.png",
    apple: "/logo/asl_logo.png",
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <RoutePermissionGuard>
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex flex-col flex-1 min-h-screen w-full min-w-0">
        <DashboardHeader />
        <main className="flex-1 px-4 pt-4 pb-8 space-y-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
    // </RoutePermissionGuard>
  );
};

export default DashboardLayout;
