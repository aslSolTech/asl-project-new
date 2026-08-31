"use client";

import { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, PanelLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileMenu } from "../profiles/ProfileMenu";
import { HeaderWalletWidget } from "./HeaderWalletWidget";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BREADCRUMB_LABEL_MAP } from "../../constants";

function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [{ label: "Dashboard", href: "/admin/dashboard" }];

  let role = "admin";
  let pathSegments = segments;

  if (segments.length > 1 && segments[1] === "dashboard") {
    role = segments[0];
    pathSegments = segments.slice(1); // ['dashboard', 'services', 'dmt']
  } else if (segments[0] === "dashboard") {
    pathSegments = segments;
  }

  const baseDashboardHref = `/${role}/dashboard`;
  const crumbs = [{ label: "Dashboard", href: baseDashboardHref }];

  let currentPath = "";
  pathSegments.slice(1).forEach((seg) => {
    currentPath += `/${seg}`;
    const fallbackLabel = seg
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    crumbs.push({
      label: BREADCRUMB_LABEL_MAP[seg] || fallbackLabel,
      href: `${baseDashboardHref}${currentPath}`,
    });
  });

  return crumbs;
}

export const DashboardHeader = memo(function DashboardHeader() {
  const pathname = usePathname();
  const breadcrumbs = useMemo(() => generateBreadcrumbs(pathname), [pathname]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-slate-900/80 shadow-sm h-16 flex items-center justify-between px-4 md:px-6 transition-colors">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden text-slate-700 dark:text-slate-200">
          <PanelLeft className="w-5 h-5" />
        </SidebarTrigger>

        {/* Glossy Breadcrumb */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <div key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />}
                {isLast ? (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 text-primary dark:text-primary font-medium border border-primary/20 dark:border-primary/30 shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
  
      <div className="flex items-center gap-3">
        <HeaderWalletWidget />
        <ProfileMenu />
        <AnimatedThemeToggler variant="hexagon" duration={300} fromCenter className="z-10 cursor-pointer text-slate-700 dark:text-slate-200"/>
      </div>
    </header>
  );
});