import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { EmployeePermissionRecord } from "@/modules/admin/master/employeePermission/types";
import { secureZustandStorage } from "@/lib/secureStorage";

export type AllowedRole = "superadmin" | "employee" | "whitelabel" | "whitelevel";

export const normalizeRoleSlug = (role?: string): "superadmin" | "employee" | "whitelabel" => {
  const r = (role || "").toLowerCase().replace(/[\s_-]+/g, "");
  if (r.includes("superadmin") || r.includes("admin")) return "superadmin";
  if (r.includes("whitelevel") || r.includes("whitelabel")) return "whitelabel";
  if (r.includes("employee")) return "employee";
  return "superadmin";
};

export interface PermissionStoreState {
  permissions: Record<string, EmployeePermissionRecord>; // keyed by employeeId or userId
  activeEmployeeId: string | null;
  setEmployeePermission: (permission: EmployeePermissionRecord) => void;
  removeEmployeePermission: (employeeId: string) => void;
  setActiveEmployeeId: (employeeId: string | null) => void;
  isRouteAllowed: (pathname: string, role: string, employeeId?: string) => boolean;
}

const defaultInitialPermissions: Record<string, EmployeePermissionRecord> = {
  "EMP-001": {
    id: "PERM-001",
    employeeId: "EMP-001",
    employeeName: "Rahul Sharma",
    employeeEmail: "rahul.sharma@payzones.in",
    employeeMobile: "+91 9876543210",
    allowedRoutes: [
      "/dashboard",
      "/dashboard/overview/daily",
      "/dashboard/overview/weekly",
      "/dashboard/account/wallet-balance",
      "/dashboard/reports/financial/recharge",
      "/dashboard/reports/financial/bill-payment",
      "/dashboard/reports/wallet/ledger",
      "/dashboard/support/change-password",
    ],
    allowedModules: ["dashboard", "account", "reports", "support"],
    canWrite: true,
    canDelete: false,
    status: "Active",
  },
  "EMP-002": {
    id: "PERM-002",
    employeeId: "EMP-002",
    employeeName: "Priya Verma",
    employeeEmail: "priya.verma@payzones.in",
    employeeMobile: "+91 9811223344",
    allowedRoutes: [
      "/dashboard",
      "/dashboard/overview/daily",
      "/dashboard/reports/financial/recharge",
      "/dashboard/reports/financial/dmt",
      "/dashboard/reports/financial/payout",
      "/dashboard/support/tickets",
    ],
    allowedModules: ["dashboard", "reports", "support"],
    canWrite: false,
    canDelete: false,
    status: "Active",
  },
  "WL-001": {
    id: "PERM-WL-001",
    employeeId: "WL-001",
    employeeName: "Apex Digital Solutions",
    employeeEmail: "admin@apexdigital.in",
    employeeMobile: "+91 9888123456",
    allowedRoutes: [
      "/dashboard",
      "/dashboard/overview/daily",
      "/dashboard/services/dmt",
      "/dashboard/services/payout-service",
      "/dashboard/reports/financial/recharge",
      "/dashboard/packages/pricing-plan",
      "/dashboard/account/wallet-balance",
      "/dashboard/settings/profile",
    ],
    allowedModules: ["dashboard", "services", "reports", "packages", "account", "settings"],
    canWrite: true,
    canDelete: false,
    status: "Active",
  },
};

export const usePermissionStore = create<PermissionStoreState>()(
  persist(
    (set, get) => ({
      permissions: defaultInitialPermissions,
      activeEmployeeId: "EMP-001",

      setEmployeePermission: (permission) =>
        set((state) => ({
          permissions: {
            ...state.permissions,
            [permission.employeeId]: permission,
          },
        })),

      removeEmployeePermission: (employeeId) =>
        set((state) => {
          const updated = { ...state.permissions };
          delete updated[employeeId];
          return { permissions: updated };
        }),

      setActiveEmployeeId: (employeeId) =>
        set({ activeEmployeeId: employeeId }),

      isRouteAllowed: (pathname, role, employeeId) => {
        const canonicalRole = normalizeRoleSlug(role);

        // 1. SUPERADMIN has complete unrestricted master access
        if (canonicalRole === "superadmin") {
          return true;
        }

        // Normalize pathname: if /employee/dashboard/... or /whitelabel/dashboard/... convert to /dashboard/...
        let normalizedPath = pathname;
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length > 1 && segments[1] === "dashboard") {
          normalizedPath = `/${segments.slice(1).join("/")}`;
        }

        // Master routes (like employee permission setup itself) are strictly SUPERADMIN only
        if (normalizedPath.startsWith("/dashboard/master/emp-permission")) {
          return false;
        }

        // 2. EMPLOYEE & WHITELABEL (controlled & authorized by SuperAdmin)
        const targetId = employeeId || get().activeEmployeeId;
        if (!targetId) return true;

        const rolePerm = get().permissions[targetId];
        if (!rolePerm) {
          // Default baseline routes if no custom permission assigned yet
          const baselineRoutes = [
            "/dashboard",
            "/dashboard/overview/daily",
            "/dashboard/account/wallet-balance",
            "/dashboard/support/change-password",
            "/dashboard/profile",
          ];
          return baselineRoutes.includes(normalizedPath);
        }

        // Check if exact path or parent path is in allowedRoutes configured by SuperAdmin
        return (
          rolePerm.allowedRoutes.includes(normalizedPath) ||
          rolePerm.allowedRoutes.some((route) => normalizedPath.startsWith(route) && route !== "/dashboard")
        );
      },
    }),
    {
      name: "payzones-role-permissions",
      storage: createJSONStorage(() => secureZustandStorage),
    }
  )
);
