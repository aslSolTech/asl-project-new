"use client";

import { useMemo, useState } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  useOperatorListQuery,
  useUpdateOperatorMutation,
} from "@/modules/admin/services/provider-routes/operator/hooks";
import { useOperatorModalStore } from "@/modules/admin/services/provider-routes/operator/stores/useOperatorModalStore";
import { OperatorRecord } from "@/modules/admin/services/provider-routes/operator/types";
import { OperatorModal } from "@/modules/admin/services/provider-routes/operator/components/operator-modal";
import { OperatorDeleteDialog } from "@/modules/admin/services/provider-routes/operator/components/operator-delete-dialog";
import { StatusSecretKeyModal } from "@/modules/admin/services/service/shared/components/status-toggle-modal";
import {
  Route,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Zap,
  Cpu,
  Layers,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function OperatorTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Operator Type" />;
}

function OperatorTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRecord> }>) {
  const typeName = row.original.operatorTypeName || row.original.operatorTypeId || "-";
  return (
    <div className="flex items-center gap-1.5 font-medium text-sm text-foreground">
      <Layers className="w-3.5 h-3.5 text-primary/70 shrink-0" />
      <span>{typeName}</span>
    </div>
  );
}

function OperatorNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Operator" />;
}

function OperatorNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRecord> }>) {
  const opName = row.original.operatorName || row.original.operatorId || "-";
  return (
    <div className="flex items-center gap-1.5 font-semibold text-sm text-foreground">
      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      <span>{opName}</span>
    </div>
  );
}

function ApisHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Assigned Routing APIs" />;
}

function ApisCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRecord> }>) {
  const names = row.original.apiNames && row.original.apiNames.length > 0
    ? row.original.apiNames
    : row.original.apiIds || [];

  if (names.length === 0) {
    return <span className="text-xs text-muted-foreground italic">No API Assigned</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 max-w-xs">
      {names.map((api, idx) => (
        <Badge
          key={`${api}-${idx}`}
          variant="outline"
          className="text-xs px-2 py-0.5 bg-primary/5 text-primary border-primary/20 flex items-center gap-1"
        >
          <Cpu className="w-3 h-3 opacity-70" />
          <span>{api}</span>
          {idx === 0 && (
            <span className="ml-1 text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
              [Primary]
            </span>
          )}
        </Badge>
      ))}
    </div>
  );
}

function FallbackHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Fallback" />;
}

function FallbackCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRecord> }>) {
  const fallback = row.original.fallback;
  const isEnabled = fallback === "active";

  return isEnabled ? (
    <Badge variant="default" className="text-[11px] bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 font-medium">
      Enabled
    </Badge>
  ) : (
    <Badge variant="outline" className="text-[11px] text-muted-foreground border-border font-normal">
      Disabled
    </Badge>
  );
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

interface StatusCellProps {
  readonly row: Row<AppTableFeatures, OperatorRecord>;
  readonly onToggleStatus: (record: OperatorRecord) => void;
}

function StatusCell({ row, onToggleStatus }: StatusCellProps) {
  const record = row.original;
  const isChecked = record.status === "active";

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isChecked}
        onCheckedChange={() => onToggleStatus(record)}
        aria-label="Toggle Route Status"
        className="data-[state=checked]:bg-emerald-500"
      />
      <span className={`text-xs font-semibold ${isChecked ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
        {isChecked ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

interface ActionsCellProps {
  readonly row: Row<AppTableFeatures, OperatorRecord>;
  readonly onEdit: (id: string, record: OperatorRecord) => void;
  readonly onDelete: (id: string, name: string) => void;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row, onEdit, onDelete }: ActionsCellProps) {
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onEdit(record.id, record)}
        title="Edit"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onDelete(record.id, record.operatorName || record.operatorId || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

function renderStatusCell(
  row: Row<AppTableFeatures, OperatorRecord>,
  onToggleStatus: (record: OperatorRecord) => void
) {
  return <StatusCell row={row} onToggleStatus={onToggleStatus} />;
}

function renderActionsCell(
  row: Row<AppTableFeatures, OperatorRecord>,
  onEdit: (id: string, record: OperatorRecord) => void,
  onDelete: (id: string, name: string) => void
) {
  return <ActionsCell row={row} onEdit={onEdit} onDelete={onDelete} />;
}

function useOperatorColumns({
  onToggleStatus,
  onEdit,
  onDelete,
}: {
  onToggleStatus: (record: OperatorRecord) => void;
  onEdit: (id: string, record: OperatorRecord) => void;
  onDelete: (id: string, name: string) => void;
}): ColumnDef<AppTableFeatures, OperatorRecord, unknown>[] {
  return useMemo<ColumnDef<AppTableFeatures, OperatorRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "operatorTypeName",
        header: OperatorTypeHeader,
        cell: OperatorTypeCell,
      },
      {
        accessorKey: "operatorName",
        header: OperatorNameHeader,
        cell: OperatorNameCell,
      },
      {
        accessorKey: "apiIds",
        header: ApisHeader,
        cell: ApisCell,
      },
      {
        accessorKey: "fallback",
        header: FallbackHeader,
        cell: FallbackCell,
      },
      {
        accessorKey: "status",
        header: StatusHeader,
        cell: ({ row }) => renderStatusCell(row, onToggleStatus),
      },
      {
        id: "actions",
        header: ActionsHeader,
        cell: ({ row }) => renderActionsCell(row, onEdit, onDelete),
        enableSorting: false,
      },
    ],
    [onToggleStatus, onEdit, onDelete]
  );
}

export default function OperatorPage() {
  const { data: listData, isLoading, isError, refetch } = useOperatorListQuery();
  const updateMutation = useUpdateOperatorMutation();
  const { openCreate, openEdit, openDelete } = useOperatorModalStore();

  const [statusTarget, setStatusTarget] = useState<{
    record: OperatorRecord;
    nextStatus: "active" | "inactive";
  } | null>(null);

  const handleStatusToggleClick = (record: OperatorRecord) => {
    const isCurrentlyActive = record.status === "active";
    const nextStatus: "active" | "inactive" = isCurrentlyActive ? "inactive" : "active";
    setStatusTarget({ record, nextStatus });
  };

  const handleConfirmStatusChange = async (_secretKey: string) => {
    if (!statusTarget) return;
    const { record, nextStatus } = statusTarget;
    try {
      await updateMutation.mutateAsync({
        ...record,
        status: nextStatus,
      });
      setStatusTarget(null);
    } catch {
      // Handled by onError in hook
    }
  };

  const displayData = useMemo<OperatorRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    
    // Sample mock data for preview
    return [
      {
        id: "OPR-101",
        operatorTypeId: "mobile_prepaid",
        operatorTypeName: "Mobile Prepaid",
        operatorId: "jio_prep",
        operatorName: "Jio Prepaid",
        apiIds: ["api_paysprint", "api_eko"],
        apiNames: ["PaySprint Recharge", "Eko Connect"],
        fallback: "active",
        status: "active",
      },
      {
        id: "OPR-102",
        operatorTypeId: "electricity",
        operatorTypeName: "Electricity Bill",
        operatorId: "bescom",
        operatorName: "BESCOM Bangalore",
        apiIds: ["api_mobikwik"],
        apiNames: ["MobiKwik BBPS"],
        fallback: "inactive",
        status: "active",
      },
    ];
  }, [listData]);

  const columns = useOperatorColumns({
    onToggleStatus: handleStatusToggleClick,
    onEdit: openEdit,
    onDelete: openDelete,
  });

  return (
    <div className="mx-auto w-full">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <Route className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Operator Wise API Routing
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure multi-provider routing and fallback rules by Operator Type & Operator.
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
            Add Operator Route
          </Button>
        </div>
      </div>

      {isError && (
        <div className="p-4 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active local data.</span>
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
        searchPlaceholder="Search operator, type, or api..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* Secret PIN Confirmation Modal for Status Toggle */}
      <StatusSecretKeyModal
        isOpen={Boolean(statusTarget)}
        onClose={() => setStatusTarget(null)}
        onConfirm={handleConfirmStatusChange}
        serviceName={statusTarget?.record.operatorName || "Operator Route"}
        targetStatus={statusTarget?.nextStatus ?? "active"}
      />

      {/* CRUD Modals */}
      <OperatorModal />
      <OperatorDeleteDialog />
    </div>
  );
}


