"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCreateListQuery } from "@/modules/admin/packages/create/hooks";
import { useCreateModalStore } from "@/modules/admin/packages/create/stores/useCreateModalStore";
import { CreateRecord } from "@/modules/admin/packages/create/types";
import { CreateModal } from "@/modules/admin/packages/create/components/create-modal";
import { CreateDeleteDialog } from "@/modules/admin/packages/create/components/create-delete-dialog";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CreateRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, CreateRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function PackageNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CreateRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Package Name" />;
}

function PackageNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, CreateRecord> }>) {
  return <span className="text-sm font-medium text-foreground">{row.original.packageName || "-"}</span>;
}

function TrialPeriodHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CreateRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Trial Periods (Days)" />;
}

function TrialPeriodCell({ row }: Readonly<{ row: Row<AppTableFeatures, CreateRecord> }>) {
  return <span className="text-sm text-foreground">{row.original.trialPeriod ?? 0}</span>;
}

function PackageChargeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CreateRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Package Charge" />;
}

function PackageChargeCell({ row }: Readonly<{ row: Row<AppTableFeatures, CreateRecord> }>) {
  return <span className="text-sm font-semibold text-foreground">₹{row.original.packageCharge ?? 0}</span>;
}

function IsDefaultHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CreateRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Is Default" />;
}

function IsDefaultCell({ row }: Readonly<{ row: Row<AppTableFeatures, CreateRecord> }>) {
  const val = String(row.original.isDefault || "").toUpperCase();
  if (val === "Y" || val === "YES") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">YES (Y)</Badge>;
  }
  return <Badge variant="outline" className="text-xs uppercase">NO (N)</Badge>;
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CreateRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, CreateRecord> }>) {
  const val = row.original.status?.toLowerCase();
  if (val === "active") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">Active</Badge>;
  }
  return <Badge variant="outline" className="text-xs uppercase">{row.original.status || "Inactive"}</Badge>;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, CreateRecord> }>) {
  const { openEdit, openDelete } = useCreateModalStore();
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
        onClick={() => openDelete(record.id, record.packageName || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function CreatePage() {
  const { data: listData, isLoading, isError, refetch } = useCreateListQuery();
  const { openCreate } = useCreateModalStore();

  const displayData = useMemo<CreateRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    
    // Fallback data
    const mock: CreateRecord[] = [
      {
        id: "PKG-101",
        packageName: "Basic Starter",
        trialPeriod: 7,
        packageCharge: 499,
        isDefault: "N",
        status: "active"
      },
      {
        id: "PKG-102",
        packageName: "Standard Plan",
        trialPeriod: 14,
        packageCharge: 999,
        isDefault: "Y",
        status: "active"
      }
    ];
    return mock;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, CreateRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "packageName",
        header: PackageNameHeader,
        cell: PackageNameCell,
      },
      {
        accessorKey: "trialPeriod",
        header: TrialPeriodHeader,
        cell: TrialPeriodCell,
      },
      {
        accessorKey: "packageCharge",
        header: PackageChargeHeader,
        cell: PackageChargeCell,
      },
      {
        accessorKey: "isDefault",
        header: IsDefaultHeader,
        cell: IsDefaultCell,
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
            <Package className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
           Package
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all package configurations.
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
            Create Package
          </Button>
        </div>
      </div>

      {isError && (
        <div className="p-4 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active local data.</span>
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
      <CreateModal />
      <CreateDeleteDialog />
    </div>
  );
}
