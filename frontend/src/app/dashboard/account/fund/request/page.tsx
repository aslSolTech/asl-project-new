"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRequestListQuery } from "@/modules/admin/account/fund/request/hooks";
import { useRequestModalStore } from "@/modules/admin/account/fund/request/stores/useRequestModalStore";
import { RequestRecord } from "@/modules/admin/account/fund/request/types";
import { RequestDeleteDialog } from "@/modules/admin/account/fund/request/components/request-delete-dialog";
import { RequestApproveDialog } from "@/modules/admin/account/fund/request/components/request-approve-dialog";
import { RequestDeclineDialog } from "@/modules/admin/account/fund/request/components/request-decline-dialog";
import {
  Wallet,
  Check,
  X,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function RegNoHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="REG NO" />;
}

function RegNoCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  return (
    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
      {row.original.regNo || "-"}
    </span>
  );
}

function UserNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="USER NAME" />;
}

function UserNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-foreground">
        {row.original.userName || "-"}
      </span>
    </div>
  );
}

function RequestAmountHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="REQUEST AMOUNT" />;
}

function RequestAmountCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  const amount = row.original.requestAmount;
  return (
    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
      ₹{Number(amount || 0).toLocaleString("en-IN")}
    </span>
  );
}

function WalletTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="WALLET TYPE" />;
}

function WalletTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  return (
    <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider bg-muted/40">
      {row.original.walletType || "-"}
    </Badge>
  );
}

function TransactionNoHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="TRANSACTION NO" />;
}

function TransactionNoCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  return (
    <span className="font-mono text-xs text-muted-foreground font-medium">
      {row.original.transactionNo || "-"}
    </span>
  );
}

function TransactionDateHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="TRANSACTION DATE" />;
}

function TransactionDateCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  return <span className="text-xs text-muted-foreground">{row.original.transactionDate || "-"}</span>;
}

function ContactNumberHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="CONTACT NUMBER" />;
}

function ContactNumberCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  return <span className="text-xs font-mono">{row.original.contactNumber || "-"}</span>;
}

function RemarksHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="REMARKS/MESSAGE" />;
}

function RemarksCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  return (
    <span className="text-xs text-muted-foreground line-clamp-2 max-w-[180px]" title={row.original.remarks}>
      {row.original.remarks || "-"}
    </span>
  );
}

function InsertDateHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="INSERT DATE" />;
}

function InsertDateCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  return <span className="text-xs text-muted-foreground">{row.original.insertDate || "-"}</span>;
}

function UpdateDateHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="UPDATE DATE" />;
}

function UpdateDateCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  return <span className="text-xs text-muted-foreground">{row.original.updateDate || "-"}</span>;
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RequestRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="STATUS" />;
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  const status = (row.original.status || "PENDING").toUpperCase();
  if (status === "APPROVED" || status === "SUCCESS") {
    return (
      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase">
        {status}
      </Badge>
    );
  }
  if (status === "DECLINED" || status === "REJECTED") {
    return (
      <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold uppercase">
        {status}
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
      {status}
    </Badge>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-bold uppercase tracking-wider">ACTION</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, RequestRecord> }>) {
  const { openApprove, openDecline, openDelete } = useRequestModalStore();
  const record = row.original;
  const isActionDisabled = record.status === "APPROVED" || record.status === "DECLINED";

  return (
    <div className="flex items-center gap-2">
      {/* Approve Button */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => openApprove(record)}
        disabled={isActionDisabled}
        title="Approve & Transfer Fund"
        className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 disabled:opacity-40"
      >
        <Check className="w-4 h-4 stroke-[2.5]" />
        <span className="sr-only">Approve</span>
      </Button>

      {/* Decline Button */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => openDecline(record)}
        disabled={isActionDisabled}
        title="Decline Request"
        className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 border-amber-200 dark:border-amber-800 disabled:opacity-40"
      >
        <X className="w-4 h-4 stroke-[2.5]" />
        <span className="sr-only">Decline</span>
      </Button>

      {/* Delete Button */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => openDelete(record)}
        title="Delete Record"
        className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-800"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function RequestPage() {
  const { data: listData, isLoading, isError, refetch } = useRequestListQuery();

  const displayData = useMemo<RequestRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }

    // Fallback Mock Data as requested by user
    return [
      {
        id: "21",
        regNo: "2910",
        userName: "Hemant Kumar Yadav",
        requestAmount: 13000,
        walletType: "PREPAID BALANCE",
        transactionNo: "1462596",
        transactionDate: "30/11/2024",
        contactNumber: "9876543210",
        remarks: "My pa",
        insertDate: "03-12-2024",
        updateDate: "",
        status: "PENDING",
      },
      {
        id: "22",
        regNo: "2911",
        userName: "Rahul Sharma",
        requestAmount: 5000,
        walletType: "PREPAID BALANCE",
        transactionNo: "1462597",
        transactionDate: "01/12/2024",
        contactNumber: "9812345678",
        remarks: "Urgent wallet top-up",
        insertDate: "03-12-2024",
        updateDate: "",
        status: "PENDING",
      },
    ];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, RequestRecord, unknown>[]>(
    () => [
      {
        id: "action",
        header: ActionsHeader,
        cell: ActionsCell,
        enableSorting: false,
      },
      {
        accessorKey: "regNo",
        header: RegNoHeader,
        cell: RegNoCell,
      },
      {
        accessorKey: "userName",
        header: UserNameHeader,
        cell: UserNameCell,
      },
      {
        accessorKey: "requestAmount",
        header: RequestAmountHeader,
        cell: RequestAmountCell,
      },
      {
        accessorKey: "walletType",
        header: WalletTypeHeader,
        cell: WalletTypeCell,
      },
      {
        accessorKey: "transactionNo",
        header: TransactionNoHeader,
        cell: TransactionNoCell,
      },
      {
        accessorKey: "transactionDate",
        header: TransactionDateHeader,
        cell: TransactionDateCell,
      },
      {
        accessorKey: "contactNumber",
        header: ContactNumberHeader,
        cell: ContactNumberCell,
      },
      {
        accessorKey: "remarks",
        header: RemarksHeader,
        cell: RemarksCell,
      },
      {
        accessorKey: "insertDate",
        header: InsertDateHeader,
        cell: InsertDateCell,
      },
      {
        accessorKey: "updateDate",
        header: UpdateDateHeader,
        cell: UpdateDateCell,
      },
      {
        accessorKey: "status",
        header: StatusHeader,
        cell: StatusCell,
      },
    ],
    []
  );

  return (
    <div className="mx-auto w-full space-y-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Fund Request
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Review, approve, decline, or manage user fund requests.
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
        </div>
      </div>

      {isError && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
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
        searchPlaceholder="Search requests..."
        searchDebounceMs={300}
        containerHeight="600px"
      />

      {/* Dialogs */}
      <RequestApproveDialog />
      <RequestDeclineDialog />
      <RequestDeleteDialog />
    </div>
  );
}
