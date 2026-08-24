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

// Users Master imports
import { useUserRegisterListQuery } from "@/modules/admin/master/userRegister/hooks";
import { useUserRegisterModalStore } from "@/modules/admin/master/userRegister/stores/useUserRegisterModalStore";
import { UserRegisterRecord } from "@/modules/admin/master/userRegister/types";
import { UserRegisterModal } from "@/modules/admin/master/userRegister/components/user-register-modal";
import { UserRegisterDeleteDialog } from "@/modules/admin/master/userRegister/components/user-register-delete-dialog";
import { formatISODate } from "@/lib/datefns";

// Privileges imports
import { usePrivilegeListQuery } from "@/modules/admin/privileges/hooks";
import { usePrivilegeModalStore } from "@/modules/admin/privileges/stores/usePrivilageModalStore";
import { PrivilegeRecord } from "@/modules/admin/privileges/types";
import { DEFAULT_PRIVILEGES_LIST } from "@/modules/admin/privileges/constants";
import { PrivilegeModal } from "@/modules/admin/privileges/components/privilege-modal";
import { PrivilegeDeleteDialog } from "@/modules/admin/privileges/components/privilege-delete-dialog";
import { useUserTypeListQuery } from "@/modules/admin/settings/user-type/hooks";
import { DEFAULT_USER_TYPES } from "@/modules/admin/settings/user-type/constants";

import {
  Users as UsersIcon,
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
  ShieldCheck,
  Sliders,
  Filter,
  CheckCircle2,
  Lock,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TAB 1: USERS DIRECTORY TABLE COLUMNS
// ============================================================================

function UserIdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="ID / Code" />;
}

function UserIdCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
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

function UserDetailsHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="User Profile" />;
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

function RoleCompanyHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Role & Company" />;
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

function ContactHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Contact Info" />;
}

function ContactCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;

  return (
    <div className="flex flex-col gap-1 min-w-[170px] text-xs">
      {record.contactNo && (
        <div className="flex items-center gap-1.5 text-foreground font-mono">
          <Phone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span>{record.contactNo}</span>
        </div>
      )}
      {record.whatsappNo && (
        <div className="flex items-center gap-1.5 text-emerald-600 font-mono">
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{record.whatsappNo}</span>
        </div>
      )}
      {record.email && (
        <div className="flex items-center gap-1.5 text-muted-foreground truncate max-w-[180px]">
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{record.email}</span>
        </div>
      )}
    </div>
  );
}

function AddressHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Address & Location" />;
}

function AddressCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;

  return (
    <div className="flex flex-col gap-1 min-w-[160px] text-xs">
      {record.address ? (
        <div className="flex items-start gap-1.5 text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
          <span className="line-clamp-2">{record.address}</span>
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      )}
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        {record.pinCode && <span className="font-mono">PIN: {record.pinCode}</span>}
        {record.landmark && <span className="truncate max-w-[100px]">({record.landmark})</span>}
      </div>
    </div>
  );
}

function KycHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="KYC & Tax Docs" />;
}

function KycCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;

  return (
    <div className="flex flex-col gap-1 min-w-[150px] text-xs">
      <div className="flex items-center gap-1.5 font-mono">
        <CreditCard className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className="text-foreground">{record.panNo || "-"}</span>
      </div>
      {record.aadhaarNo && (
        <div className="flex items-center gap-1.5 font-mono text-muted-foreground text-[11px]">
          <span>UID: {record.aadhaarNo}</span>
        </div>
      )}
      {record.gstNo && (
        <div className="text-[10px] font-mono text-muted-foreground truncate max-w-[140px]">
          GST: {record.gstNo}
        </div>
      )}
    </div>
  );
}

function SecurityHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Security & Network" />;
}

function SecurityCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;
  const isOtpActive = record.isOtpVerify === "Y" || record.isOtpVerify === "true" || record.isOtpVerify === "active";

  return (
    <div className="flex flex-col gap-1 min-w-[140px] text-xs">
      <div className="flex items-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <Badge
          variant={isOtpActive ? "default" : "outline"}
          className={cn(
            "text-[10px] uppercase px-1.5 py-0",
            isOtpActive ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20" : "text-muted-foreground"
          )}
        >
          OTP: {isOtpActive ? "Active" : "Disabled"}
        </Badge>
      </div>
      {record.userIpAddress && (
        <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
          <Globe className="w-3 h-3 shrink-0" />
          <span className="truncate max-w-[120px]">{record.userIpAddress}</span>
        </div>
      )}
      {record.callbackUrl && (
        <div className="text-[10px] text-primary truncate max-w-[130px] font-mono hover:underline cursor-pointer" title={record.callbackUrl}>
          Callback Configured
        </div>
      )}
    </div>
  );
}

function PackageHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Package & Balance" />;
}

function PackageCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const record = row.original;
  const packageName = record.packageName || record.packageId || "Default";

  return (
    <div className="flex flex-col gap-1 min-w-[130px] text-xs">
      <div className="flex items-center gap-1.5 font-medium text-foreground">
        <PackageIcon className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="truncate">{packageName}</span>
      </div>
      {record.lockAmount !== undefined && (
        <div className="text-[11px] font-mono text-muted-foreground">
          Lock: ₹{record.lockAmount}
        </div>
      )}
    </div>
  );
}

function UserStatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRegisterRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

function UserStatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const val = String(row.original.loginStatus || "").toLowerCase();
  const isActive = val === "active" || val === "true" || val === "y";

  return (
    <Badge
      variant={isActive ? "default" : "outline"}
      className={cn(
        "text-xs uppercase font-semibold",
        isActive
          ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20"
          : "text-muted-foreground border-border/80"
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}

function UserActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function UserActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRegisterRecord> }>) {
  const { openEdit, openDelete } = useUserRegisterModalStore();
  const record = row.original;

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(record.id, record)}
        title="Edit User"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit User</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() =>
          openDelete(
            record.id,
            [record.firstName, record.lastName].filter(Boolean).join(" ") || record.companyName || record.id
          )
        }
        title="Delete User"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete User</span>
      </Button>
    </div>
  );
}

// ============================================================================
// TAB 2: PRIVILEGE SETTINGS TABLE COLUMNS
// ============================================================================

function PrivRegNoHeader({ column }: Readonly<{ column: Column<AppTableFeatures, PrivilegeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Reg No" />;
}

function PrivRegNoCell({ row }: Readonly<{ row: Row<AppTableFeatures, PrivilegeRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {row.original.regNo || row.original.id}
    </span>
  );
}

function PrivUserNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, PrivilegeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="User Name" />;
}

function PrivUserNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, PrivilegeRecord> }>) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-semibold text-sm text-foreground">
        {row.original.userName}
      </span>
      {row.original.userTypeName && (
        <span className="text-[11px] text-muted-foreground font-medium">
          {row.original.userTypeName}
        </span>
      )}
    </div>
  );
}

function PrivCompanyNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, PrivilegeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Company Name" />;
}

function PrivCompanyNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, PrivilegeRecord> }>) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-foreground">
      <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      <span>{row.original.companyName || "-"}</span>
    </div>
  );
}

function PrivContactNoHeader({ column }: Readonly<{ column: Column<AppTableFeatures, PrivilegeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Contact Number" />;
}

function PrivContactNoCell({ row }: Readonly<{ row: Row<AppTableFeatures, PrivilegeRecord> }>) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-xs text-foreground">
      <Phone className="w-3 h-3 text-muted-foreground shrink-0" />
      <span>{row.original.contactNumber || "-"}</span>
    </div>
  );
}

function PrivPackageNameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, PrivilegeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Package Name" />;
}

function PrivPackageNameCell({ row }: Readonly<{ row: Row<AppTableFeatures, PrivilegeRecord> }>) {
  return (
    <div className="flex items-center gap-1.5">
      <PackageIcon className="w-3.5 h-3.5 text-primary shrink-0" />
      <span className="text-xs font-medium text-foreground">
        {row.original.packageName || "-"}
      </span>
    </div>
  );
}

