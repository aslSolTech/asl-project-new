"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { companySchema, CompanyFormInput } from "../validations";
import { companySetupFieldsConfig } from "../constants";
import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from "../hooks";
import { CompanyRecord } from "../types";
import { Save } from "lucide-react";

export interface CompanyFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: CompanyRecord | null;
  readonly onSuccess?: () => void;
}

export function CompanyForm({ mode, initialData, onSuccess }: CompanyFormProps) {
  const createMutation = useCreateCompanyMutation();
  const updateMutation = useUpdateCompanyMutation();

  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      companyName: initialData?.companyName ?? "",
      companyLogo: initialData?.companyLogo ?? null,
      companyEmail: initialData?.companyEmail ?? "",
      companyPhone: initialData?.companyPhone ?? "",
      website: initialData?.website ?? "",
      gstNumber: initialData?.gstNumber ?? "",
      address: initialData?.address ?? "",
    } as CompanyFormInput,
    onSubmit: async ({ value }) => {
      const parsed = companySchema.safeParse(value);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companySetupFieldsConfig.map((field) => (
            <div
              key={field.key}
              className={field.type === "textarea" || field.type === "file" ? "md:col-span-2" : undefined}>
              <form.AppField
                name={field.key}
                validators={{
                  onChange: ({ value }) => {
                    const shape = companySchema.shape[field.key as keyof typeof companySchema.shape];
                    if (!shape) return undefined;
                    const res = shape.safeParse(value);
                    if (!res.success) {
                      return res.error.issues[0]?.message;
                    }
                    return undefined;
                  },
                }}>
                {(fieldState) => (
                  <FormField
                    name={field.key}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    helperText={field.helperText}
                    value={fieldState.state.value ?? ""}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")} />
                )}
              </form.AppField>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <form.SubscribeButton
            icon={<Save className="w-5 h-5" />}
            label={mode === "create" ? "Create" : "Save Changes"}
            loadingLabel="Saving..."
            isLoading={isPending}
            disabled={isPending}
            className={isPending ? "cursor-not-allowed" : "cursor-pointer"} />
        </div>
      </form>
    </form.AppForm>
  );
}
