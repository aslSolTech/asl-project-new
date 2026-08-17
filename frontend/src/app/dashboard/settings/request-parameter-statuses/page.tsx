"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequestParameterStatusesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/settings/request-types?tab=parameter-status");
  }, [router]);

  return (
    <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
      Redirecting to Parameter Statuses tab...
    </div>
  );
}
