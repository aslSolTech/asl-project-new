"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import {
  useDmtListQuery,
  useUpdateDmtMutation,
} from "@/modules/admin/services/service/dmt/hooks";
import { useDmtModalStore } from "@/modules/admin/services/service/dmt/stores/useDmtModalStore";
import { DmtRecord } from "@/modules/admin/services/service/dmt/types";
import { DmtModal } from "@/modules/admin/services/service/dmt/components/dmt-modal";
import { DmtDeleteDialog } from "@/modules/admin/services/service/dmt/components/dmt-delete-dialog";
import {
  StatusSecretKeyModal,
  useServiceApiColumns,
} from "@/modules/admin/services/service/shared";
import { Route, Plus, RefreshCw } from "lucide-react";

export default function DmtPage() {
  const { data: listData, isLoading, isError, refetch } = useDmtListQuery();
  const { openCreate, openEdit, openDelete } = useDmtModalStore();
  const updateMutation = useUpdateDmtMutation();

  const [statusTarget, setStatusTarget] = useState<{
    record: DmtRecord;
    nextStatus: "active" | "inactive";
  } | null>(null);

  const displayData = useMemo<DmtRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }

    const mock: DmtRecord[] = [
      {
        id: "DMT-101",
        providerName: "ICICI Bank Express DMT",
        apiName: "Direct IMPS Money Transfer V2",
        apiType: "DMT (Money Transfer)",
        apiKey: 11223344,
        status: "active",
        createdAt: "2026-08-17T06:40:00.000Z",
        updatedAt: "2026-08-20T14:15:00.000Z",
      },
      {
        id: "DMT-102",
        providerName: "Airtel Payments Bank DMT",
        apiName: "Domestic Remittance Gateway",
        apiType: "DMT (Money Transfer)",
        apiKey: 55667788,
        status: "inactive",
        createdAt: "2026-08-15T10:20:00.000Z",
        updatedAt: "2026-08-18T16:50:00.000Z",
      },
    ];
    return mock;
  }, [listData]);

  const handleStatusToggleClick = (record: DmtRecord) => {
    const isCurrentlyActive = record.status === "active";
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
    providerTitle: "DMT Provider / Bank Name",
    onToggleStatus: handleStatusToggleClick,
    onEdit: (rec) => openEdit(rec.id, rec),
    onDelete: (rec) =>
      openDelete(
        rec.id,
        rec.providerName || rec.bank || rec.apiName || rec.id
      ),
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
              DMT API
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage Direct Money Transfer (DMT) partner gateways & bank switches.
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
            Add DMT API
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
        searchPlaceholder="Search DMT APIs..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <DmtModal />
      <DmtDeleteDialog />

      {/* Secret Key Modal for Active / Inactive Toggle */}
      <StatusSecretKeyModal
        isOpen={Boolean(statusTarget)}
        serviceName={
          statusTarget?.record.providerName || statusTarget?.record.bank || statusTarget?.record.apiName
        }
        targetStatus={statusTarget?.nextStatus || "active"}
        onConfirm={handleConfirmStatusChange}
        onClose={() => setStatusTarget(null)}
        isLoading={updateMutation.isPending}
      />
    </div>
  );
}
