import {
  LayoutGrid,
  Wallet,
  FileText,
  Package,
  CircleHelp
} from "lucide-react";
import { IconUsersGroup } from "@tabler/icons-react";
import type { MenuItem, UserProfile, MerchantKycData } from "./types";

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: "Test User",
  email: "test@gmail.com",
  username: "testuser",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rolex",
  role: "distributor",
};

export const DEFAULT_MERCHANT_KYC: MerchantKycData = {
  status: "Verified",
  verificationDate: "2024-06-18T10:30:00.000Z",
  verificationBadgeText: "Verified by Admin & UIDAI/NSDL",
  merchantId: "CME23187",
  fullName: "Nikhil",
  contactNumber: "+91 8709 305 218",
  email: "nikhil.asl@gmail.com",
  dob: "1998-07-09",
  gender: "Male",
  aadhaarNumber: "XXXX XXXX 2508",
  panNumber: "LJPPS9111M",
  shopName: "ASL SHOP",
  address: "saran Bihar",
  state: "Bihar",
  city: "saran",
  district: "Kolkata",
  pincode: "841204",
  documents: {
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nikhil&backgroundColor=b6e3f4",
    aadhaarFront: "/images/csp.png",
    aadhaarBack: "/images/csp.png",
    panCard: "/images/csp.png",
  },
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
  "all-services": "All Services",
  services: "Services",
  "gift-card": "Gift Cards",
  "google-play": "Google Play Recharge",
  "aeps-yes-bank": "AEPS (Yes Bank)",
  "aeps-kotak-bank": "AEPS (Kotak Bank)",
  "mobile-prepaid": "Mobile Recharge",
  "dth-recharge": "DTH Recharge",
  bbps: "Bharat BillPay (BBPS)",
  "upi-transfer": "UPI Transfer",
  "money-transfer": "Money Transfer (DMT)",
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
    title: "Services",
    icon: Package,
    href: "/dashboard/services",
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
