import {
  LayoutGrid,
  Wallet,
  Settings,
  Database,
  FileText,
  Bell,
  Package,
  Route,
  ShieldCheck,
  Plug,
  CircleHelp,
  Phone,
  BriefcaseBusiness,
  Globe
} from "lucide-react";
import { MenuItem, UserProfile } from "./types";

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: "Test User",
  email: "test@gmail.com",
  username: "testuser",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rolex",
  role: "Admin",
};

export const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Rolex",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Milo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
];

export const BREADCRUMB_LABEL_MAP: Record<string, string> = {
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

export const menuItems: MenuItem[] = [
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
      { title: "Add Bank", href: "/dashboard/account/add-bank" },
      { title: "Wallet Balance", href: "/dashboard/account/wallet-balance" },
      {
        title: "Fund Management",
        items: [
          { title: "Fund Request", href: "/dashboard/account/fund/request" },
          { title: "Fund Transfer", href: "/dashboard/account/fund/transfer" },
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
        href: "/dashboard/merchant-api/settings"
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
          { title: "Service Status Control", href: "/dashboard/master/company/service-control" },
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
          { title: "API Type", href: "/dashboard/master/api-management/type" },
          { title: "API Register", href: "/dashboard/master/api-management/register" },
          { title: "Request Parameter", href: "/dashboard/master/api-management/request-parameter" },
          { title: "Status API", href: "/dashboard/master/api-management/status" },
          { title: "Balance API", href: "/dashboard/master/api-management/balance" },
          { title: "Callback API", href: "/dashboard/master/api-management/callback" },
        ],
      },
      {
        title: "Operator",
        items: [
          { title: "Operator Type", href: "/dashboard/master/operator/operator-type" },
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
        title: "Settings", href: "/dashboard/privileges"
      },
    ],
  },
  {
    title: "Notification",
    icon: Bell,
    items: [
      {
        title: "Notifications",
        href: "/dashboard/notifications",
      }
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
    title: "Documentation",
    icon: FileText,
    items: [
      {
        title: "API Manual",
        href: "/dashboard/documentation/api-manual"
      },
    ],
  },
  {
    title: "Help Center",
    icon: CircleHelp,
    items: [
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
];
