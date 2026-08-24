"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useCronSettingListQuery, useUpdateCronSettingMutation } from "@/modules/admin/master/cronSetting/hooks";
import { useCronSettingModalStore } from "@/modules/admin/master/cronSetting/stores/useCronSettingModalStore";
import { CronSettingRecord } from "@/modules/admin/master/cronSetting/types";
import { DEFAULT_CRON_SETTING_LIST } from "@/modules/admin/master/cronSetting/constants";
import { CronSettingModal } from "@/modules/admin/master/cronSetting/components/cron-setting-modal";
import { CronSettingDeleteDialog } from "@/modules/admin/master/cronSetting/components/cron-setting-delete-dialog";
import {
  Clock,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Zap,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CronSettingRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

// Helper cells
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, CronSettingRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function CronNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CronSettingRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Cron / Service Name" />;
}

function CronNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, CronSettingRecord> }>) {
  const { cronName, serviceKey } = row.original;
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground">{cronName || "-"}</span>
        {serviceKey && (
          <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0 uppercase">
            {serviceKey}
          </Badge>
        )}
      </div>
    </div>
  );
}

function ScheduleHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CronSettingRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Schedule (Cron)" />;
}

function ScheduleCell({ row }: Readonly<{ row: Row<AppTableFeatures, CronSettingRecord> }>) {
  const val = row.original.schedule;
  return (
    <span className="font-mono text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground font-medium">
      {val || "-"}
    </span>
  );
}

function EndpointHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CronSettingRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Target Endpoint" />;
}

function EndpointCell({ row }: Readonly<{ row: Row<AppTableFeatures, CronSettingRecord> }>) {
  const val = row.original.endpoint;
  return (
    <span className="font-mono text-xs text-muted-foreground">
      {val || "-"}
    </span>
  );
}

function DescriptionHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CronSettingRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Description" />;
}

function DescriptionCell({ row }: Readonly<{ row: Row<AppTableFeatures, CronSettingRecord> }>) {
  const val = row.original.description;
  return <span className="text-xs text-muted-foreground line-clamp-2 max-w-sm">{val || "-"}</span>;
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CronSettingRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, CronSettingRecord> }>) {
  const updateMutation = useUpdateCronSettingMutation();
  const record = row.original;
  const isActive = record.isActive ?? true;

  const handleToggle = () => {
    updateMutation.mutate({
      ...record,
      isActive: !isActive,
    });
  };

  return (
    <div className="flex items-center gap-2.5">
      <Switch
        checked={isActive}
        onCheckedChange={handleToggle}
        disabled={updateMutation.isPending}
        size="sm"
        aria-label={`Toggle ${record.cronName} status`}
      />
      <Badge
        variant={isActive ? "default" : "outline"}
        className={`text-[11px] font-medium ${
          isActive
            ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/30 dark:text-emerald-400"
            : "text-muted-foreground border-border"
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, CronSettingRecord> }>) {
  const { openEdit, openDelete } = useCronSettingModalStore();
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
        onClick={() => openDelete(record.id, record.cronName || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function CronSettingPage() {
  const { data: listData, isLoading, isError, refetch } = useCronSettingListQuery();
  const { openCreate } = useCronSettingModalStore();

  const displayData = useMemo<CronSettingRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [...DEFAULT_CRON_SETTING_LIST];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, CronSettingRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "cronName",
        header: CronNameHeader,
        cell: CronNameCell,
      },
      {
        accessorKey: "schedule",
        header: ScheduleHeader,
        cell: ScheduleCell,
      },
      {
        accessorKey: "endpoint",
        header: EndpointHeader,
        cell: EndpointCell,
      },
      {
        accessorKey: "description",
        header: DescriptionHeader,
        cell: DescriptionCell,
      },
      {
        accessorKey: "isActive",
        header: StatusHeader,
        cell: StatusCell,
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
    <div className="mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Cron Setting & Services
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage automatic background cron jobs (DMT, UPI, AEPS, BBPS, Recharge, PAN, Payout) and toggle active/inactive status.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={isLoading}
            className="flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={openCreate}
            className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add a Cron Scheduler
          </Button>
        </div>
      </div>

      {/* Quick Summary Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mr-1">
          <Zap className="w-3.5 h-3.5 text-primary" /> Supported Services:
        </span>
        {["DMT", "UPI", "AEPS", "BBPS", "Recharge", "PAN", "Payout", "Wallet"].map((svc) => (
          <Badge key={svc} variant="outline" className="text-xs bg-muted/30">
            {svc}
          </Badge>
        ))}
      </div>

      {isError && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active master constant services data.</span>
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
        searchPlaceholder="Search cron services..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <CronSettingModal />
      <CronSettingDeleteDialog />
    </div>
  );
}
