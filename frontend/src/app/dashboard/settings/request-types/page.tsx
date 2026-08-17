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

type TabType = "request-type" | "request-parameter" | "parameter-status";

function RequestTypeIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function RequestParamIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestParamRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function ParamStatusIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ParamStatusRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function RequestTypeIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestTypeRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function RequestParamIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestParamRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function ParamStatusIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ParamStatusRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
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
    if (tabParam && (tabParam === "request-type" || tabParam === "request-parameter" || tabParam === "parameter-status")) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`/dashboard/settings/request-types?tab=${tab}`);
  };

  // 1. Request Type Data & Queries
  const { data: requestTypesData, isLoading: isRTLoading, refetch: refetchRT } = useRequestTypeListQuery();
  const { openCreate: openRTCreate, openEdit: openRTEdit, openDelete: openRTDelete } = useRequestTypeModalStore();

  const displayRequestTypes = useMemo<RequestTypeRecord[]>(() => {
    if (requestTypesData && requestTypesData.length > 0) return requestTypesData;
    return DEFAULT_REQUEST_TYPES;
  }, [requestTypesData]);

  const requestTypeColumns = useMemo<ColumnDef<AppTableFeatures, RequestTypeRecord, unknown>[]>(
    () => [
      { accessorKey: "id", header: RequestTypeIdHeader, cell: RequestTypeIdCell },
      {
        accessorKey: "typeName",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Type Name" />,
        cell: ({ row }) => <span className="text-sm font-semibold text-foreground">{row.original.typeName}</span>,
      },
      {
        accessorKey: "requestCode",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Request Code" />,
        cell: ({ row }) => <span className="text-xs font-mono font-medium text-muted-foreground uppercase">{row.original.requestCode}</span>,
      },
      {
        accessorKey: "httpMethod",
        header: ({ column }) => <DataTableColumnHeader column={column} title="HTTP Method" />,
        cell: ({ row }) => <Badge variant="secondary" className="text-xs font-mono font-bold">{row.original.httpMethod}</Badge>,
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: () => <span className="text-xs font-semibold">Actions</span>,
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon-sm" onClick={() => openRTEdit(row.original.id, row.original)} className="h-8 w-8 hover:text-primary">
              <Edit2 className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => openRTDelete(row.original.id, row.original.typeName)} className="h-8 w-8 hover:text-destructive">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [openRTEdit, openRTDelete]
  );

  // 2. Request Parameter Data & Queries
  const { data: requestParamsData, isLoading: isRPLoading, refetch: refetchRP } = useRequestParamListQuery();
  const { openCreate: openRPCreate, openEdit: openRPEdit, openDelete: openRPDelete } = useRequestParamModalStore();

  const displayRequestParams = useMemo<RequestParamRecord[]>(() => {
    if (requestParamsData && requestParamsData.length > 0) return requestParamsData;
    return DEFAULT_REQUEST_PARAMS;
  }, [requestParamsData]);

  const requestParamColumns = useMemo<ColumnDef<AppTableFeatures, RequestParamRecord, unknown>[]>(
    () => [
      { accessorKey: "id", header: RequestParamIdHeader, cell: RequestParamIdCell },
      {
        accessorKey: "paramName",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Parameter Name" />,
        cell: ({ row }) => <span className="text-sm font-semibold text-foreground font-mono">{row.original.paramName}</span>,
      },
      {
        accessorKey: "paramType",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Data Type" />,
        cell: ({ row }) => <Badge variant="secondary" className="text-xs font-medium">{row.original.paramType}</Badge>,
      },
      {
        accessorKey: "isRequired",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Required?" />,
        cell: ({ row }) => {
          const req = String(row.original.isRequired).toLowerCase() === "true" || row.original.isRequired === "Yes";
          return req ? (
            <Badge variant="default" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">Required</Badge>
          ) : (
            <Badge variant="outline" className="text-xs">Optional</Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: () => <span className="text-xs font-semibold">Actions</span>,
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon-sm" onClick={() => openRPEdit(row.original.id, row.original)} className="h-8 w-8 hover:text-primary">
              <Edit2 className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => openRPDelete(row.original.id, row.original.paramName)} className="h-8 w-8 hover:text-destructive">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [openRPEdit, openRPDelete]
  );

  // 3. Parameter Status Data & Queries
  const { data: paramStatusesData, isLoading: isPSLoading, refetch: refetchPS } = useParamStatusListQuery();
  const { openCreate: openPSCreate, openEdit: openPSEdit, openDelete: openPSDelete } = useParamStatusModalStore();

  const displayParamStatuses = useMemo<ParamStatusRecord[]>(() => {
    if (paramStatusesData && paramStatusesData.length > 0) return paramStatusesData;
    return DEFAULT_PARAM_STATUSES;
  }, [paramStatusesData]);

  const paramStatusColumns = useMemo<ColumnDef<AppTableFeatures, ParamStatusRecord, unknown>[]>(
    () => [
      { accessorKey: "id", header: ParamStatusIdHeader, cell: ParamStatusIdCell },
      {
        accessorKey: "statusName",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Name" />,
        cell: ({ row }) => <span className="text-sm font-semibold text-foreground">{row.original.statusName}</span>,
      },
      {
        accessorKey: "statusCode",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Code" />,
        cell: ({ row }) => <span className="text-xs font-mono font-medium text-muted-foreground uppercase">{row.original.statusCode}</span>,
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: () => <span className="text-xs font-semibold">Actions</span>,
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon-sm" onClick={() => openPSEdit(row.original.id, row.original)} className="h-8 w-8 hover:text-primary">
              <Edit2 className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => openPSDelete(row.original.id, row.original.statusName)} className="h-8 w-8 hover:text-destructive">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [openPSEdit, openPSDelete]
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
              Configure API request types, dynamic parameters, and status codes.
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

          {activeTab === "request-parameter" && (
            <>
              <Button variant="outline" size="sm" onClick={() => void refetchRP()} disabled={isRPLoading} className="flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${isRPLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button onClick={openRPCreate} className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer">
                <Plus className="w-4 h-4" />
                Add Request Parameter
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
          onClick={() => handleTabChange("request-parameter")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === "request-parameter"
              ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sliders className="w-4 h-4" />
          Request Parameters
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

      {activeTab === "request-parameter" && (
        <DataTable
          columns={requestParamColumns}
          data={displayRequestParams}
          loading={isRPLoading}
          searchPlaceholder="Search parameters..."
          searchDebounceMs={300}
          containerHeight="580px"
        />
      )}

      {activeTab === "parameter-status" && (
        <DataTable
          columns={paramStatusColumns}
          data={displayParamStatuses}
          loading={isPSLoading}
          searchPlaceholder="Search statuses..."
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
