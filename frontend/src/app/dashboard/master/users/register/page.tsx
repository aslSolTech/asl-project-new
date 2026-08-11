"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserRegisterListQuery } from "@/modules/admin/master/userRegister/hooks";
import { useUserRegisterModalStore } from "@/modules/admin/master/userRegister/stores/useUserRegisterModalStore";
import { UserRegisterRecord } from "@/modules/admin/master/userRegister/types";
import { UserRegisterModal } from "@/modules/admin/master/userRegister/components/user-register-modal";
import { UserRegisterDeleteDialog } from "@/modules/admin/master/userRegister/components/user-register-delete-dialog";
import {
  UserPlus,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

// Helper cells
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}


function UserNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Username" />;
}

function UserNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const val = row.original.userName;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function EmailHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Email" />;
}

function EmailCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const val = row.original.email;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function MobileHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Mobile Number" />;
}

function MobileCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const val = row.original.mobile;
  if (val === "active" || val === "true") {
    return <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">{val}</Badge>;
  }
  if (val === "inactive" || val === "false") {
    return <Badge variant="outline" className="text-xs uppercase">{val}</Badge>;
  }
  return <span className="text-sm font-medium text-foreground">{val || "-"}</span>;
}


function CompanyNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Company Name" />;
}

function CompanyNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const val = row.original.companyName;
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

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const { openEdit, openDelete } = useUserRegisterModalStore();
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
        onClick={() => openDelete(record.id, record.userName || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function UserRegisterPage() {
  const { data: listData, isLoading, isError, refetch } = useUserRegisterListQuery();
  const { openCreate } = useUserRegisterModalStore();

  const displayData = useMemo<UserRegisterRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
  {
    "id": "USR-001",
    "userName": "rahul_partner",
    "email": "rahul@gmail.com",
    "mobile": "+91 9777666555",
    "companyName": "Rahul Tech Solutions"
  }
];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, UserRegisterRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "userName",
        header: UserNameHeader,
        cell: UserNameCell,
      },
      {
        accessorKey: "email",
        header: EmailHeader,
        cell: EmailCell,
      },
      {
        accessorKey: "mobile",
        header: MobileHeader,
        cell: MobileCell,
      },
      {
        accessorKey: "companyName",
        header: CompanyNameHeader,
        cell: CompanyNameCell,
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
            <UserPlus className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              User Register Setup
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official user register configurations.
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
            Add User Register
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
      <UserRegisterModal />
      <UserRegisterDeleteDialog />
    </div>
  );
}
