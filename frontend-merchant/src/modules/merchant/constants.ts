import {
  LayoutGrid,
  Wallet,
  FileText,
  Package,
  CircleHelp,
  HandCoins
} from "lucide-react";
import { MenuItem, UserProfile } from "./types";
import { IconUsersGroup } from "@tabler/icons-react";

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: "Test User",
  email: "test@gmail.com",
  username: "testuser",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rolex",
  role: "distributor",
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
    href: "/dashboard",
  },
  {
    title: "Wallets",
    icon: Wallet,
    href: "/dashboard/wallets",
  },
  {
    title: "Fund Request",
    icon:HandCoins,
    href: "/dashboard/fund-request",
  },
  {
    title: "Services",
    icon:Package,
    href:"/dashboard/services",
  },
  {
    title: "Users",
    icon:IconUsersGroup,
    href:"/dashboard/users",
    items: [
      {
        title: "My Upline",
        href: "/dashboard/users/upline",
      },
      {
        title: "Fund Transfer",
        href: "/dashboard/users/fund-transfer",
      },
      {
        title: "Recharge Report",
        href: "/dashboard/users/recharge-report",
      },
      {
        title: "AEPS Report",
        href: "/dashboard/users/aeps-report",
      },
      {
        title: "Sales Report",
        href: "/dashboard/users/sales-report",
      },
    ],
  },
  {
    title: "Service Report",
    icon: FileText,
    items: [
      {
        title: "Mobile Recharge",
        href: "/dashboard/reports/mobile-recharge",
      },
      {
        title: "Bharat BillPay (BBPS)",
        href: "/dashboard/reports/bbps",
      },
      {
        title: "AEPS",
        href: "/dashboard/reports/aeps",
      },
      {
        title: "Payout",
        href: "/dashboard/reports/payout",
      },
      {
        title: "Money transfer",
        href: "/dashboard/reports/money-transfer",
      },
      {
        title: "Micro ATM",
        href: "/dashboard/reports/micro-atm",
      },
      {
        title: "Pan Card",
        href: "/dashboard/reports/pan-card",
      },
      {
        title: "Ledger",
        href: "/dashboard/reports/ledger",
      },
      {
        title: "Fund Transfer",
        href: "/dashboard/reports/fund-transfer",
      },
      {
        title: "Fund Request",
        href: "/dashboard/reports/fund-request",
      },
      {
        title: "QR Collection",
        href: "/dashboard/reports/qr-collection",
      },
      {
        title: "Gift Report",
        href: "/dashboard/reports/gift-report",
      },
    ],
  },
  {
    title: "Help Center",
    icon: CircleHelp,
    items: [
      {
        title: "Notifications",
        href: "/dashboard/help/notifications",
      },
      {
        title: "Contact Support",
        href: "/dashboard/help/contact-us",
      },
    ],
  },
];
