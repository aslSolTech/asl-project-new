"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateResponseParamMutation, useUpdateResponseParamMutation } from "../hooks";
import { ResponseParamRecord, CreateResponseParamPayload } from "../types";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

export interface ResponseParamFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: ResponseParamRecord | null;
  readonly onSuccess?: () => void;
}

interface RowItem {
  id: string;
  paramName: string;
  slug: string;
}

export function ResponseParamForm({ mode, initialData, onSuccess }: ResponseParamFormProps) {
  const createMutation = useCreateResponseParamMutation();
  const updateMutation = useUpdateResponseParamMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const [rows, setRows] = useState<RowItem[]>(() => {
    if (mode === "edit" && initialData) {
      return [
        {
          id: initialData.id,
          paramName: initialData.paramName,
          slug: initialData.slug ?? "",
        },
      ];
    }
    return [
      {
        id: "new-1",
        paramName: "",
        slug: "",
      },
    ];
  });

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        paramName: "",
        slug: "",
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
      if (!r.paramName.trim() || !r.slug.trim()) {
        toast.error("Please provide parameter name and slug for each row.");
        return;
      }
    }

    if (mode === "edit" && initialData?.id) {
      const single = rows[0];
      await updateMutation.mutateAsync({
        id: initialData.id,
        paramName: single.paramName,
        slug: single.slug,
      });
    } else {
      const payload: CreateResponseParamPayload[] = rows.map((r) => ({
        paramName: r.paramName,
        slug: r.slug,
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
        {rows.map((row, idx) => (
          <div
            key={row.id}
            className="p-3.5 rounded-xl border border-border bg-card/60 space-y-3 relative transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Response Parameter #{idx + 1}
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
                  placeholder="e.g. Status Code, Message, Txn ID..."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Slug *</Label>
                <Input
                  value={row.slug}
                  onChange={(e) => handleRowChange(idx, "slug", e.target.value.toLowerCase().replace(/\s+/g, "_"))}
                  placeholder="e.g. status_code, message, txn_id..."
                  className="font-mono text-xs"
                  required
                />
              </div>
            </div>
          </div>
        ))}
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
