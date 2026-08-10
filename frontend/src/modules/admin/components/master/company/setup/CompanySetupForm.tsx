"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { companySetupSchema, CompanySetupInput } from "./schema";
import { companySetupFieldsConfig } from "@/modules/admin/constants";
import { useCompanySetupMutation } from "./useCompanySetupMutation";
import { Building2, Save } from "lucide-react";

export interface CompanySetupFormProps {
  readonly initialData?: Partial<CompanySetupInput>;
}

export function CompanySetupForm({ initialData }: CompanySetupFormProps) {
  const companyMutation = useCompanySetupMutation();

  const form = useAppForm({
    defaultValues: {
      companyName: initialData?.companyName ?? "",
      companyLogo: initialData?.companyLogo ?? null,
      companyEmail: initialData?.companyEmail ?? "",
      companyPhone: initialData?.companyPhone ?? "",
      website: initialData?.website ?? "",
      gstNumber: initialData?.gstNumber ?? "",
      address: initialData?.address ?? "",
    } as CompanySetupInput,
    onSubmit: async ({ value }) => {
      const parsed = companySetupSchema.safeParse(value);
      if (parsed.success) {
        await companyMutation.mutateAsync(parsed.data);
      }
    },
  });

  return (
    <div className="w-full max-wxl p-6 sm:p-8 bg-card border border-border rounded-2xl shadow-xl space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Company Setup</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Configure master details and business profile for your organization
          </p>
        </div>
      </div>

      <form.AppForm>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {companySetupFieldsConfig.map((field) => (
              <div
                key={field.key}
                className={field.type === "textarea" || field.type === "file" ? "md:col-span-2" : undefined}
              >
                <form.AppField
                  name={field.key}
                  validators={{
                    onChange: ({ value }) => {
                      const shape = companySetupSchema.shape[field.key];
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
                      helperText={field.helperText}
                      value={fieldState.state.value}
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
              icon={<Save className="w-4 h-4 ml-1.5" />}
              label="Save Company Setup"
              loadingLabel="Saving..."
              isLoading={companyMutation.isPending}
              disabled={companyMutation.isPending}
              className="px-6 py-2.5 font-semibold"
            />
          </div>
        </form>
      </form.AppForm>
    </div>
  );
}
