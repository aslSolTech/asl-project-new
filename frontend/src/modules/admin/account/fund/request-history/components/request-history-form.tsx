"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { requestHistorySchema, RequestHistoryFormInput } from "../validations";
import { requestHistoryFieldsConfig } from "../constants";
import { useCreateRequestHistoryMutation, useUpdateRequestHistoryMutation } from "../hooks";
import { RequestHistoryRecord } from "../types";
import { Save } from "lucide-react";

export interface RequestHistoryFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: RequestHistoryRecord | null;
  readonly onSuccess?: () => void;
}

export function RequestHistoryForm({ mode, initialData, onSuccess }: RequestHistoryFormProps) {
  const createMutation = useCreateRequestHistoryMutation();
  const updateMutation = useUpdateRequestHistoryMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      requestId: initialData?.requestId ?? "",
      amount: initialData?.amount ?? "",
      status: initialData?.status ?? "",
    } as RequestHistoryFormInput,
    onSubmit: async ({ value }) => {
      const parsed = requestHistorySchema.safeParse(value);
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
          {requestHistoryFieldsConfig.map((field) => (
            <div key={field.key}>
              <form.AppField
                name={field.key}
                validators={{
                  onChange: ({ value }) => {
                    const shape = requestHistorySchema.shape[field.key as keyof typeof requestHistorySchema.shape];
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
