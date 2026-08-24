"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiTypeListQuery } from "@/modules/admin/settings/api-type/hooks";
import { useApiTypeModalStore } from "@/modules/admin/settings/api-type/stores/useApiTypeModalStore";
import { ApiTypeRecord } from "@/modules/admin/settings/api-type/types";
import { ApiTypeModal } from "@/modules/admin/settings/api-type/components/api-type-modal";
import { ApiTypeDeleteDialog } from "@/modules/admin/settings/api-type/components/api-type-delete-dialog";
import { DEFAULT_API_TYPES } from "@/modules/admin/settings/api-type/constants";
import { Server, Plus, Edit2, Trash2, RefreshCw, FileText } from "lucide-react";

function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiTypeRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function ApiTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API Type" />;
}

function ApiTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiTypeRecord> }>) {
  return <span className="text-sm font-semibold text-foreground">{row.original.apiType}</span>;
}

function WalletTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Wallet Type" />;
}

function WalletTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiTypeRecord> }>) {
  return (
    <Badge variant="secondary" className="text-xs font-mono uppercase">
      {row.original.walletType}
    </Badge>
  );
}

function RequestParamsHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Request Params" />;
}

function RequestParamsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiTypeRecord> }>) {
  const params = row.original.requestParams ?? [];
  if (params.length === 0) return <span className="text-xs text-muted-foreground">None</span>;
  return (
    <div className="flex flex-wrap gap-1 max-w-[200px]">
      {params.slice(0, 3).map((p) => (
        <Badge key={p} variant="outline" className="text-[10px] font-mono px-1.5 py-0">
          {p}
        </Badge>
      ))}
      {params.length > 3 && (
        <span className="text-[10px] text-muted-foreground font-medium">+{params.length - 3}</span>
      )}
    </div>
  );
}

function ResponseParamsHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Response Params" />;
}

function ResponseParamsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiTypeRecord> }>) {
  const params = row.original.responseParams ?? [];
  if (params.length === 0) return <span className="text-xs text-muted-foreground">None</span>;
  return (
    <div className="flex flex-wrap gap-1 max-w-[200px]">
      {params.slice(0, 3).map((p) => (
        <Badge key={p} variant="outline" className="text-[10px] font-mono px-1.5 py-0 bg-primary/5 text-primary border-primary/20">
          {p}
        </Badge>
      ))}
      {params.length > 3 && (
        <span className="text-[10px] text-muted-foreground font-medium">+{params.length - 3}</span>
      )}
    </div>
  );
}

function DisplayPdfHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Display PDF" />;
}

function DisplayPdfCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiTypeRecord> }>) {
  const isPdf = row.original.isDisplayPdf;
  if (isPdf) {
    return (
      <Badge variant="default" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 flex items-center gap-1 w-fit">
        <FileText className="w-3 h-3" />
        Yes
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs text-muted-foreground w-fit">
      No
    </Badge>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiTypeRecord> }>) {
  const { openEdit, openDelete } = useApiTypeModalStore();
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
        onClick={() => openDelete(record.id, record.apiType || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function ApiTypesPage() {
  const { data: listData, isLoading, isError, refetch } = useApiTypeListQuery();
  const { openCreate } = useApiTypeModalStore();

  const displayData = useMemo<ApiTypeRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return DEFAULT_API_TYPES;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, ApiTypeRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "apiType",
        header: ApiTypeHeader,
        cell: ApiTypeCell,
      },
      {
        accessorKey: "walletType",
        header: WalletTypeHeader,
        cell: WalletTypeCell,
      },
      {
        accessorKey: "requestParams",
        header: RequestParamsHeader,
        cell: RequestParamsCell,
      },
      {
        accessorKey: "responseParams",
        header: ResponseParamsHeader,
        cell: ResponseParamsCell,
      },
      {
        accessorKey: "isDisplayPdf",
        header: DisplayPdfHeader,
        cell: DisplayPdfCell,
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
            <Server className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              API Types
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure API Types with request/response parameter mapping, wallet types, and PDF display rules.
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
            Add API Type
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
        searchPlaceholder="Search API types..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <ApiTypeModal />
      <ApiTypeDeleteDialog />
    </div>
  );
}
