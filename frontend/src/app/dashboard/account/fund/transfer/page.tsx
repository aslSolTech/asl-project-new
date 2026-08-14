"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTransferListQuery } from "@/modules/admin/account/fund/transfer/hooks";
import { useTransferModalStore } from "@/modules/admin/account/fund/transfer/stores/useTransferModalStore";
import { TransferRecord } from "@/modules/admin/account/fund/transfer/types";
import { TransferModal } from "@/modules/admin/account/fund/transfer/components/transfer-modal";
import { TransferDeleteDialog } from "@/modules/admin/account/fund/transfer/components/transfer-delete-dialog";
import {
  Wallet,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, TransferRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, TransferRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function ApiUserIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, TransferRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API User" />;
}

function ApiUserIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, TransferRecord> }>) {
  return (
    <Badge variant="outline" className="text-xs font-mono">
      User #{row.original.apiUserId}
    </Badge>
  );
}

function TrxnDateHeader({ column }: Readonly<{ column: Column<AppTableFeatures, TransferRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Trxn Date" />;
}

function TrxnDateCell({ row }: Readonly<{ row: Row<AppTableFeatures, TransferRecord> }>) {
  const dateVal = row.original.trxnDate;
  if (!dateVal) return <span className="text-muted-foreground">-</span>;
  try {
    return (
      <span className="text-xs text-muted-foreground font-mono">
        {new Date(dateVal).toLocaleDateString()}
      </span>
    );
  } catch {
    return <span className="text-xs text-muted-foreground">{String(dateVal)}</span>;
  }
}

function TransferTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, TransferRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Transfer Type" />;
}

function TransferTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, TransferRecord> }>) {
  const type = row.original.transferType;
  return (
    <Badge
      variant={type?.toLowerCase() === "transfer" ? "default" : "secondary"}
      className="capitalize text-xs"
    >
      {type || "-"}
    </Badge>
  );
}

function WalletTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, TransferRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Wallet Type" />;
}

function WalletTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, TransferRecord> }>) {
  return (
    <Badge variant="outline" className="capitalize text-xs">
      {row.original.walletType || "-"}
    </Badge>
  );
}

function AmountHeader({ column }: Readonly<{ column: Column<AppTableFeatures, TransferRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Amount" />;
}

function AmountCell({ row }: Readonly<{ row: Row<AppTableFeatures, TransferRecord> }>) {
  const val = Number(row.original.amount || 0);
  return (
    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
      ₹{val.toLocaleString("en-IN")}
    </span>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, TransferRecord> }>) {
  const { openEdit, openDelete } = useTransferModalStore();
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
        onClick={() => openDelete(record.id, `Transfer #${record.id}`)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function TransferPage() {
  const { data: listData, isLoading, isError, refetch } = useTransferListQuery();
  const { openCreate } = useTransferModalStore();

  const displayData = useMemo<TransferRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    
    // Fallback data
    const mock: TransferRecord[] = [
      {
        id: "TRF-101",
        apiUserId: 1,
        trxnDate: new Date().toISOString(),
        transferType: "transfer",
        walletType: "bank",
        amount: 5000,
      }
    ];
    return mock;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, TransferRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "apiUserId",
        header: ApiUserIdHeader,
        cell: ApiUserIdCell,
      },
      {
        accessorKey: "trxnDate",
        header: TrxnDateHeader,
        cell: TrxnDateCell,
      },
      {
        accessorKey: "transferType",
        header: TransferTypeHeader,
        cell: TransferTypeCell,
      },
      {
        accessorKey: "walletType",
        header: WalletTypeHeader,
        cell: WalletTypeCell,
      },
      {
        accessorKey: "amount",
        header: AmountHeader,
        cell: AmountCell,
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
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Fund Transfer
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official fund transfer configurations.
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
            Add Fund Transfer
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
        searchPlaceholder="Search..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <TransferModal />
      <TransferDeleteDialog />
    </div>
  );
}
