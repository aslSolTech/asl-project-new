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
import { formatISODate } from "@/lib/datefns";
import {
  UserPlus,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Phone,
  Mail,
  Building2,
  MapPin,
  CreditCard,
  Globe,
  Calendar,
  MessageCircle,
  Package as PackageIcon,
  Shield,
  KeyRound,
} from "lucide-react";

// ==========================================
// COLUMN HEADERS
// ==========================================
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID / Code" />;
}

function UserDetailsHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="User Profile" />;
}

function RoleCompanyHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Role & Company" />;
}

function ContactHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Contact Info" />;
}

function AddressHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Address & Location" />;
}

function KycHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="KYC & Tax Docs" />;
}

function SecurityHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Security & Network" />;
}

function PackageHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Package & Balance" />;
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

// ==========================================
// COLUMN CELLS
// ==========================================
function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;
  const idValue = record.userCode || record.id;

  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/70 text-foreground border border-border/60 w-fit">
        {idValue}
      </span>
      {record.id && record.userCode && record.id !== record.userCode && (
        <span className="text-[10px] text-muted-foreground font-mono">
          Ref: {record.id}
        </span>
      )}
    </div>
  );
}

function UserDetailsCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;
  const fullName = [record.firstName, record.lastName].filter(Boolean).join(" ") || record.userName || "Unnamed User";

  return (
    <div className="flex flex-col gap-1 min-w-[150px]">
      <span className="text-sm font-semibold text-foreground tracking-tight">{fullName}</span>
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {record.gender && (
          <span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary text-[10px] uppercase font-mono font-medium border border-primary/20">
            {record.gender}
          </span>
        )}
        {record.dob && (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            {(() => {
              try {
                return formatISODate({
                  date: new Date(record.dob),
                  formatType: "shortDate",
                });
              } catch {
                return record.dob;
              }
            })()}
          </span>
        )}
      </div>
    </div>
  );
}

function RoleCompanyCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;
  const userType = record.userTypeName || record.userTypeId || "-";

  return (
    <div className="flex flex-col gap-1 min-w-[160px]">
      {record.companyName && (
        <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
          <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="truncate">{record.companyName}</span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <Badge variant="outline" className="text-[11px] font-medium uppercase px-1.5 py-0 border-primary/30 text-primary bg-primary/5">
          {userType}
        </Badge>
        {record.nationality && (
          <span className="text-[10px] text-muted-foreground px-1 py-0.2 rounded bg-muted/60">
            {record.nationality}
          </span>
        )}
      </div>
    </div>
  );
}

function ContactCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;
  const contactNo = record.contactNo || record.mobile;

  return (
    <div className="flex flex-col gap-1 min-w-[160px] text-xs">
      {contactNo && (
        <div className="flex items-center gap-1.5 text-foreground font-medium">
          <Phone className="w-3 h-3 text-primary shrink-0" />
          <span>{contactNo}</span>
        </div>
      )}
      {record.whatsappNo && (
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <MessageCircle className="w-3 h-3 shrink-0" />
          <span>{record.whatsappNo}</span>
        </div>
      )}
      {record.email && (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Mail className="w-3 h-3 text-muted-foreground shrink-0" />
          <span className="truncate max-w-[160px]" title={record.email}>
            {record.email}
          </span>
        </div>
      )}
    </div>
  );
}

function AddressCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;
  const addressParts = [
    record.address,
    record.landmark ? `Near ${record.landmark}` : undefined,
    record.pinCode ? `PIN - ${record.pinCode}` : undefined,
  ].filter(Boolean);

  const fullAddress = addressParts.join(", ");

  if (!fullAddress) {
    return <span className="text-xs text-muted-foreground">-</span>;
  }

  return (
    <div className="flex items-start gap-1.5 min-w-[200px] max-w-[300px] text-xs">
      <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
      <span className="whitespace-normal break-words leading-relaxed text-foreground font-normal">
        {fullAddress}
      </span>
    </div>
  );
}

function KycCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;

  if (!record.panNo && !record.aadhaarNo && !record.gstNo) {
    return <span className="text-xs text-muted-foreground font-sans">-</span>;
  }

  return (
    <div className="flex flex-col gap-1.5 min-w-[170px]">
      {record.panNo && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-8">PAN:</span>
          <Badge variant="outline" className="font-mono text-[11px] font-semibold px-2 py-0.5 bg-muted/60 border-border text-foreground">
            {record.panNo}
          </Badge>
        </div>
      )}
      {record.aadhaarNo && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-8">UID:</span>
          <Badge variant="outline" className="font-mono text-[11px] font-semibold px-2 py-0.5 bg-muted/60 border-border text-foreground">
            {record.aadhaarNo.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3")}
          </Badge>
        </div>
      )}
      {record.gstNo && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-8">GST:</span>
          <Badge variant="outline" className="font-mono text-[11px] font-semibold px-2 py-0.5 bg-muted/60 border-border text-foreground truncate max-w-[150px]" title={record.gstNo}>
            {record.gstNo}
          </Badge>
        </div>
      )}
    </div>
  );
}

function SecurityCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;
  const isVerified = (record.isOtpVerify || "N").toUpperCase() === "Y";

  return (
    <div className="flex flex-col gap-1 min-w-[150px] text-xs">
      <div className="flex items-center gap-1.5">
        <KeyRound className="w-3 h-3 text-muted-foreground shrink-0" />
        <span className="text-[11px] text-muted-foreground">OTP Verify:</span>
        <Badge
          variant={isVerified ? "default" : "outline"}
          className={`text-[10px] px-1.5 py-0 ${
            isVerified
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
              : "text-amber-600 border-amber-500/30 bg-amber-500/10"
          }`}
        >
          {isVerified ? "YES" : "NO"}
        </Badge>
      </div>

      {record.userIpAddress && (
        <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
          <Shield className="w-3 h-3 shrink-0" />
          <span>{record.userIpAddress}</span>
        </div>
      )}

      {record.callbackUrl && (
        <a
          href={record.callbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-primary hover:underline hover:text-primary/80 truncate max-w-[170px]"
          title={`Open Callback URL: ${record.callbackUrl}`}
        >
          <Globe className="w-3 h-3 shrink-0 text-muted-foreground" />
          <span className="truncate">{record.callbackUrl}</span>
        </a>
      )}
    </div>
  );
}

function PackageCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;
  const pkgName = record.packageName || record.packageId || "-";
  const lockAmount = record.lockAmount ? `₹${record.lockAmount}` : "₹0.00";

  return (
    <div className="flex flex-col gap-1 min-w-[140px] text-xs">
      <div className="flex items-center gap-1.5 font-medium text-foreground">
        <PackageIcon className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="truncate">{pkgName}</span>
      </div>
      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
        <CreditCard className="w-3 h-3 shrink-0" />
        <span>Lock: <strong className="text-foreground font-mono">{lockAmount}</strong></span>
      </div>
    </div>
  );
}

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const status = (row.original.loginStatus || "active").toLowerCase();
  if (status === "active" || status === "true") {
    return (
      <Badge variant="default" className="text-xs uppercase bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">
        Active
      </Badge>
    );
  }
  if (status === "inactive" || status === "false") {
    return (
      <Badge variant="outline" className="text-xs uppercase text-amber-600 border-amber-500/30 bg-amber-500/10">
        Inactive
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="text-xs uppercase">
      {status}
    </Badge>
  );
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const { openEdit, openDelete } = useUserRegisterModalStore();
  const record = row.original;
  const displayName = [record.firstName, record.lastName].filter(Boolean).join(" ") || record.userName || record.id;

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit User"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(record.id, displayName)}
        title="Delete User"
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
export default function UserRegisterPage() {
  const { data: listData, isLoading, isError, refetch } = useUserRegisterListQuery();
  const { openCreate } = useUserRegisterModalStore();

  const displayData = useMemo<UserRegisterRecord[]>(() => {
    if (listData && listData.length > 0) {
      return listData;
    }
    return [
      {
        id: "USR-001",
        userCode: "USR-001",
        firstName: "Rahul",
        lastName: "Sharma",
        userTypeId: "retailer",
        userTypeName: "Retailer",
        companyName: "Rahul Tech Solutions",
        contactNo: "9876543210",
        whatsappNo: "9876543210",
        email: "rahul@gmail.com",
        dob: "1994-06-15",
        gender: "MALE",
        address: "Plot 42, Cyber City, Sector 5",
        landmark: "Near Metro Gate 2",
        nationality: "Indian",
        pinCode: "110001",
        panNo: "ABCDE1234F",
        gstNo: "07AAAAA0000A1Z5",
        aadhaarNo: "123456789012",
        userIpAddress: "",
        callbackUrl: "https://api.rahultech.com/webhook",
        isOtpVerify: "Y",
        packageId: "PKG-GOLD",
        packageName: "Gold Package",
        lockAmount: "500",
        loginStatus: "active",
      },
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
        id: "userProfile",
        header: UserDetailsHeader,
        cell: UserDetailsCell,
      },
      {
        id: "roleCompany",
        header: RoleCompanyHeader,
        cell: RoleCompanyCell,
      },
      {
        id: "contactInfo",
        header: ContactHeader,
        cell: ContactCell,
      },
      {
        id: "addressInfo",
        header: AddressHeader,
        cell: AddressCell,
      },
      {
        id: "kycInfo",
        header: KycHeader,
        cell: KycCell,
      },
      {
        id: "securityInfo",
        header: SecurityHeader,
        cell: SecurityCell,
      },
      {
        id: "packageInfo",
        header: PackageHeader,
        cell: PackageCell,
      },
      {
        accessorKey: "loginStatus",
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
            <UserPlus className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Users
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all official user configurations, KYC documents, and profiles.
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
            Add User
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
        searchPlaceholder="Search users by name, mobile, email, PAN, company..."
        searchDebounceMs={300}
        containerHeight="600px"
      />

      {/* CRUD Modals */}
      <UserRegisterModal />
      <UserRegisterDeleteDialog />
    </div>
  );
}
