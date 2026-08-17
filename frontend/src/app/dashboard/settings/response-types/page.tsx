"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useResponseTypeListQuery } from "@/modules/admin/settings/response-type/hooks";
import { useResponseTypeModalStore } from "@/modules/admin/settings/response-type/stores/useResponseTypeModalStore";
import { ResponseTypeRecord } from "@/modules/admin/settings/response-type/types";
import { ResponseTypeModal } from "@/modules/admin/settings/response-type/components/response-type-modal";
import { ResponseTypeDeleteDialog } from "@/modules/admin/settings/response-type/components/response-type-delete-dialog";
import { DEFAULT_RESPONSE_TYPES } from "@/modules/admin/settings/response-type/constants";
import { FileCode2, Plus, Edit2, Trash2, RefreshCw } from "lucide-react";

function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ResponseTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ResponseTypeRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function ResponseFormatHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ResponseTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Format" />;
}

function ResponseFormatCell({ row }: Readonly<{ row: Row<AppTableFeatures, ResponseTypeRecord> }>) {
  return <Badge variant="secondary" className="text-xs font-mono font-bold uppercase">{row.original.responseFormat}</Badge>;
}

function CodeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ResponseTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Code" />;
}

function CodeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ResponseTypeRecord> }>) {
  return <span className="text-xs font-mono font-medium text-muted-foreground uppercase">{row.original.code}</span>;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ResponseTypeRecord> }>) {
  const { openEdit, openDelete } = useResponseTypeModalStore();
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
        onClick={() => openDelete(record.id, `${record.responseFormat} (${record.code})`)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function ResponseTypesPage() {
  const { data: listData, isLoading, isError, refetch } = useResponseTypeListQuery();
  const { openCreate } = useResponseTypeModalStore();

  const displayData = useMemo<ResponseTypeRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return DEFAULT_RESPONSE_TYPES;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, ResponseTypeRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "responseFormat",
        header: ResponseFormatHeader,
        cell: ResponseFormatCell,
      },
      {
        accessorKey: "code",
        header: CodeHeader,
        cell: CodeCell,
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
            <FileCode2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Response Types
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure supported response payload formats (JSON, XML, TEXT, CSV).
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
            Add Response Type
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
        searchPlaceholder="Search response types..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <ResponseTypeModal />
      <ResponseTypeDeleteDialog />
    </div>
  );
}
