"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiRequestParameterListQuery } from "@/modules/admin/master/apiRequestParam/hooks";
import { useApiRequestParameterModalStore } from "@/modules/admin/master/apiRequestParam/stores/useApiRequestParameterModalStore";
import { ApiRequestParameterRecord } from "@/modules/admin/master/apiRequestParam/types";
import { ApiRequestParameterModal } from "@/modules/admin/master/apiRequestParam/components/api-request-parameter-modal";
import { ApiRequestParameterDeleteDialog } from "@/modules/admin/master/apiRequestParam/components/api-request-parameter-delete-dialog";
import {
  Sliders,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRequestParameterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

// Helper cells
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRequestParameterRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function ParamNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRequestParameterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Parameter Name" />;
}

function ParamNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRequestParameterRecord> }>) {
  const val = row.original.paramName;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function DataTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRequestParameterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Data Type" />;
}

function DataTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRequestParameterRecord> }>) {
  const val = row.original.dataType;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function RequiredHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRequestParameterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Is Required" />;
}

function RequiredCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRequestParameterRecord> }>) {
  const val = row.original.required;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function DescriptionHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRequestParameterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Description" />;
}

function DescriptionCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRequestParameterRecord> }>) {
  const val = row.original.description;
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

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRequestParameterRecord> }>) {
  const { openEdit, openDelete } = useApiRequestParameterModalStore();
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
        onClick={() => openDelete(record.id, record.paramName || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function ApiRequestParameterPage() {
  const { data: listData, isLoading, isError, refetch } = useApiRequestParameterListQuery();
  const { openCreate } = useApiRequestParameterModalStore();

  const displayData = useMemo<ApiRequestParameterRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
  {
    "id": "PAR-001",
    "paramName": "amount",
    "dataType": "number",
    "required": "true",
    "description": "Transaction amount in INR"
  }
];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, ApiRequestParameterRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "paramName",
        header: ParamNameHeader,
        cell: ParamNameCell,
      },
      {
        accessorKey: "dataType",
        header: DataTypeHeader,
        cell: DataTypeCell,
      },
      {
        accessorKey: "required",
        header: RequiredHeader,
        cell: RequiredCell,
      },
      {
        accessorKey: "description",
        header: DescriptionHeader,
        cell: DescriptionCell,
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
            <Sliders className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Request Parameter
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official request parameter configurations.
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
            Add Request Parameter
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
      <ApiRequestParameterModal />
      <ApiRequestParameterDeleteDialog />
    </div>
  );
}
