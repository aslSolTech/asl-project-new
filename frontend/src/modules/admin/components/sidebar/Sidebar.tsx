"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LayoutGrid, Wallet, Settings, Database, FileText, Bell, Package, Route, ShieldCheck, Plug, CircleHelp, Phone, BriefcaseBusiness, Globe } from "lucide-react";
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
import { useState, memo } from "react";

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
  title: "Account",
  icon: Wallet,
  items: [
    {
      title: "Banking",
      items: [
        { title: "Add Bank", href: "/dashboard/account/bank/add" },
      ],
    },
    {
      title: "Wallet",
      items: [
        { title: "Add Money", href: "/dashboard/account/wallet/add-money" },
        { title: "Wallet Balance", href: "/dashboard/account/wallet/balance" },
        { title: "Wallet Transactions", href: "/dashboard/account/wallet/transactions" },
      ],
    },
    {
      title: "API Wallet",
      items: [
        { title: "API Balance", href: "/dashboard/account/api/balance" },
      ],
    },
    {
      title: "Fund Management",
      items: [
        { title: "Fund Transfer", href: "/dashboard/account/fund/transfer" },
        { title: "Fund Request", href: "/dashboard/account/fund/request" },
        { title: "Fund Request History", href: "/dashboard/account/fund/request-history" },
        { title: "Deduct Wallet Balance", href: "/dashboard/account/fund/deduct" },
      ],
    },
    {
      title: "Refund",
      items: [
        { title: "Failed Transaction Refund", href: "/dashboard/account/refund/failed" },
      ],
    },
  ],
},
 {
  title: "Reports",
  icon: FileText,
  items: [
    {
      title: "Financial Reports",
      items: [
        {
          title: "Recharge",
          href: "/dashboard/reports/financial/recharge",
        },
        {
          title: "Bill Payment",
          href: "/dashboard/reports/financial/bill-payment",
        },
        {
          title: "DMT",
          href: "/dashboard/reports/financial/dmt",
        },
        {
          title: "AEPS",
          href: "/dashboard/reports/financial/aeps",
        },
        {
          title: "Payout",
          href: "/dashboard/reports/financial/payout",
        },
        {
          title: "PAN Card",
          href: "/dashboard/reports/financial/pan-card",
        },
        {
          title: "Loan",
          href: "/dashboard/reports/financial/loan",
        },
        {
          title: "Package",
          href: "/dashboard/reports/financial/package",
        },
      ],
    },
    {
      title: "Wallet Reports",
      items: [
        {
          title: "Wallet Ledger",
          href: "/dashboard/reports/wallet/ledger",
        },
        {
          title: "Transaction Ledger",
          href: "/dashboard/reports/wallet/transaction-ledger",
        },
        {
          title: "QR Wallet Ledger",
          href: "/dashboard/reports/wallet/qr-ledger",
        },
        {
          title: "User Ledger",
          href: "/dashboard/reports/wallet/user-ledger",
        },
        {
          title: "Daily Sale",
          href: "/dashboard/reports/wallet/daily-sale",
        },
        {
          title: "Daily Payout",
          href: "/dashboard/reports/wallet/daily-payout",
        },
      ],
    },
    {
      title: "Fund Reports",
      items: [
        {
          title: "Fund Transfer",
          href: "/dashboard/reports/fund/transfer",
        },
        {
          title: "Admin Fund Transfer",
          href: "/dashboard/reports/fund/admin-transfer",
        },
        {
          title: "Fund Requests",
          href: "/dashboard/reports/fund/requests",
        },
        {
          title: "Fund Request Bank List",
          href: "/dashboard/reports/fund/request-bank-list",
        },
        {
          title: "Payout User Account",
          href: "/dashboard/reports/fund/payout-user-account",
        },
      ],
    },
    {
      title: "User Reports",
      items: [
        {
          title: "All Users",
          href: "/dashboard/reports/users/all",
        },
        {
          title: "Employee Ledger",
          href: "/dashboard/reports/users/employee-ledger",
        },
        {
          title: "User Login Activity",
          href: "/dashboard/reports/users/login-activity",
        },
        {
          title: "Inactive Users",
          href: "/dashboard/reports/users/inactive",
        },
        {
          title: "Package Upgrade Requests",
          href: "/dashboard/reports/users/package-upgrade",
        },
        {
          title: "Distributor Requests",
          href: "/dashboard/reports/users/distributor-requests",
        },
        {
          title: "Device Requests",
          href: "/dashboard/reports/users/device-requests",
        },
      ],
    },
    {
      title: "Service Reports",
      items: [
        {
          title: "AEPS Dashboard",
          href: "/dashboard/reports/service/aeps-dashboard",
        },
        {
          title: "DMT Dashboard",
          href: "/dashboard/reports/service/dmt-dashboard",
        },
        {
          title: "AEPS Logs",
          href: "/dashboard/reports/service/aeps-logs",
        },
        {
          title: "Collection Report",
          href: "/dashboard/reports/service/collection",
        },
        {
          title: "Live Recharge",
          href: "/dashboard/reports/service/live-recharge",
        },
        {
          title: "Live Panel",
          href: "/dashboard/reports/service/live-panel",
        },
      ],
    },
    {
      title: "Compliance",
      items: [
        {
          title: "TDS Statement",
          href: "/dashboard/reports/compliance/tds",
        },
        {
          title: "Rollback Transactions",
          href: "/dashboard/reports/compliance/rollback",
        },
      ],
    },
  ],
},
  {
    title: "Package",
    icon: Package,
    items: [
      {
        title: "Package Management",
        items: [
          {
            title: "Create Package",
            href: "/dashboard/packages/create",
          },
        ],
      },
      {
        title: "Commission",
        items: [
          {
            title: "Recharge Commission",
            href: "/dashboard/packages/commission/recharge",
          },
          {
            title: "BBPS Commission",
            href: "/dashboard/packages/commission/bbps",
          },
        ],
      },
    ],
  },
  {
    title: "API Routing",
    icon: Route,
    items: [
      {
        title: "Recharge Routing",
        items: [
          {
            title: "Operator Wise API",
            href: "/dashboard/routing/recharge/operator",
          },
          {
            title: "Package Wise API",
            href: "/dashboard/routing/recharge/package",
          },
          {
            title: "User Wise API",
            href: "/dashboard/routing/recharge/user",
          },
          {
            title: "Amount Wise API",
            href: "/dashboard/routing/recharge/amount",
          },
          {
            title: "Random API",
            href: "/dashboard/routing/recharge/random",
          },
        ],
      },
      {
        title: "Service Routing",
        items: [
          {
            title: "DMT API",
            href: "/dashboard/routing/service/dmt",
          },
          {
            title: "Payout API",
            href: "/dashboard/routing/service/payout",
          },
          {
            title: "Bank Account Verify API",
            href: "/dashboard/routing/service/bank-verify",
          },
          {
            title: "UPI Verify API",
            href: "/dashboard/routing/service/upi-verify",
          },
        ],
      },
      {
        title: "Payout Routing",
        items: [
          {
            title: "Provider Wise Routing",
            href: "/dashboard/routing/payout/provider",
          },
          {
            title: "User Wise Routing",
            href: "/dashboard/routing/payout/user",
          },
          {
            title: "Amount Wise Routing",
            href: "/dashboard/routing/payout/amount",
          },
          {
            title: "User Amount Wise Routing",
            href: "/dashboard/routing/payout/user-amount",
          },
        ],
      },
    ],
  },
{
    title: "Merchant API",
    icon: Plug,
    items: [
      {
        title: "API Settings",
        href:"/dashboard/merchant-api/settings"
      },
    ],
  },
    {
  title: "Master",
  icon: Database,
  items: [
    {
      title: "Company",
      items: [
        { title: "Company Setup", href: "/dashboard/master/company/setup" },
        { title: "System Setting", href: "/dashboard/master/company/system-setting" },
        { title: "Cron Setting", href: "/dashboard/master/company/cron-setting" },
      ],
    },
    {
      title: "User Management",
      items: [
        { title: "Admin Register", href: "/dashboard/master/users/admin" },
        { title: "Employee Register", href: "/dashboard/master/users/employees" },
        { title: "Employee Permission", href: "/dashboard/master/users/permissions" },
        { title: "User Register", href: "/dashboard/master/users/register" },
      ],
    },
    {
      title: "API Management",
      items: [
        { title: "API Type", href: "/dashboard/master/api/type" },
        { title: "API Register", href: "/dashboard/master/api/register" },
        { title: "Request Parameter", href: "/dashboard/master/api/request-parameter" },
        { title: "Status API", href: "/dashboard/master/api/status" },
        { title: "Balance API", href: "/dashboard/master/api/balance" },
        { title: "Callback API", href: "/dashboard/master/api/callback" },
      ],
    },
    {
      title: "Operator",
      items: [
        { title: "Category", href: "/dashboard/master/operator/category" },
        { title: "Operator Type", href: "/dashboard/master/operator/type" },
        { title: "Operator Register", href: "/dashboard/master/operator/register" },
        { title: "Operator Code", href: "/dashboard/master/operator/code" },
      ],
    },
    {
      title: "Banking",
      items: [
        { title: "AEPS Bank", href: "/dashboard/master/banking/aeps-bank" },
      ],
    },
    {
      title: "Charges",
      items: [
        { title: "Registration Charges", href: "/dashboard/master/charges/registration" },
      ],
    },
  ],
},
 {
    title: "Privilege",
    icon: ShieldCheck,
    items: [
      {
        title: "Access Control",
        items: [
          {
            title: "Privilege Settings",
            href: "/dashboard/privileges/settings",
          },
        ],
      },
    ],
  },
   {
    title: "Notification",
    icon: Bell,
    items: [
      {
        title: "Notification Management",
        items: [
          {
            title: "Create Notification",
            href: "/dashboard/notifications/create",
          },
          {
            title: "Notification List",
            href: "/dashboard/notifications/list",
          },
        ],
      },
    ],
  },
    {
    title: "Website",
    icon: Globe,
    items: [
      {
        title: "Navigation",
        items: [
          {
            title: "Header",
            href: "/dashboard/website/header",
          },
          {
            title: "Menu",
            href: "/dashboard/website/menu",
          },
          {
            title: "Sub Menu",
            href: "/dashboard/website/sub-menu",
          },
          {
            title: "Footer",
            href: "/dashboard/website/footer",
          },
          {
            title: "Footer Links",
            href: "/dashboard/website/footer-links",
          },
          {
            title: "Footer Contact",
            href: "/dashboard/website/footer-contact",
          },
        ],
      },
      {
        title: "Pages",
        items: [
          {
            title: "Banner",
            href: "/dashboard/website/banner",
          },
          {
            title: "About Us",
            href: "/dashboard/website/about",
          },
          {
            title: "Mission",
            href: "/dashboard/website/mission",
          },
          {
            title: "Services",
            href: "/dashboard/website/services",
          },
          {
            title: "Contact Us",
            href: "/dashboard/website/contact",
          },
          {
            title: "Notice Board",
            href: "/dashboard/website/notice",
          },
        ],
      },
    ],
  },

  {
    title: "Service Management",
    icon: BriefcaseBusiness,
    items: [
      {
        title: "Services",
        items: [
          {
            title: "Service Settings",
            href: "/dashboard/services/settings",
          },
          {
            title: "Service Categories",
            href: "/dashboard/services/categories",
          },
        ],
      },
    ],
  },

  {
    title: "Contact Management",
    icon: Phone,
    items: [
      {
        title: "Inquiries",
        items: [
          {
            title: "Feedback",
            href: "/dashboard/contact/feedback",
          },
          {
            title: "Callback Requests",
            href: "/dashboard/contact/callbacks",
          },
          {
            title: "Contact Messages",
            href: "/dashboard/contact/messages",
          },
        ],
      },
    ],
  },

  {
    title: "Settings",
    icon: Settings,
    items: [
     
      {
        title: "Profile",
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
    {
    title: "Help Center",
    icon: CircleHelp,
    items: [
      {
        title: "Documentation",
        items: [
          {
            title: "API Manual",
            href: "/dashboard/help/api-manual",
          },
          {
            title: "Help Articles",
            href: "/dashboard/help/articles",
          },
          {
            title: "Announcements",
            href: "/dashboard/help/notifications",
          },
          {
            title: "Contact Support",
            href: "/dashboard/help/contact",
          },
        ],
      },
    ],
  }
];

export const DashboardSidebar = memo(function DashboardSidebar() {
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
    <Sidebar className="border-r-0 bg-white/60 dark:bg-slate-700/80 backdrop-blur-xl transition-colors">
      <SidebarHeader className="h-16 flex items-center px-6 border-b-0">
        {/* <Link href="/" className="flex items-center gap-3"> */}
          <NavbarLogo imgSrc='/logo/logo.png' altName='Logo' />
        {/* </Link> */}
      </SidebarHeader>

      <SidebarContent className="px-0 py-4 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isOpen = openMenu === item.title;
                const hasSubItems = Boolean(item.items && item.items.length > 0);

                if (!hasSubItems && item.href) {
                  const isActive = pathname === item.href;
                  return (
                    <div key={item.title} className="group/menu-item relative">
                      <Link
                        href={item.href}
                        className={cn(
                          "w-full flex items-center justify-between hover:bg-blue-50/70 dark:hover:bg-slate-800/80 hover:shadow-sm transition-all duration-200 py-3 px-3 rounded-lg cursor-pointer",
                          isActive ? "bg-blue-50 dark:bg-slate-800/90 text-blue-600 dark:text-blue-400 font-semibold" : ""
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-secondary dark:text-blue-400" />
                          <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-secondary">{item.title}</span>
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
                      <CollapsibleTrigger className="w-full flex items-center justify-between hover:bg-blue-50/70 dark:hover:bg-slate-800/80 hover:shadow-sm transition-all duration-200 group h-auto py-3 px-3 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-secondary dark:text-blue-400" />
                          <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-secondary ">{item.title}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        {/* Blue Theme Curved Tree Container */}
                        <div className="relative ml-4 pl-2 space-y-1 my-1">
                          {item.items?.map((sub) => {
                            const isSubOpen = openSubMenu === sub.title;
                            const hasSubSubItems = Boolean(sub.items && sub.items.length > 0);

                            if (!hasSubSubItems && sub.href) {
                              const isActive = pathname === sub.href;
                              return (
                                <div key={sub.title} className="group/menu-sub-item relative pl-4">
                                  <div className="absolute left-0 top-0 bottom-1/2 w-3 border-l-2 border-b-2 rounded-bl-lg border-blue-400/40 dark:border-blue-500/40 pointer-events-none" />
                                  <SidebarMenuSubButton
                                    render={<Link href={sub.href} />}
                                    isActive={isActive}
                                    className={cn(
                                      "w-full text-[11px] leading-tight py-1 px-2.5 rounded-md font-medium transition-all duration-200 flex items-center gap-1.5 mb-2",
                                      isActive
                                        ? "bg-blue-600 dark:bg-blue-600 text-white dark:text-white shadow-md shadow-blue-500/25 font-medium"
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
                                        const isActive = pathname === subSub.href;
                                        return (
                                          <div key={subSub.href} className="relative">
                                            {/* Curved L-connector line pointing to sub-sub-menu */}
                                            <div className="absolute -left-4 top-0 bottom-1/2 w-3.5 border-l-2 border-b-2 rounded-bl-md border-blue-400/35 dark:border-blue-500/35 pointer-events-none" />
                                            <SidebarMenuSubButton
                                               render={<Link href={subSub.href} />}
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

      <SidebarFooter className="p-3 border-t-0">
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 rounded-xl p-3 text-white shadow-lg shadow-blue-950/40 relative overflow-hidden group border border-blue-500/20">
          <div className="absolute -right-4 -bottom-4 w-14 h-14 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all" />
          <p className="text-[10px] font-medium opacity-80 mb-0.5 tracking-wide">Available Balance</p>
          <p className="text-xl font-bold tracking-tight text-white">₹24,562.80</p>
          <div className="flex items-center gap-1 mt-1 text-[10px]">
            <span className="font-semibold text-blue-400">+12.5%</span>
            <span className="opacity-70">this month</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
});