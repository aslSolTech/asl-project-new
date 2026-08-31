import React from "react";

export type SubSubItem = {
  title: string;
  href: string;
};

export type SubItem = {
  title: string;
  href?: string;
  items?: SubSubItem[];
};

export type MenuItem = {
  title: string;
  icon: React.ElementType;
  href?: string;
  items?: SubItem[];
};

export interface UserProfile {
  name: string;
  email: string;
  username: string;
  avatar: string;
  role: string;
  lastLogin?: string;
}

export interface MerchantKycDocuments {
  profilePicture: string;
  aadhaarFront: string;
  aadhaarBack: string;
  panCard: string;
}

export interface MerchantKycData {
  status: "Verified" | "Pending" | "Rejected" | "Incomplete";
  verificationDate?: string;
  verificationBadgeText?: string;
  merchantId: string;
  fullName: string;
  contactNumber: string;
  email?: string;
  dob: string; // "1998-07-09"
  gender?: string;
  aadhaarNumber: string; // "XXXX XXXX 2508"
  panNumber: string; // "LJPPS9111M"
  shopName: string; // "ASL SHOP"
  address: string; // "saran Bihar"
  state: string; // "Bihar"
  city: string; // "saran"
  district: string; // "Kolkata"
  pincode: string; // "841204"
  documents: MerchantKycDocuments;
}

export interface EmployeePermissionRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  employeeMobile: string;
  allowedRoutes: string[];
  allowedModules: string[];
  canWrite: boolean;
  canDelete: boolean;
  status: "Active" | "Inactive";
}
export interface BankAccountRecord {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  holderName: string;
  accountType: "PRIMARY" | "SECONDARY";
  panImageUrl?: string;
  passbookImageUrl?: string;
  isVerified: boolean;
  verifiedAt?: string; // e.g. "26-05-2026 15:43:40 PM"
  createdAt?: string;
}

export type PayoutMode = "IMPS" | "NEFT" | "RTGS" | "IFT";

export interface PayoutTransaction {
  id: string;
  amount: number;
  recipientName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  mode: PayoutMode;
  fee: number;
  utr: string;
  status: "Success" | "Processing" | "Failed";
  timestamp: string;
}

export interface WalletTransferRecord {
  id: string;
  targetMobile: string;
  recipientName: string;
  amount: number;
  note?: string;
  timestamp: string;
  status: "Success" | "Failed";
}

export interface FundRequestRecord {
  id: string;
  requestId: string;
  requestAmount: number;
  requestFrom: "Admin";
  bankId: string;
  bankName: string;
  accountNumber: string;
  holderName: string;
  transactionId: string;
  paymentBy: string; 
  depositDate: string;
  remarks?: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}

