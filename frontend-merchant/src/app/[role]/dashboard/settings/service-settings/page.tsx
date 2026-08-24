"use client";

import { useMemo, useState } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSettingsListQuery } from "@/modules/admin/settings/services/settings/hooks";
import { useSettingsModalStore } from "@/modules/admin/settings/services/settings/stores/useSettingsModalStore";
import { SettingsRecord } from "@/modules/admin/settings/services/settings/types";
import { INITIAL_SERVICE_SETTINGS } from "@/modules/admin/settings/services/settings/constants";
import { SettingsModal } from "@/modules/admin/settings/services/settings/components/settings-modal";
import { SettingsDeleteDialog } from "@/modules/admin/settings/services/settings/components/settings-delete-dialog";

import { useCategoriesListQuery } from "@/modules/admin/settings/services/categories/hooks";
import { useCategoriesModalStore } from "@/modules/admin/settings/services/categories/stores/useCategoriesModalStore";
import { CategoriesRecord } from "@/modules/admin/settings/services/categories/types";
import { INITIAL_SERVICE_CATEGORIES } from "@/modules/admin/settings/services/categories/constants";
import { CategoriesModal } from "@/modules/admin/settings/services/categories/components/categories-modal";
import { CategoriesDeleteDialog } from "@/modules/admin/settings/services/categories/components/categories-delete-dialog";

import {
  Sliders,
  Layers,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ServerCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                        SERVICE SETTINGS TABLE COLUMNS                      */
/* -------------------------------------------------------------------------- */

function SettingIconHeader({ column }: Readonly<{ column: Column<AppTableFeatures, SettingsRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Icon" />;
}

function SettingIconCell({ row }: Readonly<{ row: Row<AppTableFeatures, SettingsRecord> }>) {
  const icon = row.original.serviceIcon;
  const name = row.original.serviceName || "Service";
  const initial = name.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center justify-center">
      <Avatar className="w-9 h-9 rounded-xl border border-border/80 shadow-xs bg-muted/50">
        {icon ? (
          <AvatarImage
            src={typeof icon === "string" ? icon : URL.createObjectURL(icon as Blob)}
            alt={name}
            className="object-cover"
          />
        ) : null}
        <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-bold text-xs">
          {initial}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

function SettingNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, SettingsRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Service Name" />;
}

function SettingNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, SettingsRecord> }>) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-semibold text-sm text-foreground">{row.original.serviceName}</span>
      {row.original.shortDesc && (
        <span className="text-xs text-muted-foreground line-clamp-1 max-w-[260px]">
          {row.original.shortDesc}
        </span>
      )}
    </div>
  );
}

function SettingTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, SettingsRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Service Type" />;
}

function SettingTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, SettingsRecord> }>) {
  const type = row.original.serviceType;
  return (
    <Badge
      variant="outline"
      className="bg-primary/10 text-primary border-primary/20 font-medium text-xs px-2 py-0.5"
    >
      {type || "General"}
    </Badge>
  );
}

function SettingLinkHeader({ column }: Readonly<{ column: Column<AppTableFeatures, SettingsRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Link Page" />;
}

function SettingLinkCell({ row }: Readonly<{ row: Row<AppTableFeatures, SettingsRecord> }>) {
  const link = row.original.linkPage;
  if (!link) return <span className="text-muted-foreground text-xs">-</span>;
  return (
    <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
      <span className="truncate max-w-[180px]">{link}</span>
      <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
    </div>
  );
}

function SettingOrderHeader({ column }: Readonly<{ column: Column<AppTableFeatures, SettingsRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Order" />;
}

function SettingOrderCell({ row }: Readonly<{ row: Row<AppTableFeatures, SettingsRecord> }>) {
  const order = row.original.serviceOrder;
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50">
      #{order ?? 0}
    </span>
  );
}

function StatusBadge({ status }: Readonly<{ status?: string }>) {
  const val = String(status || "").toLowerCase();
  if (val === "active" || val === "true" || val === "y") {
    return (
      <Badge variant="default" className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">
        Active
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs text-muted-foreground border-border/80">
      Inactive
    </Badge>
  );
}

function SettingStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, SettingsRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function SettingStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, SettingsRecord> }>) {
  return <StatusBadge status={row.original.status} />;
}

function SettingActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function SettingActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, SettingsRecord> }>) {
  const { openEdit, openDelete } = useSettingsModalStore();
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.serviceName || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                        SERVICE TYPES TABLE COLUMNS                         */
/* -------------------------------------------------------------------------- */

function TypeIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CategoriesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function TypeIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, CategoriesRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function TypeNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CategoriesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Service Type / Category Name" />;
}

function TypeNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, CategoriesRecord> }>) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-primary/70" />
      <span className="text-sm font-semibold text-foreground">
        {row.original.categoryName}
      </span>
    </div>
  );
}

function TypeStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CategoriesRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function TypeStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, CategoriesRecord> }>) {
  return <StatusBadge status={row.original.status} />;
}

function TypeActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function TypeActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, CategoriesRecord> }>) {
  const { openEdit, openDelete } = useCategoriesModalStore();
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.categoryName || record.id)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            MAIN UNIFIED COMPONENT                          */
/* -------------------------------------------------------------------------- */

type ActiveTab = "settings" | "types";

