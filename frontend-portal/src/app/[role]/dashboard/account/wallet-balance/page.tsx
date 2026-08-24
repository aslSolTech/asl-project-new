"use client";

import { useMemo, useState } from "react";
import { ColumnDef, Column, Row, RowData } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBalanceListQuery, useWalletTypeListQuery } from "@/modules/admin/account/wallet-balance/hooks";
import { useWalletBalanceModalStore } from "@/modules/admin/account/wallet-balance/stores/useWalletBalanceModalStore";
import { WalletBalanceRecord, WalletTypeRecord } from "@/modules/admin/account/wallet-balance/types";
import { BalanceModal } from "@/modules/admin/account/wallet-balance/components/wallet-balance-modal";
import { BalanceDeleteDialog } from "@/modules/admin/account/wallet-balance/components/wallet-balance-delete-dialog";
import { useWalletTypeModalStore } from "@/modules/admin/account/wallet-balance/stores/useWalletTypeModalStore";
import { WalletTypeModal } from "@/modules/admin/account/wallet-balance/components/wallet-type-modal";
import { WalletTypeDeleteDialog } from "@/modules/admin/account/wallet-balance/components/wallet-type-delete-dialog";
import { DEFAULT_WALLET_TYPES, DEFAULT_BALANCES } from "@/modules/admin/account/wallet-balance/constants";
import {
  Wallet,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Settings,
} from "lucide-react";
import { formatISODate } from "@/lib/datefns";

// --- Balance Columns Helpers ---
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, WalletBalanceRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function renderIdCell<T extends RowData>(row: Row<AppTableFeatures, T>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, WalletBalanceRecord> }>) {
  return renderIdCell(row);
}

function WalletTypeHeader({ column }:Readonly<{ column: Column<AppTableFeatures, WalletBalanceRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Wallet Type" />;
}

// Map code to name helper
function getWalletTypeName(code: string, walletTypes: WalletTypeRecord[]) {
  const wt = walletTypes.find(w => w.code === code);
  return wt ? wt.name : code;
}

function WalletTypeCell({ row, walletTypes }: Readonly<{ row: Row<AppTableFeatures, WalletBalanceRecord>; walletTypes: WalletTypeRecord[] }>) {
  const val = row.original.walletType;
  const displayName = getWalletTypeName(val, walletTypes);
  return <span className="text-sm font-medium text-foreground capitalize">{displayName || "-"}</span>;
}

function BalanceHeader({ column }: Readonly<{ column: Column<AppTableFeatures, WalletBalanceRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Balance" />;
}

function BalanceCell({ row }: Readonly<{ row: Row<AppTableFeatures, WalletBalanceRecord> }>) {
  const val = row.original.balance;
  return <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{val != null ? `₹ ${val}` : "-"}</span>;
}

function TrxnDescriptionHeader({ column }: Readonly<{ column: Column<AppTableFeatures, WalletBalanceRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Transaction Description" />;
}

// Columns helper components
function TrxnDescriptionCell({ row }: Readonly<{ row: Row<AppTableFeatures, WalletBalanceRecord> }>) {
  const val = row.original.trxnDescription;
  return <span className="text-sm text-muted-foreground">{val || "-"}</span>;
}

function TrxnDateHeader({ column }: Readonly<{ column: Column<AppTableFeatures, WalletBalanceRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Transaction Date" />;
}

function TrxnDateCell({ row }: Readonly<{ row: Row<AppTableFeatures, WalletBalanceRecord> }>) {
  const val = formatISODate({date: row.original.trxnDate, formatType: "short"});
  return <span className="text-sm text-muted-foreground">{val || "-"}</span>;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, WalletBalanceRecord> }>) {
  const { openEdit, openDelete } = useWalletBalanceModalStore();
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
        onClick={() => openDelete(record.id, String(record.balance) || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

// --- Wallet Type Columns Helpers ---
function WalletTypeIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, WalletTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}



function WalletTypeNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, WalletTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Type Name" />;
}

function WalletTypeNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, WalletTypeRecord> }>) {
  return <span className="text-sm font-medium text-foreground">{row.original.name}</span>;
}

function WalletTypeCodeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, WalletTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Type Code" />;
}

function WalletTypeCodeCell({ row }: Readonly<{ row: Row<AppTableFeatures, WalletTypeRecord> }>) {
  return <span className="text-sm font-mono text-muted-foreground">{row.original.code}</span>;
}

function WalletTypeStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, WalletTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function WalletTypeStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, WalletTypeRecord> }>) {
  const val = row.original.status;
  if (val) {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">Active</Badge>;
  }
  return <Badge variant="outline" className="text-xs uppercase">Inactive</Badge>;
}

function WalletTypeActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, WalletTypeRecord> }>) {
  const { openEdit, openDelete } = useWalletTypeModalStore();
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
        onClick={() => openDelete(record.id, record.name)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function BalancePage() {
  const [activeTab, setActiveTab] = useState<"balances" | "types">("balances");
  const { data: listData, isLoading, isError, refetch } = useBalanceListQuery();
  const { openCreate: openBalanceCreate } = useWalletBalanceModalStore();
  const { openCreate: openTypeCreate } = useWalletTypeModalStore();
  const { data: typeListData, isLoading: isTypesLoading, isError: isTypesError, refetch: refetchTypes } = useWalletTypeListQuery();

  const walletTypes = useMemo<WalletTypeRecord[]>(() => {
    if (typeListData && typeListData.length > 0) {
      return typeListData;
    }
    return DEFAULT_WALLET_TYPES;
  }, [typeListData]);

  const displayData = useMemo<WalletBalanceRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    
    return DEFAULT_BALANCES;
  }, [listData]);

  const balanceColumns = useMemo<ColumnDef<AppTableFeatures, WalletBalanceRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "walletType",
        header: WalletTypeHeader,
        cell: ({ row }) => WalletTypeCell({ row, walletTypes }),
      },
      {
        accessorKey: "balance",
        header: BalanceHeader,
        cell: BalanceCell,
      },
      {
        accessorKey: "trxnDescription",
        header: TrxnDescriptionHeader,
        cell: TrxnDescriptionCell,
      },
      {
        accessorKey: "trxnDate",
        header: TrxnDateHeader,
        cell: TrxnDateCell,
      },
      {
        id: "actions",
        header: ActionsHeader,
        cell: ActionsCell,
        enableSorting: false,
      },
    ],
    [walletTypes]
  );

  const walletTypeColumns = useMemo<ColumnDef<AppTableFeatures, WalletTypeRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: WalletTypeIdHeader,
        cell: ({ row }) => renderIdCell(row),
      },
      {
        accessorKey: "name",
        header: WalletTypeNameHeader,
        cell: WalletTypeNameCell,
      },
      {
        accessorKey: "code",
        header: WalletTypeCodeHeader,
        cell: WalletTypeCodeCell,
      },
      {
        accessorKey: "status",
        header: WalletTypeStatusHeader,
        cell: WalletTypeStatusCell,
      },
      {
        id: "actions",
        header: ActionsHeader,
        cell: WalletTypeActionsCell,
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
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Wallet&apos;s
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure and manage wallet types and wallet balances.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "balances" ? (
            <>
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
                onClick={openBalanceCreate}
                className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Wallet Balance
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void refetchTypes()}
                disabled={isTypesLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isTypesLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={openTypeCreate}
                className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Wallet Type
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-muted/60 border border-border/50 rounded-xl my-6 w-fit">
        <button type="button"
          onClick={() => setActiveTab("balances")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === "balances"
              ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Wallet className="w-4 h-4" />
          Wallet Balances
        </button>
        <button  type="button"
          onClick={() => setActiveTab("types")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === "types"
              ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Settings className="w-4 h-4" />
          Wallet Types
        </button>
      </div>

      {activeTab === "balances" && isError && (
        <div className="p-4 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active local data.</span>
          <Button variant="ghost" size="sm" onClick={() => void refetch()}>
            Retry
          </Button>
        </div>
      )}

      {activeTab === "types" && isTypesError && (
        <div className="p-4 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active local data.</span>
          <Button variant="ghost" size="sm" onClick={() => void refetchTypes()}>
            Retry
          </Button>
        </div>
      )}

      {/* Main Virtualized Data Table depending on active tab */}
      {activeTab === "balances" ? (
        <DataTable
          columns={balanceColumns}
          data={displayData}
          loading={isLoading}
          searchPlaceholder="Search balance records..."
          searchDebounceMs={300}
          containerHeight="580px"
        />
      ) : (
        <DataTable
          columns={walletTypeColumns}
          data={walletTypes}
          loading={isTypesLoading}
          searchPlaceholder="Search wallet types..."
          searchDebounceMs={300}
          containerHeight="580px"
        />
      )}

      {/* CRUD Modals for Balances */}
      <BalanceModal />
      <BalanceDeleteDialog />

      {/* CRUD Modals for Wallet Types */}
      <WalletTypeModal />
      <WalletTypeDeleteDialog />
    </div>
  );
}
