import {
  LayoutGrid,
  Wallet,
  Settings,
  Database,
  FileText,
  Package,
  Route,
  Plug,
  CircleHelp,
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
  "service-settings": "Service Settings",
  "service-types": "Service Types",
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
        title: "Package",
        href: "/dashboard/packages",
      },
      {
        title: "Commission",
        href: "/dashboard/packages/commission"
      },
    ],
  },
  {
    title: "API Routing",
    icon: Route,
    items: [
      {
        title: "Recharge",
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
        title: "Services API",
        items: [
          {
            title: "DMT",
            href: "/dashboard/services/dmt",
          },
          {
            title: "Payouts",
            href: "/dashboard/services/payout-service",
          },
          {
            title: "Bank Account Verify",
            href: "/dashboard/services/bank-verify",
          },
          {
            title: "UPI Verify",
            href: "/dashboard/services/upi-verify",
          },
        ],
      },
      {
        title: "Payout",
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
    title: "Merchant KYC",
    icon: Plug,
    href: "/dashboard/merchant-api"
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
          { title: "Employee", href: "/dashboard/master/employees" },
          { title: "Employee Permission", href: "/dashboard/master/emp-permission" },
          { title: "Users", href: "/dashboard/master/users" },
        ],
      },
      {
        title: "APIs Management",
        items: [
          { title: "Register APIs", href: "/dashboard/master/api-management/register-api" },
          { title: "Status APIs", href: "/dashboard/master/api-management/status-api" },
          { title: "Balance APIs", href: "/dashboard/master/api-management/balance-api" },
          { title: "Callback APIs", href: "/dashboard/master/api-management/callback-url-api" },
        ],
      },
      {
        title: "Operator",
        items: [
          {
            title: "Charges Code",
            href: "/dashboard/master/operator-charges-code",
          }
         
        ],
      },
    ],
  },
   {
    title: "Settings",
    icon: Settings,
    items: [
      {
        title: "Gender",
        href: "/dashboard/settings/gender-types",
      },
      {
        title: "Is Verify",
        href: "/dashboard/settings/is-verify-types",
      },
      {
        title: "Login Status",
        href: "/dashboard/settings/login-status-types",
      },
      {
        title: "Registration Charges",
        href: "/dashboard/settings/registration-charges",
      },
      {
        title: "Request Types",
        href: "/dashboard/settings/request-types",
      },
      {
        title: "Response Type", href: "/dashboard/settings/response-types",
      },
      {
        title: "User Type", href: "/dashboard/settings/user-types",
      },
      { title: "API Type", href: "/dashboard/settings/api-types" },
      {
        title: "Notifications",
        href: "/dashboard/settings/notifications",
      },
      {
        title: "Service Settings", href: "/dashboard/settings/service-settings"
      },
      {
        title: "Operator Setup",
        items: [
          { title: "Operator Type", href: "/dashboard/settings/operator-types" },
          { title: "Registration", href: "/dashboard/settings/operator-registration"}
        ],
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
