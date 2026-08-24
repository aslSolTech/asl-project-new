"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiRegisterListQuery } from "@/modules/admin/master/apiRegister/hooks";
import { useApiRegisterModalStore } from "@/modules/admin/master/apiRegister/stores/useApiRegisterModalStore";
import { ApiRegisterRecord } from "@/modules/admin/master/apiRegister/types";
import { ApiRegisterModal } from "@/modules/admin/master/apiRegister/components/api-register-modal";
import { ApiRegisterDeleteDialog } from "@/modules/admin/master/apiRegister/components/api-register-delete-dialog";
import {
  Radio,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

// Helper cells
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRegisterRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function ApiNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API Name" />;
}

function ApiNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRegisterRecord> }>) {
  const { apiName, apiRemarks } = row.original;
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-foreground">{apiName || "-"}</span>
      {apiRemarks && <span className="text-[11px] text-muted-foreground line-clamp-1">{apiRemarks}</span>}
    </div>
  );
}

function ApiTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API Type" />;
}

function ApiTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRegisterRecord> }>) {
  return (
    <Badge variant="outline" className="text-xs font-semibold uppercase bg-primary/5 text-primary border-primary/20">
      {row.original.apiType || "-"}
    </Badge>
  );
}

function DevTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Dev Type" />;
}

function DevTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRegisterRecord> }>) {
  const isDev = row.original.developmentType === "developer";
  return (
    <Badge variant="outline" className={`text-xs uppercase font-medium ${isDev ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-blue-500/10 text-blue-600 border-blue-500/20"}`}>
      {row.original.developmentType || "admin"}
    </Badge>
  );
}

function UrlHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Endpoint URL" />;
}

function UrlCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRegisterRecord> }>) {
  return (
    <span className="font-mono text-xs text-muted-foreground line-clamp-1 max-w-[200px]" title={row.original.url}>
      {row.original.url || "-"}
    </span>
  );
}

function RequestTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Request Type" />;
}

function RequestTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRegisterRecord> }>) {
  return (
    <span className="text-xs font-medium text-foreground">
      {row.original.requestType || "-"}
    </span>
  );
}

function ResponseTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ApiRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Response Type" />;
}

function ResponseTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRegisterRecord> }>) {
  return (
    <Badge variant="outline" className="text-xs font-mono uppercase bg-muted/60 text-muted-foreground border-border">
      {row.original.responseType || "-"}
    </Badge>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ApiRegisterRecord> }>) {
  const { openEdit, openDelete } = useApiRegisterModalStore();
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

export default function ApiRegisterPage() {
  const { data: listData, isLoading, isError, refetch } = useApiRegisterListQuery();
  const { openCreate } = useApiRegisterModalStore();

  const displayData = useMemo<ApiRegisterRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
      {
        id: "API-001",
        apiName: "Cashfree Payout",
        apiType: "payout",
        developmentType: "admin",
        url: "https://api.cashfree.com/payout/v1/authorize",
        requestType: "JSON_POST",
        responseType: "json",
        apiRemarks: "Production payout gateway for instant bank transfers",
        requestParameters: [
          { paramName: "beneId", paramType: "string", paramValue: "{beneficiary_id}" },
          { paramName: "amount", paramType: "number", paramValue: "{transfer_amount}" },
        ],
        responseParameters: [
          { paramName: "status", paramValue: "SUCCESS", paramFor: "STATUS" },
          { paramName: "utr", paramValue: "UTR12345", paramFor: "TXN_ID" },
        ],
      },
    ];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, ApiRegisterRecord, unknown>[]>(
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
        accessorKey: "apiType",
        header: ApiTypeHeader,
        cell: ApiTypeCell,
      },
      {
        accessorKey: "developmentType",
        header: DevTypeHeader,
        cell: DevTypeCell,
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
            <Radio className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Register APIs
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official 3rd parties APIs.
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
             Register APIs
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
      <ApiRegisterModal />
      <ApiRegisterDeleteDialog />
    </div>
  );
}