export default function ServiceSettingsPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("settings");

  // Service Settings queries & modal
  const {
    data: settingsData,
    isLoading: isSettingsLoading,
    isError: isSettingsError,
    refetch: refetchSettings,
  } = useSettingsListQuery();
  const { openCreate: openCreateSetting } = useSettingsModalStore();

  // Service Categories/Types queries & modal
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useCategoriesListQuery();
  const { openCreate: openCreateCategory } = useCategoriesModalStore();

  // Display data with complete fallbacks
  const displaySettings = useMemo<SettingsRecord[]>(() => {
    if (settingsData && settingsData.length > 0) {
      return settingsData;
    }
    return INITIAL_SERVICE_SETTINGS;
  }, [settingsData]);

  const displayCategories = useMemo<CategoriesRecord[]>(() => {
    if (categoriesData && categoriesData.length > 0) {
      return categoriesData;
    }
    return INITIAL_SERVICE_CATEGORIES;
  }, [categoriesData]);

  // Columns definitions
  const settingsColumns = useMemo<ColumnDef<AppTableFeatures, SettingsRecord, unknown>[]>(
    () => [
      {
        accessorKey: "serviceIcon",
        header: SettingIconHeader,
        cell: SettingIconCell,
        enableSorting: false,
      },
      {
        accessorKey: "serviceName",
        header: SettingNameHeader,
        cell: SettingNameCell,
      },
      {
        accessorKey: "serviceType",
        header: SettingTypeHeader,
        cell: SettingTypeCell,
      },
      {
        accessorKey: "linkPage",
        header: SettingLinkHeader,
        cell: SettingLinkCell,
      },
      {
        accessorKey: "serviceOrder",
        header: SettingOrderHeader,
        cell: SettingOrderCell,
      },
      {
        accessorKey: "status",
        header: SettingStatusHeader,
        cell: SettingStatusCell,
      },
      {
        id: "actions",
        header: SettingActionsHeader,
        cell: SettingActionsCell,
        enableSorting: false,
      },
    ],
    []
  );

  const categoriesColumns = useMemo<ColumnDef<AppTableFeatures, CategoriesRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: TypeIdHeader,
        cell: TypeIdCell,
      },
      {
        accessorKey: "categoryName",
        header: TypeNameHeader,
        cell: TypeNameCell,
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

  const handleRefresh = () => {
    if (activeTab === "settings") {
      void refetchSettings();
    } else {
      void refetchCategories();
    }
  };

  const isCurrentLoading = activeTab === "settings" ? isSettingsLoading : isCategoriesLoading;

  return (
    <div className="mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <ServerCog className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Services Management
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure service types/categories and registered service links with icons and order.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isCurrentLoading}
            className="flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isCurrentLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          {activeTab === "settings" ? (
            <Button
              onClick={openCreateSetting}
              className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              Add Service Setting
            </Button>
          ) : (
            <Button
              onClick={openCreateCategory}
              className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              Add Service Type
            </Button>
          )}
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Services</p>
            <p className="text-xl font-bold text-foreground">{displaySettings.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Services</p>
            <p className="text-xl font-bold text-foreground">
              {displaySettings.filter((s) => String(s.status).toLowerCase() === "active").length}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Service Types</p>
            <p className="text-xl font-bold text-foreground">{displayCategories.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Types</p>
            <p className="text-xl font-bold text-foreground">
              {displayCategories.filter((c) => String(c.status).toLowerCase() === "active").length}
            </p>
          </div>
        </div>
      </div>

      {/* Modern Tab Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-muted/70 rounded-xl border border-border/60 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer",
            activeTab === "settings"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sliders className="w-3.5 h-3.5 text-primary" />
          Service Setting
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("types")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer",
            activeTab === "types"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Layers className="w-3.5 h-3.5 text-primary" />
          Service Type ({displayCategories.length})
        </button>
      </div>

      {/* TAB 1: SERVICE SETTINGS */}
      {activeTab === "settings" && (
        <div className="space-y-4 pt-1">
          {isSettingsError && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
              <span>Failed to connect to backend server. Showing active local service data.</span>
              <Button variant="ghost" size="sm" onClick={() => void refetchSettings()}>
                Retry
              </Button>
            </div>
          )}

          <DataTable
            columns={settingsColumns}
            data={displaySettings}
            loading={isSettingsLoading}
            searchPlaceholder="Search services by name, type, link..."
            searchDebounceMs={300}
            containerHeight="560px"
          />
        </div>
      )}

      {/* TAB 2: SERVICE TYPES / CATEGORIES */}
      {activeTab === "types" && (
        <div className="space-y-4 pt-1">
          {isCategoriesError && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
              <span>Failed to connect to backend server. Showing active local categories data.</span>
              <Button variant="ghost" size="sm" onClick={() => void refetchCategories()}>
                Retry
              </Button>
            </div>
          )}

          <DataTable
            columns={categoriesColumns}
            data={displayCategories}
            loading={isCategoriesLoading}
            searchPlaceholder="Search service types & categories..."
            searchDebounceMs={300}
            containerHeight="560px"
          />
        </div>
      )}

      {/* Modals & Dialogs */}
      <SettingsModal />
      <SettingsDeleteDialog />
      <CategoriesModal />
      <CategoriesDeleteDialog />
    </div>
  );
}