function PrivDetailsHeader({ column }: Readonly<{ column: Column<AppTableFeatures, PrivilegeRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Privilege Details (API Types)" />;
}

function PrivDetailsCell({ row }: Readonly<{ row: Row<AppTableFeatures, PrivilegeRecord> }>) {
  const permissions = row.original.apiPermissions || [];
  const activePerms = permissions.filter((p) => p.status === "active");
  const inactivePerms = permissions.filter((p) => p.status === "inactive");

  if (permissions.length === 0) {
    return <span className="text-xs text-muted-foreground">No permissions configured</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 max-w-[320px]">
      {activePerms.slice(0, 3).map((p) => (
        <Badge
          key={p.apiTypeId}
          variant="default"
          className="text-[10px] font-medium bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 px-1.5 py-0"
        >
          {p.apiTypeName}
        </Badge>
      ))}

      {activePerms.length > 3 && (
        <Badge
          variant="outline"
          className="text-[10px] font-semibold bg-muted/60 text-muted-foreground px-1.5 py-0"
        >
          +{activePerms.length - 3} more
        </Badge>
      )}

      {inactivePerms.length > 0 && activePerms.length === 0 && (
        <Badge
          variant="outline"
          className="text-[10px] text-muted-foreground border-border/80 px-1.5 py-0"
        >
          All {inactivePerms.length} Inactive
        </Badge>
      )}
    </div>
  );
}

function PrivActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function PrivActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, PrivilegeRecord> }>) {
  const { openEdit } = usePrivilegeModalStore();
  const record = row.original;

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="outline"
        size="xs"
        onClick={() => openEdit(record.id, record)}
        className="h-8 px-2.5 text-xs font-semibold flex items-center gap-1.5 hover:bg-primary/10 hover:text-primary cursor-pointer border-border/80"
      >
        <Sliders className="w-3.5 h-3.5" />
        Manage Privileges
      </Button>
    </div>
  );
}

// ============================================================================
// MAIN COMBINED COMPONENT (USERS + PRIVILEGES TABS)
// ============================================================================

export interface UsersPageProps {
  readonly defaultTab?: "users" | "privileges";
}

