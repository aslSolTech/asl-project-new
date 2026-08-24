"use client";

import { useMemo, useState } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  useUserListQuery,
  useUpdateUserMutation,
} from "@/modules/admin/services/payout/user/hooks";
import { useUserModalStore } from "@/modules/admin/services/payout/user/stores/useUserModalStore";
import { UserRecord } from "@/modules/admin/services/payout/user/types";
import { UserModal } from "@/modules/admin/services/payout/user/components/user-modal";
import { UserDeleteDialog } from "@/modules/admin/services/payout/user/components/user-delete-dialog";
import { StatusSecretKeyModal } from "@/modules/admin/services/service/shared/components/status-toggle-modal";
import {
  Route,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  User as UserIcon,
  Server,
  Layers,
} from "lucide-react";

// 1. ID Column
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id") ?? row.original.id)}
    </span>
  );
}

// 2. User & User Type Column
function UserHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="User & Role" />;
}

function UserCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  const userName = row.original.userName || row.original.user || "-";
  const userTypeName = row.original.userTypeName || "User";
  const userCode = row.original.userCode;

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5 font-semibold text-sm text-foreground">
        <UserIcon className="w-3.5 h-3.5 text-primary/70 shrink-0" />
        <span>{userName}</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-muted/40 font-medium">
          {userTypeName}
        </Badge>
        {userCode && <span className="font-mono text-[11px]">({userCode})</span>}
      </div>
    </div>
  );
}

// 3. Provider Name Column
function ProviderHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Provider Name" />;
}

function ProviderCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  const provider = row.original.providerName || row.original.api || "-";
  return (
    <div className="flex items-center gap-1.5 font-medium text-sm text-foreground">
      <Server className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
      <span>{provider}</span>
    </div>
  );
}

// 4. Fallback Provider Column
function FallbackHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Fallback" />;
}

function FallbackCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  const fallback = row.original.fallback;
  if (!fallback || fallback === "None" || fallback === "") {
    return <span className="text-xs text-muted-foreground italic">None</span>;
  }
  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <Layers className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      <span>{fallback}</span>
    </div>
  );
}

// 5. Status Column with interactive Switch
function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function StatusCell({
  row,
  onToggleStatus,
}: Readonly<{
  row: Row<AppTableFeatures, UserRecord>;
  onToggleStatus: (record: UserRecord) => void;
}>) {
  const record = row.original;
  const isActive = record.status === "active";

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isActive}
        onCheckedChange={() => onToggleStatus(record)}
        className="cursor-pointer data-[state=checked]:bg-emerald-500"
      />
      <Badge
        variant={isActive ? "default" : "outline"}
        className={`text-xs uppercase ${
          isActive
            ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20"
            : "text-muted-foreground"
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
}

// 6. Actions Column
function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({
  row,
  onEdit,
  onDelete,
}: Readonly<{
  row: Row<AppTableFeatures, UserRecord>;
  onEdit: (record: UserRecord) => void;
  onDelete: (id: string, name?: string) => void;
}>) {
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onEdit(record)}
        title="Edit"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onDelete(record.id, record.userName || record.user || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

function renderStatusCell(row: Row<AppTableFeatures, UserRecord>, onToggleStatus: (record: UserRecord) => void) {
  return <StatusCell row={row} onToggleStatus={onToggleStatus} />;
}

function renderActionsCell(
  row: Row<AppTableFeatures, UserRecord>,
  onEdit: (record: UserRecord) => void,
  onDelete: (id: string, name?: string) => void
) {
  return <ActionsCell row={row} onEdit={onEdit} onDelete={onDelete} />;
}

function usePayoutUserColumns({
  onToggleStatus,
  onEdit,
  onDelete,
}: {
  onToggleStatus: (record: UserRecord) => void;
  onEdit: (record: UserRecord) => void;
  onDelete: (id: string, name?: string) => void;
}): ColumnDef<AppTableFeatures, UserRecord, unknown>[] {
  return useMemo<ColumnDef<AppTableFeatures, UserRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "userName",
        header: UserHeader,
        cell: UserCell,
      },
      {
        accessorKey: "providerName",
        header: ProviderHeader,
        cell: ProviderCell,
      },
      {
        accessorKey: "fallback",
        header: FallbackHeader,
        cell: FallbackCell,
      },
      {
        accessorKey: "status",
        header: StatusHeader,
        cell: ({ row }) => renderStatusCell(row, onToggleStatus),
      },
      {
        id: "actions",
        header: ActionsHeader,
        cell: ({ row }) => renderActionsCell(row, onEdit, onDelete),
        enableSorting: false,
      },
    ],
    [onToggleStatus, onEdit, onDelete]
  );
}

export default function UserPage() {

  const { data: listData, isLoading, isError, refetch } = useUserListQuery();
  const { openCreate, openEdit, openDelete } = useUserModalStore();
  const updateMutation = useUpdateUserMutation();

  const [statusTarget, setStatusTarget] = useState<{
    record: UserRecord;
    nextStatus: "active" | "inactive";
  } | null>(null);

  const displayData = useMemo<UserRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }

    // Default mock data with full fields
    const mock: UserRecord[] = [
      {
        id: "USR-RT-101",
        userTypeId: "USR-004",
        userTypeName: "Retailer",
        userId: "USR-REC-001",
        userName: "Rahul Sharma (Sharma Digital Pay)",
        userCode: "REG-2024-001",
        user: "Rahul Sharma (Sharma Digital Pay)",
        providerName: "RazorpayX Direct",
        api: "RazorpayX Direct",
        fallback: "Cashfree AutoPayout",
        status: "active",
        createdAt: "2026-08-18T10:15:30.000Z",
        updatedAt: "2026-08-20T14:30:00.000Z",
      },
      {
        id: "USR-RT-102",
        userTypeId: "USR-003",
        userTypeName: "Distributor",
        userId: "USR-REC-002",
        userName: "Amit Verma (Verma Telecom Services)",
        userCode: "REG-2024-002",
        user: "Amit Verma (Verma Telecom Services)",
        providerName: "Cashfree AutoPayout",
        api: "Cashfree AutoPayout",
        fallback: "None",
        status: "active",
        createdAt: "2026-08-19T09:00:00.000Z",
        updatedAt: "2026-08-20T11:20:00.000Z",
      },
    ];
    return mock;
  }, [listData]);

  const handleStatusToggleClick = (record: UserRecord) => {
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

  const columns = usePayoutUserColumns({
    onToggleStatus: handleStatusToggleClick,
    onEdit: (rec) => openEdit(rec.id, rec),
    onDelete: (id, name) => openDelete(id, name ?? ""),
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
              User Wise Routing
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage user-specific Payout provider routing and fallback configurations.
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
            Add User Wise Routing
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
        searchPlaceholder="Search by user or provider..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <UserModal />
      <UserDeleteDialog />

      {/* Secret Key Modal for Active / Inactive Toggle */}
      {statusTarget && (
        <StatusSecretKeyModal
          isOpen={Boolean(statusTarget)}
          onClose={() => setStatusTarget(null)}
          onConfirm={handleConfirmStatusChange}
          targetStatus={statusTarget.nextStatus}
          serviceName={statusTarget.record.userName || statusTarget.record.user || "User Routing"}
        />
      )}
    </div>
  );
}


