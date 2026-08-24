"use client";

import { LoadingScreen } from "@/components/shared/loading/LoadingScreen";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminProfileStore } from "@/stores/useAdminProfileStore";

export default function DashboardRootRedirect() {
  const router = useRouter();
  const role = useAdminProfileStore((s) => s.profile?.role);

  useEffect(() => {
    const roleSlug = (role).toLowerCase().replace(/\s+/g, "-");
    router.replace(`/${roleSlug}/dashboard`);
  }, [role, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-3 text-muted-foreground">
     <LoadingScreen/>
    </div>
  );
}
