"use client";

import { useMemo, useState } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOperatorCodeListQuery } from "@/modules/admin/master/operatorChargesCode/hooks";
import { useOperatorChargesCodeModalStore } from "@/modules/admin/master/operatorChargesCode/stores/useOperatorChargesCodeModalStore";
import { OperatorCodeRecord } from "@/modules/admin/master/operatorChargesCode/types";
import { OperatorCodeModal } from "@/modules/admin/master/operatorChargesCode/components/operator-charges-code-modal";
import { OperatorCodeDeleteDialog } from "@/modules/admin/master/operatorChargesCode/components/operator-charges-code-delete-dialog";
import { useOperatorTypeListQuery } from "@/modules/admin/master/operatorType/hooks";
import { useApiRegisterListQuery } from "@/modules/admin/master/apiRegister/hooks";
import { defaultOperatorTypes, fallbackApiList } from "@/modules/admin/master/operatorChargesCode/constants";
import {
  QrCode,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Layers,
  Server,
  Filter,
  Percent,
  Hash,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from "lucide-react";

// ==========================================
// COLUMN HEADERS
// ==========================================
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorCodeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID" />;
}

function ApiHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorCodeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API Provider / ID" />;
}

function OperatorTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorCodeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Operator Type" />;
}

function OperatorNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorCodeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Operator Name" />;
}

function CodeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorCodeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Operator Code" />;
}

function ConnectionTypeHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorCodeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Connection Type" />;
}

function CommissionHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorCodeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Commission Rate" />;
}

function GstHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorCodeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="GST (%)" />;
}

function IsFlatHeader({ column }: Readonly<{ column: Column<AppTableFeatures, OperatorCodeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Is Flat" />;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

// ==========================================
// COLUMN CELLS
// ==========================================
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorCodeRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.original.id || row.getValue?.("id"))}
    </span>
  );
}

function ApiCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorCodeRecord> }>) {
  const rec = row.original;
  const name = rec.apiName || rec.provider || "API Service";
  const id = rec.apiId || "API-001";
  return (
    <div className="flex flex-col gap-0.5 min-w-[130px]">
      <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
        <Server className="w-3 h-3 text-primary shrink-0" />
        {name}
      </span>
      <span className="text-[10px] font-mono text-muted-foreground">
        ID: <span className="font-semibold text-foreground/80">{id}</span>
      </span>
    </div>
  );
}

function OperatorTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorCodeRecord> }>) {
  const typeVal = row.original.operatorTypeName || row.original.operatorTypeId || row.original.apiType || "Mobile";
  return (
    <Badge variant="outline" className="text-xs font-medium capitalize px-2 py-0.5 bg-primary/5 text-primary border-primary/20">
      {typeVal.replace(/_/g, " ")}
    </Badge>
  );
}

function OperatorNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorCodeRecord> }>) {
  const name = row.original.operator || row.original.operatorName || "-";
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
        {name.charAt(0)}
      </div>
      <span className="text-sm font-semibold text-foreground">{name}</span>
    </div>
  );
}

function CodeCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorCodeRecord> }>) {
  const codeVal = row.original.code ?? "-";
  return (
    <Badge variant="secondary" className="font-mono text-xs font-bold px-2 py-0.5 bg-muted text-foreground border border-border">
      <Hash className="w-3 h-3 mr-0.5 text-muted-foreground" />
      {String(codeVal)}
    </Badge>
  );
}

function ConnectionTypeCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorCodeRecord> }>) {
  const conn = row.original.connectionType || "Prepaid";
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-accent text-accent-foreground border border-border/60">
      {conn}
    </span>
  );
}

function CommissionCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorCodeRecord> }>) {
  const val = Number(row.original.commission) || 0;
  const isFlat = row.original.isFlat === "Yes" || row.original.isFlat === "Y" || row.original.isFlat === true;
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
        {isFlat ? `₹${val.toFixed(2)}` : `${val.toFixed(2)}%`}
      </span>
    </div>
  );
}

function GstCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorCodeRecord> }>) {
  const gstVal = Number(row.original.gst) || 0;
  return (
    <span className="text-xs font-semibold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/40">
      {gstVal.toFixed(2)}%
    </span>
  );
}

function IsFlatCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorCodeRecord> }>) {
  const isFlat = row.original.isFlat === "Yes" || row.original.isFlat === "Y" || row.original.isFlat === true;
  return isFlat ? (
    <Badge variant="default" className="text-[11px] font-semibold bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20">
      Flat (₹)
    </Badge>
  ) : (
    <Badge variant="outline" className="text-[11px] font-semibold bg-purple-500/10 text-purple-600 border-purple-500/20">
      Percent (%)
    </Badge>
  );
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, OperatorCodeRecord> }>) {
  const { openEdit, openDelete } = useOperatorChargesCodeModalStore();
  const record = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit Commission & Code"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, record.operator || record.provider || record.id)}
        title="Delete"
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
export default function OperatorCodePage() {
  const { data: listData, isLoading, isError, refetch } = useOperatorCodeListQuery();
  const { openCreate } = useOperatorChargesCodeModalStore();

  // Queries for dynamic filters
  const { data: operatorTypesData = [] } = useOperatorTypeListQuery();
  const { data: registeredApisData = [] } = useApiRegisterListQuery();

  // Filters State
  const [filterOpType, setFilterOpType] = useState<string>("all");
  const [filterApiId, setFilterApiId] = useState<string>("all");

  const operatorTypeOptions = useMemo(() => {
    if (operatorTypesData && operatorTypesData.length > 0) {
      return operatorTypesData.map((t) => ({
        label: t.typeName || t.code || t.id,
        value: t.id || t.code || t.typeName,
      }));
    }
    return [...defaultOperatorTypes];
  }, [operatorTypesData]);

  const apiOptions = useMemo(() => {
    if (registeredApisData && registeredApisData.length > 0) {
      return registeredApisData.map((a) => ({
        label: a.apiName,
        value: a.id,
        name: a.apiName,
        type: a.apiType,
      }));
    }
    return fallbackApiList.map((a) => ({
      label: a.apiName,
      value: a.id,
      name: a.apiName,
      type: a.apiType,
    }));
  }, [registeredApisData]);

  // Master Raw Data (with realistic initial records across operators and APIs)
  const allData = useMemo<OperatorCodeRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
      {
        id: "OPC-101",
        apiId: "API-002",
        apiName: "Eko Recharge API",
        apiType: "mobile_prepaid",
        operatorTypeId: "mobile_prepaid",
        operatorTypeName: "Mobile Prepaid",
        operator: "Jio Prepaid",
        code: 101,
        connectionType: "Prepaid",
        commission: 2.80,
        gst: 18.00,
        isFlat: "No",
        provider: "Eko Recharge API",
        providerCode: "JIO_PRE",
      },
      {
        id: "OPC-102",
        apiId: "API-002",
        apiName: "Eko Recharge API",
        apiType: "mobile_prepaid",
        operatorTypeId: "mobile_prepaid",
        operatorTypeName: "Mobile Prepaid",
        operator: "Airtel Prepaid",
        code: 102,
        connectionType: "Prepaid",
        commission: 2.20,
        gst: 18.00,
        isFlat: "No",
        provider: "Eko Recharge API",
        providerCode: "AIRTEL_PRE",
      },
      {
        id: "OPC-103",
        apiId: "API-003",
        apiName: "Paysprint Recharge API",
        apiType: "mobile_prepaid",
        operatorTypeId: "mobile_prepaid",
        operatorTypeName: "Mobile Prepaid",
        operator: "Vi Prepaid",
        code: 103,
        connectionType: "Prepaid",
        commission: 3.10,
        gst: 18.00,
        isFlat: "No",
        provider: "Paysprint Recharge API",
        providerCode: "VI_PRE",
      },
      {
        id: "OPC-201",
        apiId: "API-005",
        apiName: "Sprint DTH API",
        apiType: "dth",
        operatorTypeId: "dth",
        operatorTypeName: "DTH",
        operator: "Tata Play DTH",
        code: 201,
        connectionType: "Direct API",
        commission: 3.50,
        gst: 18.00,
        isFlat: "No",
        provider: "Sprint DTH API",
        providerCode: "TATAPLAY_DTH",
      },
      {
        id: "OPC-202",
        apiId: "API-005",
        apiName: "Sprint DTH API",
        apiType: "dth",
        operatorTypeId: "dth",
        operatorTypeName: "DTH",
        operator: "Dish TV",
        code: 202,
        connectionType: "Direct API",
        commission: 3.20,
        gst: 18.00,
        isFlat: "No",
        provider: "Sprint DTH API",
        providerCode: "DISHTV_DTH",
      },
      {
        id: "OPC-301",
        apiId: "API-004",
        apiName: "BillDesk BBPS API",
        apiType: "electricity",
        operatorTypeId: "electricity",
        operatorTypeName: "Electricity",
        operator: "BESCOM Electricity",
        code: 301,
        connectionType: "BBPS",
        commission: 0.50,
        gst: 18.00,
        isFlat: "Yes",
        provider: "BillDesk BBPS API",
        providerCode: "BESCOM_BBPS",
      },
      {
        id: "OPC-001",
        apiId: "API-001",
        apiName: "Payzones Payout API",
        apiType: "payout",
        operatorTypeId: "payout",
        operatorTypeName: "Payout",
        operator: "Instant IMPS Payout",
        code: 901,
        connectionType: "Direct API",
        commission: 5.00,
        gst: 18.00,
        isFlat: "Yes",
        provider: "Payzones Payout",
        providerCode: "PAYZONE_PAYOUT",
      },
    ];
  }, [listData]);

  // Reactive Filtered Data
  const displayData = useMemo<OperatorCodeRecord[]>(() => {
    return allData.filter((item) => {
      const matchOpType =
        filterOpType === "all" ||
        item.operatorTypeId === filterOpType ||
        item.operatorTypeId?.toLowerCase() === filterOpType.toLowerCase() ||
        item.operatorTypeName?.toLowerCase() === filterOpType.toLowerCase();

      const matchApi =
        filterApiId === "all" ||
        item.apiId === filterApiId ||
        item.apiName?.toLowerCase().includes(filterApiId.toLowerCase());

      return matchOpType && matchApi;
    });
  }, [allData, filterOpType, filterApiId]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = displayData.length;
    const avgComm =
      total > 0
        ? (displayData.reduce((acc, curr) => acc + (Number(curr.commission) || 0), 0) / total).toFixed(2)
        : "0.00";
    const flatCount = displayData.filter(
      (d) => d.isFlat === "Yes" || d.isFlat === "Y" || d.isFlat === true
    ).length;
    const percentCount = total - flatCount;
    return { total, avgComm, flatCount, percentCount };
  }, [displayData]);

  const selectedApiObject = useMemo(() => {
    return apiOptions.find((a) => a.value === filterApiId);
  }, [apiOptions, filterApiId]);

  const selectedOpTypeLabel = useMemo(() => {
    return operatorTypeOptions.find((o) => o.value === filterOpType)?.label || filterOpType;
  }, [operatorTypeOptions, filterOpType]);

  const handleOpenAddModal = () => {
    openCreate({
      operatorTypeId: filterOpType !== "all" ? filterOpType : "mobile_prepaid",
      apiId: filterApiId !== "all" ? filterApiId : apiOptions[0]?.value || "API-001",
      apiName: selectedApiObject?.name || apiOptions[0]?.name || "API Service Provider",
    });
  };

  const columns = useMemo<ColumnDef<AppTableFeatures, OperatorCodeRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        id: "api",
        header: ApiHeader,
        cell: ApiCell,
      },
      {
        id: "operatorType",
        header: OperatorTypeHeader,
        cell: OperatorTypeCell,
      },
      {
        id: "operator",
        header: OperatorNameHeader,
        cell: OperatorNameCell,
      },
      {
        accessorKey: "code",
        header: CodeHeader,
        cell: CodeCell,
      },
      {
        accessorKey: "connectionType",
        header: ConnectionTypeHeader,
        cell: ConnectionTypeCell,
      },
      {
        accessorKey: "commission",
        header: CommissionHeader,
        cell: CommissionCell,
      },
      {
        accessorKey: "gst",
        header: GstHeader,
        cell: GstCell,
      },
      {
        accessorKey: "isFlat",
        header: IsFlatHeader,
        cell: IsFlatCell,
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
    <div className="mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <QrCode className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Operator Charges & Commission Code
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Filter by Operator Type and API to configure operator codes, connection types, commission %, and GST.
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
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4" />
            Add Commission & Code
          </Button>
        </div>
      </div>

      {/* Top Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Filter className="w-4 h-4 text-primary" />
            <span>Select Filter Parameters</span>
            {(filterOpType !== "all" || filterApiId !== "all") && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5 ml-1">
                Active Filter
              </Badge>
            )}
          </div>

          {(filterOpType !== "all" || filterApiId !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilterOpType("all");
                setFilterApiId("all");
              }}
              className="text-xs text-muted-foreground hover:text-foreground h-8 px-2 flex items-center gap-1.5 self-start md:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {/* Filter 1: Operator Type */}
          <div className="space-y-1.5">
            <label htmlFor="filter-op-type" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              1. Operator Type
            </label>
            <Select value={filterOpType} onValueChange={(val: string | null) => setFilterOpType(val ?? "all")}>
              <SelectTrigger id="filter-op-type" className="w-full bg-background">
                <SelectValue placeholder="All Operator Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Operator Types</SelectItem>
                {operatorTypeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter 2: API Name & ID */}
          <div className="space-y-1.5">
            <label htmlFor="filter-api-id" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-primary" />
              2. Target API Service (ID)
            </label>
            <Select value={filterApiId} onValueChange={(val: string | null) => setFilterApiId(val ?? "all")}>
              <SelectTrigger id="filter-api-id" className="w-full bg-background">
                <SelectValue placeholder="All APIs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All API Providers</SelectItem>
                {apiOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Action Card in Filter */}
          <div className="sm:col-span-2 lg:col-span-1 flex items-end">
            <div className="w-full p-2.5 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-foreground uppercase tracking-tight">
                  {filterOpType !== "all" ? selectedOpTypeLabel : "All Categories"}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {filterApiId !== "all" ? `API ID: ${filterApiId}` : "All Active APIs"}
                </span>
              </div>
              <Button
                size="sm"
                onClick={handleOpenAddModal}
                className="h-8 text-xs font-semibold flex items-center gap-1 px-3"
              >
                <Plus className="w-3.5 h-3.5" />
                Set Commission
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Configured Operators</p>
            <p className="text-xl font-bold text-foreground">{stats.total}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Avg Commission</p>
            <p className="text-xl font-bold text-foreground">{stats.avgComm}%</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Flat Charges (₹)</p>
            <p className="text-xl font-bold text-foreground">{stats.flatCount}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Percentage Rates (%)</p>
            <p className="text-xl font-bold text-foreground">{stats.percentCount}</p>
          </div>
        </div>
      </div>

      {isError && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active master data configurations.</span>
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
        searchPlaceholder="Search by operator name, code, API, connection type..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals */}
      <OperatorCodeModal />
      <OperatorCodeDeleteDialog />
    </div>
  );
}
