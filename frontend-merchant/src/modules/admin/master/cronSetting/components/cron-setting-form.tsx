"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { cronSettingSchema, CronSettingFormInput } from "../validations";
import { cronSettingFieldsConfig } from "../constants";
import { useCreateCronSettingMutation, useUpdateCronSettingMutation } from "../hooks";
import { CronSettingRecord } from "../types";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CronSettingFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: CronSettingRecord | null;
  readonly onSuccess?: () => void;
}

export function CronSettingForm({ mode, initialData, onSuccess }: CronSettingFormProps) {
  const createMutation = useCreateCronSettingMutation();
  const updateMutation = useUpdateCronSettingMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      cronName: initialData?.cronName ?? "",
      schedule: initialData?.schedule ?? "",
      endpoint: initialData?.endpoint ?? "",
      description: initialData?.description ?? "",
      isActive: initialData?.isActive ?? true,
    } as CronSettingFormInput,
    onSubmit: async ({ value }) => {
      const parsed = cronSettingSchema.safeParse(value);
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
          {cronSettingFieldsConfig.map((field) => (
            <div
              key={field.key}
              className={cn(
                field.key === "description" || field.type === "textarea" ? "md:col-span-2" : "",
                field.type === "switch" ? "flex items-center h-full pt-6 md:pt-7" : ""
              )}
            >
              <form.AppField
                name={field.key}
                validators={{
                  onChange: ({ value }) => {
                    const shape = cronSettingSchema.shape[field.key as keyof typeof cronSettingSchema.shape];
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