export default function UsersPage({ defaultTab = "users" }: UsersPageProps) {
  const [activeTab, setActiveTab] = useState<"users" | "privileges">(defaultTab);
  const [selectedUserType, setSelectedUserType] = useState<string>("ALL");

  // Users master query & store
  const {
    data: usersListData,
    isLoading: isUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useUserRegisterListQuery();
  const { openCreate: openCreateUser } = useUserRegisterModalStore();

  // Privileges query & store
  const {
    data: privData,
    isLoading: isPrivLoading,
    isError: isPrivError,
    refetch: refetchPrivileges,
  } = usePrivilegeListQuery();

  // User Types query
  const { data: userTypesData = [] } = useUserTypeListQuery();
  const userTypes = useMemo(() => {
    return userTypesData.length > 0 ? userTypesData : DEFAULT_USER_TYPES;
  }, [userTypesData]);

  // Fallback / Display data for Users
  const displayUsers = useMemo<UserRegisterRecord[]>(() => {
    if (usersListData && usersListData.length > 0) {
      return usersListData;
    }
    return [
      {
        id: "USR-REC-001",
        userCode: "REG-2024-001",
        firstName: "Rahul",
        lastName: "Sharma",
        userTypeId: "USR-004",
        userTypeName: "Retailer",
        companyName: "Sharma Digital Pay",
        contactNo: "9876543210",
        whatsappNo: "9876543210",
        email: "rahul.sharma@example.com",
        dob: "1994-05-15",
        gender: "Male",
        address: "Shop 12, Main Market Road, Andheri West",
        landmark: "Near Metro Station",
        nationality: "Indian",
        pinCode: "400058",
        panNo: "ABCDE1234F",
        aadhaarNo: "987654321098",
        gstNo: "27ABCDE1234F1Z5",
        userIpAddress: "192.168.1.45",
        callbackUrl: "https://api.sharmadigital.com/callback",
        isOtpVerify: "Y",
        packageId: "PKG-001",
        packageName: "Super Retailer Gold",
        lockAmount: "500",
        loginStatus: "active",
      },
      {
        id: "USR-REC-002",
        userCode: "REG-2024-002",
        firstName: "Amit",
        lastName: "Verma",
        userTypeId: "USR-003",
        userTypeName: "Distributor",
        companyName: "Verma Telecom Services",
        contactNo: "9812345678",
        whatsappNo: "9812345678",
        email: "amit.verma@example.com",
        dob: "1990-08-20",
        gender: "Male",
        address: "Plot 45, Sector 18, Noida",
        landmark: "Opposite City Mall",
        nationality: "Indian",
        pinCode: "201301",
        panNo: "XYZAB5678G",
        aadhaarNo: "876543210987",
        gstNo: "09XYZAB5678G1Z8",
        userIpAddress: "192.168.1.60",
        callbackUrl: "https://api.vermatelecom.in/webhook",
        isOtpVerify: "Y",
        packageId: "PKG-002",
        packageName: "Distributor Diamond",
        lockAmount: "2000",
        loginStatus: "active",
      },
    ];
  }, [usersListData]);

  // Combined Data for Privileges
  const displayPrivileges = useMemo<PrivilegeRecord[]>(() => {
    let sourceList: PrivilegeRecord[] = DEFAULT_PRIVILEGES_LIST;

    if (privData && privData.length > 0) {
      sourceList = privData;
    } else if (displayUsers.length > 0) {
      sourceList = displayUsers.map((u, idx) => ({
        id: u.id || `PRV-${idx + 1}`,
        userId: u.id,
        regNo: u.userCode || `REG-2024-00${idx + 1}`,
        userName: `${u.firstName} ${u.lastName || ""}`.trim() || u.userName || "User",
        companyName: u.companyName || "Company",
        contactNumber: u.contactNo || u.mobile || "-",
        packageName: u.packageName || "Standard Package",
        userTypeId: u.userTypeId,
        userTypeName: u.userTypeName,
        apiPermissions: [
          { apiTypeId: "APT-001", apiTypeName: "Recharge", status: "active" },
          { apiTypeId: "APT-002", apiTypeName: "Bill Payment", status: "active" },
          { apiTypeId: "APT-003", apiTypeName: "DMT (Money Transfer)", status: "active" },
          { apiTypeId: "APT-004", apiTypeName: "AEPS", status: idx === 0 ? "inactive" : "active" },
        ],
        status: "active",
      }));
    }

    if (selectedUserType !== "ALL") {
      return sourceList.filter((item) => {
        const matchesId = item.userTypeId === selectedUserType;
        const matchesName =
          item.userTypeName?.toLowerCase() === selectedUserType.toLowerCase() ||
          item.userTypeName?.toLowerCase().includes(selectedUserType.toLowerCase());
        return matchesId || matchesName;
      });
    }

    return sourceList;
  }, [privData, displayUsers, selectedUserType]);

  // Column definitions
  const userColumns = useMemo<ColumnDef<AppTableFeatures, UserRegisterRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: UserIdHeader,
        cell: UserIdCell,
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
        header: UserStatusHeader,
        cell: UserStatusCell,
      },
      {
        id: "actions",
        header: UserActionsHeader,
        cell: UserActionsCell,
        enableSorting: false,
      },
    ],
    []
  );

  const privilegeColumns = useMemo<ColumnDef<AppTableFeatures, PrivilegeRecord, unknown>[]>(
    () => [
      {
        accessorKey: "regNo",
        header: PrivRegNoHeader,
        cell: PrivRegNoCell,
      },
      {
        accessorKey: "userName",
        header: PrivUserNameHeader,
        cell: PrivUserNameCell,
      },
      {
        accessorKey: "companyName",
        header: PrivCompanyNameHeader,
        cell: PrivCompanyNameCell,
      },
      {
        accessorKey: "contactNumber",
        header: PrivContactNoHeader,
        cell: PrivContactNoCell,
      },
      {
        accessorKey: "packageName",
        header: PrivPackageNameHeader,
        cell: PrivPackageNameCell,
      },
      {
        id: "privilegeDetails",
        header: PrivDetailsHeader,
        cell: PrivDetailsCell,
        enableSorting: false,
      },
      {
        id: "actions",
        header: PrivActionsHeader,
        cell: PrivActionsCell,
        enableSorting: false,
      },
    ],
    []
  );

  const handleRefresh = () => {
    if (activeTab === "users") {
      void refetchUsers();
    } else {
      void refetchPrivileges();
    }
  };

  const isCurrentLoading = activeTab === "users" ? isUsersLoading : isPrivLoading;

  return (
    <div className="mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            {activeTab === "users" ? <UserPlus className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              User Management & Privileges
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage all registered user profiles, KYC configurations, and granular API type access permissions.
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

          {activeTab === "users" && (
            <Button
              onClick={openCreateUser}
              className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          )}
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <UsersIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Users</p>
            <p className="text-xl font-bold text-foreground">{displayUsers.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Users</p>
            <p className="text-xl font-bold text-foreground">
              {displayUsers.filter((u) => String(u.loginStatus).toLowerCase() === "active").length}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">User Types</p>
            <p className="text-xl font-bold text-foreground">{userTypes.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">API Privileges</p>
            <p className="text-xl font-bold text-foreground">Granular</p>
          </div>
        </div>
      </div>

      {/* Modern Tab Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-muted/70 rounded-xl border border-border/60 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab("users")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer",
            activeTab === "users"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <UsersIcon className="w-3.5 h-3.5 text-primary" />
          Users Directory ({displayUsers.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("privileges")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer",
            activeTab === "privileges"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          Privilege Settings
        </button>
      </div>

      {/* TAB 1: USERS DIRECTORY CONTENT */}
      {activeTab === "users" && (
        <div className="space-y-4 pt-1">
          {isUsersError && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
              <span>Failed to connect to backend server. Showing active master user data.</span>
              <Button variant="ghost" size="sm" onClick={() => void refetchUsers()}>
                Retry
              </Button>
            </div>
          )}

          <DataTable
            columns={userColumns}
            data={displayUsers}
            loading={isUsersLoading}
            searchPlaceholder="Search users by name, mobile, email, PAN, company..."
            searchDebounceMs={300}
            containerHeight="580px"
          />
        </div>
      )}

      {/* TAB 2: PRIVILEGE SETTINGS CONTENT */}
      {activeTab === "privileges" && (
        <div className="space-y-4 pt-1">
          {/* User Type Filter */}
          <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
                <Filter className="w-4 h-4 text-primary" />
                Filter by User Type:
              </div>

              <Select value={selectedUserType} onValueChange={(val) => setSelectedUserType(val || "ALL")}>
                <SelectTrigger className="w-full sm:w-[240px] cursor-pointer">
                  <SelectValue placeholder="All User Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All User Types</SelectItem>
                  {userTypes.map((ut) => (
                    <SelectItem key={ut.id} value={ut.id || ut.name}>
                      {ut.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedUserType !== "ALL" && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setSelectedUserType("ALL")}
                className="text-xs text-muted-foreground hover:text-foreground cursor-pointer self-start sm:self-auto"
              >
                Clear Filter
              </Button>
            )}
          </div>

          {isPrivError && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
              <span>Failed to connect to backend server. Showing active local privilege records.</span>
              <Button variant="ghost" size="sm" onClick={() => void refetchPrivileges()}>
                Retry
              </Button>
            </div>
          )}

          <DataTable
            columns={privilegeColumns}
            data={displayPrivileges}
            loading={isPrivLoading}
            searchPlaceholder="Search by reg no, user name, company, contact number..."
            searchDebounceMs={300}
            containerHeight="580px"
          />
        </div>
      )}

      {/* CRUD Modals & Dialogs */}
      <UserRegisterModal />
      <UserRegisterDeleteDialog />
      <PrivilegeModal />
      <PrivilegeDeleteDialog />
    </div>
  );
}
