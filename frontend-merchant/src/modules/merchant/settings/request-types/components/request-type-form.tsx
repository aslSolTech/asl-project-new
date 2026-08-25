"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateRequestTypeMutation, useUpdateRequestTypeMutation } from "../hooks";
import { RequestTypeRecord, CreateRequestTypePayload } from "../types";
import { HTTP_METHOD_OPTIONS, STATUS_OPTIONS } from "../constants";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

export interface RequestTypeFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: RequestTypeRecord | null;
  readonly onSuccess?: () => void;
}

interface RowItem {
  id: string;
  typeName: string;
  requestCode: string;
  httpMethod: string;
  status: string;
}

export function RequestTypeForm({ mode, initialData, onSuccess }: RequestTypeFormProps) {
  const createMutation = useCreateRequestTypeMutation();
  const updateMutation = useUpdateRequestTypeMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const [rows, setRows] = useState<RowItem[]>(() => {
    if (mode === "edit" && initialData) {
      return [
        {
          id: initialData.id,
          typeName: initialData.typeName,
          requestCode: initialData.requestCode,
          httpMethod: initialData.httpMethod,
          status: initialData.status,
        },
      ];
    }
    return [
      {
        id: "new-1",
        typeName: "",
        requestCode: "",
        httpMethod: "POST",
        status: "active",
      },
    ];
  });

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        typeName: "",
        requestCode: "",
        httpMethod: "POST",
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
      if (!r.typeName.trim() || !r.requestCode.trim()) {
        toast.error("Please fill all required fields for each item.");
        return;
      }
    }

    if (mode === "edit" && initialData?.id) {
      const single = rows[0];
      await updateMutation.mutateAsync({
        id: initialData.id,
        typeName: single.typeName,
        requestCode: single.requestCode,
        httpMethod: single.httpMethod,
        status: single.status,
      });
    } else {
      const payload: CreateRequestTypePayload[] = rows.map((r) => ({
        typeName: r.typeName,
        requestCode: r.requestCode,
        httpMethod: r.httpMethod,
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
    submitButtonLabel = "Save Request Type(s)";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
        {rows.map((row, idx) => {
          const selectedMethod = HTTP_METHOD_OPTIONS.find((o) => o.value === row.httpMethod);
          const selectedStatus = STATUS_OPTIONS.find((o) => o.value === row.status);
          const statusDisplayLabel = selectedStatus?.label ?? (row.status === "active" ? "Active" : "Inactive");

          return (
            <div
              key={row.id}
              className="p-3.5 rounded-xl border border-border bg-card/60 space-y-3 relative transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Request Type #{idx + 1}
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
                  <Label className="text-xs font-medium">Type Name *</Label>
                  <Input
                    value={row.typeName}
                    onChange={(e) => handleRowChange(idx, "typeName", e.target.value)}
                    placeholder="e.g. Recharge, Bill Payment..."
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Request Code *</Label>
                  <Input
                    value={row.requestCode}
                    onChange={(e) => handleRowChange(idx, "requestCode", e.target.value.toUpperCase())}
                    placeholder="e.g. RECHARGE, BILLPAY..."
                    className="uppercase font-mono text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">HTTP Method *</Label>
                  <Select
                    value={row.httpMethod}
                    onValueChange={(val) => handleRowChange(idx, "httpMethod", val ?? "POST")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Method">
                        {selectedMethod ? selectedMethod.label : row.httpMethod}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {HTTP_METHOD_OPTIONS.map((opt) => (
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
          Add Another Request Type
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
