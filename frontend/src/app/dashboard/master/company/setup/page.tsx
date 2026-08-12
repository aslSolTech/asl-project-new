"use client";

import Image from "next/image";
import { useMemo } from "react";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader, AppTableFeatures } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCompanyListQuery } from "@/modules/admin/master/company/hooks";
import { useCompanyModalStore } from "@/modules/admin/master/company/stores/useCompanyModalStore";
import { CompanyRecord } from "@/modules/admin/master/company/types";
import { CompanyModal } from "@/modules/admin/master/company/components/company-modal";
import { CompanyDeleteDialog } from "@/modules/admin/master/company/components/company-delete-dialog";
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Mail,
  Phone,
  FileText,
  Globe,
  MapPin,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

// Columns helper components
function IdHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CompanyRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Company ID" />;
}

function IdCell({ row }: Readonly<{ row: Row<AppTableFeatures, CompanyRecord> }>) {
  return (
    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50">
      {String(row.getValue?.("id"))}
    </span>
  );
}

function NameHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CompanyRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Company Name" />;
}

function NameCell({ row }: Readonly<{ row: Row<AppTableFeatures, CompanyRecord> }>) {
  const company = row.original;
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 font-bold text-sm">
        {company.companyLogo && typeof company.companyLogo === "string" ? (
          <Image
            src={company.companyLogo}
            alt={company.companyName}
            width={32}
            height={32}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          company.companyName.charAt(0).toUpperCase()
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-medium text-foreground tracking-tight truncate">
          {company.companyName}
        </span>
        {company.website && (
          <Link
            href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-muted-foreground hover:text-primary flex items-center gap-1 truncate">
            <Globe className="w-3 h-3 shrink-0" />
            {company.website.replace(/^https?:\/\//, "")}
          </Link>
        )}
      </div>
    </div>
  );
}

function ContactHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CompanyRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Contact Info" />;
}

function ContactCell({ row }: Readonly<{ row: Row<AppTableFeatures, CompanyRecord> }>) {
  const company = row.original;
  return (
    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
      <div className="flex items-center gap-1.5 truncate">
        <Mail className="h-3.5 w-3.5 text-primary/70 shrink-0" />
        <span className="truncate">{company.companyEmail}</span>
      </div>
      <div className="flex items-center gap-1.5 truncate">
        <Phone className="h-3.5 w-3.5 text-primary/70 shrink-0" />
        <span>{company.companyPhone}</span>
      </div>
    </div>
  );
}

function TaxHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CompanyRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="GST / Tax Details" />;
}

function TaxCell({ row }: Readonly<{ row: Row<AppTableFeatures, CompanyRecord> }>) {
  const gst = row.original.gstNumber;
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      {gst ? (
        <Badge variant="outline" className="font-mono text-[11px]">
          {gst}
        </Badge>
      ) : (
        <span className="italic text-muted-foreground/60">Not specified</span>
      )}
    </div>
  );
}

function AddressHeader({ column }: Readonly<{ column: Column<AppTableFeatures, CompanyRecord, unknown> }>) {
  return <DataTableColumnHeader column={column} title="Office Address" />;
}

function AddressCell({ row }: Readonly<{ row: Row<AppTableFeatures, CompanyRecord> }>) {
  return (
    <div className="flex items-start gap-1.5 text-xs text-muted-foreground max-w-[220px]">
      <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground" />
      <span className="line-clamp-2">{row.original.address}</span>
    </div>
  );
}

function ActionsHeader() {
  return <span className="text-xs font-semibold">Actions</span>;
}

function ActionsCell({ row }: Readonly<{ row: Row<AppTableFeatures, CompanyRecord> }>) {
  const { openEdit, openDelete } = useCompanyModalStore();
  const company = row.original;
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openEdit(company.id, company)}
        title="Edit Company"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit2 className="w-3.5 h-3.5" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => openDelete(company.id, company.companyName)}
        title="Delete Company"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

export default function CompanySetupPage() {
  const { data: companiesData, isLoading, isError, refetch } = useCompanyListQuery();
  const { openCreate } = useCompanyModalStore();

  // Demo fallback dataset if backend table is empty during development
  const displayData = useMemo<CompanyRecord[]>(() => {
    if (companiesData && companiesData.length > 0) {
      return companiesData;
    }
    return [
      {
        id: "CMP-1001",
        companyName: "Payzones Tech Solutions Pvt Ltd",
        companyEmail: "info@payzones.com",
        companyPhone: "+91 9876543210",
        website: "https://payzones.com",
        gstNumber: "22AAAAA0000A1Z5",
        address: "701, Apex Towers, Bandra Kurla Complex, Mumbai, MH - 400051",
      },
      {
        id: "CMP-1002",
        companyName: "Apex Cyber Systems Ltd",
        companyEmail: "contact@apexsystems.io",
        companyPhone: "+91 9123456789",
        website: "https://apexsystems.io",
        gstNumber: "27BBBCC1111B2Z8",
        address: "402, Cyber Heights, HITEC City, Hyderabad, TS - 500081",
      },
      {
        id: "CMP-1003",
        companyName: "Vortex Global Networks",
        companyEmail: "admin@vortexnetworks.com",
        companyPhone: "+91 9988776655",
        website: "https://vortexnetworks.com",
        gstNumber: "33DDDEE3333D4Z2",
        address: "105, Tech Park, Indiranagar, Bengaluru, KA - 560038",
      },
    ];
  }, [companiesData]);

  const columns = useMemo<ColumnDef<AppTableFeatures, CompanyRecord, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: IdHeader,
        cell: IdCell,
      },
      {
        accessorKey: "companyName",
        header: NameHeader,
        cell: NameCell,
      },
      {
        accessorKey: "companyEmail",
        header: ContactHeader,
        cell: ContactCell,
      },
      {
        accessorKey: "gstNumber",
        header: TaxHeader,
        cell: TaxCell,
      },
      {
        accessorKey: "address",
        header: AddressHeader,
        cell: AddressCell,
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
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Company Master Setup
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage organization profiles, tax identifiers, and official master contact details.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={isLoading}
            className="flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={openCreate}
            className="flex items-center gap-2 shadow-sm font-semibold cursor-pointer">
            <Plus className="w-4 h-4" />
            Add Company
          </Button>
        </div>
      </div>

      {isError && (
        <div className="p-4 mt-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>Failed to connect to backend server. Showing active local master data.</span>
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
        searchPlaceholder="Search by company name, email, GST number, or address..."
        searchDebounceMs={300}
        containerHeight="580px"
      />

      {/* CRUD Modals Controlled by Zustand Store */}
      <CompanyModal />
      <CompanyDeleteDialog />
    </div>
  );
}