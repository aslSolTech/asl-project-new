"use client";

import { useMemo, useState, useRef } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { notificationSchema, NotificationFormInput } from "../validations";
import { defaultNotificationTypes, fallbackUserTypes } from "../constants";
import {
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useNotificationTypeListQuery,
} from "../hooks";
import { useUserTypeListQuery } from "@/modules/admin/settings/user-type/hooks";
import { NotificationFormProps, NotificationRecord } from "../types";
import {
  Save,
  UploadCloud,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function NotificationForm({ mode, initialData, onSuccess }: NotificationFormProps) {
  const createMutation = useCreateNotificationMutation();
  const updateMutation = useUpdateNotificationMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // Dynamic user types from settings master
  const { data: userTypesData = [] } = useUserTypeListQuery();
  const userTypeOptions = useMemo(() => {
    if (userTypesData && userTypesData.length > 0) {
      return [
        { label: "All User Roles", value: "all" },
        ...userTypesData.map((u) => ({
          label: u.name,
          value: u.slug || u.id,
        })),
      ];
    }
    return fallbackUserTypes.map((u) => ({
      label: u.name,
      value: u.id,
    }));
  }, [userTypesData]);

  // Dynamic notification types
  const { data: notificationTypesData = [] } = useNotificationTypeListQuery();
  const notificationTypeOptions = useMemo(() => {
    if (notificationTypesData && notificationTypesData.length > 0) {
      return notificationTypesData.map((t) => ({
        label: t.name,
        value: t.id,
      }));
    }
    return defaultNotificationTypes.map((t) => ({
      label: t.name,
      value: t.id,
    }));
  }, [notificationTypesData]);

  // Image Upload state
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        form.setFieldValue("imageUrl" as never, result as never);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setFieldValue("imageUrl" as never, "" as never);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const form = useAppForm({
    defaultValues: {
      userTypeId: initialData?.userTypeId ?? userTypeOptions[0]?.value ?? "all",
      notificationTypeId: initialData?.notificationTypeId ?? notificationTypeOptions[0]?.value ?? "NTYPE-01",
      title: initialData?.title ?? "",
      description: initialData?.description ?? initialData?.message ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      status: initialData?.status ?? "Active",
    } as NotificationFormInput,
    onSubmit: async ({ value }) => {
      const parsed = notificationSchema.safeParse(value);
      if (!parsed.success) return;

      const userTypeObj = userTypeOptions.find((u) => u.value === parsed.data.userTypeId);
      const notificationTypeObj = notificationTypeOptions.find((t) => t.value === parsed.data.notificationTypeId);

      const payload: NotificationRecord = {
        id: initialData?.id || `NOTIF-${Date.now()}`,
        title: parsed.data.title,
        description: parsed.data.description,
        userTypeId: parsed.data.userTypeId,
        userTypeName: userTypeObj?.label || "All User Roles",
        notificationTypeId: parsed.data.notificationTypeId,
        notificationTypeName: notificationTypeObj?.label || "System Alert",
        imageUrl: imagePreview || parsed.data.imageUrl || undefined,
        status: parsed.data.status as "Active" | "Inactive",
        createdAt: initialData?.createdAt || new Date().toISOString(),
        message: parsed.data.description,
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
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Section 1: User Type & Notification Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-card border border-border/80 shadow-xs">
            {/* User Type Select */}
            <div className="col-span-1">
              <form.AppField
                name="userTypeId"
                validators={{
                  onChange: ({ value }) => (value ? undefined : "User Type is required"),
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="userTypeId"
                    label="USER TYPE *"
                    type="select"
                    placeholder="Select Target User Type"
                    required
                    options={userTypeOptions}
                    value={fieldState.state.value ?? userTypeOptions[0]?.value}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Populated from Settings > User Type"
                  />
                )}
              </form.AppField>
            </div>

            {/* Notification Type Select */}
            <div className="col-span-1">
              <form.AppField
                name="notificationTypeId"
                validators={{
                  onChange: ({ value }) => (value ? undefined : "Notification Type is required"),
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="notificationTypeId"
                    label="NOTIFICATION TYPE *"
                    type="select"
                    placeholder="Select Notification Type"
                    required
                    options={notificationTypeOptions}
                    value={fieldState.state.value ?? notificationTypeOptions[0]?.value}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Populated from Notification Types Tab"
                  />
                )}
              </form.AppField>
            </div>
          </div>

          {/* Section 2: Title & Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-card border border-border/80 shadow-xs">
            <div className="md:col-span-2">
              <form.AppField
                name="title"
                validators={{
                  onChange: ({ value }) => (value && value.trim().length > 0 ? undefined : "Title is required"),
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="title"
                    label="TITLE *"
                    type="text"
                    placeholder="e.g. Diwali Cashback Incentive 2026"
                    required
                    value={fieldState.state.value ?? ""}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Main announcement headline"
                  />
                )}
              </form.AppField>
            </div>

            <div className="md:col-span-1">
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

          {/* Section 3: Description Textarea */}
          <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs space-y-2">
            <form.AppField
              name="description"
              validators={{
                onChange: ({ value }) => (value && value.trim().length > 0 ? undefined : "Description is required"),
              }}
            >
              {(fieldState) => (
                <div className="space-y-1.5">
                  <Label htmlFor="notification-description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                    <span>DESCRIPTION *</span>
                    <span className="text-[11px] font-normal text-muted-foreground">Detailed notification content</span>
                  </Label>
                  <Textarea
                    id="notification-description"
                    rows={4}
                    placeholder="Write detailed notification message for selected user types..."
                    value={fieldState.state.value ?? ""}
                    onChange={(e) => fieldState.handleChange(e.target.value as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    className="w-full resize-y bg-background text-sm"
                  />
                  {fieldState.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-medium">
                      {fieldState.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.AppField>
          </div>

          {/* Section 4: Image / Avatar File Upload */}
          <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-primary" />
              UPLOAD IMAGE / BANNER (Optional)
            </Label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Image Preview Box */}
              <div className="w-24 h-24 rounded-2xl bg-muted/60 border-2 border-dashed border-border flex items-center justify-center overflow-hidden shrink-0 relative group">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Notification banner preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        onClick={handleRemoveImage}
                        className="h-7 w-7 rounded-full"
                        title="Remove Image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground text-center p-2">
                    <UploadCloud className="w-6 h-6 mb-1 text-primary/60" />
                    <span className="text-[10px] font-medium">No Image</span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 space-y-2 w-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                  onChange={handleImageFileChange}
                  className="hidden"
                  id="notification-image-file-input"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-4 h-4" />
                    {imagePreview ? "Change Image" : "Select Image File"}
                  </Button>
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="text-xs text-destructive hover:bg-destructive/10 flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Supports PNG, JPG, WebP, SVG (Recommended: 800x400px or square 1:1 avatar icon)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border bg-background">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Broadcast Notification" : "Save Changes"}
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
