import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EmployeePermissionRecord } from "@/modules/admin/master/employeePermission/types";

export interface PermissionStoreState {
  permissions: Record<string, EmployeePermissionRecord>; // keyed by employeeId
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
        // Admins, Super Admins, and standard general users have full access
        const normalizedRole = role?.toLowerCase() || "admin";
        if (normalizedRole === "admin" || normalizedRole === "super admin" || normalizedRole === "super administrator") {
          return true;
        }

        // Only employee role is restricted
        if (normalizedRole === "employee") {
          const empId = employeeId || get().activeEmployeeId;
          if (!empId) return true;

          const empPerm = get().permissions[empId];
          if (!empPerm) {
            // If no explicit permission rule set, allow baseline common routes
            const publicEmployeeRoutes = [
              "/dashboard",
              "/dashboard/overview/daily",
              "/dashboard/account/wallet-balance",
              "/dashboard/support/change-password",
            ];
            return publicEmployeeRoutes.includes(pathname);
          }

          // Check if exact path or parent path is in allowedRoutes
          return (
            empPerm.allowedRoutes.includes(pathname) ||
            empPerm.allowedRoutes.some((route) => pathname.startsWith(route) && route !== "/dashboard")
          );
        }

        return true;
      },
    }),
    {
      name: "payzones-employee-permissions",
    }
  )
);
