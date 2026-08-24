"use client";

import { useMemo, useState } from "react";
import { PrivilegeRecord, ApiPermissionItem } from "../types";
import { useCreatePrivilegeMutation, useUpdatePrivilegeMutation } from "../hooks";
import { useApiTypeListQuery } from "@/modules/admin/settings/api-type/hooks";
import { DEFAULT_API_TYPES } from "@/modules/admin/settings/api-type/constants";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  CheckCheck,
  XCircle,
  User,
  Building2,
  Phone,
  Package,
  KeyRound,
} from "lucide-react";

export interface PrivilegeFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: PrivilegeRecord | null;
  readonly onSuccess?: () => void;
}

export function PrivilegeForm({ mode, initialData, onSuccess }: PrivilegeFormProps) {
  const createMutation = useCreatePrivilegeMutation();
  const updateMutation = useUpdatePrivilegeMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // Load all available API Types from /dashboard/settings/api-types
  const { data: apiTypesData = [] } = useApiTypeListQuery();
  const availableApiTypes = useMemo(() => {
    return apiTypesData.length > 0 ? apiTypesData : DEFAULT_API_TYPES;
  }, [apiTypesData]);

  // Initial state for API permissions
  const [permissions, setPermissions] = useState<ApiPermissionItem[]>(() => {
    const existingMap = new Map<string, "active" | "inactive">();
    if (initialData?.apiPermissions) {
      initialData.apiPermissions.forEach((p) => {
        existingMap.set(p.apiTypeId, p.status);
        existingMap.set(p.apiTypeName, p.status);
      });
    }

    return availableApiTypes.map((apt) => {
      const existingStatus = existingMap.get(apt.id) || existingMap.get(apt.apiType);
      return {
        apiTypeId: apt.id,
        apiTypeName: apt.apiType,
        status: existingStatus ?? "inactive",
      };
    });
  });

  const togglePermission = (apiTypeId: string) => {
    setPermissions((prev) =>
      prev.map((perm) => {
        if (perm.apiTypeId === apiTypeId) {
          const nextStatus = perm.status === "active" ? "inactive" : "active";
          return { ...perm, status: nextStatus };
        }
        return perm;
      })
    );
  };

  const handleEnableAll = () => {
    setPermissions((prev) => prev.map((p) => ({ ...p, status: "active" })));
  };

  const handleDisableAll = () => {
    setPermissions((prev) => prev.map((p) => ({ ...p, status: "inactive" })));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!initialData) return;

    const payload: PrivilegeRecord = {
      ...initialData,
      apiPermissions: permissions,
    };

    if (mode === "create") {
      await createMutation.mutateAsync(payload);
    } else {
      await updateMutation.mutateAsync(payload);
    }

    onSuccess?.();
  };

  const activeCount = permissions.filter((p) => p.status === "active").length;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {/* User Summary Card */}
        <div className="p-4 rounded-xl bg-muted/40 border border-border/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <User className="w-3.5 h-3.5 text-primary" />
              Target User Profile
            </div>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {initialData?.regNo || "REG-NEW"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block">User Name</span>
                <span className="font-semibold text-foreground">{initialData?.userName || "-"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block">Company Name</span>
                <span className="font-semibold text-foreground">{initialData?.companyName || "-"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block">Contact Number</span>
                <span className="font-mono text-sm text-foreground">{initialData?.contactNumber || "-"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block">Package</span>
                <span className="font-medium text-foreground">{initialData?.packageName || "-"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* API Type Privilege Permissions Header & Bulk Actions */}
        <div className="flex items-center justify-between gap-2 border-b border-border/80 pb-2">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">API Type Access Permissions</h3>
            <Badge variant="outline" className="text-xs font-semibold bg-primary/10 text-primary border-primary/20">
              {activeCount} / {permissions.length} Enabled
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={handleEnableAll}
              className="text-[11px] h-7 px-2 flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
              Enable All
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={handleDisableAll}
              className="text-[11px] h-7 px-2 flex items-center gap-1 cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5 text-destructive" />
              Disable All
            </Button>
          </div>
        </div>

        {/* API Types List with Active/Inactive Toggle Switches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {permissions.map((perm) => {
            const isChecked = perm.status === "active";
            const switchId = `switch-${perm.apiTypeId}`;
            return (
              <label
                key={perm.apiTypeId}
                htmlFor={switchId}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                  isChecked
                    ? "bg-primary/5 border-primary/40 shadow-2xs"
                    : "bg-card border-border/70 hover:border-border"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">
                      {perm.apiTypeName}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground block">
                    ID: {perm.apiTypeId}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge
                    variant={isChecked ? "default" : "outline"}
                    className={`text-[10px] font-semibold uppercase ${
                      isChecked
                        ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20"
                        : "text-muted-foreground border-border/80"
                    }`}
                  >
                    {isChecked ? "Active" : "Inactive"}
                  </Badge>

                  <Switch
                    id={switchId}
                    checked={isChecked}
                    onCheckedChange={() => togglePermission(perm.apiTypeId)}
                    className="cursor-pointer"
                  />
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border bg-background">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          disabled={isPending}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm"
        >
          <Save className="w-4 h-4" />
          {isPending ? "Saving Privileges..." : "Save Privileges"}
        </Button>
      </div>
    </form>
  );
}
