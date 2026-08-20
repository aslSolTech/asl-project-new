"use client";

import { useMemo, useState } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMerchantApiListQuery } from "@/modules/admin/merchant-api/hooks";
import { MerchantApiRecord } from "@/modules/admin/merchant-api/types";
import { useMerchantRetailersStore } from "@/modules/admin/merchant-api/stores/useMerchantRetailersStore";

import { useUserTypeListQuery } from "@/modules/admin/settings/user-type/hooks";
import { DEFAULT_USER_TYPES } from "@/modules/admin/settings/user-type/constants";
import { useUserRegisterListQuery } from "@/modules/admin/master/userRegister/hooks";

import {
  Plug,
  RefreshCw,
  Filter,
  Users,
  CheckCircle2,
  XCircle,
  Ban,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  CreditCard,
  FileCheck,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// COLUMN HEADERS & CELLS (STANDALONE FUNCTIONS)
// ============================================================================

function RetailerHeader({ column }: Readonly<{ column: Column<AppTableFeatures, MerchantApiRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Retailer / Outlet" />;
}

function RetailerCell({ row }: Readonly<{ row: Row<AppTableFeatures, MerchantApiRecord> }>) {
  const r = row.original;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-semibold text-sm text-foreground">{r.retailerName}</span>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="font-mono text-[11px] px-1.5 py-0 rounded bg-muted/80 text-foreground border border-border/60">
          {r.retailerCode}
        </span>
        <span className="truncate max-w-[140px] font-medium">{r.shopName}</span>
      </div>
    </div>
  );
}

function PartnerHeader({ column }: Readonly<{ column: Column<AppTableFeatures, MerchantApiRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="API Partner" />;
}

function PartnerCell({ row }: Readonly<{ row: Row<AppTableFeatures, MerchantApiRecord> }>) {
  const r = row.original;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-medium text-xs text-foreground flex items-center gap-1">
        <Building2 className="w-3 h-3 text-primary shrink-0" />
        {r.partnerCompanyName}
      </span>
      <span className="text-[11px] text-muted-foreground">{r.partnerName}</span>
    </div>
  );
}

function ContactHeader({ column }: Readonly<{ column: Column<AppTableFeatures, MerchantApiRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Contact Info" />;
}

function ContactCell({ row }: Readonly<{ row: Row<AppTableFeatures, MerchantApiRecord> }>) {
  const r = row.original;
  return (
    <div className="flex flex-col gap-0.5 text-xs">
      <span className="flex items-center gap-1 font-mono text-foreground">
        <Phone className="w-3 h-3 text-muted-foreground shrink-0" />
        {r.contactNo}
      </span>
      <span className="flex items-center gap-1 text-[11px] text-muted-foreground truncate max-w-[140px]">
        <Mail className="w-3 h-3 shrink-0" />
        {r.email}
      </span>
    </div>
  );
}

function KycDocHeader({ column }: Readonly<{ column: Column<AppTableFeatures, MerchantApiRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="KYC Documents" />;
}

function KycDocCell({ row }: Readonly<{ row: Row<AppTableFeatures, MerchantApiRecord> }>) {
  const r = row.original;
  return (
    <div className="flex flex-col gap-1 text-xs font-mono">
      <span className="flex items-center gap-1 text-foreground">
        <CreditCard className="w-3 h-3 text-primary shrink-0" />
        PAN: {r.panNo}
      </span>
      <span className="text-[11px] text-muted-foreground">
        UID: {r.aadhaarNo ? `${r.aadhaarNo.slice(0, 4)}••••${r.aadhaarNo.slice(-4)}` : "-"}
      </span>
    </div>
  );
}

function KycStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, MerchantApiRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="KYC Status" />;
}

function KycStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, MerchantApiRecord> }>) {
  const status = row.original.kycStatus;
  if (status === "verified") {
    return (
      <Badge variant="default" className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 flex items-center gap-1 w-fit">
        <CheckCircle2 className="w-3 h-3" />
        Verified
      </Badge>
    );
  }
  if (status === "rejected") {
    return (
      <Badge variant="destructive" className="text-xs font-semibold flex items-center gap-1 w-fit">
        <XCircle className="w-3 h-3" />
        Rejected
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs font-semibold bg-amber-500/10 text-amber-600 border-amber-500/30 flex items-center gap-1 w-fit">
      <AlertTriangle className="w-3 h-3" />
      Pending
    </Badge>
  );
}

function AccStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, MerchantApiRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Account Status" />;
}

function AccStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, MerchantApiRecord> }>) {
  const isBlocked = row.original.isBlocked || row.original.status === "blocked";
  if (isBlocked) {
    return (
      <Badge variant="destructive" className="text-xs font-semibold flex items-center gap-1 w-fit">
        <Ban className="w-3 h-3" />
        Blocked
      </Badge>
    );
  }
  return (
    <Badge variant="default" className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 flex items-center gap-1 w-fit">
      <ShieldCheck className="w-3 h-3" />
      Active
    </Badge>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Status Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, MerchantApiRecord> }>) {
  const { verifyManual, toggleBlock } = useMerchantRetailersStore();
  const r = row.original;
  const isBlocked = r.isBlocked || r.status === "blocked";
  const isPending = r.kycStatus === "pending" || r.kycStatus === "rejected";

  return (
    <div className="flex items-center gap-2">
      {/* Verify Manual Button */}
      {isPending ? (
        <Button
          variant="outline"
          size="xs"
          onClick={() => verifyManual(r.id, r.retailerName)}
          title="Verify KYC Manually"
          className="h-7 px-2.5 text-[11px] font-semibold flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/30 cursor-pointer"
        >
          <UserCheck className="w-3.5 h-3.5" />
          Verify Manual
        </Button>
      ) : (
        <Badge variant="outline" className="text-[11px] font-medium text-emerald-600 border-emerald-500/30 bg-emerald-500/5 px-2 py-0.5 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          KYC Verified
        </Badge>
      )}

      {/* Block / Unblock Button */}
      <Button
        variant={isBlocked ? "default" : "outline"}
        size="xs"
        onClick={() => toggleBlock(r.id, r.retailerName, isBlocked)}
        title={isBlocked ? "Unblock Retailer" : "Block Retailer"}
        className={cn(
          "h-7 px-2.5 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer",
          isBlocked
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/30"
        )}
      >
        {isBlocked ? (
          <>
            <ShieldCheck className="w-3.5 h-3.5" />
            Unblock
          </>
        ) : (
          <>
            <Ban className="w-3.5 h-3.5" />
            Block
          </>
        )}
      </Button>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function MerchantApiPage() {
  const { retailersList, setRetailersList } = useMerchantRetailersStore();

  // Queries
  const { data: listData, isLoading, isError, refetch } = useMerchantApiListQuery();

  // User Types query from /dashboard/settings/user-types
  const { data: userTypesData = [] } = useUserTypeListQuery();
  const userTypes = useMemo(() => {
    return userTypesData.length > 0 ? userTypesData : DEFAULT_USER_TYPES;
  }, [userTypesData]);

  // Master Users query from master >> user management >> users
  const { data: masterUsers = [] } = useUserRegisterListQuery();

  // Determine initial/default user type id (e.g. USR-005 for API User / Merchant)
  const defaultUserTypeId = useMemo(() => {
    const apiType = userTypes.find(
      (ut) =>
        ut.slug === "api-user" ||
        ut.id === "USR-005" ||
        ut.name.toLowerCase().includes("api") ||
        ut.name.toLowerCase().includes("merchant")
    );
    return apiType?.id || "USR-005";
  }, [userTypes]);

  const [selectedUserType, setSelectedUserType] = useState<string>(defaultUserTypeId);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>("ALL");

  // Filter API Partner users based on User Type ID selection (value: id, display: name)
  const apiPartnerUsers = useMemo(() => {
    if (masterUsers.length > 0) {
      const filtered = masterUsers.filter((u) => {
        const typeName = (u.userTypeName || "").toLowerCase();
        const typeId = u.userTypeId || "";
        return (
          typeId === selectedUserType ||
          (selectedUserType === "USR-005" && (typeName.includes("api") || typeName.includes("merchant")))
        );
      });
      if (filtered.length > 0) return filtered;
    }

    // Fallback partner users
    return [
      {
        id: "USR-REC-003",
        firstName: "Pooja",
        lastName: "Patel",
        userName: "Pooja Patel",
        companyName: "Patel Fintech Solutions",
        userTypeName: "API User / Merchant",
        userTypeId: "USR-005",
      },
      {
        id: "USR-REC-001",
        firstName: "Rahul",
        lastName: "Sharma",
        userName: "Rahul Sharma",
        companyName: "Sharma Digital Pay",
        userTypeName: "API User / Merchant",
        userTypeId: "USR-005",
      },
      {
        id: "USR-REC-002",
        firstName: "Amit",
        lastName: "Verma",
        userName: "Amit Verma",
        companyName: "Verma Telecom Services",
        userTypeName: "API User / Merchant",
        userTypeId: "USR-005",
      },
    ];
  }, [masterUsers, selectedUserType]);

  // Sync loaded data if query succeeds
  useMemo(() => {
    if (listData && listData.length > 0) {
      setRetailersList(listData);
    }
  }, [listData, setRetailersList]);

  // Selected label helpers to ensure clean UI display and internal ID value passing
  const selectedUserTypeLabel = useMemo(() => {
    const found = userTypes.find((ut) => ut.id === selectedUserType);
    return found?.name || "API User / Merchant";
  }, [userTypes, selectedUserType]);

  const selectedPartnerLabel = useMemo(() => {
    if (selectedPartnerId === "ALL") {
      return `All API Partners (${retailersList.length} Retailers)`;
    }
    const found = apiPartnerUsers.find((p) => p.id === selectedPartnerId);
    if (!found) return "Select API Partner";
    const partnerName = [found.firstName, found.lastName].filter(Boolean).join(" ") || found.userName || "Partner";
    const companyName = found.companyName ? ` (${found.companyName})` : "";
    return `${partnerName}${companyName}`;
  }, [selectedPartnerId, retailersList.length, apiPartnerUsers]);

  // Filtered Retailer display data based on internal partnerId
  const displayData = useMemo(() => {
    if (selectedPartnerId === "ALL") {
      return retailersList;
    }
    return retailersList.filter((item) => item.partnerId === selectedPartnerId);
  }, [retailersList, selectedPartnerId]);

  // Columns definition (Clean standalone components)
  const columns = useMemo<ColumnDef<AppTableFeatures, MerchantApiRecord, unknown>[]>(
    () => [
      {
        id: "retailerProfile",
        header: RetailerHeader,
        cell: RetailerCell,
      },
      {
        id: "apiPartner",
        header: PartnerHeader,
        cell: PartnerCell,
      },
      {
        id: "contact",
        header: ContactHeader,
        cell: ContactCell,
      },
      {
        id: "kycDocuments",
        header: KycDocHeader,
        cell: KycDocCell,
      },
      {
        id: "kycStatus",
        header: KycStatusHeader,
        cell: KycStatusCell,
      },
      {
        id: "accountStatus",
        header: AccStatusHeader,
        cell: AccStatusCell,
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <Plug className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Merchant API - Retailers & KYC Report
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Filter by API Partner to review connected retailers, inspect KYC documents, manually verify, and manage account blocks.
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
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Retailers</p>
            <p className="text-xl font-bold text-foreground">{displayData.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Verified KYC</p>
            <p className="text-xl font-bold text-foreground">
              {displayData.filter((r) => r.kycStatus === "verified").length}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Pending KYC</p>
            <p className="text-xl font-bold text-foreground">
              {displayData.filter((r) => r.kycStatus === "pending").length}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-destructive/10 text-destructive">
            <Ban className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Blocked Retailers</p>
            <p className="text-xl font-bold text-foreground">
              {displayData.filter((r) => r.isBlocked || r.status === "blocked").length}
            </p>
          </div>
        </div>
      </div>

      {/* Two-Tier Filter Bar */}
      <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
          {/* 1st Select Menu: User Type (Display: ut.name, Internal Value: ut.id) */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-primary" />
              User Type:
            </span>
            <Select
              value={selectedUserType}
              onValueChange={(val) => {
                if (val) {
                  setSelectedUserType(val);
                  setSelectedPartnerId("ALL");
                }
              }}
            >
              <SelectTrigger className="w-[210px] cursor-pointer">
                <SelectValue placeholder="Select User Type">
                  {selectedUserTypeLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {userTypes.map((ut) => (
                  <SelectItem key={ut.id} value={ut.id}>
                    {ut.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 2nd Select Menu: Select API Partner User (Display: Name & Company, Internal Value: p.id) */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              API Partner:
            </span>
            <Select
              value={selectedPartnerId}
              onValueChange={(val) => setSelectedPartnerId(val || "ALL")}
            >
              <SelectTrigger className="w-[280px] cursor-pointer">
                <SelectValue placeholder="All API Partners">
                  {selectedPartnerLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All API Partners ({retailersList.length} Retailers)</SelectItem>
                {apiPartnerUsers.map((p) => {
                  const partnerName = [p.firstName, p.lastName].filter(Boolean).join(" ") || p.userName || "Partner";
                  const companyName = p.companyName ? ` (${p.companyName})` : "";
                  return (
                    <SelectItem key={p.id} value={p.id}>
                      {partnerName}{companyName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedPartnerId !== "ALL" && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setSelectedPartnerId("ALL")}
            className="text-xs text-muted-foreground hover:text-foreground cursor-pointer self-start md:self-auto"
          >
            Show All Retailers
          </Button>
        )}
      </div>

      {isError && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active local retailer records.</span>
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
        searchPlaceholder="Search retailers by name, code, shop, PAN, mobile..."
        searchDebounceMs={300}
        containerHeight="580px"
      />
    </div>
  );
}
