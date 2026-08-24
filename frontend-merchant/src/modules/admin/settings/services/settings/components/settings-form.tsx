"use client";

import { useMemo } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { settingsSchema, SettingsFormInput } from "../validations";
import { SERVICE_STATUS_OPTIONS } from "../constants";
import { useCreateSettingsMutation, useUpdateSettingsMutation } from "../hooks";
import { SettingsRecord } from "../types";
import { useCategoriesListQuery } from "@/modules/admin/settings/services/categories/hooks";
import { INITIAL_SERVICE_CATEGORIES } from "@/modules/admin/settings/services/categories/constants";
import { Save } from "lucide-react";

export interface SettingsFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: SettingsRecord | null;
  readonly onSuccess?: () => void;
}

export function SettingsForm({ mode, initialData, onSuccess }: SettingsFormProps) {
  const createMutation = useCreateSettingsMutation();
  const updateMutation = useUpdateSettingsMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // Dynamically load Service Categories / Types from the categories query
  const { data: categoriesList = [] } = useCategoriesListQuery();

  const serviceCategoryOptions = useMemo(() => {
    const activeList = categoriesList.length > 0 ? categoriesList : INITIAL_SERVICE_CATEGORIES;
    return activeList.map((cat) => ({
      label: cat.categoryName,
      value: cat.categoryName,
    }));
  }, [categoriesList]);

  const form = useAppForm({
    defaultValues: {
      serviceIcon: initialData?.serviceIcon ?? "",
      serviceType: initialData?.serviceType ?? "",
      serviceName: initialData?.serviceName ?? "",
      shortDesc: initialData?.shortDesc ?? "",
      linkPage: initialData?.linkPage ?? "",
      serviceOrder: initialData?.serviceOrder ?? "",
      status: initialData?.status ?? "active",
    } as SettingsFormInput,
    onSubmit: async ({ value }) => {
      const parsed = settingsSchema.safeParse(value);
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
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Top Section: Avatar / Service Icon on Left + Service Type & Service Name on Right */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 rounded-xl bg-muted/30 border border-border/60">
            <div className="shrink-0 flex flex-col items-center">
              <form.AppField name="serviceIcon">
                {(fieldState) => (
                  <FormField
                    name="serviceIcon"
                    label="Service Icon"
                    type="file"
                    value={fieldState.state.value}
                    onChange={(val) =>
                      fieldState.handleChange(
                        val as Parameters<typeof fieldState.handleChange>[0]
                      )
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>

            <div className="grid grid-cols-1 gap-3.5 w-full">
              {/* SERVICE TYPE */}
              <form.AppField
                name="serviceType"
                validators={{
                  onChange: ({ value }) => {
                    const res = settingsSchema.shape.serviceType.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="serviceType"
                    label="Service Type"
                    type="select"
                    placeholder="Select Service Type / Category"
                    required
                    options={serviceCategoryOptions}
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(
                        val as Parameters<typeof fieldState.handleChange>[0]
                      )
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>

              {/* SERVICE NAME */}
              <form.AppField
                name="serviceName"
                validators={{
                  onChange: ({ value }) => {
                    const res = settingsSchema.shape.serviceName.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="serviceName"
                    label="Service Name"
                    type="text"
                    placeholder="e.g. Mobile Recharge, AePS Withdrawal"
                    required
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(
                        val as Parameters<typeof fieldState.handleChange>[0]
                      )
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>
          </div>

          {/* Additional Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SHORT DESC */}
            <div className="col-span-1 md:col-span-2">
              <form.AppField
                name="shortDesc"
                validators={{
                  onChange: ({ value }) => {
                    const res = settingsSchema.shape.shortDesc.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="shortDesc"
                    label="Short Description"
                    type="text"
                    placeholder="Brief description of the service..."
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(
                        val as Parameters<typeof fieldState.handleChange>[0]
                      )
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>

            {/* LINK PAGE */}
            <div className="col-span-1">
              <form.AppField
                name="linkPage"
                validators={{
                  onChange: ({ value }) => {
                    const res = settingsSchema.shape.linkPage.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="linkPage"
                    label="Link Page"
                    type="text"
                    placeholder="e.g. /services/recharge or https://..."
                    required
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(
                        val as Parameters<typeof fieldState.handleChange>[0]
                      )
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>

            {/* SERVICE ORDER */}
            <div className="col-span-1">
              <form.AppField
                name="serviceOrder"
                validators={{
                  onChange: ({ value }) => {
                    const res = settingsSchema.shape.serviceOrder.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="serviceOrder"
                    label="Service Order"
                    type="text"
                    placeholder="e.g. 1, 2, 3..."
                    required
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(
                        val as Parameters<typeof fieldState.handleChange>[0]
                      )
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>

            {/* STATUS */}
            <div className="col-span-1 md:col-span-2">
              <form.AppField
                name="status"
                validators={{
                  onChange: ({ value }) => {
                    const res = settingsSchema.shape.status.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="status"
                    label="Status"
                    type="select"
                    placeholder="Select status"
                    required
                    options={SERVICE_STATUS_OPTIONS}
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(
                        val as Parameters<typeof fieldState.handleChange>[0]
                      )
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border bg-background">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Save Service" : "Save Changes"}
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
