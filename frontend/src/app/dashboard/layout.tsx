import TopNav from "@/components/admin/navbar/TopNav";
import SideNav from "@/components/admin/sidebar/SideNav";

 
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex flex-col flex-1">
        <TopNav />
        <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;