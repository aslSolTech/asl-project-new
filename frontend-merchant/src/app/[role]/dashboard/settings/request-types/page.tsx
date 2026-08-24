"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useRequestTypeListQuery,
  useRequestParamListQuery,
  useParamStatusListQuery,
} from "@/modules/admin/settings/request-types/hooks";
import {
  useRequestTypeModalStore,
  useRequestParamModalStore,
  useParamStatusModalStore,
} from "@/modules/admin/settings/request-types/stores/useRequestTypeModalStores";
import {
  RequestTypeRecord,
  RequestParamRecord,
  ParamStatusRecord,
} from "@/modules/admin/settings/request-types/types";
import {
  DEFAULT_REQUEST_TYPES,
  DEFAULT_REQUEST_PARAMS,
  DEFAULT_PARAM_STATUSES,
} from "@/modules/admin/settings/request-types/constants";
import {
  RequestTypeModal,
  RequestTypeDeleteDialog,
  RequestParamModal,
  RequestParamDeleteDialog,
  ParamStatusModal,
  ParamStatusDeleteDialog,
} from "@/modules/admin/settings/request-types/components/request-types-modals";
import {
  GitPullRequest,
  Sliders,
  CheckCircle,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

type TabType = "request-type" | "parameter-type" | "parameter-status";

// -------------------------------------------------------------
// Request Type Columns & Cell Functions
// -------------------------------------------------------------
function RequestTypeIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function RequestTypeIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestTypeRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function RequestTypeNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Type Name" />;
}

function RequestTypeNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestTypeRecord> }>) {
  return <span className="text-sm font-semibold text-foreground">{row.original.typeName}</span>;
}

function RequestTypeCodeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Request Code" />;
}

function RequestTypeCodeCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestTypeRecord> }>) {
  return <span className="text-xs font-mono font-medium text-muted-foreground uppercase">{row.original.requestCode}</span>;
}

function RequestTypeMethodHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="HTTP Method" />;
}

function RequestTypeMethodCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestTypeRecord> }>) {
  return <Badge variant="secondary" className="text-xs font-mono font-bold">{row.original.httpMethod}</Badge>;
}

function RequestTypeStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function RequestTypeStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestTypeRecord> }>) {
  return <StatusBadge status={row.original.status} />;
}

function RequestTypeActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestTypeRecord> }>) {
  const { openEdit, openDelete } = useRequestTypeModalStore();
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit"
        className="h-8 w-8 hover:text-primary"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.typeName)}
        title="Delete"
        className="h-8 w-8 hover:text-destructive"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

// -------------------------------------------------------------
// Parameter Type Columns & Cell Functions
// -------------------------------------------------------------
function ParameterTypeIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestParamRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function ParameterTypeIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestParamRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-primary/5 text-primary border border-primary/20">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function ParameterTypeNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestParamRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Parameter Name" />;
}

function ParameterTypeNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestParamRecord> }>) {
  return <span className="text-sm font-semibold text-foreground">{row.original.paramName}</span>;
}

function ParameterTypeSlugHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestParamRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Slug" />;
}

function ParameterTypeSlugCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestParamRecord> }>) {
  return <span className="text-xs font-mono font-medium text-muted-foreground">{row.original.slug}</span>;
}

function ParameterTypeActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestParamRecord> }>) {
  const { openEdit, openDelete } = useRequestParamModalStore();
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit"
        className="h-8 w-8 hover:text-primary"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.paramName)}
        title="Delete"
        className="h-8 w-8 hover:text-destructive"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

// -------------------------------------------------------------
// Parameter Status Columns & Cell Functions
// -------------------------------------------------------------
function ParamStatusIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ParamStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function ParamStatusIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ParamStatusRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-secondary/70 text-secondary-foreground border border-secondary">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function ParamStatusNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ParamStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status Name" />;
}

function ParamStatusNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, ParamStatusRecord> }>) {
  return <span className="text-sm font-semibold text-foreground">{row.original.statusName}</span>;
}

function ParamStatusCodeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ParamStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status Code" />;
}

function ParamStatusCodeCell({ row }: Readonly<{ row: Row<AppTableFeatures, ParamStatusRecord> }>) {
  return <span className="text-xs font-mono font-medium text-muted-foreground uppercase">{row.original.statusCode}</span>;
}

function ParamStatusStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ParamStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function ParamStatusStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, ParamStatusRecord> }>) {
  return <StatusBadge status={row.original.status} />;
}

function ParamStatusActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ParamStatusRecord> }>) {
  const { openEdit, openDelete } = useParamStatusModalStore();
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit"
        className="h-8 w-8 hover:text-primary"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.statusName)}
        title="Delete"
        className="h-8 w-8 hover:text-destructive"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function StatusBadge({ status }: Readonly<{ status: string }>) {
  const val = String(status).toLowerCase();
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">Active</Badge>;
  }
  return <Badge variant="outline" className="text-xs uppercase">Inactive</Badge>;
}

