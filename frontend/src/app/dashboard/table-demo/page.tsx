"use client";

import { useMemo, useState } from "react";
import { ColumnDef, Column, Row, Table } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Mail, MapPin, Search, ShieldCheck, UserCheck, Clock, AlertCircle } from "lucide-react";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
  company: string;
  location: string;
}

// 
function SelectHeader({ table }: Readonly<{ table: Table<AppTableFeatures, UserRecord> }>) {
  return (
    <Checkbox
      checked={table.getIsAllPageRowsSelected?.()}
      indeterminate={table.getIsSomePageRowsSelected?.()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected?.(Boolean(value))}
      aria-label="Select all"
    />
  );
}

function SelectCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  return (
    <Checkbox
      checked={row.getIsSelected?.()}
      onCheckedChange={(value) => row.toggleSelected?.(Boolean(value))}
      aria-label="Select row"
    />
  );
}

function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Employee ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function NameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Name & Role" />;
}

function NameCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  return (
    <div className="flex flex-col py-0.5">
      <span className="font-medium text-foreground tracking-tight">{String(row.getValue?.("name"))}</span>
      <span className="text-[11px] text-muted-foreground">{String(row.original?.role)}</span>
    </div>
  );
}

function EmailHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Email Address" />;
}

function EmailCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Mail className="h-3.5 w-3.5 text-primary/70 shrink-0" />
      <span className="truncate">{String(row.getValue?.("email"))}</span>
    </div>
  );
}

function CompanyHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Organization" />;
}

function CompanyCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Building2 className="h-3.5 w-3.5 text-primary/70 shrink-0" />
      <span className="truncate">{String(row.getValue?.("company"))}</span>
    </div>
  );
}

function LocationHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Work Location" />;
}

function LocationCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <span>{String(row.getValue?.("location"))}</span>
    </div>
  );
}

function StatusHeader({ column }: Readonly<{ column: Column<AppTableFeatures, UserRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Status" />;
}

const STATUS_VARIANT_MAP: Record<UserRecord["status"], "default" | "outline" | "secondary"> = {
  Active: "default",
  Pending: "outline",
  Inactive: "secondary",
};

function StatusCell({ row }: Readonly<{ row: Row<AppTableFeatures, UserRecord> }>) {
  const status = row.getValue?.("status") as UserRecord["status"];
  const variant = STATUS_VARIANT_MAP[status] ?? "secondary";

  return (
    <Badge
      variant={variant}
      className="text-[10px] px-2.5 py-0.5 font-medium flex items-center gap-1 w-fit"
    >
      {status === "Active" && <UserCheck className="w-3 h-3 text-emerald-500" />}
      {status === "Pending" && <Clock className="w-3 h-3 text-amber-500" />}
      {status === "Inactive" && <AlertCircle className="w-3 h-3 text-muted-foreground" />}
      {status}
    </Badge>
  );
}

// Demo dataset with 2,500 realistic mock records
const generateMockData = (): UserRecord[] => {
  const roles = ["Senior Developer", "Product Manager", "UI/UX Designer", "DevOps Engineer", "HR Business Partner", "Finance Lead", "QA Specialist"];
  const statuses: UserRecord["status"][] = ["Active", "Inactive", "Pending"];
  const cities = ["Mumbai, MH", "Bengaluru, KA", "Delhi NCR", "Hyderabad, TS", "Pune, MH", "Chennai, TN"];
  const companyPrefixes = ["Tech", "Pay", "Cloud", "Nexus", "Cyber", "Apex", "Vortex", "Zenith", "Alpha", "Omni"];
  const companySuffixes = ["Labs", "Solutions", "Systems", "Technologies", "Global", "Networks", "Fintech", "Software"];

  return Array.from({ length: 2500 }, (_, i) => {
    const role = roles[i % roles.length];
    const company = `${companyPrefixes[i % companyPrefixes.length]} ${companySuffixes[i % companySuffixes.length]} Pvt Ltd`;
    return {
      id: `USR-${10000 + i}`,
      name: `Employee ${i + 1}`,
      email: `employee.${i + 1}@${companyPrefixes[i % companyPrefixes.length].toLowerCase()}corp.com`,
      role,
      status: statuses[i % statuses.length],
      company,
      location: cities[i % cities.length],
    };
  });
};

export default function TableDemoPage() {
  const data = useMemo(() => generateMockData(), []);
  const [debouncedQueryLog, setDebouncedQueryLog] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columns = useMemo<ColumnDef<AppTableFeatures, UserRecord, unknown>[]>(
    () => [
      {
        id: "select",
        header: SelectHeader,
        cell: SelectCell,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "name",
        header: NameHeader,
        cell: NameCell,
      },
      {
        accessorKey: "email",
        header: EmailHeader,
        cell: EmailCell,
      },
      {
        accessorKey: "company",
        header: CompanyHeader,
        cell: CompanyCell,
      },
      {
        accessorKey: "location",
        header: LocationHeader,
        cell: LocationCell,
      },
      {
        accessorKey: "status",
        header: StatusHeader,
        cell: StatusCell,
      },
    ],
    []
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Enterprise Master Data Table
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Production-ready table powered by <b>Shadcn UI (Base UI)</b> + <b>TanStack Table v9</b> + <b>TanStack Virtual v3</b> + <b>TanStack Pacer</b>.
            </p>
          </div>
        </div>
      </div>

      {/* TanStack Pacer Debounce Payload Live Tracker */}
      <div className="p-4 bg-card/60 backdrop-blur-md border border-border rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Search className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-xs">
            <span className="text-muted-foreground">TanStack Pacer Engine: </span>
            <span className="font-medium text-foreground">
              {debouncedQueryLog ? (
                <span className="text-primary font-mono font-semibold">
                  Payload sent for &quot;{debouncedQueryLog}&quot; (300ms debounced)
                </span>
              ) : (
                "Listening for live search inputs..."
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="font-mono text-xs px-3 py-1 bg-background border-border w-fit">
            2,500 Virtual Rows Active
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLoading(!isLoading)}
          >
            {isLoading ? "Disable Skeleton Loading" : "Test Skeleton Loading"}
          </Button>
        </div>
      </div>

      {/* Main Reusable Virtualized Data Table */}
      <DataTable
        columns={columns}
        data={data}
        loading={isLoading}
        searchPlaceholder="Search by employee name, organization, email, or location..."
        searchDebounceMs={300}
        containerHeight="600px"
        onSearchChange={(val: string) => setDebouncedQueryLog(val)}
      />
    </div>
  );
}
