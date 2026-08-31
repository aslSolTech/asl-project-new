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
  Sparkles,
  LayoutGrid,
  ShieldCheck,
  ZapIcon,
  ChevronRight,
  TrendingUp,
  Activity
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

// Subtle themed gradient/accent palettes for service icons
const SERVICE_THEMES: Record<
  string,
  {
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
    accentBorder: string;
    glow: string;
  }
> = {
  "gift-card": {
    iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    badgeText: "Vouchers",
    accentBorder: "group-hover:border-amber-500/40",
    glow: "group-hover:shadow-amber-500/10",
  },
  "google-play": {
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    badgeText: "Gaming",
    accentBorder: "group-hover:border-emerald-500/40",
    glow: "group-hover:shadow-emerald-500/10",
  },
  "aeps-yes-bank": {
    iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    badgeText: "AEPS Pipe 1",
    accentBorder: "group-hover:border-blue-500/40",
    glow: "group-hover:shadow-blue-500/10",
  },
  "aeps-kotak-bank": {
    iconBg: "bg-red-500/10 dark:bg-red-500/15",
    iconColor: "text-red-600 dark:text-red-400",
    badgeBg: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20",
    badgeText: "AEPS Pipe 2",
    accentBorder: "group-hover:border-red-500/40",
    glow: "group-hover:shadow-red-500/10",
  },
  "mobile-prepaid": {
    iconBg: "bg-sky-500/10 dark:bg-sky-500/15",
    iconColor: "text-sky-600 dark:text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
    badgeText: "Prepaid / Postpaid",
    accentBorder: "group-hover:border-sky-500/40",
    glow: "group-hover:shadow-sky-500/10",
  },
  "dth-recharge": {
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/15",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    badgeBg: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
    badgeText: "TV Topup",
    accentBorder: "group-hover:border-indigo-500/40",
    glow: "group-hover:shadow-indigo-500/10",
  },
  bbps: {
    iconBg: "bg-orange-500/10 dark:bg-orange-500/15",
    iconColor: "text-orange-600 dark:text-orange-400",
    badgeBg: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20",
    badgeText: "BBPS NPCI",
    accentBorder: "group-hover:border-orange-500/40",
    glow: "group-hover:shadow-orange-500/10",
  },
  "upi-transfer": {
    iconBg: "bg-violet-500/10 dark:bg-violet-500/15",
    iconColor: "text-violet-600 dark:text-violet-400",
    badgeBg: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20",
    badgeText: "UPI VPA",
    accentBorder: "group-hover:border-violet-500/40",
    glow: "group-hover:shadow-violet-500/10",
  },
  "money-transfer": {
    iconBg: "bg-teal-500/10 dark:bg-teal-500/15",
    iconColor: "text-teal-600 dark:text-teal-400",
    badgeBg: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
    badgeText: "DMT 24x7",
    accentBorder: "group-hover:border-teal-500/40",
    glow: "group-hover:shadow-teal-500/10",
  },
};

