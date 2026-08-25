"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavbarLogo } from "@/components/ui/resizable-navbar";
import { useState, useMemo, memo } from "react";
import { menuItems } from "../../constants";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";
import { usePermissionStore } from "@/stores/usePermissionStore";

export const DashboardSidebar = memo(function DashboardSidebar() {
  const pathname = usePathname();
  const profileRole = useMerchantProfileStore((s) => s?.profile?.role);
  const isRouteAllowed = usePermissionStore((s) => s.isRouteAllowed);

  // Extract role slug from current URL path (e.g. /admin/dashboard => 'admin') or fallback to profile
  const roleSlug = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[1] === "dashboard") {
      return segments[0];
    }
    return (profileRole).toLowerCase().replace(/\s+/g, "-");
  }, [pathname, profileRole]);

  // Helper to dynamically adjust links from /dashboard/... to /:role/dashboard/...
  const getRoleHref = (href?: string) => {
    if (!href) return "";
    if (href.startsWith("/dashboard")) {
      return `/${roleSlug}${href}`;
    }
    if (href.startsWith("/")) {
      return `/${roleSlug}/dashboard${href}`;
    }
    return href;
  };

  // Dynamically filter menu items for Merchant roles (Retailer, Distributor)
  const displayMenuItems = useMemo(() => {
    const canonicalRole = (profileRole || "").toLowerCase().replace(/[\s_-]+/g, "");
    // SuperDistributor gets full unrestricted menu
    if (canonicalRole.includes("superdistributor")) {
      return menuItems;
    }

    return menuItems
      .map((item) => {
        // If single link with no sub-items
        if (!item.items || item.items.length === 0) {
          if (item.href && isRouteAllowed(item.href, profileRole)) {
            return item;
          }
          return null;
        }

        // Filter sub items
        const filteredSubs = item.items
          .map((sub) => {
            if (!sub.items || sub.items.length === 0) {
              if (sub.href && isRouteAllowed(sub.href, profileRole)) {
                return sub;
              }
              return null;
            }

            // Filter subSub items
            const filteredSubSubs = sub.items.filter(
              (subSub) => !subSub.href || isRouteAllowed(subSub.href, profileRole)
            );

            if (filteredSubSubs.length > 0) {
              return { ...sub, items: filteredSubSubs };
            }
            return null;
          })
          .filter(Boolean) as typeof item.items;

        if (filteredSubs.length > 0) {
          return { ...item, items: filteredSubs };
        }
        return null;
      })
      .filter(Boolean) as typeof menuItems;
  }, [profileRole, isRouteAllowed]);

  // Track open main menu item for accordion behavior (opening 2nd closes 1st)
  const initialMainOpen = displayMenuItems.find(item => pathname.includes(item.title.toLowerCase()))?.title || "Dashboard";
  const [openMenu, setOpenMenu] = useState<string | null>(initialMainOpen);

  // Track open sub menu items (sub-accordion)
  const initialSubOpen = displayMenuItems
    .flatMap(m => m.items || [])
    .find(sub => sub.items?.some(subSub => getRoleHref(subSub.href) === pathname || subSub.href === pathname))?.title || null;
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(initialSubOpen);

  return (
    <Sidebar className="border-r-0 bg-white/60 dark:bg-slate-700/80 backdrop-blur-xl transition-colors">
      <SidebarHeader className="h-16 flex items-center px-6 border-b-0">
        <NavbarLogo imgSrc='/logo/asl_logo.png' altName='Logo' />
      </SidebarHeader>

      <SidebarContent className="px-0 py-4 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {displayMenuItems.map((item) => {
                const isOpen = openMenu === item.title;
                const hasSubItems = Boolean(item.items && item.items.length > 0);

                if (!hasSubItems && item.href) {
                  const dynamicHref = getRoleHref(item.href);
                  const isActive = pathname === dynamicHref || pathname === item.href;
                  return (
                    <div key={item.title} className="group/menu-item relative">
                      <Link
                        href={dynamicHref}
                        className={cn(
                          "w-full flex items-center justify-between hover:bg-primary/10 dark:hover:bg-primary/15 hover:shadow-xs transition-all duration-200 py-3 px-3 rounded-sm cursor-pointer",
                          isActive ? "bg-primary/15 dark:bg-primary/20 text-primary font-semibold" : ""
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-primary" />
                          <span className={cn(
                            "font-semibold text-sm transition-colors",
                            isActive ? "text-primary" : "text-slate-800 dark:text-slate-200 group-hover:text-primary"
                          )}>
                            {item.title}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                }

                return (
                  <Collapsible
                    key={item.title}
                    open={isOpen}
                    onOpenChange={(open) => {
                      setOpenMenu(open ? item.title : null);
                    }}
                  >
                    <div className="group/menu-item relative">
                      <CollapsibleTrigger className="w-full flex items-center justify-between hover:bg-primary/10 dark:hover:bg-primary/15 hover:shadow-xs transition-all duration-200 group h-auto py-3 px-3 rounded-sm cursor-pointer">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-primary" />
                          <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">{item.title}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        {/* Tiranga Accent Curved Tree Container */}
                        <div className="relative ml-4 pl-2 space-y-1 my-1">
                          {item.items?.map((sub) => {
                            const isSubOpen = openSubMenu === sub.title;
                            const hasSubSubItems = Boolean(sub.items && sub.items.length > 0);

                            if (!hasSubSubItems && sub.href) {
                              const dynamicSubHref = getRoleHref(sub.href);
                              const isActive = pathname === dynamicSubHref || pathname === sub.href;
                              return (
                                <div key={sub.title} className="group/menu-sub-item relative pl-4">
                                  <div className="absolute left-0 top-0 bottom-1/2 w-3 border-l-2 border-b-2 rounded-bl-lg border-primary/30 dark:border-primary/40 pointer-events-none" />
                                  <SidebarMenuSubButton
                                    render={<Link href={dynamicSubHref} />}
                                    isActive={isActive}
                                    className={cn(
                                      "w-full text-[11px] leading-tight py-1 px-2.5 rounded-sm font-medium transition-all duration-200 flex items-center gap-1.5 mb-2",
                                      isActive
                                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-primary/15 hover:text-primary dark:hover:text-primary"
                                    )}>
                                    <span
                                      className={cn(
                                        "w-1 h-1 rounded-full transition-all shrink-0",
                                        isActive
                                          ? "bg-white shadow-xs"
                                          : "bg-emerald-500/70 dark:bg-emerald-400/70"
                                      )}
                                    />
                                    <span className="text-xs">{sub.title}</span>
                                  </SidebarMenuSubButton>
                                </div>
                              );
                            }

                            return (
                              <Collapsible
                                key={sub.title}
                                open={isSubOpen}
                                onOpenChange={(open) => {
                                  setOpenSubMenu(open ? sub.title : null);
                                }}
                              >
                                <div className="group/menu-sub-item relative pl-4">
                                  {/* Curved L-connector line pointing to sub-menu */}
                                  <div className="absolute left-0 top-0 bottom-1/2 w-3 border-l-2 border-b-2 rounded-bl-lg border-blue-400/40 dark:border-blue-500/40 pointer-events-none" />

                                  {/* Sub menu trigger */}
                                  <CollapsibleTrigger className="w-full flex items-center justify-between hover:bg-blue-50/80 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-all text-xs font-semibold py-2 px-3 rounded-lg cursor-pointer">
                                    <span className="text-xs">{sub.title}</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                  </CollapsibleTrigger>

                                  <CollapsibleContent>
                                    <div className="relative ml-2 pl-4 space-y-1 tracking-wide my-1">
                                      {sub.items?.map((subSub) => {
                                        const dynamicSubSubHref = getRoleHref(subSub.href);
                                        const isActive = pathname === dynamicSubSubHref || pathname === subSub.href;
                                        return (
                                          <div key={subSub.href} className="relative">
                                            {/* Curved L-connector line pointing to sub-sub-menu */}
                                            <div className="absolute -left-4 top-0 bottom-1/2 w-3.5 border-l-2 border-b-2 rounded-bl-md border-blue-400/35 dark:border-blue-500/35 pointer-events-none" />
                                            <SidebarMenuSubButton
                                               render={<Link href={dynamicSubSubHref} />}
                                               isActive={isActive}
                                               className={cn(
                                                 "w-full text-[11px] leading-tight py-1 px-2.5 rounded-md font-medium transition-all duration-200 flex items-center gap-1.5 mb-2",
                                                 isActive
                                                  ? "bg-blue-600 dark:bg-blue-600 text-white dark:text-white shadow-md shadow-blue-500/25 font-medium "
                                                    : "text-slate-600 dark:text-slate-400 hover:bg-blue-50/80 dark:hover:bg-slate-800/60 hover:text-blue-600 dark:hover:text-blue-300"
                                               )}
                                             >
                                               <span
                                                 className={cn(
                                                   "w-1 h-1 rounded-full transition-all shrink-0",
                                                   isActive
                                                     ? "bg-white shadow-xs"
                                                     : "bg-blue-400/50 dark:bg-blue-500/50"
                                                 )}
                                               />
                                               <span className="text-xs">{subSub.title}</span>
                                             </SidebarMenuSubButton>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </CollapsibleContent>
                                </div>
                              </Collapsible>
                            );
                          })}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* <SidebarFooter className="p-3 border-t-0">
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 rounded-xl p-3 text-white shadow-lg shadow-blue-950/40 relative overflow-hidden group border border-blue-500/20">
          <div className="absolute -right-4 -bottom-4 w-14 h-14 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all" />
          <p className="text-[10px] font-medium opacity-80 mb-0.5 tracking-wide">Available Balance</p>
          <p className="text-xl font-bold tracking-tight text-white">₹24,562.80</p>
          <div className="flex items-center gap-1 mt-1 text-[10px]">
            <span className="font-semibold text-blue-400">+12.5%</span>
            <span className="opacity-70">this month</span>
          </div>
        </div>
      </SidebarFooter> */}
    </Sidebar>
  );
});