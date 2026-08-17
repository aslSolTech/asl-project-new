"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLoginStatusListQuery } from "@/modules/admin/settings/login-status/hooks";
import { useLoginStatusModalStore } from "@/modules/admin/settings/login-status/stores/useLoginStatusModalStore";
import { LoginStatusRecord } from "@/modules/admin/settings/login-status/types";
import { LoginStatusModal } from "@/modules/admin/settings/login-status/components/login-status-modal";
import { LoginStatusDeleteDialog } from "@/modules/admin/settings/login-status/components/login-status-delete-dialog";
import { DEFAULT_LOGIN_STATUSES } from "@/modules/admin/settings/login-status/constants";
import { LogIn, Plus, Edit2, Trash2, RefreshCw } from "lucide-react";

function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, LoginStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, LoginStatusRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function StatusNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, LoginStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status Name" />;
}

function StatusNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, LoginStatusRecord> }>) {
  return <span className="text-sm font-semibold text-foreground">{row.original.statusName}</span>;
}

function ValueHeader({ column }: Readonly<{ column: Column<AppTableFeatures, LoginStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status Value (Boolean / String)" />;
}

function ValueCell({ row }: Readonly<{ row: Row<AppTableFeatures, LoginStatusRecord> }>) {
  const val = String(row.original.value).toLowerCase();
  if (val === "true" || val === "active" || val === "1") {
    return <Badge variant="default" className="text-xs font-mono bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{row.original.value}</Badge>;
  }
  if (val === "false" || val === "inactive" || val === "0" || val === "blocked" || val === "locked") {
    return <Badge variant="destructive" className="text-xs font-mono bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-rose-500/20">{row.original.value}</Badge>;
  }
  return <Badge variant="outline" className="text-xs font-mono">{row.original.value}</Badge>;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, LoginStatusRecord> }>) {
  const { openEdit, openDelete } = useLoginStatusModalStore();
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
        onClick={() => openDelete(record.id, record.statusName || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function LoginStatusTypesPage() {
  const { data: listData, isLoading, isError, refetch } = useLoginStatusListQuery();
  const { openCreate } = useLoginStatusModalStore();

  const displayData = useMemo<LoginStatusRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return DEFAULT_LOGIN_STATUSES;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, LoginStatusRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "statusName",
        header: StatusNameHeader,
        cell: StatusNameCell,
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
            <LogIn className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Login Status Types
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure system user login statuses and custom boolean/string values.
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
            Add Login Status
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
        searchPlaceholder="Search login statuses..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <LoginStatusModal />
      <LoginStatusDeleteDialog />
    </div>
  );
}
