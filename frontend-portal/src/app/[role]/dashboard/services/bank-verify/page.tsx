"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import {
  useBankVerifyListQuery,
  useUpdateBankVerifyMutation,
} from "@/modules/admin/services/service/bank-verify/hooks";
import { useBankVerifyModalStore } from "@/modules/admin/services/service/bank-verify/stores/useBankVerifyModalStore";
import { BankVerifyRecord } from "@/modules/admin/services/service/bank-verify/types";
import { BankVerifyModal } from "@/modules/admin/services/service/bank-verify/components/bank-verify-modal";
import { BankVerifyDeleteDialog } from "@/modules/admin/services/service/bank-verify/components/bank-verify-delete-dialog";
import {
  StatusSecretKeyModal,
  useServiceApiColumns,
} from "@/modules/admin/services/service/shared";
import { Route, Plus, RefreshCw } from "lucide-react";

export default function BankVerifyPage() {
  const { data: listData, isLoading, isError, refetch } = useBankVerifyListQuery();
  const { openCreate, openEdit, openDelete } = useBankVerifyModalStore();
  const updateMutation = useUpdateBankVerifyMutation();

  const [statusTarget, setStatusTarget] = useState<{
    record: BankVerifyRecord;
    nextStatus: "active" | "inactive";
  } | null>(null);

  const displayData = useMemo<BankVerifyRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }

    const mock: BankVerifyRecord[] = [
      {
        id: "BNK-101",
        providerName: "Karza Bank Intelligence",
        apiName: "Pennyless Account Verification",
        apiType: "Verification",
        apiKey: 66554433,
        status: "active",
        createdAt: "2026-08-17T11:00:00.000Z",
        updatedAt: "2026-08-20T16:45:00.000Z",
      },
      {
        id: "BNK-102",
        providerName: "Cashfree Verification Suite",
        apiName: "IMPS Penny Drop Verification",
        apiType: "Bank Account Verify",
        apiKey: 44332211,
        status: "inactive",
        createdAt: "2026-08-16T08:30:00.000Z",
        updatedAt: "2026-08-19T13:10:00.000Z",
      },
    ];
    return mock;
  }, [listData]);

  const handleStatusToggleClick = (record: BankVerifyRecord) => {
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

  // Clean decoupled columns using shared table cells & headers
  const columns = useServiceApiColumns({
    providerTitle: "Bank / Provider Name",
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
              Bank Account Verify API
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage bank account penny drop & verification service routing gateways.
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
            Add Bank Verify API
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
        searchPlaceholder="Search Bank Verify APIs..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <BankVerifyModal />
      <BankVerifyDeleteDialog />

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
