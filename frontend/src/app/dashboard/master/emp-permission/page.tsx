"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEmployeePermissionListQuery } from "@/modules/admin/master/employeePermission/hooks";
import { useEmployeePermissionModalStore } from "@/modules/admin/master/employeePermission/stores/useEmployeePermissionModalStore";
import { EmployeePermissionRecord } from "@/modules/admin/master/employeePermission/types";
import { EmployeePermissionModal } from "@/modules/admin/master/employeePermission/components/employee-permission-modal";
import { EmployeePermissionDeleteDialog } from "@/modules/admin/master/employeePermission/components/employee-permission-delete-dialog";
import { usePermissionStore } from "@/stores/usePermissionStore";
import {
  Key,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Users,
  FileCode,
} from "lucide-react";

// ==========================================
// COLUMN HEADERS
// ==========================================
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function EmployeeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Employee Details" />;
}

function AllowedModulesHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Module & Route Access" />;
}

function CanWriteHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Can Write / Edit" />;
}

function CanDeleteHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Can Delete" />;
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

// ==========================================
// COLUMN CELLS
// ==========================================
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.original.id || row.getValue?.("id"))}
    </span>
  );
}

function EmployeeCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  const emp = row.original;
  const name = emp.employeeName || emp.employeeId || "Assigned Employee";
  return (
    <div className="flex items-center gap-2.5 min-w-[170px]">
      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
        {name.charAt(0)}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground tracking-tight">{name}</span>
        <span className="text-[10px] font-mono text-muted-foreground">
          ID: {emp.employeeId} {emp.employeeMobile ? `• ${emp.employeeMobile}` : ""}
        </span>
      </div>
    </div>
  );
}

function AllowedModulesCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  const routesCount = row.original.allowedRoutes?.length || 0;
  const modules = row.original.allowedModules || [];

  return (
    <div className="flex flex-col gap-1 min-w-[180px]">
      <div className="flex items-center gap-1.5">
        <Badge variant="outline" className="text-xs font-bold bg-primary/5 text-primary border-primary/20">
          <FileCode className="w-3 h-3 mr-1" />
          {routesCount} Routes Permitted
        </Badge>
      </div>
      {modules.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {modules.slice(0, 3).map((m) => (
            <span key={m} className="text-[10px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground capitalize border border-border/40">
              {m}
            </span>
          ))}
          {modules.length > 3 && (
            <span className="text-[10px] text-muted-foreground font-semibold">
              +{modules.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function CanWriteCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  const canWrite =
    row.original.canWrite === true ||
    row.original.canWrite === "true" ||
    row.original.canWrite === "Y" ||
    row.original.canWrite === "active";

  return canWrite ? (
    <Badge variant="default" className="text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
      <CheckCircle2 className="w-3 h-3 mr-1" />
      Granted
    </Badge>
  ) : (
    <Badge variant="outline" className="text-[11px] font-medium text-muted-foreground bg-muted/40">
      <XCircle className="w-3 h-3 mr-1" />
      Restricted
    </Badge>
  );
}

function CanDeleteCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  const canDelete =
    row.original.canDelete === true ||
    row.original.canDelete === "true" ||
    row.original.canDelete === "Y";

  return canDelete ? (
    <Badge variant="destructive" className="text-[11px] font-semibold">
      <Unlock className="w-3 h-3 mr-1" />
      Allowed
    </Badge>
  ) : (
    <Badge variant="outline" className="text-[11px] font-medium text-muted-foreground bg-muted/40">
      <Lock className="w-3 h-3 mr-1" />
      Locked
    </Badge>
  );
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  const isActive = row.original.status === "Active";

  return isActive ? (
    <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
      Active
    </Badge>
  ) : (
    <Badge variant="outline" className="text-xs uppercase text-amber-600 border-amber-500/30 bg-amber-500/10">
      Inactive
    </Badge>
  );
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  const { openEdit, openDelete } = useEmployeePermissionModalStore();
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit Permissions"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.employeeName || record.employeeId || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function EmployeePermissionPage() {
  const { data: listData, isLoading, isError, refetch } = useEmployeePermissionListQuery();
  const { openCreate } = useEmployeePermissionModalStore();
  const storePermissions = usePermissionStore((s) => s.permissions);

  const displayData = useMemo<EmployeePermissionRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    const storeList = Object.values(storePermissions);
    if (storeList.length > 0) {
      return storeList;
    }
    return [
      {
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
      {
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
      {
        id: "PERM-003",
        employeeId: "EMP-003",
        employeeName: "Amit Kumar",
        employeeEmail: "amit.kumar@payzones.in",
        employeeMobile: "+91 9988776655",
        allowedRoutes: [
          "/dashboard/overview/daily",
          "/dashboard/master/employees",
          "/dashboard/master/emp-permission",
          "/dashboard/master/users",
        ],
        allowedModules: ["dashboard", "master"],
        canWrite: true,
        canDelete: true,
        status: "Active",
      },
    ];
  }, [listData, storePermissions]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = displayData.length;
    const writeCount = displayData.filter((d) => d.canWrite === true || d.canWrite === "true").length;
    const deleteCount = displayData.filter((d) => d.canDelete === true || d.canDelete === "true").length;
    const activeCount = displayData.filter((d) => d.status === "Active").length;
    return { total, writeCount, deleteCount, activeCount };
  }, [displayData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, EmployeePermissionRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        id: "employee",
        header: EmployeeHeader,
        cell: EmployeeCell,
      },
      {
        id: "allowedModules",
        header: AllowedModulesHeader,
        cell: AllowedModulesCell,
      },
      {
        accessorKey: "canWrite",
        header: CanWriteHeader,
        cell: CanWriteCell,
      },
      {
        accessorKey: "canDelete",
        header: CanDeleteHeader,
        cell: CanDeleteCell,
      },
      {
        accessorKey: "status",
        header: StatusHeader,
        cell: StatusCell,
      },
      {
        id: "actions",
        header: ActionsHeader,
        cell: ActionsCell,
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <div className="mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <Key className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Employee Permission & Access Control
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Select active employees and configure granular admin panel route permissions, write, and delete privileges.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={openCreate}
            className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4" />
            Assign Permission
          </Button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Assigned Employees</p>
            <p className="text-xl font-bold text-foreground">{stats.total}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Access Rules</p>
            <p className="text-xl font-bold text-foreground">{stats.activeCount}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600">
            <Edit2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Write Privileges</p>
            <p className="text-xl font-bold text-foreground">{stats.writeCount}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-red-500/10 text-red-600">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Delete Authorized</p>
            <p className="text-xl font-bold text-foreground">{stats.deleteCount}</p>
          </div>
        </div>
      </div>

      {isError && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing local active permission data.</span>
          <Button variant="ghost" size="sm" onClick={() => void refetch()}>
            Retry
          </Button>
        </div>
      )}

      {/* Main Virtualized Data Table */}
      <DataTable
        columns={columns}
        data={displayData}
        loading={isLoading}
        searchPlaceholder="Search by employee name, ID, modules..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <EmployeePermissionModal />
      <EmployeePermissionDeleteDialog />
    </div>
  );
}
