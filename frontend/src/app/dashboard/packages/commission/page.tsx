"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCommissionListQuery } from "@/modules/admin/packages/commission/hooks";
import { useCommissionModalStore } from "@/modules/admin/packages/commission/stores/useCommissionModalStore";
import { CommissionRecord } from "@/modules/admin/packages/commission/types";
import { CommissionModal } from "@/modules/admin/packages/commission/components/commission-modal";
import { CommissionDeleteDialog } from "@/modules/admin/packages/commission/components/commission-delete-dialog";
import {
  Percent,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CommissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, CommissionRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function PackageNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CommissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Package Name" />;
}

function PackageNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, CommissionRecord> }>) {
  const val = row.original.packageName;
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}

function RateHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CommissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Rate" />;
}

function RateCell({ row }: Readonly<{ row: Row<AppTableFeatures, CommissionRecord> }>) {
  const val = row.original.rate;
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CommissionRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, CommissionRecord> }>) {
  const val = row.original.status;
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

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, CommissionRecord> }>) {
  const { openEdit, openDelete } = useCommissionModalStore();
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

export default function CommissionPage() {
  const { data: listData, isLoading, isError, refetch } = useCommissionListQuery();
  const { openCreate } = useCommissionModalStore();

  const displayData = useMemo<CommissionRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    
    // Fallback data
    const mock: CommissionRecord[] = [
      {
        id: "COM-101",
        packageName: "Retailer Basic",
        rate: "2.5%",
        status: "active"
      }
    ];
    return mock;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, CommissionRecord, unknown>[]>(
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
        accessorKey: "rate",
        header: RateHeader,
        cell: RateCell,
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
            <Percent className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Package Commission
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all package commission configurations and rate rules.
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
            Add Commission
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
        searchPlaceholder="Search commission..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <CommissionModal />
      <CommissionDeleteDialog />
    </div>
  );
}
