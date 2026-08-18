"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { userTypeSchema, UserTypeFormInput } from "../validations";
import { userTypeFieldsConfig } from "../constants";
import { useCreateUserTypeMutation, useUpdateUserTypeMutation } from "../hooks";
import { UserTypeRecord } from "../types";
import { Save } from "lucide-react";

export interface UserTypeFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: UserTypeRecord | null;
  readonly onSuccess?: () => void;
}

export function UserTypeForm({ mode, initialData, onSuccess }: UserTypeFormProps) {
  const createMutation = useCreateUserTypeMutation();
  const updateMutation = useUpdateUserTypeMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      status: initialData?.status ?? "active",
    } as UserTypeFormInput,
    onSubmit: async ({ value }) => {
      const parsed = userTypeSchema.safeParse(value);
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
          {userTypeFieldsConfig.map((field) => {
            const fieldOptions = "options" in field ? [...field.options] : undefined;
            return (
              <div key={field.key}>
                <form.AppField
                  name={field.key}
                  validators={{
                    onChange: ({ value }) => {
                      const shape = userTypeSchema.shape[field.key as keyof typeof userTypeSchema.shape];
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
                      options={fieldOptions}
                      value={fieldState.state.value ?? ""}
                      onChange={(val) => {
                        fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0]);
                        // Auto-fill slug if user is creating and editing name
                        if (mode === "create" && field.key === "name" && typeof val === "string") {
                          const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                          form.setFieldValue("slug" as never, generatedSlug as never);
                        }
                      }}
                      onBlur={fieldState.handleBlur}
                      error={fieldState.state.meta.errors.join(", ")}
                    />
                  )}
                </form.AppField>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <form.SubscribeButton
            icon={<Save className="w-5 h-5" />}
            label={mode === "create" ? "Save User Type" : "Save Changes"}
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
