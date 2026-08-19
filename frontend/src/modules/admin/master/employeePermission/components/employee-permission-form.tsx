"use client";

import { useMemo, useState, useEffect } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { EmployeePermissionFormInput } from "../validations";
import { PERMISSION_MODULES_CATALOG, fallbackActiveEmployees } from "../constants";
import { useCreateEmployeePermissionMutation, useUpdateEmployeePermissionMutation } from "../hooks";
import { EmployeePermissionRecord } from "../types";
import { useEmployeeRegisterListQuery } from "@/modules/admin/master/employeeRegister/hooks";
import { usePermissionStore } from "@/stores/usePermissionStore";
import {
  Save,
  UserCheck,
  ShieldCheck,
  Layers,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface EmployeePermissionFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: EmployeePermissionRecord | null;
  readonly onSuccess?: () => void;
}

export function EmployeePermissionForm({ mode, initialData, onSuccess }: EmployeePermissionFormProps) {
  const createMutation = useCreateEmployeePermissionMutation();
  const updateMutation = useUpdateEmployeePermissionMutation();
  const setPermissionInStore = usePermissionStore((s) => s.setEmployeePermission);
  const isPending = createMutation.isPending || updateMutation.isPending;

  // Query registered employees
  const { data: registeredEmployeesData = [] } = useEmployeeRegisterListQuery();

  // Filter only Active Employees
  const activeEmployeeOptions = useMemo(() => {
    let list = fallbackActiveEmployees;
    if (registeredEmployeesData && registeredEmployeesData.length > 0) {
      const activeOnly = registeredEmployeesData.filter(
        (emp) =>
          emp.status === "Active" ||
          emp.status === "active" ||
          emp.status === "Y" ||
          emp.status === "true" ||
          !emp.status
      );
      if (activeOnly.length > 0) {
        list = activeOnly.map((emp) => ({
          id: emp.id,
          firstName: emp.firstName || emp.name?.split(" ")[0] || "Employee",
          lastName: emp.lastName || emp.name?.split(" ")[1] || "",
          email: emp.email || "emp@payzones.in",
          mobile: emp.mobile || "-",
          status: "Active",
        }));
      }
    }

    return list.map((emp) => ({
      label: `${emp.firstName} ${emp.lastName} (${emp.id}) - ${emp.mobile}`,
      value: emp.id,
      name: `${emp.firstName} ${emp.lastName}`.trim(),
      email: emp.email,
      mobile: emp.mobile,
    }));
  }, [registeredEmployeesData]);

  const [selectedEmpId, setSelectedEmpId] = useState<string>(
    initialData?.employeeId || activeEmployeeOptions[0]?.value || "EMP-001"
  );

  const selectedEmployeeObj = useMemo(() => {
    return activeEmployeeOptions.find((e) => e.value === selectedEmpId) || activeEmployeeOptions[0];
  }, [activeEmployeeOptions, selectedEmpId]);

  // Selected Routes Set
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>(
    initialData?.allowedRoutes && initialData.allowedRoutes.length > 0
      ? initialData.allowedRoutes
      : [
        "/dashboard/overview/daily",
        "/dashboard/overview/weekly",
        "/dashboard/account/wallet-balance",
        "/dashboard/reports/financial/recharge",
        "/dashboard/reports/financial/bill-payment",
        "/dashboard/support/change-password",
      ]
  );

  const [canWrite, setCanWrite] = useState<boolean>(
    initialData?.canWrite === true || initialData?.canWrite === "true" || initialData?.canWrite === "Y"
  );
  const [canDelete, setCanDelete] = useState<boolean>(
    initialData?.canDelete === true || initialData?.canDelete === "true" || initialData?.canDelete === "Y"
  );

  // Sync state if editing
  useEffect(() => {
    if (initialData?.employeeId) {
      setSelectedEmpId(initialData.employeeId);
    }
    if (initialData?.allowedRoutes) {
      setSelectedRoutes(initialData.allowedRoutes);
    }
    if (initialData?.canWrite !== undefined) {
      setCanWrite(initialData.canWrite === true || initialData.canWrite === "true");
    }
    if (initialData?.canDelete !== undefined) {
      setCanDelete(initialData.canDelete === true || initialData.canDelete === "true");
    }
  }, [initialData]);

  // Route Toggle Helpers
  const handleToggleRoute = (href: string) => {
    setSelectedRoutes((prev) =>
      prev.includes(href) ? prev.filter((r) => r !== href) : [...prev, href]
    );
  };

  const handleSelectAllModule = (moduleSection: (typeof PERMISSION_MODULES_CATALOG)[0]) => {
    const allModuleHrefs = moduleSection.subGroups.flatMap((g) => g.items.map((i) => i.href));
    setSelectedRoutes((prev) => Array.from(new Set([...prev, ...allModuleHrefs])));
  };

  const handleClearAllModule = (moduleSection: (typeof PERMISSION_MODULES_CATALOG)[0]) => {
    const allModuleHrefs = new Set(moduleSection.subGroups.flatMap((g) => g.items.map((i) => i.href)));
    setSelectedRoutes((prev) => prev.filter((href) => !allModuleHrefs.has(href)));
  };

  // Quick Preset Handlers
  const handleApplyPreset = (preset: "full" | "support" | "accounts" | "clear") => {
    if (preset === "full") {
      const allHrefs = PERMISSION_MODULES_CATALOG.flatMap((m) =>
        m.subGroups.flatMap((g) => g.items.map((i) => i.href))
      );
      setSelectedRoutes(Array.from(new Set(["/dashboard", ...allHrefs])));
      setCanWrite(true);
      setCanDelete(true);
    } else if (preset === "support") {
      setSelectedRoutes([
        "/dashboard/overview/daily",
        "/dashboard/reports/financial/recharge",
        "/dashboard/reports/financial/bill-payment",
        "/dashboard/reports/financial/dmt",
        "/dashboard/reports/financial/payout",
        "/dashboard/support/tickets",
        "/dashboard/support/contact",
        "/dashboard/support/change-password",
      ]);
      setCanWrite(true);
      setCanDelete(false);
    } else if (preset === "accounts") {
      setSelectedRoutes([
        "/dashboard/overview/daily",
        "/dashboard/account/add-bank",
        "/dashboard/account/wallet-balance",
        "/dashboard/account/fund/request",
        "/dashboard/account/fund/transfer",
        "/dashboard/reports/financial/recharge",
        "/dashboard/reports/financial/payout",
        "/dashboard/reports/wallet/ledger",
        "/dashboard/reports/wallet/transaction-ledger",
        "/dashboard/reports/wallet/daily-sale",
        "/dashboard/reports/wallet/daily-payout",
        "/dashboard/support/change-password",
      ]);
      setCanWrite(true);
      setCanDelete(false);
    } else if (preset === "clear") {
      setSelectedRoutes(["/dashboard/overview/daily", "/dashboard/support/change-password"]);
      setCanWrite(false);
      setCanDelete(false);
    }
  };

  const form = useAppForm({
    defaultValues: {
      employeeId: selectedEmpId,
      employeeName: selectedEmployeeObj?.name || "",
      employeeEmail: selectedEmployeeObj?.email || "",
      employeeMobile: selectedEmployeeObj?.mobile || "",
      allowedRoutes: selectedRoutes,
      allowedModules: [],
      canWrite: canWrite,
      canDelete: canDelete,
      status: "Active",
    } as unknown as EmployeePermissionFormInput,
    onSubmit: async () => {
      // Derive allowed modules from selected routes
      const allowedModules = PERMISSION_MODULES_CATALOG.filter((sec) =>
        sec.subGroups.some((g) => g.items.some((i) => selectedRoutes.includes(i.href)))
      ).map((sec) => sec.moduleKey);

      const payload: EmployeePermissionRecord = {
        id: initialData?.id || `PERM-${Date.now()}`,
        employeeId: selectedEmpId,
        employeeName: selectedEmployeeObj?.name || "Assigned Employee",
        employeeEmail: selectedEmployeeObj?.email || "",
        employeeMobile: selectedEmployeeObj?.mobile || "",
        allowedRoutes: selectedRoutes,
        allowedModules: allowedModules,
        canWrite: canWrite,
        canDelete: canDelete,
        status: "Active",
        moduleAccess: `${allowedModules.length} Modules Allowed`,
      };

      const finalPayload = mode === "edit" && initialData ? { ...initialData, ...payload } : payload;

      // Save locally to store for instantaneous route guarding
      setPermissionInStore(finalPayload);

      if (mode === "create") {
        await createMutation.mutateAsync(finalPayload);
      } else if (mode === "edit" && initialData?.id) {
        await updateMutation.mutateAsync(finalPayload);
      }
      onSuccess?.();
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="space-y-5 max-h-[64vh] overflow-y-auto pr-1">
          {/* Top Section: Active Employee Selection Card */}
          <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-primary" />
                1. Select Active Employee
              </span>
              <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                Active Employee Register
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <Label className="text-xs font-semibold mb-1.5 block">Choose Employee</Label>
                <FormField
                  name="employeeId"
                  label=""
                  type="select"
                  placeholder="Select Active Employee"
                  required
                  options={activeEmployeeOptions}
                  value={selectedEmpId}
                  onChange={(val) => {
                    const strVal = String(val);
                    setSelectedEmpId(strVal);
                    form.setFieldValue("employeeId" as never, strVal as never);
                  }}
                  helperText="Fetches from Employee Register master"
                />
              </div>

              {/* Employee Summary Pill */}
              <div className="p-3 rounded-lg bg-muted/40 border border-border/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20 shrink-0">
                  {selectedEmployeeObj?.name?.charAt(0) || "E"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-foreground truncate">
                    {selectedEmployeeObj?.name || "Employee"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {selectedEmployeeObj?.email} • {selectedEmployeeObj?.mobile}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Permissions (Write & Delete Toggles) */}
          <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Action Privileges</p>
                <p className="text-xs text-muted-foreground">Control data creation, modification, and deletion</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Can Write Toggle */}
              <div className="flex items-center gap-2.5">
                <Switch
                  id="can-write-toggle"
                  checked={canWrite}
                  onCheckedChange={setCanWrite}
                />
                <Label htmlFor="can-write-toggle" className="text-xs font-semibold cursor-pointer">
                  Can Write / Edit
                </Label>
              </div>

              {/* Can Delete Toggle */}
              <div className="flex items-center gap-2.5">
                <Switch
                  id="can-delete-toggle"
                  checked={canDelete}
                  onCheckedChange={setCanDelete}
                />
                <Label htmlFor="can-delete-toggle" className="text-xs font-semibold cursor-pointer text-destructive">
                  Can Delete Records
                </Label>
              </div>
            </div>
          </div>

          {/* Quick Presets Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60">
            <span className="text-xs font-bold text-muted-foreground px-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Quick Presets:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleApplyPreset("full")}
                className="h-7 text-xs px-2.5"
              >
                Full Access
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleApplyPreset("support")}
                className="h-7 text-xs px-2.5"
              >
                Support / Operator
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleApplyPreset("accounts")}
                className="h-7 text-xs px-2.5"
              >
                Accounts & Reports
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleApplyPreset("clear")}
                className="h-7 text-xs px-2 text-destructive hover:bg-destructive/10"
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Section 2: Modular Route Permission Tree */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                2. Admin Panel Routes & Module Access Matrix
              </span>
              <span className="text-xs font-semibold text-primary">
                {selectedRoutes.length} Total Routes Permitted
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PERMISSION_MODULES_CATALOG.map((sec) => {
                const sectionHrefs = sec.subGroups.flatMap((g) => g.items.map((i) => i.href));
                const permittedCount = sectionHrefs.filter((h) => selectedRoutes.includes(h)).length;
                const isAllSelected = permittedCount === sectionHrefs.length && sectionHrefs.length > 0;

                return (
                  <div
                    key={sec.moduleKey}
                    className="p-4 rounded-xl bg-card border border-border/80 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      {/* Module Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-border/60">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-primary" />
                          <span className="text-sm font-bold text-foreground">{sec.moduleTitle}</span>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {permittedCount}/{sectionHrefs.length}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => (isAllSelected ? handleClearAllModule(sec) : handleSelectAllModule(sec))}
                            className="h-6 text-[11px] px-2 text-primary hover:bg-primary/10"
                          >
                            {isAllSelected ? "Deselect All" : "Select All"}
                          </Button>
                        </div>
                      </div>

                      {/* Subgroups & Routes */}
                      <div className="space-y-3 pt-2">
                        {sec.subGroups.map((subGroup) => (
                          <div key={subGroup.title} className="space-y-1.5">
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight block">
                              {subGroup.title}
                            </span>
                            <div className="grid grid-cols-1 gap-1 pl-1">
                              {subGroup.items.map((item) => {
                                const isChecked = selectedRoutes.includes(item.href);
                                return (
                                  <label
                                    key={item.href}
                                    className={`flex items-center gap-2.5 p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${isChecked
                                        ? "bg-primary/10 text-foreground font-semibold"
                                        : "hover:bg-muted/50 text-muted-foreground"
                                      }`}
                                  >
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={() => handleToggleRoute(item.href)}
                                    />
                                    <span className="truncate">{item.title}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border bg-background">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Save Employee Permission" : "Save Changes"}
            loadingLabel="Saving..."
            isLoading={isPending}
            disabled={isPending}
            className={isPending ? "cursor-not-allowed" : "cursor-pointer"}
          />
        </div>
      </form>
    </form.AppForm>
  );
}
