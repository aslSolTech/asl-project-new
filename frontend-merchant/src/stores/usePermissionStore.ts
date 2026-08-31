import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { secureZustandStorage } from "@/lib/secureStorage";
import { MERCHANT_ROLES, MerchantRole } from "@/modules/auth/constants";

export interface MerchantPermissionState {
  // Configured allowed routes or menu keys provided by admin for this merchant
  allowedRoutes: string[];
  allowedMenuKeys: string[];
  setAllowedRoutes: (routes: string[]) => void;
  setAllowedMenuKeys: (keys: string[]) => void;
  isRouteAllowed: (pathname: string, role?: string) => boolean;
  isMenuKeyAllowed: (key: string, role?: string) => boolean;
}

export const normalizeRoleSlug = (role?: string): MerchantRole => {
  const r = (role || "").toLowerCase().replace(/[\s_-]+/g, "");
  const foundRole = MERCHANT_ROLES.find((merchantRole) =>
    r.includes(merchantRole.value)
  );
  return foundRole ? foundRole.value : "retailer";
};

// Default baseline routes for merchants (Retailer / Distributor)
const defaultMerchantAllowedRoutes: string[] = [
  "/dashboard",
  "/dashboard/wallets",
  "/dashboard/fund-request",
  "/dashboard/services",
  "/dashboard/services/gift-card",
  "/dashboard/services/google-play",
  "/dashboard/services/aeps-yes-bank",
  "/dashboard/services/aeps-kotak-bank",
  "/dashboard/services/mobile-prepaid",
  "/dashboard/services/dth-recharge",
  "/dashboard/services/bbps",
  "/dashboard/services/upi-transfer",
  "/dashboard/services/money-transfer",
  "/dashboard/all-services",
  // Users (for Distributor & Super Distributor)
  "/dashboard/users",
  "/dashboard/users/upline",
  "/dashboard/users/fund-transfer",
  "/dashboard/users/recharge-report",
  "/dashboard/users/aeps-report",
  "/dashboard/users/sales-report",
  // Service Report
  "/dashboard/reports/mobile-recharge",
  "/dashboard/reports/bbps",
  "/dashboard/reports/aeps",
  "/dashboard/reports/payout",
  "/dashboard/reports/money-transfer",
  "/dashboard/reports/micro-atm",
  "/dashboard/reports/pan-card",
  "/dashboard/reports/ledger",
  "/dashboard/reports/fund-transfer",
  "/dashboard/reports/fund-request",
  "/dashboard/reports/qr-collection",
  "/dashboard/reports/gift-report",
  // Help Center
  "/dashboard/help/notifications",
  "/dashboard/help/contact-us",
];

export const usePermissionStore = create<MerchantPermissionState>()(
  persist(
    (set, get) => ({
      allowedRoutes: defaultMerchantAllowedRoutes,
      allowedMenuKeys: [],

      setAllowedRoutes: (routes) => set({ allowedRoutes: routes }),
      setAllowedMenuKeys: (keys) => set({ allowedMenuKeys: keys }),

      isMenuKeyAllowed: (key: string, role?: string) => {
        const canonicalRole = normalizeRoleSlug(role);
        if (canonicalRole === "superdistributor") {
          return true;
        }
        const { allowedMenuKeys } = get();
        if (!allowedMenuKeys || allowedMenuKeys.length === 0) {
          return true; // default all visible unless restricted
        }
        return allowedMenuKeys.includes(key);
      },

      isRouteAllowed: (pathname: string, role?: string) => {
        const canonicalRole = normalizeRoleSlug(role);

        // Superdistributor has unrestricted access
        if (canonicalRole === "superdistributor") {
          return true;
        }

        // Normalize pathname: if /[role]/dashboard/... convert to /dashboard/...
        let normalizedPath = pathname;
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length > 1 && segments[1] === "dashboard") {
          normalizedPath = `/${segments.slice(1).join("/")}`;
        }

        // Users management routes are restricted to distributor and superdistributor only (not retailer)
        if (normalizedPath.startsWith("/dashboard/users") && canonicalRole === "retailer") {
          return false;
        }

        // Master management routes are restricted to superdistributor only
        if (normalizedPath.startsWith("/dashboard/master")) {
          return false;
        }

        const { allowedRoutes } = get();
        if (!allowedRoutes || allowedRoutes.length === 0) {
          return true;
        }

        return (
          allowedRoutes.includes(normalizedPath) ||
          allowedRoutes.some((route: string) => normalizedPath.startsWith(route) && route !== "/dashboard")
        );
      },
    }),
    {
      name: "aslwallets-merchant-permissions",
      storage: createJSONStorage(() => secureZustandStorage),
    }
  )
);
