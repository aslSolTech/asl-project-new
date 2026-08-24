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
import {
  Key,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

// Helper cells
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function EmployeeIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Employee ID" />;
}

function EmployeeIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  const val = row.original.employeeId;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function ModuleAccessHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Module Access" />;
}

function ModuleAccessCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  const val = row.original.moduleAccess;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function CanWriteHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Can Write" />;
}

function CanWriteCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  const val = row.original.canWrite;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function CanDeleteHeader({ column }: Readonly<{ column: Column<AppTableFeatures, EmployeePermissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Can Delete" />;
}

function CanDeleteCell({ row }: Readonly<{ row: Row<AppTableFeatures, EmployeePermissionRecord> }>) {
  const val = row.original.canDelete;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
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
        title="Edit"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.employeeId || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function EmployeePermissionPage() {
  const { data: listData, isLoading, isError, refetch } = useEmployeePermissionListQuery();
  const { openCreate } = useEmployeePermissionModalStore();

  const displayData = useMemo<EmployeePermissionRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
  {
    "id": "PERM-001",
    "employeeId": "EMP-001",
    "moduleAccess": "Transactions",
    "canWrite": "true",
    "canDelete": "false"
  }
];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, EmployeePermissionRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "employeeId",
        header: EmployeeIdHeader,
        cell: EmployeeIdCell,
      },
      {
        accessorKey: "moduleAccess",
        header: ModuleAccessHeader,
        cell: ModuleAccessCell,
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
            <Key className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Employee Permission
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official employee permission configurations.
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
            Add Employee Permission
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
      <EmployeePermissionModal />
      <EmployeePermissionDeleteDialog />
    </div>
  );
}
