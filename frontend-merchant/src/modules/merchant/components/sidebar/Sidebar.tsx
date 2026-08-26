"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
    return (profileRole || "distributor").toLowerCase().replace(/\s+/g, "-");
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

  // Track open main menu item for accordion behavior
  const initialMainOpen = displayMenuItems.find(item => pathname.includes(item.title.toLowerCase()))?.title || "Dashboard";
  const [openMenu, setOpenMenu] = useState<string | null>(initialMainOpen);

  // Track open sub menu items
  const initialSubOpen = displayMenuItems
    .flatMap(m => m.items || [])
    .find(sub => sub.items?.some(subSub => getRoleHref(subSub.href) === pathname || subSub.href === pathname))?.title || null;
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(initialSubOpen);

  return (
    <Sidebar className="border-r border-border bg-card dark:bg-slate-900 transition-colors shadow-xs">
      {/* Sidebar Header with Clean Logo */}
      <SidebarHeader className="h-16 flex items-center px-5">
        <Link href={`/${roleSlug}/dashboard`} className="flex items-center gap-2">
          <Image
            src="/logo/asl_logo.png"
            alt="ASL Wallets"
            width={150}
            height={50}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>
      </SidebarHeader>

      {/* Main Navigation Menu */}
      <SidebarContent className="px-3 py-3 overflow-y-auto">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {displayMenuItems.map((item) => {
                const isOpen = openMenu === item.title;
                const hasSubItems = Boolean(item.items && item.items.length > 0);

                if (!hasSubItems && item.href) {
                  const dynamicHref = getRoleHref(item.href);
                  const isActive = pathname === dynamicHref || pathname === item.href;
                  return (
                    <div key={item.title} className="relative">
                      <Link
                        href={dynamicHref}
                        className={cn(
                          "w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer",
                          isActive
                            ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary font-semibold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={cn(
                            "w-4 h-4 shrink-0 transition-colors",
                            isActive ? "text-primary" : "text-slate-500 dark:text-slate-400"
                          )} />
                          <span className="truncate">{item.title}</span>
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
                    <div className="relative">
                      <CollapsibleTrigger
                        className={cn(
                          "w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors h-auto cursor-pointer",
                          isOpen
                            ? "bg-slate-100/80 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 font-semibold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={cn(
                            "w-4 h-4 shrink-0 transition-colors",
                            isOpen ? "text-primary" : "text-slate-500 dark:text-slate-400"
                          )} />
                          <span className="truncate">{item.title}</span>
                        </div>
                        <ChevronDown className={cn(
                          "w-3.5 h-3.5 text-slate-400 dark:text-slate-500 transition-transform duration-200",
                          isOpen && "rotate-180 text-slate-700 dark:text-slate-300"
                        )} />
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        {/* Clean Sub-navigation Tree */}
                        <div className="relative ml-4 pl-3 space-y-1 my-1 border-l border-slate-200 dark:border-slate-800">
                          {item.items?.map((sub) => {
                            const isSubOpen = openSubMenu === sub.title;
                            const hasSubSubItems = Boolean(sub.items && sub.items.length > 0);

                            if (!hasSubSubItems && sub.href) {
                              const dynamicSubHref = getRoleHref(sub.href);
                              const isActive = pathname === dynamicSubHref || pathname === sub.href;
                              return (
                                <div key={sub.title} className="relative">
                                  <SidebarMenuSubButton
                                    render={<Link href={dynamicSubHref} />}
                                    isActive={isActive}
                                    className={cn(
                                      "w-full text-xs py-1.5 px-2.5 rounded-md font-medium transition-colors flex items-center gap-2",
                                      isActive
                                        ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary font-semibold"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "w-1.5 h-1.5 rounded-full transition-colors shrink-0",
                                        isActive
                                          ? "bg-primary"
                                          : "bg-slate-300 dark:bg-slate-600"
                                      )}
                                    />
                                    <span className="truncate">{sub.title}</span>
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
                                <div className="relative">
                                  {/* Submenu Trigger */}
                                  <CollapsibleTrigger className="w-full flex items-center justify-between text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-xs font-medium py-1.5 px-2.5 rounded-md cursor-pointer">
                                    <div className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                      <span className="truncate">{sub.title}</span>
                                    </div>
                                    <ChevronDown className={cn(
                                      "w-3 h-3 text-slate-400 transition-transform duration-200",
                                      isSubOpen && "rotate-180"
                                    )} />
                                  </CollapsibleTrigger>

                                  <CollapsibleContent>
                                    <div className="relative ml-2 pl-3 space-y-1 my-1 border-l border-slate-200 dark:border-slate-800">
                                      {sub.items?.map((subSub) => {
                                        const dynamicSubSubHref = getRoleHref(subSub.href);
                                        const isActive = pathname === dynamicSubSubHref || pathname === subSub.href;
                                        return (
                                          <div key={subSub.href} className="relative">
                                            <SidebarMenuSubButton
                                              render={<Link href={dynamicSubSubHref} />}
                                              isActive={isActive}
                                              className={cn(
                                                "w-full text-[11px] py-1 px-2 rounded-md font-medium transition-colors flex items-center gap-2",
                                                isActive
                                                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary font-semibold"
                                                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                                              )}
                                            >
                                              <span
                                                className={cn(
                                                  "w-1 h-1 rounded-full transition-colors shrink-0",
                                                  isActive
                                                    ? "bg-primary"
                                                    : "bg-slate-300 dark:bg-slate-600"
                                                )}
                                              />
                                              <span className="truncate">{subSub.title}</span>
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
    </Sidebar>
  );
});