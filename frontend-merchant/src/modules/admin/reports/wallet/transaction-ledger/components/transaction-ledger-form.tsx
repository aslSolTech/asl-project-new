"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { transactionLedgerSchema, TransactionLedgerFormInput } from "../validations";
import { transactionLedgerFieldsConfig } from "../constants";
import { useCreateTransactionLedgerMutation, useUpdateTransactionLedgerMutation } from "../hooks";
import { TransactionLedgerRecord } from "../types";
import { Save } from "lucide-react";

export interface TransactionLedgerFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: TransactionLedgerRecord | null;
  readonly onSuccess?: () => void;
}

export function TransactionLedgerForm({ mode, initialData, onSuccess }: TransactionLedgerFormProps) {
  const createMutation = useCreateTransactionLedgerMutation();
  const updateMutation = useUpdateTransactionLedgerMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      type: initialData?.type ?? "",
      balance: initialData?.balance ?? "",
    } as TransactionLedgerFormInput,
    onSubmit: async ({ value }) => {
      const parsed = transactionLedgerSchema.safeParse(value);
      if (!parsed.success) return;

      if (mode === "create") {
        await createMutation.mutateAsync(parsed.data);
      } else if (mode === "edit" && initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          ...parsed.data,
        });
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
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-4">
          {transactionLedgerFieldsConfig.map((field) => (
            <div key={field.key}>
              <form.AppField
                name={field.key}
                validators={{
                  onChange: ({ value }) => {
                    const shape = transactionLedgerSchema.shape[field.key as keyof typeof transactionLedgerSchema.shape];
                    if (!shape) return undefined;
                    const res = shape.safeParse(value);
                    if (!res.success) {
                      return res.error.issues[0]?.message;
                    }
                    return undefined;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name={field.key}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    textTransform={"textTransform" in field ? (field.textTransform as "uppercase" | "lowercase" | "capitalize") : undefined}
                    options={"options" in field ? field.options : undefined}
                    value={fieldState.state.value ?? ""}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <form.SubscribeButton
            icon={<Save className="w-5 h-5" />}
            label={mode === "create" ? "Save" : "Save Changes"}
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
