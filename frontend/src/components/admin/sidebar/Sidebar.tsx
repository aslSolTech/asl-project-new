"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LayoutGrid, ArrowLeftRight, CreditCard, Wallet, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavbarLogo } from "@/components/ui/resizable-navbar";
import { useState } from "react";

type SubSubItem = {
  title: string;
  href: string;
};

type SubItem = {
  title: string;
  href?: string;
  items?: SubSubItem[];
};

type MenuItem = {
  title: string;
  icon: React.ElementType;
  href?: string;
  items?: SubItem[];
};

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    items: [
      {
        title: "Overview",
        items: [
          { title: "Daily Summary", href: "/dashboard/overview/daily" },
          { title: "Weekly Report", href: "/dashboard/overview/weekly" },
          { title: "Monthly Analytics", href: "/dashboard/overview/monthly" },
        ],
      },
      {
        title: "Analytics",
        items: [
          { title: "Revenue Trends", href: "/dashboard/analytics/revenue" },
          { title: "User Growth", href: "/dashboard/analytics/growth" },
          { title: "Churn Analysis", href: "/dashboard/analytics/churn" },
        ],
      },
    ],
  },
  {
    title: "Transactions",
    icon: ArrowLeftRight,
    items: [
      {
        title: "Domestic",
        items: [
          { title: "Bank Transfers", href: "/dashboard/transactions/domestic/bank" },
          { title: "UPI Payments", href: "/dashboard/transactions/domestic/upi" },
          { title: "Card Payments", href: "/dashboard/transactions/domestic/card" },
        ],
      },
      {
        title: "International",
        items: [
          { title: "SWIFT Transfers", href: "/dashboard/transactions/international/swift" },
          { title: "Wire Transfers", href: "/dashboard/transactions/international/wire" },
          { title: "Currency Exchange", href: "/dashboard/transactions/international/forex" },
        ],
      },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    items: [
      {
        title: "Invoices",
        items: [
          { title: "Create Invoice", href: "/dashboard/payments/invoices/create" },
          { title: "Recurring Bills", href: "/dashboard/payments/invoices/recurring" },
          { title: "Payment Links", href: "/dashboard/payments/invoices/links" },
        ],
      },
      {
        title: "Subscriptions",
        items: [
          { title: "Active Plans", href: "/dashboard/payments/subscriptions/active" },
          { title: "Billing History", href: "/dashboard/payments/subscriptions/history" },
          { title: "Upgrade Plan", href: "/dashboard/payments/subscriptions/upgrade" },
        ],
      },
    ],
  },
  {
    title: "Wallets",
    icon: Wallet,
    items: [
      {
        title: "Crypto",
        items: [
          { title: "Bitcoin", href: "/dashboard/wallets/crypto/bitcoin" },
          { title: "Ethereum", href: "/dashboard/wallets/crypto/ethereum" },
          { title: "Stablecoins", href: "/dashboard/wallets/crypto/stable" },
        ],
      },
      {
        title: "Fiat",
        items: [
          { title: "USD Wallet", href: "/dashboard/wallets/fiat/usd" },
          { title: "EUR Wallet", href: "/dashboard/wallets/fiat/eur" },
          { title: "GBP Wallet", href: "/dashboard/wallets/fiat/gbp" },
        ],
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      {
        title: "Account",
        items: [
          { title: "Profile Info", href: "/dashboard/settings/account/profile" },
          { title: "KYC Verification", href: "/dashboard/settings/account/kyc" },
          { title: "Notifications", href: "/dashboard/settings/account/notifications" },
        ],
      },
      {
        title: "Security",
        items: [
          { title: "Two-Factor Auth", href: "/dashboard/settings/security/2fa" },
          { title: "API Keys", href: "/dashboard/settings/security/api-keys" },
          { title: "Login History", href: "/dashboard/settings/security/history" },
        ],
      },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  
  // Track open main menu item for accordion behavior (opening 2nd closes 1st)
  const initialMainOpen = menuItems.find(item => pathname.includes(item.title.toLowerCase()))?.title || "Dashboard";
  const [openMenu, setOpenMenu] = useState<string | null>(initialMainOpen);

  // Track open sub menu items (sub-accordion)
  const initialSubOpen = menuItems
    .flatMap(m => m.items || [])
    .find(sub => sub.items?.some(subSub => subSub.href === pathname))?.title || null;
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(initialSubOpen);

  return (
    <Sidebar className="border-r-0 bg-white/60 dark:bg-slate-900/80 backdrop-blur-xl transition-colors">
      <SidebarHeader className="h-16 flex items-center px-6 border-b-0">
        {/* <Link href="/" className="flex items-center gap-3"> */}
          <NavbarLogo imgSrc='/logo/logo.png' altName='Logo' />
        {/* </Link> */}
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isOpen = openMenu === item.title;
                return (
                  <Collapsible
                    key={item.title}
                    open={isOpen}
                    onOpenChange={(open) => {
                      setOpenMenu(open ? item.title : null);
                    }}
                  >
                    <div className="group/menu-item relative">
                      <CollapsibleTrigger className="w-full flex items-center justify-between hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-sm transition-all duration-200 group h-auto py-3 px-3 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium text-sm text-slate-800 dark:text-slate-200">{item.title}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        {/* Wire Connection tree container */}
                        <div className="relative ml-6 pl-3 border-l-2 border-dashed border-blue-400/40 dark:border-blue-500/30 my-1 space-y-1">
                          {item.items?.map((sub) => {
                            const isSubOpen = openSubMenu === sub.title;
                            return (
                              <Collapsible
                                key={sub.title}
                                open={isSubOpen}
                                onOpenChange={(open) => {
                                  setOpenSubMenu(open ? sub.title : null);
                                }}
                              >
                                <div className="group/menu-sub-item relative">
                                  {/* Horizontal wire connection line */}
                                  <div className="absolute -left-3 top-4 w-3 h-0.5 border-t-2 border-dashed border-blue-400/40 dark:border-blue-500/30" />
                                  <CollapsibleTrigger className="w-full flex items-center justify-between hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 transition-all text-sm h-auto py-2 px-2.5 rounded-lg cursor-pointer">
                                    <span className="font-medium text-xs text-slate-700 dark:text-slate-300">{sub.title}</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                  </CollapsibleTrigger>

                                  <CollapsibleContent>
                                    <div className="relative ml-4 pl-2 border-l border-orange-400/40 dark:border-orange-500/30 space-y-0.5 my-1">
                                      {sub.items?.map((subSub) => (
                                        <div key={subSub.href} className="relative">
                                          <div className="absolute -left-2 top-3 w-2 h-0.5 border-t border-orange-400/40 dark:border-orange-500/30" />
                                          <SidebarMenuSubButton
                                            render={<Link href={subSub.href} />}
                                            isActive={pathname === subSub.href}
                                            className={cn(
                                              "text-xs h-auto py-1.5 px-2 transition-all rounded-md",
                                              pathname === subSub.href
                                                ? "bg-blue-600 text-white font-medium shadow-sm"
                                                : "text-slate-500 dark:text-slate-400 hover:bg-blue-50/70 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-300"
                                            )}
                                          >
                                            {subSub.title}
                                          </SidebarMenuSubButton>
                                        </div>
                                      ))}
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

      <SidebarFooter className="p-4 border-t-0">
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 rounded-xl p-4 text-white shadow-lg shadow-blue-900/20 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-orange-500/20 rounded-full blur-xl group-hover:bg-orange-500/30 transition-all" />
          <p className="text-xs font-medium opacity-80 mb-1">Available Balance</p>
          <p className="text-2xl font-bold">₹24,562.80</p>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <span className="font-semibold text-amber-400">+12.5%</span>
            <span className="opacity-70">this month</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}