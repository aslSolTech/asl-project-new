"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAdminProfileStore } from "@/stores/useAdminProfileStore";
import { usePermissionStore } from "@/stores/usePermissionStore";
import { ShieldAlert, ArrowLeft, Lock, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function RoutePermissionGuard({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const role = useAdminProfileStore((s) => s.profile.role) || "Admin";
  const isRouteAllowed = usePermissionStore((s) => s.isRouteAllowed);

  // Check if current path is allowed
  const allowed = isRouteAllowed(pathname, role);

  if (!allowed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] p-6 text-center animate-in fade-in-50 duration-300">
        <div className="max-w-md w-full p-8 rounded-3xl bg-card border border-border shadow-xl space-y-6 flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/20 shadow-inner">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-background border border-border text-muted-foreground shadow-xs">
              <Lock className="w-4 h-4 text-destructive" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="destructive" className="text-xs uppercase font-bold tracking-wider">
                Access Denied
              </Badge>
              <Badge variant="outline" className="text-xs">
                Role: {role}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              Route Access Restricted
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Your employee account does not have permission to view or manage this route. Please contact your Super Administrator to request authorization.
            </p>
          </div>

          {/* Route path detail */}
          <div className="w-full p-2.5 rounded-xl bg-muted/50 border border-border/60 text-xs font-mono text-muted-foreground truncate">
            Path: <span className="font-semibold text-foreground">{pathname}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            <Button
              onClick={() => router.push("/dashboard/overview/daily")}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Home className="w-4 h-4" />
              Dashboard Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default RoutePermissionGuard;

