"use client";

import { LoadingScreen } from "@/components/shared/loading/LoadingScreen";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";

export default function DashboardRootRedirect() {
  const router = useRouter();
  const role = useMerchantProfileStore((s) => s.profile?.role);
  const isInitialized = useMerchantProfileStore((s) => s?.profile?.email !== null || s?.profile?.email !== undefined || s?.profile?.role !== null || s?.profile?.role !== undefined);

  useEffect(() => {
    if (isInitialized && role) {
      const roleSlug = (role || "").toLowerCase().replace(/\s+/g, "-");
      router.replace(`/${roleSlug}/dashboard`);
    }
  }, [role, router, isInitialized]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-3 text-muted-foreground">
      <LoadingScreen />
    </div>
  );
}
