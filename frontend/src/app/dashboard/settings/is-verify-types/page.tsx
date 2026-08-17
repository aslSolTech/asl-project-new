"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsVerifyListQuery } from "@/modules/admin/settings/is-verify/hooks";
import { useIsVerifyModalStore } from "@/modules/admin/settings/is-verify/stores/useIsVerifyModalStore";
import { IsVerifyRecord } from "@/modules/admin/settings/is-verify/types";
import { IsVerifyModal } from "@/modules/admin/settings/is-verify/components/is-verify-modal";
import { IsVerifyDeleteDialog } from "@/modules/admin/settings/is-verify/components/is-verify-delete-dialog";
import { DEFAULT_IS_VERIFY } from "@/modules/admin/settings/is-verify/constants";
import { CheckCircle2, Plus, Edit2, Trash2, RefreshCw } from "lucide-react";

function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, IsVerifyRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, IsVerifyRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function NameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, IsVerifyRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Option Name" />;
}

function NameCell({ row }: Readonly<{ row: Row<AppTableFeatures, IsVerifyRecord> }>) {
  return <span className="text-sm font-semibold text-foreground">{row.original.name}</span>;
}

function ValueHeader({ column }: Readonly<{ column: Column<AppTableFeatures, IsVerifyRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Value / Flag" />;
}

function ValueCell({ row }: Readonly<{ row: Row<AppTableFeatures, IsVerifyRecord> }>) {
  const val = String(row.original.value).toLowerCase();
  if (val === "true" || val === "yes") {
    return <Badge variant="default" className="text-xs font-mono bg-emerald-500/10 text-emerald-500 border-emerald-500/20">{row.original.value}</Badge>;
  }
  if (val === "false" || val === "no") {
    return <Badge variant="destructive" className="text-xs font-mono bg-rose-500/10 text-rose-500 border-rose-500/20">{row.original.value}</Badge>;
  }
  return <Badge variant="outline" className="text-xs font-mono">{row.original.value}</Badge>;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, IsVerifyRecord> }>) {
  const { openEdit, openDelete } = useIsVerifyModalStore();
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
        onClick={() => openDelete(record.id, record.name || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function IsVerifyTypesPage() {
  const { data: listData, isLoading, isError, refetch } = useIsVerifyListQuery();
  const { openCreate } = useIsVerifyModalStore();

  const displayData = useMemo<IsVerifyRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return DEFAULT_IS_VERIFY;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, IsVerifyRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "name",
        header: NameHeader,
        cell: NameCell,
      },
      {
        accessorKey: "value",
        header: ValueHeader,
        cell: ValueCell,
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
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Is Verify Options
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure verification flags (Yes / No / Pending) and system values.
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
            Add Verify Option
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
        searchPlaceholder="Search verification options..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <IsVerifyModal />
      <IsVerifyDeleteDialog />
    </div>
  );
}
