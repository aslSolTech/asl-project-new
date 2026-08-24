"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSystemSettingListQuery } from "@/modules/admin/master/systemSetting/hooks";
import { useSystemSettingModalStore } from "@/modules/admin/master/systemSetting/stores/useSystemSettingModalStore";
import { SystemSettingRecord } from "@/modules/admin/master/systemSetting/types";
import { SystemSettingModal } from "@/modules/admin/master/systemSetting/components/system-setting-modal";
import { SystemSettingDeleteDialog } from "@/modules/admin/master/systemSetting/components/system-setting-delete-dialog";
import {
  Settings,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, SystemSettingRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

// Helper cells
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, SystemSettingRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function SettingKeyHeader({ column }: Readonly<{ column: Column<AppTableFeatures, SystemSettingRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Setting Key" />;
}

function SettingKeyCell({ row }: Readonly<{ row: Row<AppTableFeatures, SystemSettingRecord> }>) {
  const val = row.original.settingKey;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function SettingValueHeader({ column }: Readonly<{ column: Column<AppTableFeatures, SystemSettingRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Setting Value" />;
}

function SettingValueCell({ row }: Readonly<{ row: Row<AppTableFeatures, SystemSettingRecord> }>) {
  const val = row.original.settingValue;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function DescriptionHeader({ column }: Readonly<{ column: Column<AppTableFeatures, SystemSettingRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Description" />;
}

function DescriptionCell({ row }: Readonly<{ row: Row<AppTableFeatures, SystemSettingRecord> }>) {
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

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, SystemSettingRecord> }>) {
  const { openEdit, openDelete } = useSystemSettingModalStore();
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
        onClick={() => openDelete(record.id, record.settingKey || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function SystemSettingPage() {
  const { data: listData, isLoading, isError, refetch } = useSystemSettingListQuery();
  const { openCreate } = useSystemSettingModalStore();

  const displayData = useMemo<SystemSettingRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
  {
    "id": "SET-001",
    "settingKey": "min_payout_limit",
    "settingValue": "100",
    "description": "Minimum payout transaction limit"
  },
  {
    "id": "SET-002",
    "settingKey": "max_payout_limit",
    "settingValue": "50000",
    "description": "Maximum payout transaction limit"
  }
];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, SystemSettingRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "settingKey",
        header: SettingKeyHeader,
        cell: SettingKeyCell,
      },
      {
        accessorKey: "settingValue",
        header: SettingValueHeader,
        cell: SettingValueCell,
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
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              System Setting
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official system setting configurations.
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
            Add System Setting
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
      <SystemSettingModal />
      <SystemSettingDeleteDialog />
    </div>
  );
}
