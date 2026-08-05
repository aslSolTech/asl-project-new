"use client";

import { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, PanelLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileMenu } from "@/components/admin/profiles/ProfileMenu";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Dashboard", href: "/dashboard" }];
  const labelMap: Record<string, string> = {
    overview: "Overview",
    daily: "Daily Summary",
    weekly: "Weekly Report",
    monthly: "Monthly Analytics",
    analytics: "Analytics",
    revenue: "Revenue Trends",
    growth: "User Growth",
    churn: "Churn Analysis",
    transactions: "Transactions",
    domestic: "Domestic",
    bank: "Bank Transfers",
    upi: "UPI Payments",
    card: "Card Payments",
    international: "International",
    swift: "SWIFT Transfers",
    wire: "Wire Transfers",
    forex: "Currency Exchange",
    payments: "Payments",
    invoices: "Invoices",
    create: "Create Invoice",
    recurring: "Recurring Bills",
    links: "Payment Links",
    subscriptions: "Subscriptions",
    active: "Active Plans",
    history: "Billing History",
    upgrade: "Upgrade Plan",
    wallets: "Wallets",
    crypto: "Crypto",
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
    stable: "Stablecoins",
    fiat: "Fiat",
    usd: "USD Wallet",
    eur: "EUR Wallet",
    gbp: "GBP Wallet",
    settings: "Settings",
    account: "Account",
    profile: "Profile Info",
    kyc: "KYC Verification",
    notifications: "Notifications",
    security: "Security",
    "2fa": "Two-Factor Auth",
    "api-keys": "API Keys",
  };

  let currentPath = "";
  segments.slice(1).forEach((seg) => {
    currentPath += `/${seg}`;
    crumbs.push({
      label: labelMap[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
      href: `/dashboard${currentPath}`,
    });
  });

  return crumbs;
}

export const DashboardHeader = memo(function DashboardHeader() {
  const pathname = usePathname();
  const breadcrumbs = useMemo(() => generateBreadcrumbs(pathname), [pathname]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-slate-900/80 border-b border-white/40 dark:border-slate-800 shadow-sm h-16 flex items-center justify-between px-4 md:px-6 transition-colors">
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
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-slate-100 dark:from-blue-950/60 dark:to-slate-900 text-blue-700 dark:text-blue-300 font-medium border border-blue-200/60 dark:border-blue-800/50 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
  
      <div className="flex items-center gap-4">
        <ProfileMenu />
        <AnimatedThemeToggler variant="hexagon" duration={300} fromCenter className="z-10 cursor-pointer text-slate-700 dark:text-slate-200"/>
      </div>
    </header>
  );
});