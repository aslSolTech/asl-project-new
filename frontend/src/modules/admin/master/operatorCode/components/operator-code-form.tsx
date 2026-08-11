"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { operatorCodeSchema, OperatorCodeFormInput } from "../validations";
import { operatorCodeFieldsConfig } from "../constants";
import { useCreateOperatorCodeMutation, useUpdateOperatorCodeMutation } from "../hooks";
import { OperatorCodeRecord } from "../types";
import { Save } from "lucide-react";

export interface OperatorCodeFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: OperatorCodeRecord | null;
  readonly onSuccess?: () => void;
}

export function OperatorCodeForm({ mode, initialData, onSuccess }: OperatorCodeFormProps) {
  const createMutation = useCreateOperatorCodeMutation();
  const updateMutation = useUpdateOperatorCodeMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      provider: initialData?.provider ?? "",
      operator: initialData?.operator ?? "",
      code: initialData?.code ?? "",
      providerCode: initialData?.providerCode ?? "",
    } as OperatorCodeFormInput,
    onSubmit: async ({ value }) => {
      const parsed = operatorCodeSchema.safeParse(value);
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
          {operatorCodeFieldsConfig.map((field) => (
            <div key={field.key}>
              <form.AppField
                name={field.key}
                validators={{
                  onChange: ({ value }) => {
                    const shape = operatorCodeSchema.shape[field.key as keyof typeof operatorCodeSchema.shape];
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
