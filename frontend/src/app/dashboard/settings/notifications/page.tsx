"use client";

import { useMemo, useState } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  useNotificationListQuery,
  useNotificationTypeListQuery,
} from "@/modules/admin/settings/notifications/hooks";
import { useNotificationModalStore } from "@/modules/admin/settings/notifications/stores/useNotificationModalStore";
import { useNotificationTypeModalStore } from "@/modules/admin/settings/notifications/stores/useNotificationTypeModalStore";
import {
  NotificationRecord,
  NotificationTypeRecord,
} from "@/modules/admin/settings/notifications/types";
import {
  defaultNotificationTypes,
  fallbackNotifications,
} from "@/modules/admin/settings/notifications/constants";
import { NotificationModal } from "@/modules/admin/settings/notifications/components/notification-modal";
import { NotificationDeleteDialog } from "@/modules/admin/settings/notifications/components/notification-delete-dialog";
import { NotificationTypeModal } from "@/modules/admin/settings/notifications/components/notification-type-modal";
import { NotificationTypeDeleteDialog } from "@/modules/admin/settings/notifications/components/notification-type-delete-dialog";
import {
  Bell,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Tag,
  Users,
  CheckCircle2,
} from "lucide-react";

// =========================================================================
// TAB 1: NOTIFICATIONS TABLE COLUMNS
// =========================================================================

function NotifIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, NotificationRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function NotifImageHeader() {
  return <span className="text-xs font-semibold">Media</span>;
}

function NotifTitleHeader({ column }: Readonly<{ column: Column<AppTableFeatures, NotificationRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Notification & Content" />;
}

function NotifUserTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, NotificationRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Target User Type" />;
}

function NotifTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, NotificationRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Category Type" />;
}

function NotifStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, NotificationRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function NotifActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

// Cells
function TableIdBadgeCell({ id }: Readonly<{ id?: string }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {id || "-"}
    </span>
  );
}

function NotifIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationRecord> }>) {
  return <TableIdBadgeCell id={row.original.id} />;
}

function NotifImageCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationRecord> }>) {
  const imageUrl = row.original.imageUrl;
  return (
    <div className="w-10 h-10 rounded-xl bg-muted/70 border border-border/80 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={row.original.title || "Notification"}
          className="w-full h-full object-cover"
        />
      ) : (
        <Bell className="w-4 h-4 text-muted-foreground/70" />
      )}
    </div>
  );
}

function NotifTitleCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationRecord> }>) {
  const notif = row.original;
  const description = notif.description || notif.message || "-";
  return (
    <div className="flex flex-col max-w-[320px] min-w-[200px]">
      <span className="text-sm font-semibold text-foreground tracking-tight line-clamp-1">
        {notif.title}
      </span>
      <span className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
        {description}
      </span>
    </div>
  );
}

function NotifUserTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationRecord> }>) {
  const userTypeName = row.original.userTypeName || row.original.userTypeId || "All User Roles";
  return (
    <Badge variant="outline" className="text-xs font-semibold bg-primary/5 text-primary border-primary/20">
      <Users className="w-3 h-3 mr-1" />
      {userTypeName}
    </Badge>
  );
}

function NotifTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationRecord> }>) {
  const typeName = row.original.notificationTypeName || row.original.notificationTypeId || "General";
  return (
    <Badge variant="secondary" className="text-xs font-medium">
      <Tag className="w-3 h-3 mr-1" />
      {typeName}
    </Badge>
  );
}

function StatusBadgeCell({ status }: Readonly<{ status?: string }>) {
  const isActive = status === "Active";
  return isActive ? (
    <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
      Active
    </Badge>
  ) : (
    <Badge variant="outline" className="text-xs uppercase text-muted-foreground">
      Inactive
    </Badge>
  );
}

function NotifStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationRecord> }>) {
  return <StatusBadgeCell status={row.original.status} />;
}

function NotifActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationRecord> }>) {
  const { openEdit, openDelete } = useNotificationModalStore();
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit Notification"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.title || record.id)}
        title="Delete Notification"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

// =========================================================================
// TAB 2: NOTIFICATION TYPES TABLE COLUMNS
// =========================================================================

function TypeIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, NotificationTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function TypeNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, NotificationTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Type Name" />;
}

function TypeSlugHeader({ column }: Readonly<{ column: Column<AppTableFeatures, NotificationTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Code / Slug" />;
}

function TypeDescHeader({ column }: Readonly<{ column: Column<AppTableFeatures, NotificationTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Description" />;
}

function TypeStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, NotificationTypeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function TypeActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

// Cells
function TypeIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationTypeRecord> }>) {
  return <TableIdBadgeCell id={row.original.id} />;
}

function TypeNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationTypeRecord> }>) {
  const item = row.original;
  return (
    <div className="flex items-center gap-2">
      <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
        <Tag className="w-3.5 h-3.5" />
      </div>
      <span className="text-sm font-semibold text-foreground">{item.name}</span>
    </div>
  );
}

function TypeSlugCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationTypeRecord> }>) {
  return (
    <code className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/40">
      {row.original.slug}
    </code>
  );
}

function TypeDescCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationTypeRecord> }>) {
  return (
    <span className="text-xs text-muted-foreground max-w-[280px] line-clamp-1">
      {row.original.description || "-"}
    </span>
  );
}

function TypeStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationTypeRecord> }>) {
  return <StatusBadgeCell status={row.original.status} />;
}

function TypeActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, NotificationTypeRecord> }>) {
  const { openEdit, openDelete } = useNotificationTypeModalStore();
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit Type"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.name || record.id)}
        title="Delete Type"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

// =========================================================================
// MAIN PAGE COMPONENT
// =========================================================================
export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"notifications" | "notification-types">("notifications");

  // Queries
  const {
    data: notificationsData,
    isLoading: isNotifLoading,
    isError: isNotifError,
    refetch: refetchNotifs,
  } = useNotificationListQuery();

  const {
    data: notificationTypesData,
    isLoading: isTypeLoading,
    isError: isTypeError,
    refetch: refetchTypes,
  } = useNotificationTypeListQuery();

  // Modal Stores
  const { openCreate: openCreateNotification } = useNotificationModalStore();
  const { openCreate: openCreateNotificationType } = useNotificationTypeModalStore();

  // Data processing
  const notificationsList = useMemo<NotificationRecord[]>(() => {
    if (notificationsData && notificationsData.length > 0) {
      return notificationsData;
    }
    return fallbackNotifications;
  }, [notificationsData]);

  const notificationTypesList = useMemo<NotificationTypeRecord[]>(() => {
    if (notificationTypesData && notificationTypesData.length > 0) {
      return notificationTypesData;
    }
    return defaultNotificationTypes;
  }, [notificationTypesData]);

  // Tab 1 Columns
  const notifColumns = useMemo<ColumnDef<AppTableFeatures, NotificationRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: NotifIdHeader,
        cell: NotifIdCell,
      },
      {
        id: "image",
        header: NotifImageHeader,
        cell: NotifImageCell,
        enableSorting: false,
      },
      {
        accessorKey: "title",
        header: NotifTitleHeader,
        cell: NotifTitleCell,
      },
      {
        accessorKey: "userTypeName",
        header: NotifUserTypeHeader,
        cell: NotifUserTypeCell,
      },
      {
        accessorKey: "notificationTypeName",
        header: NotifTypeHeader,
        cell: NotifTypeCell,
      },
      {
        accessorKey: "status",
        header: NotifStatusHeader,
        cell: NotifStatusCell,
      },
      {
        id: "actions",
        header: NotifActionsHeader,
        cell: NotifActionsCell,
        enableSorting: false,
      },
    ],
    []
  );

  // Tab 2 Columns
  const typeColumns = useMemo<ColumnDef<AppTableFeatures, NotificationTypeRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: TypeIdHeader,
        cell: TypeIdCell,
      },
      {
        accessorKey: "name",
        header: TypeNameHeader,
        cell: TypeNameCell,
      },
      {
        accessorKey: "slug",
        header: TypeSlugHeader,
        cell: TypeSlugCell,
      },
      {
        accessorKey: "description",
        header: TypeDescHeader,
        cell: TypeDescCell,
      },
      {
        accessorKey: "status",
        header: TypeStatusHeader,
        cell: TypeStatusCell,
      },
      {
        id: "actions",
        header: TypeActionsHeader,
        cell: TypeActionsCell,
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <div className="mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <Bell className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Notifications & Broadcasts
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Send targeted notifications by User Type and manage broadcast notification categories.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void refetchNotifs();
              void refetchTypes();
            }}
            disabled={isNotifLoading || isTypeLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isNotifLoading || isTypeLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          {activeTab === "notifications" ? (
            <Button
              onClick={openCreateNotification}
              className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              Add Notification
            </Button>
          ) : (
            <Button
              onClick={openCreateNotificationType}
              className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              Add Notification Type
            </Button>
          )}
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Broadcasts</p>
            <p className="text-xl font-bold text-foreground">{notificationsList.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Notifications</p>
            <p className="text-xl font-bold text-foreground">
              {notificationsList.filter((n) => n.status === "Active").length}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Notification Types</p>
            <p className="text-xl font-bold text-foreground">{notificationTypesList.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Target Groups</p>
            <p className="text-xl font-bold text-foreground">Multi-Role</p>
          </div>
        </div>
      </div>

      {/* Modern Tab Bar */}
      <div className="flex items-center gap-1 p-1 bg-muted/70 rounded-xl border border-border/60 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer",
            activeTab === "notifications"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Bell className="w-3.5 h-3.5 text-primary" />
          Notifications List
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("notification-types")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer",
            activeTab === "notification-types"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Tag className="w-3.5 h-3.5 text-primary" />
          Notification Types
        </button>
      </div>

      {/* TAB 1: NOTIFICATIONS CONTENT */}
      {activeTab === "notifications" && (
        <div className="space-y-4 pt-1">
          {isNotifError && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
              <span>Failed to connect to backend server. Showing active local notification data.</span>
              <Button variant="ghost" size="sm" onClick={() => void refetchNotifs()}>
                Retry
              </Button>
            </div>
          )}

          <DataTable
            columns={notifColumns}
            data={notificationsList}
            loading={isNotifLoading}
            searchPlaceholder="Search notifications by title, user type, category..."
            searchDebounceMs={300}
            containerHeight="560px"
          />
        </div>
      )}

      {/* TAB 2: NOTIFICATION TYPES CONTENT */}
      {activeTab === "notification-types" && (
        <div className="space-y-4 pt-1">
          {isTypeError && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
              <span>Failed to connect to backend server. Showing active local type data.</span>
              <Button variant="ghost" size="sm" onClick={() => void refetchTypes()}>
                Retry
              </Button>
            </div>
          )}

          <DataTable
            columns={typeColumns}
            data={notificationTypesList}
            loading={isTypeLoading}
            searchPlaceholder="Search notification types by name, slug..."
            searchDebounceMs={300}
            containerHeight="560px"
          />
        </div>
      )}

      {/* CRUD Modals and Dialogs */}
      <NotificationModal />
      <NotificationDeleteDialog />
      <NotificationTypeModal />
      <NotificationTypeDeleteDialog />
    </div>
  );
}
