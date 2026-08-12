"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQrLedgerListQuery } from "@/modules/admin/reports/wallet/qr-ledger/hooks";
import { useQrLedgerModalStore } from "@/modules/admin/reports/wallet/qr-ledger/stores/useQrLedgerModalStore";
import { QrLedgerRecord } from "@/modules/admin/reports/wallet/qr-ledger/types";
import { QrLedgerModal } from "@/modules/admin/reports/wallet/qr-ledger/components/qr-ledger-modal";
import { QrLedgerDeleteDialog } from "@/modules/admin/reports/wallet/qr-ledger/components/qr-ledger-delete-dialog";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, QrLedgerRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, QrLedgerRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function TypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, QrLedgerRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Type" />;
}

function TypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, QrLedgerRecord> }>) {
  const val = row.original.type;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function BalanceHeader({ column }: Readonly<{ column: Column<AppTableFeatures, QrLedgerRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Balance" />;
}

function BalanceCell({ row }: Readonly<{ row: Row<AppTableFeatures, QrLedgerRecord> }>) {
  const val = row.original.balance;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, QrLedgerRecord> }>) {
  const { openEdit, openDelete } = useQrLedgerModalStore();
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
        onClick={() => openDelete(record.id, record.type || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function QrLedgerPage() {
  const { data: listData, isLoading, isError, refetch } = useQrLedgerListQuery();
  const { openCreate } = useQrLedgerModalStore();

  const displayData = useMemo<QrLedgerRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    
    // Fallback data
    const mock = [
      {
        id: "REC-101",
        type: "Type Val 1",
        balance: "Balance Val 2"
      }
    ];
    return mock;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, QrLedgerRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "type",
        header: TypeHeader,
        cell: TypeCell,
      },
      {
        accessorKey: "balance",
        header: BalanceHeader,
        cell: BalanceCell,
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
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              QR Wallet Ledger Setup
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official qr wallet ledger configurations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={isLoading}
            className="flex items-center gap-2 bg-white"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={openCreate}
            className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add QR Wallet Ledger
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
      <QrLedgerModal />
      <QrLedgerDeleteDialog />
    </div>
  );
}
