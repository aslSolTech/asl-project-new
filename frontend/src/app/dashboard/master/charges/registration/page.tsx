"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRegistrationChargesListQuery } from "@/modules/admin/master/charges/hooks";
import { useRegistrationChargesModalStore } from "@/modules/admin/master/charges/stores/useRegistrationChargesModalStore";
import { RegistrationChargesRecord } from "@/modules/admin/master/charges/types";
import { RegistrationChargesModal } from "@/modules/admin/master/charges/components/registration-charges-modal";
import { RegistrationChargesDeleteDialog } from "@/modules/admin/master/charges/components/registration-charges-delete-dialog";
import {
  Percent,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RegistrationChargesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

// Helper cells
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, RegistrationChargesRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function PlanNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RegistrationChargesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Plan Name" />;
}

function PlanNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, RegistrationChargesRecord> }>) {
  const val = row.original.planName;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function UserTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RegistrationChargesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Target User Type" />;
}

function UserTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, RegistrationChargesRecord> }>) {
  const val = row.original.userType;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function AmountHeader({ column }: Readonly<{ column: Column<AppTableFeatures, RegistrationChargesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Charge Amount (INR)" />;
}

function AmountCell({ row }: Readonly<{ row: Row<AppTableFeatures, RegistrationChargesRecord> }>) {
  const val = row.original.amount;
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
        onClick={() => openDelete(record.id, record.planName || record.id)}
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
    return [
  {
    "id": "CHG-001",
    "planName": "Retailer Join Plan",
    "userType": "Retailer",
    "amount": "199.00"
  }
];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, RegistrationChargesRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "planName",
        header: PlanNameHeader,
        cell: PlanNameCell,
      },
      {
        accessorKey: "userType",
        header: UserTypeHeader,
        cell: UserTypeCell,
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
            <Percent className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Registration Charges Setup
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official registration charges configurations.
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
            Add Registration Charges
          </Button>
        </div>
      </div>

      {isError && (
        <div className="p-4 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active local master data.</span>
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
      <RegistrationChargesModal />
      <RegistrationChargesDeleteDialog />
    </div>
  );
}
