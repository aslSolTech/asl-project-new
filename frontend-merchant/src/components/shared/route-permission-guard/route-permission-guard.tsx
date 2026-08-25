"use client";

import { usePathname } from "next/navigation";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";
import { usePermissionStore } from "@/stores/usePermissionStore"; 
import { ErrorCard } from "@/components/shared/errors/ErrorCard";
import { MERCHANT_ROLES } from "@/modules/auth/constants";

export function RoutePermissionGuard({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const role = useMerchantProfileStore((s) => s?.profile?.role);
  const isRouteAllowed = usePermissionStore((s) => s.isRouteAllowed);

  const segments = pathname.split("/").filter(Boolean);
  const urlRole = segments.length > 1 && segments[1] === "dashboard" ? segments[0].toLowerCase() : null;

  // 1. Strict Role Slug Validation: If URL has invalid role like '/dddd/dashboard'
  const isInvalidUrlRole = urlRole !== null && !MERCHANT_ROLES.some((r) => r.value === urlRole);

  // Check if current path is allowed
  const allowed = !isInvalidUrlRole && isRouteAllowed(pathname, role);

  if (!allowed) {
    if (isInvalidUrlRole) {
      return (
        <ErrorCard
          statusCode={404}
          imageSrc="/images/errors/404.png"
          title="Invalid Role or Workspace"
          description={`The role '${urlRole}' in the URL is not a valid user.`}
          showHomeBtn={true}
          showBackBtn={true}
        />
      );
    }

    return (
      <ErrorCard
        statusCode={403}
        imageSrc="/images/errors/403.png"
        title="Route Access Restricted"
        description="Your account does not have permission to view or manage this route. Please contact your Super Administrator to request authorization."
        showHomeBtn={true}
        showBackBtn={true}
      />
    );
  }

  return <>{children}</>;
}


export default RoutePermissionGuard;

