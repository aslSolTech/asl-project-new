"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gift,
  Gamepad2,
  Fingerprint,
  Smartphone,
  Tv,
  Receipt,
  Zap,
  Send,
  Search,
  ArrowUpRight,
  Sparkles,
  LayoutGrid
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";
import { useServicesListQuery } from "../hooks";
import { ServiceItem } from "../types";

// Icon mapping dictionary
const ICON_MAP: Record<string, React.ElementType> = {
  Gift,
  Gamepad2,
  Fingerprint,
  Smartphone,
  Tv,
  Receipt,
  Zap,
  Send,
};

export const AllServicesView = memo(function AllServicesView() {
  const pathname = usePathname();
  const profileRole = useMerchantProfileStore((s) => s?.profile?.role);
  const { data: services, isLoading } = useServicesListQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Extract dynamic role slug from pathname or profile fallback
  const roleSlug = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[1] === "dashboard") {
      return segments[0];
    }
    return (profileRole || "distributor").toLowerCase().replace(/\s+/g, "-");
  }, [pathname, profileRole]);

  // Helper to dynamically adjust links from /dashboard/... to /:role/dashboard/...
  const getRoleHref = (href?: string) => {
    if (!href) return "";
    if (href.startsWith("/dashboard")) {
      return `/${roleSlug}${href}`;
    }
    if (href.startsWith("/")) {
      return `/${roleSlug}/dashboard${href}`;
    }
    return href;
  };

  // Categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(services?.map((s) => s.category).filter(Boolean) as string[]));
    return ["ALL", ...cats];
  }, [services]);

  // Filtered services
  const filteredServices = useMemo(() => {
    if (!services) return [];
    return services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "ALL" || service.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [services, searchQuery, selectedCategory]);

  const renderServicesContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="h-28 rounded-2xl bg-muted/40 animate-pulse border border-border"
            />
          ))}
        </div>
      );
    }

    if (filteredServices.length === 0) {
      return (
        <div className="p-8 text-center rounded-2xl bg-card border border-border space-y-2.5">
          <Search className="w-8 h-8 text-muted-foreground mx-auto" />
          <h3 className="font-bold text-sm text-foreground">No services found</h3>
          <p className="text-xs text-muted-foreground">
            No service matching &quot;{searchQuery}&quot; was found. Try searching for a different keyword.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {filteredServices.map((service: ServiceItem) => {
          const IconComponent = ICON_MAP[service.iconName] || Sparkles;
          const targetHref = getRoleHref(service.route);

          return (
            <Link
              key={service.id}
              href={targetHref}
              className={`group relative flex flex-col items-center justify-between p-3 rounded-2xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer text-center ${
                service.isSpecial
                  ? "bg-[#c5a850] dark:bg-[#a68c3e] border-[#b09440] text-slate-900 shadow-sm shadow-[#c5a850]/20"
                  : "bg-card hover:bg-card/90 border-border hover:border-primary/40 shadow-2xs hover:shadow-primary/5"
              }`}
            >
              {/* Visual Icon Container */}
              <div className="w-full flex justify-center items-center py-1">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs ${
                    service.isSpecial
                      ? "bg-black/85 text-[#f5df8b] border border-[#d6b758]/50"
                      : "bg-gradient-to-b from-muted/60 to-muted/20 text-primary border border-border/80 group-hover:border-primary/30 group-hover:bg-primary/10"
                  }`}
                >
                  <IconComponent className="w-6 h-6 stroke-[1.75]" />
                </div>
              </div>

              {/* Service Title */}
              <div className="w-full pt-1.5 pb-0.5">
                <span
                  className={`font-bold text-[10px] sm:text-[11px] uppercase tracking-tight block truncate ${
                    service.isSpecial ? "text-slate-950 font-extrabold" : "text-foreground"
                  }`}>
                  {service.title}
                </span>
              </div>

              {/* Badge if available */}
              {service.badge && (
                <Badge
                  variant="outline"
                  className="mt-0.5 text-[8px] px-1 py-0 uppercase font-mono font-bold bg-background/80">
                  {service.badge}
                </Badge>
              )}

              {/* Hover Action Indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-0.5 rounded-full bg-primary/20 text-primary">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mx-auto w-full space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner Card */}
      <div className="rounded-3xl bg-card border border-border p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <LayoutGrid className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                  All Merchant Services
                </h1>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-2 py-0.5">
                  Live Operations
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Select any digital banking, BBPS, or recharge service to initiate live transactions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-xs rounded-xl bg-background"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-border/80 overflow-x-auto">
            {categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs rounded-xl h-8 px-3 font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat ? "shadow-sm shadow-primary/20" : "text-muted-foreground"
                }`}
              >
                {cat === "ALL" ? "All Services" : cat}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Services Grid (Styled to match design) */}
      {renderServicesContent()}

      {/* Safety & Real-time Settlement Assurance */}
      <div className="p-4 rounded-2xl bg-muted/30 border border-border flex items-center justify-between text-xs text-muted-foreground">
      
        <span className="text-end font-mono text-[11px] hidden sm:inline">API v1.0 Live</span>
      </div>
    </div>
  );
});
