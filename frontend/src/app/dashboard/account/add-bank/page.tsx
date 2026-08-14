"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAddListQuery } from "@/modules/admin/account/bank/hooks";
import { useAddModalStore } from "@/modules/admin/account/bank/stores/useAddModalStore";
import { AddRecord } from "@/modules/admin/account/bank/types";
import { AddModal } from "@/modules/admin/account/bank/components/add-modal";
import { AddDeleteDialog } from "@/modules/admin/account/bank/components/add-delete-dialog";
import {
  Wallet,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AddRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, AddRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function BankNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AddRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Bank Name" />;
}

function BankNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, AddRecord> }>) {
  const val = row.original.bankName;
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function BranchNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AddRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Branch Name" />;
}

function BranchNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, AddRecord> }>) {
  const val = row.original.branchName;
  return <span className="text-sm text-muted-foreground">{val || "-"}</span>;
}


function IfscCodeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AddRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="IFSC Code" />;
}

function IfscCodeCell({ row }: Readonly<{ row: Row<AppTableFeatures, AddRecord> }>) {
  const val = row.original.ifscCode;
  return <span className="text-sm font-mono font-medium text-foreground uppercase">{val || "-"}</span>;
}


function AccountNumberHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AddRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Account Number" />;
}

function AccountNumberCell({ row }: Readonly<{ row: Row<AppTableFeatures, AddRecord> }>) {
  const val = row.original.accountNumber;
  return <span className="text-sm font-mono text-foreground">{val || "-"}</span>;
}


function AccountHolderNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AddRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Account Holder" />;
}

function AccountHolderNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, AddRecord> }>) {
  const val = row.original.accountHolderName;
  return <span className="text-sm text-foreground">{val || "-"}</span>;
}


function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, AddRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, AddRecord> }>) {
  const val = row.original.status;
  if (val === true || String(val) === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">Active</Badge>;
  }
  return <Badge variant="outline" className="text-xs uppercase">Inactive</Badge>;
}


function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, AddRecord> }>) {
  const { openEdit, openDelete } = useAddModalStore();
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
        onClick={() => openDelete(record.id, record.bankName || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function AddPage() {
  const { data: listData, isLoading, isError, refetch } = useAddListQuery();
  const { openCreate } = useAddModalStore();

  const displayData = useMemo<AddRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    
    // Fallback data
    const mock: AddRecord[] = [
      {
        id: "REC-101",
        bankName: "HDFC Bank",
        branchName: "Downtown Branch",
        ifscCode: "HDFC0001234",
        accountNumber: "9876543210",
        accountHolderName: "John Doe",
        status: true
      }
    ];
    return mock;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, AddRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "bankName",
        header: BankNameHeader,
        cell: BankNameCell,
      },
      {
        accessorKey: "branchName",
        header: BranchNameHeader,
        cell: BranchNameCell,
      },
      {
        accessorKey: "ifscCode",
        header: IfscCodeHeader,
        cell: IfscCodeCell,
      },
      {
        accessorKey: "accountNumber",
        header: AccountNumberHeader,
        cell: AccountNumberCell,
      },
      {
        accessorKey: "accountHolderName",
        header: AccountHolderNameHeader,
        cell: AccountHolderNameCell,
      },
      {
        accessorKey: "status",
        header: StatusHeader,
        cell: StatusCell,
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
              Add Bank
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official add bank configurations.
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
            Add Add Bank
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
      <AddModal />
      <AddDeleteDialog />
    </div>
  );
}
