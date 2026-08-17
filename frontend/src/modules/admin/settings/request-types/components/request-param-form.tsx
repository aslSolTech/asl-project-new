"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateRequestParamMutation, useUpdateRequestParamMutation } from "../hooks";
import { RequestParamRecord, CreateRequestParamPayload } from "../types";
import { PARAM_DATA_TYPES, IS_REQUIRED_OPTIONS, STATUS_OPTIONS } from "../constants";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

export interface RequestParamFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: RequestParamRecord | null;
  readonly onSuccess?: () => void;
}

interface RowItem {
  id: string;
  paramName: string;
  paramType: string;
  isRequired: string;
  status: string;
}

export function RequestParamForm({ mode, initialData, onSuccess }: RequestParamFormProps) {
  const createMutation = useCreateRequestParamMutation();
  const updateMutation = useUpdateRequestParamMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const [rows, setRows] = useState<RowItem[]>(() => {
    if (mode === "edit" && initialData) {
      return [
        {
          id: initialData.id,
          paramName: initialData.paramName,
          paramType: initialData.paramType,
          isRequired: initialData.isRequired,
          status: initialData.status,
        },
      ];
    }
    return [
      {
        id: "new-1",
        paramName: "",
        paramType: "String",
        isRequired: "true",
        status: "active",
      },
    ];
  });

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        paramName: "",
        paramType: "String",
        isRequired: "true",
        status: "active",
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length === 1) return;
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRowChange = (index: number, field: keyof RowItem, val: string) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    for (const r of rows) {
      if (!r.paramName.trim()) {
        toast.error("Please provide parameter name for each row.");
        return;
      }
    }

    if (mode === "edit" && initialData?.id) {
      const single = rows[0];
      await updateMutation.mutateAsync({
        id: initialData.id,
        paramName: single.paramName,
        paramType: single.paramType,
        isRequired: single.isRequired,
        status: single.status,
      });
    } else {
      const payload: CreateRequestParamPayload[] = rows.map((r) => ({
        paramName: r.paramName,
        paramType: r.paramType,
        isRequired: r.isRequired,
        status: r.status,
      }));
      await createMutation.mutateAsync({ items: payload });
    }
    onSuccess?.();
  };

  let submitButtonLabel = "Save Changes";
  if (isPending) {
    submitButtonLabel = "Saving...";
  } else if (mode === "create") {
    submitButtonLabel = "Save Parameter(s)";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
        {rows.map((row, idx) => {
          const selectedType = PARAM_DATA_TYPES.find((o) => o.value === row.paramType);
          const selectedReq = IS_REQUIRED_OPTIONS.find((o) => o.value === row.isRequired);
          const selectedStatus = STATUS_OPTIONS.find((o) => o.value === row.status);
          const statusDisplayLabel = selectedStatus?.label ?? (row.status === "active" ? "Active" : "Inactive");
          const requiredDisplayLabel = selectedReq?.label ?? (row.isRequired === "true" ? "Yes (Required)" : "No (Optional)");

          return (
            <div
              key={row.id}
              className="p-3.5 rounded-xl border border-border bg-card/60 space-y-3 relative transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Parameter #{idx + 1}
                </span>
                {mode === "create" && rows.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => handleRemoveRow(idx)}
                    className="text-destructive hover:bg-destructive/10 h-7 w-7"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Parameter Name *</Label>
                  <Input
                    value={row.paramName}
                    onChange={(e) => handleRowChange(idx, "paramName", e.target.value)}
                    placeholder="e.g. amount, transaction_id..."
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Data Type *</Label>
                  <Select
                    value={row.paramType}
                    onValueChange={(val) => handleRowChange(idx, "paramType", val ?? "String")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Type">
                        {selectedType ? selectedType.label : row.paramType}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {PARAM_DATA_TYPES.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Is Required? *</Label>
                  <Select
                    value={row.isRequired}
                    onValueChange={(val) => handleRowChange(idx, "isRequired", val ?? "true")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Required?">
                        {requiredDisplayLabel}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {IS_REQUIRED_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Status *</Label>
                  <Select
                    value={row.status}
                    onValueChange={(val) => handleRowChange(idx, "status", val ?? "active")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status">
                        {statusDisplayLabel}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {mode === "create" && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddRow}
          className="w-full flex items-center justify-center gap-2 border-dashed border-primary/40 text-primary hover:bg-primary/5"
        >
          <Plus className="w-4 h-4" />
          Add Another Parameter
        </Button>
      )}

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isPending} className="flex items-center gap-2 shadow-sm font-semibold">
          <Save className="w-4 h-4" />
          {submitButtonLabel}
        </Button>
      </div>
    </form>
  );
}
