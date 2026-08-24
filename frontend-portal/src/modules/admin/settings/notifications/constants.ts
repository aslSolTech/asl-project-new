import { NotificationRecord, NotificationTypeRecord } from "./types";

export const defaultNotificationTypes: NotificationTypeRecord[] = [
  {
    id: "NTYPE-01",
    name: "System Alert",
    slug: "system_alert",
    description: "Critical system notices, downtime alerts, and urgent server messages",
    badgeColor: "destructive",
    status: "Active",
  },
  {
    id: "NTYPE-02",
    name: "Promotional Offer",
    slug: "promotional",
    description: "Marketing updates, cashback offers, festival discounts, and special schemes",
    badgeColor: "default",
    status: "Active",
  },
  {
    id: "NTYPE-03",
    name: "Transaction Notice",
    slug: "transaction",
    description: "Recharge status, payout batch updates, settlement advisories",
    badgeColor: "secondary",
    status: "Active",
  },
  {
    id: "NTYPE-04",
    name: "Service Maintenance",
    slug: "maintenance",
    description: "Scheduled banking gateway maintenance and operator switch maintenance",
    badgeColor: "outline",
    status: "Active",
  },
  {
    id: "NTYPE-05",
    name: "Security Notice",
    slug: "security",
    description: "Password reset reminders, 2FA policies, and compliance advisories",
    badgeColor: "destructive",
    status: "Active",
  },
];

export const fallbackUserTypes = [
  { id: "all", name: "All User Roles", slug: "all" },
  { id: "retailer", name: "Retailer", slug: "retailer" },
  { id: "distributor", name: "Distributor", slug: "distributor" },
  { id: "master_distributor", name: "Master Distributor", slug: "master_distributor" },
  { id: "api_partner", name: "API Partner", slug: "api_partner" },
  { id: "employee", name: "Employee", slug: "employee" },
  { id: "admin", name: "Administrator", slug: "admin" },
];

export const fallbackNotifications: NotificationRecord[] = [
  {
    id: "NOTIF-101",
    title: "Diwali Cashback & Recharge Incentive 2026",
    description: "Earn up to 0.50% extra margin on all prepaid mobile & DTH transactions above ₹500 across all circles this festive week.",
    userTypeId: "retailer",
    userTypeName: "Retailer",
    notificationTypeId: "NTYPE-02",
    notificationTypeName: "Promotional Offer",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "2026-08-18T10:30:00Z",
  },
  {
    id: "NOTIF-102",
    title: "NPCI AEPS Bank Switch Scheduled Maintenance",
    description: "State Bank of India (SBI) AEPS switch will undergo scheduled infrastructure upgrade tonight between 01:00 AM to 03:30 AM.",
    userTypeId: "all",
    userTypeName: "All User Roles",
    notificationTypeId: "NTYPE-04",
    notificationTypeName: "Service Maintenance",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "2026-08-17T14:15:00Z",
  },
  {
    id: "NOTIF-103",
    title: "Mandatory 2FA Device Verification Policy",
    description: "All distributor and API partner accounts must enable Two-Factor Authentication (2FA) and verify mobile OTP before August 25.",
    userTypeId: "distributor",
    userTypeName: "Distributor",
    notificationTypeId: "NTYPE-05",
    notificationTypeName: "Security Notice",
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "2026-08-16T09:00:00Z",
  },
];

