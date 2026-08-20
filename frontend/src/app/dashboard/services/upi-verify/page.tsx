"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import {
  useUpiVerifyListQuery,
  useUpdateUpiVerifyMutation,
} from "@/modules/admin/services/service/upi-verify/hooks";
import { useUpiVerifyModalStore } from "@/modules/admin/services/service/upi-verify/stores/useUpiVerifyModalStore";
import { UpiVerifyRecord } from "@/modules/admin/services/service/upi-verify/types";
import { UpiVerifyModal } from "@/modules/admin/services/service/upi-verify/components/upi-verify-modal";
import { UpiVerifyDeleteDialog } from "@/modules/admin/services/service/upi-verify/components/upi-verify-delete-dialog";
import {
  StatusSecretKeyModal,
  useServiceApiColumns,
} from "@/modules/admin/services/service/shared";
import { Route, Plus, RefreshCw } from "lucide-react";

export default function UpiVerifyPage() {
  const { data: listData, isLoading, isError, refetch } = useUpiVerifyListQuery();
  const { openCreate, openEdit, openDelete } = useUpiVerifyModalStore();
  const updateMutation = useUpdateUpiVerifyMutation();

  const [statusTarget, setStatusTarget] = useState<{
    record: UpiVerifyRecord;
    nextStatus: "active" | "inactive";
  } | null>(null);

  const displayData = useMemo<UpiVerifyRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }

    const mock: UpiVerifyRecord[] = [
      {
        id: "UPI-101",
        providerName: "Decentro UPI Stack",
        apiName: "VPA & Account Handle Verification",
        apiType: "Verification",
        apiKey: 99887766,
        status: "active",
        createdAt: "2026-08-18T07:20:00.000Z",
        updatedAt: "2026-08-20T15:10:00.000Z",
      },
      {
        id: "UPI-102",
        providerName: "Setu UPI DeepLink",
        apiName: "Realtime UPI Name Lookup API",
        apiType: "UPI Verify",
        apiKey: 88776655,
        status: "inactive",
        createdAt: "2026-08-16T12:00:00.000Z",
        updatedAt: "2026-08-19T09:40:00.000Z",
      },
    ];
    return mock;
  }, [listData]);

  const handleStatusToggleClick = (record: UpiVerifyRecord) => {
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
    providerTitle: "UPI Provider / API Name",
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
              UPI Verify API
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage UPI ID & VPA validation routing APIs and live provider connections.
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
            Add UPI Verify API
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
        searchPlaceholder="Search UPI Verify APIs..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <UpiVerifyModal />
      <UpiVerifyDeleteDialog />

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
