"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequestParametersRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/settings/request-types?tab=request-parameter");
  }, [router]);

  return (
    <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
      Redirecting to Request Parameters tab...
    </div>
  );
}
