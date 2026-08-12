"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiBalanceListQuery } from "@/modules/admin/master/apiBalance/hooks";
import { useApiBalanceModalStore } from "@/modules/admin/master/apiBalance/stores/useApiBalanceModalStore";
import { ApiBalanceRecord } from "@/modules/admin/master/apiBalance/types";
import { ApiBalanceModal } from "@/modules/admin/master/apiBalance/components/api-balance-modal";
import { ApiBalanceDeleteDialog } from "@/modules/admin/master/apiBalance/components/api-balance-delete-dialog";
import {
  Wallet,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiBalanceRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

// Helper cells
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiBalanceRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function ProviderHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiBalanceRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Provider Name" />;
}

function ProviderCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiBalanceRecord> }>) {
  const val = row.original.provider;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function EndpointHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiBalanceRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Balance Endpoint" />;
}

function EndpointCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiBalanceRecord> }>) {
  const val = row.original.endpoint;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function CurrencyHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiBalanceRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Currency Code" />;
}

function CurrencyCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiBalanceRecord> }>) {
  const val = row.original.currency;
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

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiBalanceRecord> }>) {
  const { openEdit, openDelete } = useApiBalanceModalStore();
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
        onClick={() => openDelete(record.id, record.provider || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function ApiBalancePage() {
  const { data: listData, isLoading, isError, refetch } = useApiBalanceListQuery();
  const { openCreate } = useApiBalanceModalStore();

  const displayData = useMemo<ApiBalanceRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
  {
    "id": "BAL-001",
    "provider": "Payzones",
    "endpoint": "/v1/balance",
    "currency": "INR"
  }
];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, ApiBalanceRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "provider",
        header: ProviderHeader,
        cell: ProviderCell,
      },
      {
        accessorKey: "endpoint",
        header: EndpointHeader,
        cell: EndpointCell,
      },
      {
        accessorKey: "currency",
        header: CurrencyHeader,
        cell: CurrencyCell,
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
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Balance API Setup
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official balance api configurations.
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
            Add Balance API
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
      <ApiBalanceModal />
      <ApiBalanceDeleteDialog />
    </div>
  );
}
