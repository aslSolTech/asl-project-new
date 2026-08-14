"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  useServiceControlListQuery,
  useUpdateServiceControlMutation,
} from "@/modules/admin/master/serviceControl/hooks";
import { useServiceControlModalStore } from "@/modules/admin/master/serviceControl/stores/useServiceControlModalStore";
import { ServiceControlRecord } from "@/modules/admin/master/serviceControl/types";
import { INITIAL_SERVICE_CONTROLS } from "@/modules/admin/master/serviceControl/constants";
import { ServiceControlModal } from "@/modules/admin/master/serviceControl/components/service-control-modal";
import { ServiceControlDeleteDialog } from "@/modules/admin/master/serviceControl/components/service-control-delete-dialog";
import {
  Sliders,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  CreditCard,
  Layers,
  Globe,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ServiceControlRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="#" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, ServiceControlRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function ServiceNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ServiceControlRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Service Name" />;
}

function ServiceNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, ServiceControlRecord> }>) {
  const isGateway = row.original.serviceName.toUpperCase().includes("GATEWAY");
  return (
    <div className="flex items-center gap-2.5 py-1">
      <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
        {isGateway ? <CreditCard className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
      </div>
      <span className="text-sm font-semibold tracking-tight text-foreground">
        {row.original.serviceName}
      </span>
    </div>
  );
}

function EndpointHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ServiceControlRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API Endpoint" />;
}

function EndpointCell({ row }: Readonly<{ row: Row<AppTableFeatures, ServiceControlRecord> }>) {
  const ep = row.original.endpoint;
  if (!ep) {
    return <span className="text-xs text-muted-foreground italic">-</span>;
  }
  return (
    <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded-md border border-border/40 w-fit max-w-[260px] truncate">
      <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
      <span className="truncate">{ep}</span>
    </div>
  );
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, ServiceControlRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status / Gateway" />;
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, ServiceControlRecord> }>) {
  const updateMutation = useUpdateServiceControlMutation();
  const record = row.original;
  const isGateway = record.serviceName.toUpperCase().includes("GATEWAY");

  if (isGateway) {
    return (
      <Badge
        variant="default"
        className="text-xs uppercase font-semibold bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25 border-blue-500/30"
      >
        {record.status}
      </Badge>
    );
  }

  const isEnabled = record.status === "1" || record.status === "active" || record.status === "true";

  const handleToggle = (checked: boolean) => {
    void updateMutation.mutateAsync({
      ...record,
      status: checked ? "1" : "0",
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={isEnabled}
        onCheckedChange={handleToggle}
        disabled={updateMutation.isPending}
        aria-label={`Toggle ${record.serviceName}`}
      />
      <Badge
        variant={isEnabled ? "default" : "outline"}
        className={`text-[11px] font-mono font-semibold uppercase ${
          isEnabled
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20"
            : "bg-muted/50 text-muted-foreground"
        }`}
      >
        {isEnabled ? "1 (Active)" : "0 (Inactive)"}
      </Badge>
    </div>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, ServiceControlRecord> }>) {
  const { openEdit, openDelete } = useServiceControlModalStore();
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
        onClick={() => openDelete(record.id, record.serviceName || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function ServiceControlPage() {
  const { data: listData, isLoading, isError, refetch } = useServiceControlListQuery();
  const { openCreate } = useServiceControlModalStore();

  const displayData = useMemo<ServiceControlRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [...INITIAL_SERVICE_CONTROLS];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, ServiceControlRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "serviceName",
        header: ServiceNameHeader,
        cell: ServiceNameCell,
      },
      {
        accessorKey: "endpoint",
        header: EndpointHeader,
        cell: EndpointCell,
      },
      {
        accessorKey: "status",
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
    <div className="mx-auto w-full">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <Sliders className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Service Status Control
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage service switches (0 / 1), dynamic API endpoints, and payment gateway.
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
            Add Service Status Control
          </Button>
        </div>
      </div>

      {isError && (
        <div className="p-4 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active master data.</span>
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
        searchPlaceholder="Search services..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <ServiceControlModal />
      <ServiceControlDeleteDialog />
    </div>
  );
}
