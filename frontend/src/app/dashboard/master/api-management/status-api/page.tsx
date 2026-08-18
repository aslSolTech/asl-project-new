"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiStatusListQuery } from "@/modules/admin/master/apiStatus/hooks";
import { useApiStatusModalStore } from "@/modules/admin/master/apiStatus/stores/useApiStatusModalStore";
import { ApiStatusRecord } from "@/modules/admin/master/apiStatus/types";
import { ApiStatusModal } from "@/modules/admin/master/apiStatus/components/api-status-modal";
import { ApiStatusDeleteDialog } from "@/modules/admin/master/apiStatus/components/api-status-delete-dialog";
import {
  Activity,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

// Helper cells
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiStatusRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function ApiNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API Name" />;
}

function ApiNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiStatusRecord> }>) {
  const { apiName, apiRemarks } = row.original;
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-foreground">{apiName || "-"}</span>
      {apiRemarks && <span className="text-[11px] text-muted-foreground line-clamp-1">{apiRemarks}</span>}
    </div>
  );
}

function StatusForHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status For" />;
}

function StatusForCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiStatusRecord> }>) {
  return (
    <Badge variant="outline" className="text-xs font-semibold uppercase bg-primary/5 text-primary border-primary/20">
      {row.original.statusFor || row.original.method || "-"}
    </Badge>
  );
}

function UrlHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Endpoint URL" />;
}

function UrlCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiStatusRecord> }>) {
  const url = row.original.url || row.original.endpoint || "-";
  return (
    <span className="font-mono text-xs text-muted-foreground line-clamp-1 max-w-[200px]" title={url}>
      {url}
    </span>
  );
}

function RequestTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Request Type" />;
}

function RequestTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiStatusRecord> }>) {
  return (
    <span className="text-xs font-medium text-foreground">
      {row.original.requestType || row.original.method || "-"}
    </span>
  );
}

function ResponseTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Response Type" />;
}

function ResponseTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiStatusRecord> }>) {
  return (
    <Badge variant="outline" className="text-xs font-mono uppercase bg-muted/60 text-muted-foreground border-border">
      {row.original.responseType || "JSON"}
    </Badge>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiStatusRecord> }>) {
  const { openEdit, openDelete } = useApiStatusModalStore();
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
        onClick={() => openDelete(record.id, record.apiName || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function ApiStatusPage() {
  const { data: listData, isLoading, isError, refetch } = useApiStatusListQuery();
  const { openCreate } = useApiStatusModalStore();

  const displayData = useMemo<ApiStatusRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
      {
        id: "ST-001",
        apiName: "Payzones Status",
        statusFor: "payout",
        url: "https://api.cashfree.com/payout/v1/getTransferStatus",
        requestType: "JSON_POST",
        responseType: "json",
        apiRemarks: "Production payout transfer status check",
        requestParameters: [
          { paramName: "transferId", paramType: "string", paramValue: "{transfer_id}" },
        ],
        responseParameters: [
          { paramName: "status", paramValue: "SUCCESS", paramFor: "STATUS" },
          { paramName: "utr", paramValue: "UTR12345", paramFor: "TXN_ID" },
        ],
      },
    ];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, ApiStatusRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "apiName",
        header: ApiNameHeader,
        cell: ApiNameCell,
      },
      {
        accessorKey: "statusFor",
        header: StatusForHeader,
        cell: StatusForCell,
      },
      {
        accessorKey: "url",
        header: UrlHeader,
        cell: UrlCell,
      },
      {
        accessorKey: "requestType",
        header: RequestTypeHeader,
        cell: RequestTypeCell,
      },
      {
        accessorKey: "responseType",
        header: ResponseTypeHeader,
        cell: ResponseTypeCell,
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
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Status APIs
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official status APIs configurations.
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
            Add Status API
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
      <ApiStatusModal />
      <ApiStatusDeleteDialog />
    </div>
  );
}
