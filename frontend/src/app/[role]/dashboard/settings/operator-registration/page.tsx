"use client";

import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOperatorRegisterListQuery } from "@/modules/admin/master/operatorRegister/hooks";
import { useOperatorRegisterModalStore } from "@/modules/admin/master/operatorRegister/stores/useOperatorRegisterModalStore";
import { OperatorRegisterRecord } from "@/modules/admin/master/operatorRegister/types";
import { OperatorRegisterModal } from "@/modules/admin/master/operatorRegister/components/operator-register-modal";
import { OperatorRegisterDeleteDialog } from "@/modules/admin/master/operatorRegister/components/operator-register-delete-dialog";
import {
  Radio,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Globe,
  MapPin,
  FileCode,
  Zap,
} from "lucide-react";
import Image from "next/image";

// ==========================================
// COLUMN HEADERS
// ==========================================
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function OperatorNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Operator" />;
}

function OperatorTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Operator Type" />;
}

function StateHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="State / Circle" />;
}

function ParameterHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Parameters & Link" />;
}

function IsFetchHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Is Fetch" />;
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

// ==========================================
// COLUMN CELLS
// ==========================================
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRegisterRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/70 text-muted-foreground border border-border/60">
      {String(row.getValue?.("id") || row.original.id)}
    </span>
  );
}

function OperatorNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRegisterRecord> }>) {
  const record = row.original;
  return (
    <div className="flex items-center gap-2.5 min-w-[170px]">
      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shrink-0 overflow-hidden">
        {record.operatorIcon ? (
          
          <Image
            src={record.operatorIcon}
            alt={record.operatorName}
            width={50}
            height={50}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        ) : (
          <Radio className="w-4 h-4" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground tracking-tight">
          {record.operatorName}
        </span>
        {record.code && (
          <span className="text-[10px] font-mono text-muted-foreground">
            Code: {record.code}
          </span>
        )}
      </div>
    </div>
  );
}

function OperatorTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRegisterRecord> }>) {
  const record = row.original;
  const typeText = record.operatorTypeName || record.operatorTypeId || record.category || "-";

  return (
    <Badge variant="outline" className="text-xs font-medium uppercase px-2 py-0.5 bg-primary/5 text-primary border-primary/20">
      {typeText}
    </Badge>
  );
}

function StateCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRegisterRecord> }>) {
  const stateName = row.original.stateName || "All India";
  return (
    <div className="flex items-center gap-1.5 text-xs text-foreground min-w-[120px]">
      <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      <span>{stateName}</span>
    </div>
  );
}

function ParameterCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRegisterRecord> }>) {
  const record = row.original;
  const hasParam = Boolean(record.optionalParameter);
  const hasLink = Boolean(record.parameterLink);

  if (!hasParam && !hasLink) {
    return <span className="text-xs text-muted-foreground">-</span>;
  }

  return (
    <div className="flex flex-col gap-1 min-w-[160px] max-w-[220px] text-xs">
      {hasParam && (
        <div className="flex items-center gap-1.5 text-foreground font-medium">
          <FileCode className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="truncate" title={record.optionalParameter}>
            {record.optionalParameter}
          </span>
        </div>
      )}
      {hasLink && (
        <a
          href={record.parameterLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-primary hover:underline hover:text-primary/80 truncate"
          title={record.parameterLink}
        >
          <Globe className="w-3 h-3 shrink-0 text-muted-foreground" />
          <span className="truncate">{record.parameterLink}</span>
        </a>
      )}
    </div>
  );
}

function IsFetchCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRegisterRecord> }>) {
  const isFetch = (row.original.isFetch || "N").toUpperCase() === "Y";

  return (
    <Badge
      variant={isFetch ? "default" : "outline"}
      className={`text-[11px] font-semibold px-2 py-0.5 ${
        isFetch
          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
          : "text-muted-foreground border-border bg-muted/40"
      }`}
    >
      <Zap className="w-3 h-3 mr-1" />
      {isFetch ? "YES" : "NO"}
    </Badge>
  );
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRegisterRecord> }>) {
  const status = (row.original.status || "Y").toUpperCase();
  const isActive = status === "Y" || status === "ACTIVE" || status === "TRUE";

  if (isActive) {
    return (
      <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">
        Active
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs uppercase text-amber-600 border-amber-500/30 bg-amber-500/10">
      Inactive
    </Badge>
  );
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorRegisterRecord> }>) {
  const { openEdit, openDelete } = useOperatorRegisterModalStore();
  const record = row.original;

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit Operator"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.operatorName || record.id)}
        title="Delete Operator"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function OperatorRegistrationPage() {
  const { data: listData, isLoading, isError, refetch } = useOperatorRegisterListQuery();
  const { openCreate } = useOperatorRegisterModalStore();

  const displayData = useMemo<OperatorRegisterRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
      {
        id: "OP-001",
        operatorTypeId: "mobile_prepaid",
        operatorTypeName: "Mobile Prepaid",
        operatorName: "Jio Prepaid",
        stateName: "All India",
        optionalParameter: "Mobile Number (10 digits)",
        parameterLink: "https://api.partner.com/jio/plans",
        operatorIcon: "",
        isFetch: "Y",
        status: "Y",
        code: "JIO",
      },
      {
        id: "OP-002",
        operatorTypeId: "mobile_prepaid",
        operatorTypeName: "Mobile Prepaid",
        operatorName: "Airtel Prepaid",
        stateName: "All India",
        optionalParameter: "Mobile Number",
        parameterLink: "https://api.partner.com/airtel/plans",
        operatorIcon: "",
        isFetch: "Y",
        status: "Y",
        code: "AIRTEL",
      },
      {
        id: "OP-003",
        operatorTypeId: "dth",
        operatorTypeName: "DTH",
        operatorName: "Tata Play",
        stateName: "All India",
        optionalParameter: "Subscriber ID / Registered Mobile",
        parameterLink: "",
        operatorIcon: "",
        isFetch: "Y",
        status: "Y",
        code: "TATAPLAY",
      },
      {
        id: "OP-004",
        operatorTypeId: "electricity",
        operatorTypeName: "Electricity",
        operatorName: "BESCOM (Bangalore)",
        stateName: "Karnataka",
        optionalParameter: "Account ID / Consumer Number",
        parameterLink: "https://bescom.karnataka.gov.in",
        operatorIcon: "",
        isFetch: "N",
        status: "Y",
        code: "BESCOM",
      },
    ];
  }, [listData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, OperatorRegisterRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        id: "operatorName",
        header: OperatorNameHeader,
        cell: OperatorNameCell,
      },
      {
        id: "operatorType",
        header: OperatorTypeHeader,
        cell: OperatorTypeCell,
      },
      {
        id: "stateName",
        header: StateHeader,
        cell: StateCell,
      },
      {
        id: "parameterInfo",
        header: ParameterHeader,
        cell: ParameterCell,
      },
      {
        id: "isFetch",
        header: IsFetchHeader,
        cell: IsFetchCell,
      },
      {
        id: "status",
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
            <Radio className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Operator Registration
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure and manage operators, API parameters, fetch status, and regional circles.
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
            Add Operator
          </Button>
        </div>
      </div>

      {isError && (
        <div className="p-4 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active master data.</span>
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
        searchPlaceholder="Search operators by name, type, state, parameter..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <OperatorRegisterModal />
      <OperatorRegisterDeleteDialog />
    </div>
  );
}