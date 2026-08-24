"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOperatorTypeListQuery } from "@/modules/admin/settings/operator-type/hooks";
import { useOperatorTypeModalStore } from "@/modules/admin/settings/operator-type/stores/useOperatorTypeModalStore";
import { OperatorTypeRecord } from "@/modules/admin/settings/operator-type/types";
import { OperatorTypeModal } from "@/modules/admin/settings/operator-type/components/operator-type-modal";
import { OperatorTypeDeleteDialog } from "@/modules/admin/settings/operator-type/components/operator-type-delete-dialog";
import { DEFAULT_OPERATOR_TYPES } from "@/modules/admin/settings/operator-type/constants";
import { Radio, Plus, Edit2, Trash2, RefreshCw } from "lucide-react";

function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorTypeRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function OperatorTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Operator Type" />;
}

function OperatorTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorTypeRecord> }>) {
  return <span className="text-sm font-semibold text-foreground">{row.original.operatorType}</span>;
}

function ApiTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API Type" />;
}

function ApiTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorTypeRecord> }>) {
  return (
    <Badge variant="secondary" className="text-xs font-medium">
      {row.original.apiType}
    </Badge>
  );
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorTypeRecord> }>) {
  const val = String(row.original.status).toLowerCase();
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">Active</Badge>;
  }
  return <Badge variant="outline" className="text-xs uppercase">Inactive</Badge>;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorTypeRecord> }>) {
  const { openEdit, openDelete } = useOperatorTypeModalStore();
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
        onClick={() => openDelete(record.id, record.operatorType || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function OperatorTypesPage() {
  const { data: listData, isLoading, isError, refetch } = useOperatorTypeListQuery();
  const { openCreate } = useOperatorTypeModalStore();

  const displayData = useMemo<OperatorTypeRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return DEFAULT_OPERATOR_TYPES;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, OperatorTypeRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "operatorType",
        header: OperatorTypeHeader,
        cell: OperatorTypeCell,
      },
      {
        accessorKey: "apiType",
        header: ApiTypeHeader,
        cell: ApiTypeCell,
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
            <Radio className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Operator Types
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure operator types mapped to respective API services.
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
            Add Operator Type
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
        searchPlaceholder="Search operator types..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <OperatorTypeModal />
      <OperatorTypeDeleteDialog />
    </div>
  );
}
