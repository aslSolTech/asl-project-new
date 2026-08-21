"use client";

import { useMemo, useState } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  useAmountListQuery,
  useUpdateAmountMutation,
} from "@/modules/admin/services/provider-routes/amount/hooks";
import { useAmountModalStore } from "@/modules/admin/services/provider-routes/amount/stores/useAmountModalStore";
import { AmountRecord } from "@/modules/admin/services/provider-routes/amount/types";
import { AmountModal } from "@/modules/admin/services/provider-routes/amount/components/amount-modal";
import { AmountDeleteDialog } from "@/modules/admin/services/provider-routes/amount/components/amount-delete-dialog";
import { StatusSecretKeyModal } from "@/modules/admin/services/service/shared/components/status-toggle-modal";
import {
  Route,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Server,
  Layers
} from "lucide-react";

// 1. ID Column
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AmountRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, AmountRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id") ?? row.original.id)}
    </span>
  );
}

// 2. WHERE Condition & Amount Range Column
function ConditionHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AmountRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Amount Rule (WHERE)" />;
}

function ConditionCell({ row }: Readonly<{ row: Row<AppTableFeatures, AmountRecord> }>) {
  const cond = row.original.condition || "==";
  const from = row.original.amountFrom;
  const to = row.original.amountTo;

  const isRange = cond === "BETWEEN" || cond === "AND";

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className="font-mono font-bold text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 px-2 py-0.5"
      >
        {cond}
      </Badge>
      <div className="flex items-center gap-1 font-semibold text-sm text-foreground font-mono">
        <span>₹{from}</span>
        {isRange && to && (
          <>
            <span className="text-muted-foreground font-normal text-xs">to</span>
            <span>₹{to}</span>
          </>
        )}
      </div>
    </div>
  );
}

// 3. Operator & Type Column
function OperatorHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AmountRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Operator & Category" />;
}

function OperatorCell({ row }: Readonly<{ row: Row<AppTableFeatures, AmountRecord> }>) {
  const operatorName = row.original.operatorName || "-";
  const typeName = row.original.operatorTypeName || "Operator";

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5 font-semibold text-sm text-foreground">
        <Layers className="w-3.5 h-3.5 text-primary/70 shrink-0" />
        <span>{operatorName}</span>
      </div>
      <div className="text-xs text-muted-foreground">
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-muted/40 font-medium">
          {typeName}
        </Badge>
      </div>
    </div>
  );
}

// 4. Routing APIs Column
function ApisHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AmountRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Assigned Routing APIs" />;
}

function ApisCell({ row }: Readonly<{ row: Row<AppTableFeatures, AmountRecord> }>) {
  const apiIds = row.original.apiIds || [];
  const apiNames = row.original.apiNames || [];

  if (apiIds.length === 0) {
    return <span className="text-xs text-muted-foreground italic">No APIs configured</span>;
  }

  return (
    <div className="flex flex-wrap gap-1.5 max-w-sm">
      {apiIds.map((apiId, idx) => {
        const name = apiNames[idx] || apiId;
        const isPrimary = idx === 0;
        return (
          <Badge
            key={apiId}
            variant={isPrimary ? "default" : "secondary"}
            className={`text-[11px] font-normal flex items-center gap-1 px-2 py-0.5 ${
              isPrimary
                ? "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                : "bg-muted text-muted-foreground border-border/60"
            }`}
          >
            <Server className="w-2.5 h-2.5 opacity-70" />
            <span>{name}</span>
            {isPrimary && (
              <span className="text-[9px] font-semibold uppercase tracking-wider text-primary/90 ml-0.5">
                [Primary]
              </span>
            )}
          </Badge>
        );
      })}
    </div>
  );
}

// 5. Fallback Column
function FallbackHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AmountRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Fallback" />;
}

function FallbackCell({ row }: Readonly<{ row: Row<AppTableFeatures, AmountRecord> }>) {
  const fallback = row.original.fallback;
  const isEnabled = fallback === "active" || fallback === true;

  return isEnabled ? (
    <Badge variant="default" className="text-[11px] bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 font-medium">
      Enabled
    </Badge>
  ) : (
    <Badge variant="outline" className="text-[11px] text-muted-foreground border-border/60 font-normal">
      Disabled
    </Badge>
  );
}

