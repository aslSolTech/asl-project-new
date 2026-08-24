"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { serviceControlSchema, ServiceControlFormInput } from "../validations";
import { PAYMENT_GATEWAY_OPTIONS } from "../constants";
import { useCreateServiceControlMutation, useUpdateServiceControlMutation } from "../hooks";
import { ServiceControlRecord } from "../types";
import { Save } from "lucide-react";

export interface ServiceControlFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: ServiceControlRecord | null;
  readonly onSuccess?: () => void;
}

export function ServiceControlForm({ mode, initialData, onSuccess }: ServiceControlFormProps) {
  const createMutation = useCreateServiceControlMutation();
  const updateMutation = useUpdateServiceControlMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      serviceName: initialData?.serviceName ?? "",
      endpoint: initialData?.endpoint ?? "",
      status: initialData?.status ?? "1",
    } as ServiceControlFormInput,
    onSubmit: async ({ value }) => {
      const parsed = serviceControlSchema.safeParse(value);
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

  const isGateway = form.state.values.serviceName.trim().toUpperCase() === "PAYMENT GATEWAY" ||
    form.state.values.serviceName.trim().toUpperCase().includes("GATEWAY");

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
          {/* Service Name Input */}
          <form.AppField
            name="serviceName"
            validators={{
              onChange: ({ value }) => (!value ? "Service Name is required!" : undefined),
            }}
          >
            {(fieldState) => (
              <FormField
                name="serviceName"
                label="Service Name"
                type="text"
                placeholder="e.g. RECHARGE STATUS"
                required
                value={fieldState.state.value}
                onChange={(val) => fieldState.handleChange(String(val))}
                onBlur={fieldState.handleBlur}
                error={fieldState.state.meta.errors.join(", ")}
              />
            )}
          </form.AppField>

          {/* Dynamic API Endpoint */}
          <form.AppField name="endpoint">
            {(fieldState) => (
              <FormField
                name="endpoint"
                label="API Endpoint"
                type="text"
                placeholder="e.g. /api/service-control/recharge or https://..."
                value={fieldState.state.value ?? ""}
                onChange={(val) => fieldState.handleChange(String(val))}
                onBlur={fieldState.handleBlur}
                error={fieldState.state.meta.errors.join(", ")}
              />
            )}
          </form.AppField>

          {/* Status or Gateway Selection */}
          {isGateway ? (
            <form.AppField
              name="status"
              validators={{
                onChange: ({ value }) => (!value ? "Please select a payment gateway" : undefined),
              }}
            >
              {(fieldState) => (
                <FormField
                  name="status"
                  label="Payment Gateway"
                  type="select"
                  placeholder="Select Gateway Provider"
                  required
                  options={PAYMENT_GATEWAY_OPTIONS}
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(String(val))}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>
          ) : (
            <form.AppField name="status">
              {(fieldState) => {
                const isChecked = fieldState.state.value === "1" || fieldState.state.value === "active" || fieldState.state.value === "true";
                return (
                  <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-muted/40 border border-border/60">
                    <FormField
                      name="status"
                      label={`Service Status (${isChecked ? "Active / 1" : "Inactive / 0"})`}
                      type="switch"
                      value={isChecked}
                      onChange={(checked) => {
                        fieldState.handleChange(checked ? "1" : "0");
                      }}
                      onBlur={fieldState.handleBlur}
                      error={fieldState.state.meta.errors.join(", ")}
                    />
                    <span className="text-xs text-muted-foreground">
                      {isChecked
                        ? "Service is currently ENABLED (Value: 1)"
                        : "Service is currently DISABLED (Value: 0)"}
                    </span>
                  </div>
                );
              }}
            </form.AppField>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <form.SubscribeButton
            icon={<Save className="w-5 h-5" />}
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
