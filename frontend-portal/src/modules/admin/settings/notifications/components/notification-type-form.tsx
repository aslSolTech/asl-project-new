"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { notificationTypeSchema, NotificationTypeFormInput } from "../validations";
import {
  useCreateNotificationTypeMutation,
  useUpdateNotificationTypeMutation,
} from "../hooks";
import { NotificationTypeFormProps, NotificationTypeRecord } from "../types";
import { Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function NotificationTypeForm({ mode, initialData, onSuccess }: NotificationTypeFormProps) {
  const createMutation = useCreateNotificationTypeMutation();
  const updateMutation = useUpdateNotificationTypeMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      description: initialData?.description ?? "",
      badgeColor: initialData?.badgeColor ?? "default",
      status: initialData?.status ?? "Active",
    } as NotificationTypeFormInput,
    onSubmit: async ({ value }) => {
      const parsed = notificationTypeSchema.safeParse(value);
      if (!parsed.success) return;

      const payload: NotificationTypeRecord = {
        id: initialData?.id || `NTYPE-${Date.now()}`,
        name: parsed.data.name,
        slug: parsed.data.slug.toLowerCase().replace(/\s+/g, "_"),
        description: parsed.data.description,
        badgeColor: parsed.data.badgeColor || "default",
        status: parsed.data.status as "Active" | "Inactive",
        createdAt: initialData?.createdAt || new Date().toISOString(),
      };

      const finalPayload = mode === "edit" && initialData ? { ...initialData, ...payload } : payload;

      if (mode === "create") {
        await createMutation.mutateAsync(finalPayload);
      } else if (mode === "edit" && initialData?.id) {
        await updateMutation.mutateAsync(finalPayload);
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
        <div className="space-y-4">
          {/* Row 1: Name & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <form.AppField
                name="name"
                validators={{
                  onChange: ({ value }) => (value && value.trim().length > 0 ? undefined : "Type Name is required"),
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="name"
                    label="TYPE NAME *"
                    type="text"
                    placeholder="e.g. Promotional Offer, System Alert"
                    required
                    value={fieldState.state.value ?? ""}
                    onChange={(val) => {
                      const str = String(val);
                      fieldState.handleChange(str as Parameters<typeof fieldState.handleChange>[0]);
                      // Auto-fill slug in create mode
                      if (mode === "create") {
                        form.setFieldValue("slug" as never, str.toLowerCase().replace(/[^a-z0-9]+/g, "_") as never);
                      }
                    }}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>

            <div className="col-span-1">
              <form.AppField
                name="slug"
                validators={{
                  onChange: ({ value }) => (value && value.trim().length > 0 ? undefined : "Slug / Code is required"),
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="slug"
                    label="SLUG / CODE *"
                    type="text"
                    placeholder="e.g. promotional, system_alert"
                    required
                    value={fieldState.state.value ?? ""}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Unique identifier key"
                  />
                )}
              </form.AppField>
            </div>
          </div>

          {/* Row 2: Badge Style & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <form.AppField name="badgeColor">
                {(fieldState) => (
                  <FormField
                    name="badgeColor"
                    label="BADGE STYLE / COLOR"
                    type="select"
                    placeholder="Select badge style"
                    options={[
                      { label: "Primary (Blue / Dark)", value: "default" },
                      { label: "Destructive (Red Alert)", value: "destructive" },
                      { label: "Secondary (Gray Neutral)", value: "secondary" },
                      { label: "Outline (Clean Border)", value: "outline" },
                    ]}
                    value={fieldState.state.value ?? "default"}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>

            <div className="col-span-1">
              <form.AppField name="status">
                {(fieldState) => (
                  <FormField
                    name="status"
                    label="STATUS"
                    type="select"
                    placeholder="Select status"
                    required
                    options={[
                      { label: "Active", value: "Active" },
                      { label: "Inactive", value: "Inactive" },
                    ]}
                    value={fieldState.state.value ?? "Active"}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>
          </div>

          {/* Row 3: Description */}
          <div className="space-y-1.5">
            <form.AppField name="description">
              {(fieldState) => (
                <div className="space-y-1.5">
                  <Label htmlFor="type-description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="type-description"
                    rows={3}
                    placeholder="Describe purpose of this notification type category..."
                    value={fieldState.state.value ?? ""}
                    onChange={(e) => fieldState.handleChange(e.target.value as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    className="w-full bg-background text-sm"
                  />
                </div>
              )}
            </form.AppField>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border bg-background">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Create Notification Type" : "Save Changes"}
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