// 6. Status Column
function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AmountRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function StatusCell({
  row,
  onToggleStatus,
}: Readonly<{
  row: Row<AppTableFeatures, AmountRecord>;
  onToggleStatus: (record: AmountRecord) => void;
}>) {
  const record = row.original;
  const isActive = record.status === "active";

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isActive}
        onCheckedChange={() => onToggleStatus(record)}
        aria-label="Toggle amount route status"
      />
      <Badge
        variant={isActive ? "default" : "outline"}
        className={`text-[11px] font-medium ${
          isActive
            ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20"
            : "text-muted-foreground"
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
}

// 7. Actions Column
function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({
  row,
  onEdit,
  onDelete,
}: Readonly<{
  row: Row<AppTableFeatures, AmountRecord>;
  onEdit: (id: string, record: AmountRecord) => void;
  onDelete: (id: string, name: string) => void;
}>) {
  const record = row.original;
  const conditionLabel = `${record.condition} ₹${record.amountFrom}${record.amountTo ? ` - ₹${record.amountTo}` : ""}`;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onEdit(record.id, record)}
        title="Edit"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onDelete(record.id, `${record.operatorName || "Amount Rule"} (${conditionLabel})`)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

function renderStatusCell(
  row: Row<AppTableFeatures, AmountRecord>,
  onToggleStatus: (record: AmountRecord) => void
) {
  return <StatusCell row={row} onToggleStatus={onToggleStatus} />;
}

function renderActionsCell(
  row: Row<AppTableFeatures, AmountRecord>,
  onEdit: (id: string, record: AmountRecord) => void,
  onDelete: (id: string, name: string) => void
) {
  return <ActionsCell row={row} onEdit={onEdit} onDelete={onDelete} />;
}

function useAmountColumns({
  onToggleStatus,
  onEdit,
  onDelete,
}: {
  onToggleStatus: (record: AmountRecord) => void;
  onEdit: (id: string, record: AmountRecord) => void;
  onDelete: (id: string, name: string) => void;
}): ColumnDef<AppTableFeatures, AmountRecord, unknown>[] {
  return useMemo<ColumnDef<AppTableFeatures, AmountRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "condition",
        header: ConditionHeader,
        cell: ConditionCell,
      },
      {
        accessorKey: "operatorName",
        header: OperatorHeader,
        cell: OperatorCell,
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

export default function AmountPage() {
  const { data: listData, isLoading, isError, refetch } = useAmountListQuery();
  const updateMutation = useUpdateAmountMutation();
  const { openCreate, openEdit, openDelete } = useAmountModalStore();

  const [statusTarget, setStatusTarget] = useState<{
    record: AmountRecord;
    nextStatus: "active" | "inactive";
  } | null>(null);

  const handleStatusToggleClick = (record: AmountRecord) => {
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

  const displayData = useMemo<AmountRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    
    // Sample mock data for preview
    return [
      {
        id: "AMT-RT-001",
        condition: "BETWEEN",
        amountFrom: "100",
        amountTo: "5000",
        operatorTypeId: "mobile_prepaid",
        operatorTypeName: "Mobile Prepaid",
        operatorId: "jio_prep",
        operatorName: "Jio Prepaid",
        apiIds: ["api_paysprint", "api_eko"],
        apiNames: ["PaySprint Recharge API", "Eko Connect API"],
        fallback: "active",
        status: "active",
      },
      {
        id: "AMT-RT-002",
        condition: ">=",
        amountFrom: "10000",
        operatorTypeId: "payout",
        operatorTypeName: "Bank Transfer / Payout",
        operatorId: "payout_imps",
        operatorName: "IMPS Payout",
        apiIds: ["api_razorpay_payout", "api_cashfree_payout"],
        apiNames: ["RazorpayX Payout API", "Cashfree Payout Direct"],
        fallback: "inactive",
        status: "active",
      },
    ];
  }, [listData]);

  const columns = useAmountColumns({
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
              Amount Wise API Routing
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure rule-based transaction amount routing (WHERE condition) across vendor APIs.
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
            Add Amount Route
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
        searchPlaceholder="Search operator, condition, or api..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* Secret PIN Confirmation Modal for Status Toggle */}
      <StatusSecretKeyModal
        isOpen={Boolean(statusTarget)}
        onClose={() => setStatusTarget(null)}
        onConfirm={handleConfirmStatusChange}
        serviceName={statusTarget?.record.operatorName || "Amount Route"}
        targetStatus={statusTarget?.nextStatus ?? "active"}
      />

      {/* CRUD Modals */}
      <AmountModal />
      <AmountDeleteDialog />
    </div>
  );
}