export default function RequestTypesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || "request-type");

  useEffect(() => {
    if (tabParam && (tabParam === "request-type" || tabParam === "parameter-type" || tabParam === "parameter-status")) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`/dashboard/settings/request-types?tab=${tab}`);
  };

  // 1. Request Type Data & Queries
  const { data: requestTypesData, isLoading: isRTLoading, refetch: refetchRT } = useRequestTypeListQuery();
  const { openCreate: openRTCreate } = useRequestTypeModalStore();

  const displayRequestTypes = useMemo<RequestTypeRecord[]>(() => {
    if (requestTypesData && requestTypesData.length > 0) return requestTypesData;
    return DEFAULT_REQUEST_TYPES;
  }, [requestTypesData]);

  const requestTypeColumns = useMemo<ColumnDef<AppTableFeatures, RequestTypeRecord, unknown>[]>(
    () => [
      { accessorKey: "id", header: RequestTypeIdHeader, cell: RequestTypeIdCell },
      { accessorKey: "typeName", header: RequestTypeNameHeader, cell: RequestTypeNameCell },
      { accessorKey: "requestCode", header: RequestTypeCodeHeader, cell: RequestTypeCodeCell },
      { accessorKey: "httpMethod", header: RequestTypeMethodHeader, cell: RequestTypeMethodCell },
      { accessorKey: "status", header: RequestTypeStatusHeader, cell: RequestTypeStatusCell },
      {
        id: "actions",
        header: ActionsHeader,
        cell: RequestTypeActionsCell,
        enableSorting: false,
      },
    ],
    []
  );

  // 2. Parameter Type Data & Queries
  const { data: requestParamsData, isLoading: isRPLoading, refetch: refetchRP } = useRequestParamListQuery();
  const { openCreate: openRPCreate } = useRequestParamModalStore();

  const displayRequestParams = useMemo<RequestParamRecord[]>(() => {
    if (requestParamsData && requestParamsData.length > 0) return requestParamsData;
    return DEFAULT_REQUEST_PARAMS;
  }, [requestParamsData]);

  const requestParamColumns = useMemo<ColumnDef<AppTableFeatures, RequestParamRecord, unknown>[]>(
    () => [
      { accessorKey: "id", header: ParameterTypeIdHeader, cell: ParameterTypeIdCell },
      { accessorKey: "paramName", header: ParameterTypeNameHeader, cell: ParameterTypeNameCell },
      { accessorKey: "slug", header: ParameterTypeSlugHeader, cell: ParameterTypeSlugCell },
      {
        id: "actions",
        header: ActionsHeader,
        cell: ParameterTypeActionsCell,
        enableSorting: false,
      },
    ],
    []
  );

  // 3. Parameter Status Data & Queries
  const { data: paramStatusesData, isLoading: isPSLoading, refetch: refetchPS } = useParamStatusListQuery();
  const { openCreate: openPSCreate } = useParamStatusModalStore();

  const displayParamStatuses = useMemo<ParamStatusRecord[]>(() => {
    if (paramStatusesData && paramStatusesData.length > 0) return paramStatusesData;
    return DEFAULT_PARAM_STATUSES;
  }, [paramStatusesData]);

  const paramStatusColumns = useMemo<ColumnDef<AppTableFeatures, ParamStatusRecord, unknown>[]>(
    () => [
      { accessorKey: "id", header: ParamStatusIdHeader, cell: ParamStatusIdCell },
      { accessorKey: "statusName", header: ParamStatusNameHeader, cell: ParamStatusNameCell },
      { accessorKey: "statusCode", header: ParamStatusCodeHeader, cell: ParamStatusCodeCell },
      { accessorKey: "status", header: ParamStatusStatusHeader, cell: ParamStatusStatusCell },
      {
        id: "actions",
        header: ActionsHeader,
        cell: ParamStatusActionsCell,
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
            <GitPullRequest className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Request Types & Parameters
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure API request types, parameter types, and status codes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "request-type" && (
            <>
              <Button variant="outline" size="sm" onClick={() => void refetchRT()} disabled={isRTLoading} className="flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${isRTLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button onClick={openRTCreate} className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer">
                <Plus className="w-4 h-4" />
                Add Request Type
              </Button>
            </>
          )}

          {activeTab === "parameter-type" && (
            <>
              <Button variant="outline" size="sm" onClick={() => void refetchRP()} disabled={isRPLoading} className="flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${isRPLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button onClick={openRPCreate} className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer">
                <Plus className="w-4 h-4" />
                Add Parameter Type
              </Button>
            </>
          )}

          {activeTab === "parameter-status" && (
            <>
              <Button variant="outline" size="sm" onClick={() => void refetchPS()} disabled={isPSLoading} className="flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${isPSLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button onClick={openPSCreate} className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer">
                <Plus className="w-4 h-4" />
                Add Parameter Status
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-muted/60 border border-border/50 rounded-xl my-6 w-fit flex-wrap">
        <button
          type="button"
          onClick={() => handleTabChange("request-type")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === "request-type"
              ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <GitPullRequest className="w-4 h-4" />
          Request Types
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("parameter-type")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === "parameter-type"
              ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sliders className="w-4 h-4" />
          Parameter Types
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("parameter-status")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === "parameter-status"
              ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          Parameter Statuses
        </button>
      </div>

      {/* Main Virtualized Data Table for Active Tab */}
      {activeTab === "request-type" && (
        <DataTable
          columns={requestTypeColumns}
          data={displayRequestTypes}
          loading={isRTLoading}
          searchPlaceholder="Search request types..."
          searchDebounceMs={300}
          containerHeight="580px"
        />
      )}

      {activeTab === "parameter-type" && (
        <DataTable
          columns={requestParamColumns}
          data={displayRequestParams}
          loading={isRPLoading}
          searchPlaceholder="Search parameter types..."
          searchDebounceMs={300}
          containerHeight="580px"
        />
      )}

      {activeTab === "parameter-status" && (
        <DataTable
          columns={paramStatusColumns}
          data={displayParamStatuses}
          loading={isPSLoading}
          searchPlaceholder="Search parameter statuses..."
          searchDebounceMs={300}
          containerHeight="580px"
        />
      )}

      {/* Modals and Delete Dialogs */}
      <RequestTypeModal />
      <RequestTypeDeleteDialog />
      <RequestParamModal />
      <RequestParamDeleteDialog />
      <ParamStatusModal />
      <ParamStatusDeleteDialog />
    </div>
  );
}
