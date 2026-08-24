"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useResponseTypeListQuery,
  useResponseParamListQuery,
} from "@/modules/admin/settings/response-type/hooks";
import {
  useResponseTypeModalStore,
  useResponseParamModalStore,
} from "@/modules/admin/settings/response-type/stores/useResponseTypeModalStore";
import {
  ResponseTypeRecord,
  ResponseParamRecord,
} from "@/modules/admin/settings/response-type/types";
import {
  DEFAULT_RESPONSE_TYPES,
  DEFAULT_RESPONSE_PARAMS,
} from "@/modules/admin/settings/response-type/constants";
import {
  ResponseTypeModal,
  ResponseTypeDeleteDialog,
  ResponseParamModal,
  ResponseParamDeleteDialog,
} from "@/modules/admin/settings/response-type/components/response-param-modals";
import { FileCode2, Sliders, Plus, Edit2, Trash2, RefreshCw } from "lucide-react";

type TabType = "response-type" | "response-parameter";

// -------------------------------------------------------------
// Response Type Columns & Cell Functions
// -------------------------------------------------------------
function ResponseTypeIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ResponseTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function ResponseTypeIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ResponseTypeRecord> }>) {
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

function ResponseTypeActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ResponseTypeRecord> }>) {
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
        onClick={() => openDelete(record.id, record.responseFormat)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

// -------------------------------------------------------------
// Response Parameter Columns & Cell Functions
// -------------------------------------------------------------
function ResponseParamIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ResponseParamRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function ResponseParamIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ResponseParamRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-primary/5 text-primary border border-primary/20">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function ResponseParamNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ResponseParamRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Parameter Name" />;
}

function ResponseParamNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, ResponseParamRecord> }>) {
  return <span className="text-sm font-semibold text-foreground">{row.original.paramName}</span>;
}

function ResponseParamSlugHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ResponseParamRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Slug" />;
}

function ResponseParamSlugCell({ row }: Readonly<{ row: Row<AppTableFeatures, ResponseParamRecord> }>) {
  return <span className="text-xs font-mono font-medium text-muted-foreground">{row.original.slug}</span>;
}

function ResponseParamActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ResponseParamRecord> }>) {
  const { openEdit, openDelete } = useResponseParamModalStore();
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

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

export default function ResponseTypesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || "response-type");

  useEffect(() => {
    if (tabParam && (tabParam === "response-type" || tabParam === "response-parameter")) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`/dashboard/settings/response-types?tab=${tab}`);
  };

  // 1. Response Type Queries
  const { data: responseTypesData, isLoading: isRTLoading, isError: isRTError, refetch: refetchRT } = useResponseTypeListQuery();
  const { openCreate: openRTCreate } = useResponseTypeModalStore();

  const displayResponseTypes = useMemo<ResponseTypeRecord[]>(() => {
    if (responseTypesData && responseTypesData.length > 0) {
      return responseTypesData;
    }
    return DEFAULT_RESPONSE_TYPES;
  }, [responseTypesData]);

  const responseTypeColumns = useMemo<ColumnDef<AppTableFeatures, ResponseTypeRecord, unknown>[]>(
    () => [
      { accessorKey: "id", header: ResponseTypeIdHeader, cell: ResponseTypeIdCell },
      { accessorKey: "responseFormat", header: ResponseFormatHeader, cell: ResponseFormatCell },
      {
        id: "actions",
        header: ActionsHeader,
        cell: ResponseTypeActionsCell,
        enableSorting: false,
      },
    ],
    []
  );

  // 2. Response Parameter Queries
  const { data: responseParamsData, isLoading: isRPLoading, isError: isRPError, refetch: refetchRP } = useResponseParamListQuery();
  const { openCreate: openRPCreate } = useResponseParamModalStore();

  const displayResponseParams = useMemo<ResponseParamRecord[]>(() => {
    if (responseParamsData && responseParamsData.length > 0) {
      return responseParamsData;
    }
    return DEFAULT_RESPONSE_PARAMS;
  }, [responseParamsData]);

  const responseParamColumns = useMemo<ColumnDef<AppTableFeatures, ResponseParamRecord, unknown>[]>(
    () => [
      { accessorKey: "id", header: ResponseParamIdHeader, cell: ResponseParamIdCell },
      { accessorKey: "paramName", header: ResponseParamNameHeader, cell: ResponseParamNameCell },
      { accessorKey: "slug", header: ResponseParamSlugHeader, cell: ResponseParamSlugCell },
      {
        id: "actions",
        header: ActionsHeader,
        cell: ResponseParamActionsCell,
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
              Response Types & Parameters
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure supported response formats and response parameter fields.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "response-type" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void refetchRT()}
                disabled={isRTLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRTLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={openRTCreate}
                className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Response Type
              </Button>
            </>
          )}

          {activeTab === "response-parameter" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void refetchRP()}
                disabled={isRPLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRPLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={openRPCreate}
                className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Response Parameter
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-muted/60 border border-border/50 rounded-xl my-6 w-fit flex-wrap">
        <button
          type="button"
          onClick={() => handleTabChange("response-type")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === "response-type"
              ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          Response Types
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("response-parameter")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === "response-parameter"
              ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sliders className="w-4 h-4" />
          Response Parameters
        </button>
      </div>

      {((activeTab === "response-type" && isRTError) || (activeTab === "response-parameter" && isRPError)) && (
        <div className="p-4 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active local data.</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (activeTab === "response-type") {
                refetchRT();
              } else {
                refetchRP();
              }
            }}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Main Virtualized Data Table */}
      {activeTab === "response-type" && (
        <DataTable
          columns={responseTypeColumns}
          data={displayResponseTypes}
          loading={isRTLoading}
          searchPlaceholder="Search response types..."
          searchDebounceMs={300}
          containerHeight="580px"
        />
      )}

      {activeTab === "response-parameter" && (
        <DataTable
          columns={responseParamColumns}
          data={displayResponseParams}
          loading={isRPLoading}
          searchPlaceholder="Search response parameters..."
          searchDebounceMs={300}
          containerHeight="580px"
        />
      )}

      {/* Modals & Dialogs */}
      <ResponseTypeModal />
      <ResponseTypeDeleteDialog />
      <ResponseParamModal />
      <ResponseParamDeleteDialog />
    </div>
  );
}

