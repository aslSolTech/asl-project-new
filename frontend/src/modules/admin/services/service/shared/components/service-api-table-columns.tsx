"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ServiceApiRecord } from "../types";
import { Clock, KeyRound, Edit2, Trash2 } from "lucide-react";

export function formatIsoDateTime(isoStr?: string) {
  if (!isoStr) return "-";
  try {
    const d = new Date(isoStr);
    if (Number.isNaN(d.getTime())) return isoStr;
    return d.toISOString().replace("T", " ").substring(0, 19) + " UTC";
  } catch {
    return isoStr;
  }
}

// 1. ID Column
export function ServiceApiIdHeader({
  column,
}: Readonly<{ column: Column<AppTableFeatures, ServiceApiRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

export function ServiceApiIdCell({
  row,
}: Readonly<{ row: Row<AppTableFeatures, ServiceApiRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id") ?? row.original.id)}
    </span>
  );
}

// 2. Provider / API Name Column
export function ServiceApiProviderHeader({
  column,
  title = "Provider / API Name",
}: Readonly<{
  column: Column<AppTableFeatures, ServiceApiRecord, unknown>;
  title?: string;
}>) {
  return <DataTableColumnHeader column={column} title={title} />;
}

export function ServiceApiProviderCell({
  row,
}: Readonly<{ row: Row<AppTableFeatures, ServiceApiRecord> }>) {
  const provider =
    row.original.providerName ||
    row.original.service ||
    row.original.bank ||
    "-";
  const apiName = row.original.apiName || row.original.api || "-";
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-foreground">{provider}</span>
      <span className="text-xs text-muted-foreground">{apiName}</span>
    </div>
  );
}

// 3. API Type Column
export function ServiceApiTypeHeader({
  column,
}: Readonly<{ column: Column<AppTableFeatures, ServiceApiRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API Type" />;
}

export function ServiceApiTypeCell({
  row,
}: Readonly<{ row: Row<AppTableFeatures, ServiceApiRecord> }>) {
  const val = row.original.apiType || "Service";
  return (
    <Badge variant="secondary" className="text-xs font-medium px-2 py-0.5">
      {val}
    </Badge>
  );
}

// 4. API Key Column
export function ServiceApiKeyHeader({
  column,
}: Readonly<{ column: Column<AppTableFeatures, ServiceApiRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API Key" />;
}

export function ServiceApiKeyCell({
  row,
}: Readonly<{ row: Row<AppTableFeatures, ServiceApiRecord> }>) {
  const key = row.original.apiKey ?? "-";
  return (
    <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-primary/5 text-primary border border-primary/20 flex items-center gap-1.5 w-fit">
      <KeyRound className="w-3 h-3 text-primary/70" />
      {String(key)}
    </span>
  );
}

// 5. Change Date Time Column
export function ServiceApiChangeDateHeader({
  column,
}: Readonly<{ column: Column<AppTableFeatures, ServiceApiRecord, unknown> }>) {
  return (
    <DataTableColumnHeader column={column} title="Change Date Time (ISO)" />
  );
}

export function ServiceApiChangeDateCell({
  row,
}: Readonly<{ row: Row<AppTableFeatures, ServiceApiRecord> }>) {
  const val =
    row.original.updatedAt ||
    row.original.createdAt ||
    "2026-08-20T19:00:00.000Z";
  return (
    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
      <Clock className="w-3.5 h-3.5 text-muted-foreground/70" />
      {formatIsoDateTime(val)}
    </span>
  );
}

// 6. Status Column
export function ServiceApiStatusHeader({
  column,
}: Readonly<{ column: Column<AppTableFeatures, ServiceApiRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

export function ServiceApiStatusCell({
  row,
  onToggleStatus,
}: Readonly<{
  row: Row<AppTableFeatures, ServiceApiRecord>;
  onToggleStatus: (record: ServiceApiRecord) => void;
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

// 7. Actions Column
export function ServiceApiActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

export function ServiceApiActionsCell({
  row,
  onEdit,
  onDelete,
}: Readonly<{
  row: Row<AppTableFeatures, ServiceApiRecord>;
  onEdit: (record: ServiceApiRecord) => void;
  onDelete: (record: ServiceApiRecord) => void;
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
        onClick={() => onDelete(record)}
        title="Delete"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

// Hook helper to generate standard columns cleanly
export function useServiceApiColumns({
  providerTitle = "Provider / API Name",
  onToggleStatus,
  onEdit,
  onDelete,
}: {
  providerTitle?: string;
  onToggleStatus: (record: ServiceApiRecord) => void;
  onEdit: (record: ServiceApiRecord) => void;
  onDelete: (record: ServiceApiRecord) => void;
}): ColumnDef<AppTableFeatures, ServiceApiRecord, unknown>[] {
  return useMemo<ColumnDef<AppTableFeatures, ServiceApiRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: ServiceApiIdHeader,
        cell: ServiceApiIdCell,
      },
      {
        accessorKey: "providerName",
        header: ({ column }) => (
          <ServiceApiProviderHeader column={column} title={providerTitle} />
        ),
        cell: ServiceApiProviderCell,
      },
      {
        accessorKey: "apiType",
        header: ServiceApiTypeHeader,
        cell: ServiceApiTypeCell,
      },
      {
        accessorKey: "apiKey",
        header: ServiceApiKeyHeader,
        cell: ServiceApiKeyCell,
      },
      {
        accessorKey: "updatedAt",
        header: ServiceApiChangeDateHeader,
        cell: ServiceApiChangeDateCell,
      },
      {
        accessorKey: "status",
        header: ServiceApiStatusHeader,
        cell: ({ row }) => (
          <ServiceApiStatusCell row={row} onToggleStatus={onToggleStatus} />
        ),
      },
      {
        id: "actions",
        header: ServiceApiActionsHeader,
        cell: ({ row }) => (
          <ServiceApiActionsCell
            row={row}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
        enableSorting: false,
      },
    ],
    [providerTitle, onToggleStatus, onEdit, onDelete]
  );
}
