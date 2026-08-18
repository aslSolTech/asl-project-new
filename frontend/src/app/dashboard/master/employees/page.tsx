"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEmployeeRegisterListQuery } from "@/modules/admin/master/employeeRegister/hooks";
import { useEmployeeRegisterModalStore } from "@/modules/admin/master/employeeRegister/stores/useEmployeeRegisterModalStore";
import { EmployeeRegisterRecord } from "@/modules/admin/master/employeeRegister/types";
import { EmployeeRegisterModal } from "@/modules/admin/master/employeeRegister/components/employee-register-modal";
import { EmployeeRegisterDeleteDialog } from "@/modules/admin/master/employeeRegister/components/employee-register-delete-dialog";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeeRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

// Helper cells
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeeRegisterRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function NameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeeRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Employee Name" />;
}

function NameCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeeRegisterRecord> }>) {
  const { firstName, lastName, name } = row.original;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || name || "-";
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-foreground">{fullName}</span>
    </div>
  );
}

function MobileHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeeRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Mobile" />;
}

function MobileCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeeRegisterRecord> }>) {
  return <span className="font-mono text-xs text-foreground">{row.original.mobile || "-"}</span>;
}

function EmailHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeeRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Email Address" />;
}

function EmailCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeeRegisterRecord> }>) {
  return <span className="text-sm text-muted-foreground">{row.original.email || "-"}</span>;
}

function AddressHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeeRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Address" />;
}

function AddressCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeeRegisterRecord> }>) {
  return (
    <span className="text-xs text-muted-foreground line-clamp-1 max-w-[220px]" title={row.original.address}>
      {row.original.address || "-"}
    </span>
  );
}

function OtpVerifyHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeeRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="OTP Verify" />;
}

function OtpVerifyCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeeRegisterRecord> }>) {
  const isVerify = (row.original.isOtpVerify || "N").toUpperCase() === "Y";
  return (
    <Badge
      variant="outline"
      className={`text-xs uppercase font-medium ${
        isVerify
          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
          : "bg-muted/50 text-muted-foreground border-border"
      }`}
    >
      {isVerify ? "Verified" : "No"}
    </Badge>
  );
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeeRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeeRegisterRecord> }>) {
  const isActive = (row.original.status || "Y").toUpperCase() === "Y";
  return (
    <Badge
      variant="outline"
      className={`text-xs uppercase font-medium ${
        isActive
          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
          : "bg-destructive/10 text-destructive border-destructive/20"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeeRegisterRecord> }>) {
  const { openEdit, openDelete } = useEmployeeRegisterModalStore();
  const record = row.original;
  const displayName = [record.firstName, record.lastName].filter(Boolean).join(" ") || record.name || record.id;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, displayName)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function EmployeeRegisterPage() {
  const { data: listData, isLoading, isError, refetch } = useEmployeeRegisterListQuery();
  const { openCreate } = useEmployeeRegisterModalStore();

  const displayData = useMemo<EmployeeRegisterRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
      {
        id: "EMP-001",
        firstName: "Rahul",
        lastName: "Sharma",
        mobile: "9876543210",
        email: "rahul.sharma@payzones.com",
        address: "123 Commercial Plaza, Tech Zone, Mumbai",
        isOtpVerify: "Y",
        status: "Y",
      },
    ];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, EmployeeRegisterRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        id: "fullName",
        header: NameHeader,
        cell: NameCell,
      },
      {
        accessorKey: "mobile",
        header: MobileHeader,
        cell: MobileCell,
      },
      {
        accessorKey: "email",
        header: EmailHeader,
        cell: EmailCell,
      },
      {
        accessorKey: "address",
        header: AddressHeader,
        cell: AddressCell,
      },
      {
        accessorKey: "isOtpVerify",
        header: OtpVerifyHeader,
        cell: OtpVerifyCell,
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
    <div className="mx-auto w-full">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Employee&apos;s
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official employee&apos;s configurations.
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
            className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {isError && (
        <div className="p-4 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active local master data.</span>
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
        searchPlaceholder="Search..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <EmployeeRegisterModal />
      <EmployeeRegisterDeleteDialog />
    </div>
  );
}