const DEFAULT_THEME = {
  iconBg: "bg-primary/10",
  iconColor: "text-primary",
  badgeBg: "bg-primary/10 text-primary border-primary/20",
  badgeText: "Service",
  accentBorder: "group-hover:border-primary/40",
  glow: "group-hover:shadow-primary/10",
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

  // Categories list with counts
  const categoryStats = useMemo(() => {
    if (!services) return [];
    const counts: Record<string, number> = {};
    services.forEach((s) => {
      if (s.category) {
        counts[s.category] = (counts[s.category] || 0) + 1;
      }
    });
    const uniqueCats = Object.keys(counts);
    return [
      { id: "ALL", label: "All Services", count: services.length },
      ...uniqueCats.map((cat) => ({ id: cat, label: cat, count: counts[cat] })),
    ];
  }, [services]);

  // Filtered services
  const filteredServices = useMemo(() => {
    if (!services) return [];
    return services.filter((service) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.description?.toLowerCase().includes(q) ||
        service.category?.toLowerCase().includes(q) ||
        service.badge?.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === "ALL" || service.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [services, searchQuery, selectedCategory]);

  const renderServicesContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="h-48 rounded-2xl bg-card/60 animate-pulse border border-border/80 p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-muted/60" />
                <div className="w-16 h-5 rounded-full bg-muted/50" />
              </div>
              <div className="space-y-2">
                <div className="w-3/4 h-4 rounded bg-muted/60" />
                <div className="w-full h-3 rounded bg-muted/40" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (filteredServices.length === 0) {
      return (
        <div className="p-12 text-center rounded-3xl bg-card border border-border/80 shadow-xs space-y-3.5 max-w-lg mx-auto my-6">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-foreground">No matching services</h3>
            <p className="text-xs text-muted-foreground">
              We couldn&apos;t find any service matching &quot;<span className="text-foreground font-semibold">{searchQuery}</span>&quot;.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
            className="rounded-xl text-xs font-semibold cursor-pointer"
          >
            Clear Filters
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredServices.map((service: ServiceItem) => {
          const IconComponent = ICON_MAP[service.iconName] || Sparkles;
          const targetHref = getRoleHref(service.route);
          const theme = SERVICE_THEMES[service.id] || DEFAULT_THEME;

          return (
            <Link
              key={service.id}
              href={targetHref}
              className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-card hover:bg-card/95 border border-border/80 ${theme.accentBorder} shadow-xs hover:shadow-xl ${theme.glow} transition-all duration-200 cursor-pointer overflow-hidden`}
            >
              {/* Subtle background highlight on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Top Header inside Card */}
              <div className="flex items-start justify-between gap-3 relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl ${theme.iconBg} ${theme.iconColor} flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-inner border border-white/10`}
                >
                  <IconComponent className="w-6 h-6 stroke-[1.8]" />
                </div>

                <div className="flex flex-col items-end gap-1">
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-semibold font-mono uppercase px-2 py-0.5 rounded-full border ${theme.badgeBg}`}
                  >
                    {service.badge || theme.badgeText}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Operational
                  </span>
                </div>
              </div>

              {/* Body: Title & Description */}
              <div className="pt-4 pb-3 space-y-1.5 relative z-10 flex-1">
                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>{service.title}</span>
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {service.description || "Instant merchant service clearance with real-time settlement."}
                </p>
              </div>

              {/* Bottom Footer: Category & Launch Portal CTA */}
              <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs relative z-10">
                <span className="text-[11px] font-medium text-muted-foreground truncate max-w-[140px]">
                  {service.category || "Utility"}
                </span>

                <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                  <span>Launch</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
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
      {/* Top Banner Card with Stats & Search */}
      <div className="rounded-3xl bg-card border border-border/80 p-5 sm:p-7 shadow-xs relative overflow-hidden">
        {/* Background gradient decorative element */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <LayoutGrid className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                  Merchant Service Gateway
                </h1>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-bold px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />Live v1.0
                </Badge>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Access digital banking, instant DMT, BBPS utilities, AEPS biometric cash out, and prepaid recharge pipes with real-time merchant commissions.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 bg-muted/40 dark:bg-muted/20 border border-border/60 rounded-2xl p-3 sm:px-4">
            <div className="text-center sm:text-left pr-3 sm:pr-4 border-r border-border/60">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                Total Services
              </span>
              <span className="text-base sm:text-lg font-black font-mono text-foreground">
                {services?.length || 9}
              </span>
            </div>
            <div className="text-center sm:text-left pr-3 sm:pr-4 border-r border-border/60">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                Uptime SLA
              </span>
              <span className="text-base sm:text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                99.98%
              </span>
            </div>
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                Settlement
              </span>
              <span className="text-xs sm:text-sm font-bold text-primary flex items-center gap-1">
                <ZapIcon className="w-3.5 h-3.5 fill-primary" />
                Instant
              </span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="pt-6 mt-6 border-t border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categoryStats.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                      : "bg-background hover:bg-muted/60 text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search service, code or provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 text-xs rounded-xl bg-background border-border/80 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Services Grid Content */}
      {renderServicesContent()}

      {/* Trust & Enterprise Assurance Footer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-medium text-foreground">NPCI &amp; BBPS Certified Pipe</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-foreground">Bank Grade 256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span className="font-medium text-foreground">Real-time Margin Credit</span>
          </div>
        </div>

        <span className="font-mono text-[11px] text-muted-foreground/80">
          Core Engine v2.4 • ASL Network
        </span>
      </div>
    </div>
  );
});

