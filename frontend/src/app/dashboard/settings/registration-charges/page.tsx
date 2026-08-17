"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRegistrationChargesListQuery } from "@/modules/admin/settings/registration-charges/hooks";
import { useRegistrationChargesModalStore } from "@/modules/admin/settings/registration-charges/stores/useRegistrationChargesModalStore";
import { RegistrationChargesRecord } from "@/modules/admin/settings/registration-charges/types";
import { RegistrationChargesModal } from "@/modules/admin/settings/registration-charges/components/registration-charges-modal";
import { RegistrationChargesDeleteDialog } from "@/modules/admin/settings/registration-charges/components/registration-charges-delete-dialog";
import { DEFAULT_REGISTRATION_CHARGES } from "@/modules/admin/settings/registration-charges/constants";
import { CreditCard, Plus, Edit2, Trash2, RefreshCw } from "lucide-react";

function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RegistrationChargesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, RegistrationChargesRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function UserTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RegistrationChargesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="User Type" />;
}

function UserTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, RegistrationChargesRecord> }>) {
  return <span className="text-sm font-semibold text-foreground">{row.original.userType}</span>;
}

function RegisterAmountHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RegistrationChargesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Registration Amount" />;
}

function RegisterAmountCell({ row }: Readonly<{ row: Row<AppTableFeatures, RegistrationChargesRecord> }>) {
  return <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">₹ {row.original.registerAmount}</span>;
}

function DisplayStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RegistrationChargesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Display Status" />;
}

function DisplayStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, RegistrationChargesRecord> }>) {
  const val = String(row.original.displayStatus).toLowerCase();
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{row.original.displayStatus}</Badge>;
  }
  return <Badge variant="outline" className="text-xs uppercase">{row.original.displayStatus}</Badge>;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, RegistrationChargesRecord> }>) {
  const { openEdit, openDelete } = useRegistrationChargesModalStore();
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
        onClick={() => openDelete(record.id, `${record.userType} - ₹${record.registerAmount}`)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function RegistrationChargesPage() {
  const { data: listData, isLoading, isError, refetch } = useRegistrationChargesListQuery();
  const { openCreate } = useRegistrationChargesModalStore();

  const displayData = useMemo<RegistrationChargesRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return DEFAULT_REGISTRATION_CHARGES;
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, RegistrationChargesRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "userType",
        header: UserTypeHeader,
        cell: UserTypeCell,
      },
      {
        accessorKey: "registerAmount",
        header: RegisterAmountHeader,
        cell: RegisterAmountCell,
      },
      {
        accessorKey: "displayStatus",
        header: DisplayStatusHeader,
        cell: DisplayStatusCell,
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
            <CreditCard className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Registration Charges
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure user role-wise registration amount and active display states.
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
            Add Charges
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
        searchPlaceholder="Search registration charges..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <RegistrationChargesModal />
      <RegistrationChargesDeleteDialog />
    </div>
  );
}
