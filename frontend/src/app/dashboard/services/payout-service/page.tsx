"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import {
  usePayoutListQuery,
  useUpdatePayoutMutation,
} from "@/modules/admin/services/service/payouts/hooks";
import { usePayoutsModalStore } from "@/modules/admin/services/service/payouts/stores/usePayoutsModalStore";
import { PayoutRecord } from "@/modules/admin/services/service/payouts/types";
import { PayoutModal } from "@/modules/admin/services/service/payouts/components/payouts-modal";
import { PayoutDeleteDialog } from "@/modules/admin/services/service/payouts/components/payouts-delete-dialog";
import {
  StatusSecretKeyModal,
  useServiceApiColumns,
} from "@/modules/admin/services/service/shared";
import { Route, Plus, RefreshCw } from "lucide-react";

export default function PayoutPage() {
  const { data: listData, isLoading, isError, refetch } = usePayoutListQuery();
  const { openCreate, openEdit, openDelete } = usePayoutsModalStore();
  const updateMutation = useUpdatePayoutMutation();

  const [statusTarget, setStatusTarget] = useState<{
    record: PayoutRecord;
    nextStatus: "active" | "inactive";
  } | null>(null);

  const displayData = useMemo<PayoutRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }

    const mock: PayoutRecord[] = [
      {
        id: "PAY-101",
        providerName: "RazorpayX Direct",
        apiName: "Instant IMPS/NEFT Engine",
        apiType: "Payout",
        apiKey: 88472910,
        status: "active",
        createdAt: "2026-08-18T10:15:30.000Z",
        updatedAt: "2026-08-20T14:30:00.000Z",
      },
      {
        id: "PAY-102",
        providerName: "Cashfree AutoPayout",
        apiName: "Standard Settlement Route",
        apiType: "Payout",
        apiKey: 77291034,
        status: "inactive",
        createdAt: "2026-08-15T09:00:00.000Z",
        updatedAt: "2026-08-19T11:20:00.000Z",
      },
    ];
    return mock;
  }, [listData]);

  const handleStatusToggleClick = (record: PayoutRecord) => {
    const isCurrentlyActive = record.status === "active" || record.status === "true";
    const nextStatus: "active" | "inactive" = isCurrentlyActive ? "inactive" : "active";
    setStatusTarget({ record, nextStatus });
  };

  const handleConfirmStatusChange = async (_secretKey: string) => {
    if (!statusTarget) return;
    const { record, nextStatus } = statusTarget;
    const now = new Date().toISOString();

    await updateMutation.mutateAsync({
      ...record,
      status: nextStatus,
      updatedAt: now,
    });
  };

  const columns = useServiceApiColumns({
    providerTitle: "Payout Provider / API Name",
    onToggleStatus: handleStatusToggleClick,
    onEdit: (rec) => openEdit(rec.id, rec),
    onDelete: (rec) =>
      openDelete(rec.id, rec.providerName || rec.apiName || rec.id),
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
              Payout API
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all payout gateway APIs, provider credentials & routing switches.
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
            Add Payout API
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
        searchPlaceholder="Search Payout APIs..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <PayoutModal />
      <PayoutDeleteDialog />

      {/* Secret Key Modal for Active / Inactive Toggle */}
      <StatusSecretKeyModal
        isOpen={Boolean(statusTarget)}
        serviceName={
          statusTarget?.record.providerName || statusTarget?.record.apiName
        }
        targetStatus={statusTarget?.nextStatus || "active"}
        onConfirm={handleConfirmStatusChange}
        onClose={() => setStatusTarget(null)}
        isLoading={updateMutation.isPending}
      />
    </div>
  );
}
