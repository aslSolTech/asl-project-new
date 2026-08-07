import { CompanySetupForm } from "@/components/admin/master/company/setup";

// Server Component (No "use client" needed here)
export default async function CompanySetupPage() {
  // Option: Fetch initial data on the server if needed
  // const initialCompanyData = await fetchCompanySetup();

  return (
    <div className="flex justify-center items-start min-h-[calc(10vh-2rem)] bg-background">
      <CompanySetupForm />
    </div>
  );
}