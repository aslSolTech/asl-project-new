"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { employeeRegisterSchema, EmployeeRegisterFormInput } from "../validations";
import { employeeRegisterFieldsConfig } from "../constants";
import { useCreateEmployeeRegisterMutation, useUpdateEmployeeRegisterMutation } from "../hooks";
import { EmployeeRegisterRecord } from "../types";
import { Save } from "lucide-react";

export interface EmployeeRegisterFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: EmployeeRegisterRecord | null;
  readonly onSuccess?: () => void;
}

export function EmployeeRegisterForm({ mode, initialData, onSuccess }: EmployeeRegisterFormProps) {
  const createMutation = useCreateEmployeeRegisterMutation();
  const updateMutation = useUpdateEmployeeRegisterMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      firstName: initialData?.firstName ?? "",
      lastName: initialData?.lastName ?? "",
      mobile: initialData?.mobile ?? "",
      email: initialData?.email ?? "",
      address: initialData?.address ?? "",
      isOtpVerify: initialData?.isOtpVerify ?? "N",
      status: initialData?.status ?? "Y",
    } as EmployeeRegisterFormInput,
    onSubmit: async ({ value }) => {
      const parsed = employeeRegisterSchema.safeParse(value);
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
        className="space-y-6"
      >
        <div className="space-y-4 max-h-[64vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-y-4 items-start">
            {employeeRegisterFieldsConfig.map((field) => (
              <div
                key={field.key}
                className={field.colSpan === 2 ? "col-span-1 md:col-span-2" : "col-span-1"}
              >
                <form.AppField
                  name={field.key}
                  validators={{
                    onChange: ({ value }) => {
                      const shape =
                        employeeRegisterSchema.shape[
                          field.key as keyof typeof employeeRegisterSchema.shape
                        ];
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
                      textTransform={field.textTransform}
                      options={field.options}
                      value={fieldState.state.value ?? ""}
                      onChange={(val) =>
                        fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])
                      }
                      onBlur={fieldState.handleBlur}
                      error={fieldState.state.meta.errors.join(", ")}
                    />
                  )}
                </form.AppField>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border bg-background">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Register Employee" : "Save Changes"}
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
