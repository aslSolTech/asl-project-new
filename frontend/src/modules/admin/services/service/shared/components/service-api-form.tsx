"use client";

import { useMemo } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField, FieldOption } from "@/components/form_builder/fields/FormFields";
import { serviceApiSchema, ServiceApiFormInput } from "../validations";
import { serviceApiFieldsConfig } from "../constants";
import { useApiTypeListQuery } from "@/modules/admin/settings/api-type/hooks";
import { useUserTypeListQuery } from "@/modules/admin/settings/user-type/hooks";
import { DEFAULT_USER_TYPES } from "@/modules/admin/settings/user-type/constants";
import { ServiceApiRecord } from "../types";
import { Save } from "lucide-react";

export interface ServiceApiFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: ServiceApiRecord | null;
  readonly defaultApiType?: string;
  readonly providerLabel?: string;
  readonly providerPlaceholder?: string;
  readonly onSubmit: (payload: ServiceApiFormInput & { id?: string; userTypes?: string[]; createdAt?: string; updatedAt?: string }) => Promise<void> | void;
  readonly isPending?: boolean;
  readonly onSuccess?: () => void;
}

export function ServiceApiSharedForm({
  mode,
  initialData,
  defaultApiType = "Payout",
  providerLabel,
  providerPlaceholder,
  onSubmit,
  isPending = false,
  onSuccess,
}: ServiceApiFormProps) {
  const { data: apiTypesData } = useApiTypeListQuery();
  const { data: userTypesData } = useUserTypeListQuery();

  const userTypeOptions: readonly FieldOption[] = useMemo(() => {
    const list = userTypesData && userTypesData.length > 0 ? userTypesData : DEFAULT_USER_TYPES;
    return list.map((item) => ({
      label: item.name,
      value: item.id || item.slug,
    }));
  }, [userTypesData]);

  const apiTypeOptions: readonly FieldOption[] = useMemo(() => {
    if (apiTypesData && apiTypesData.length > 0) {
      return apiTypesData.map((item) => ({
        label: item.apiType,
        value: item.apiType,
      }));
    }
    return [
      { label: "Payout", value: "Payout" },
      { label: "Verification", value: "Verification" },
      { label: "Bank Account Verify", value: "Bank Account Verify" },
      { label: "UPI Verify", value: "UPI Verify" },
      { label: "DMT (Money Transfer)", value: "DMT (Money Transfer)" },
      { label: "Recharge", value: "Recharge" },
      { label: "Bill Payment", value: "Bill Payment" },
      { label: "AEPS", value: "AEPS" },
    ];
  }, [apiTypesData]);

  const form = useAppForm({
    defaultValues: {
      providerName: initialData?.providerName ?? initialData?.service ?? initialData?.bank ?? "",
      apiName: initialData?.apiName ?? initialData?.api ?? "",
      apiType: initialData?.apiType ?? defaultApiType,
      apiKey: initialData?.apiKey ? Number(initialData.apiKey) : ("" as unknown as number),
      userTypeIds: initialData?.userTypeIds ?? initialData?.userTypes ?? [],
      status: (initialData?.status === "inactive" ? "inactive" : "active") as "active" | "inactive",
    } as ServiceApiFormInput,
    onSubmit: async ({ value }) => {
      const parsed = serviceApiSchema.safeParse(value);
      if (!parsed.success) return;

      const now = new Date().toISOString();
      const resolvedUserTypeNames = parsed.data.userTypeIds.map((idOrSlug) => {
        const found = userTypeOptions.find((opt) => String(opt.value) === String(idOrSlug));
        return found ? found.label : idOrSlug;
      });

      await onSubmit({
        ...parsed.data,
        id: initialData?.id,
        userTypes: resolvedUserTypeNames,
        createdAt: mode === "create" ? now : initialData?.createdAt,
        updatedAt: now,
      });

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
          {serviceApiFieldsConfig.map((field) => {
            let dynamicOptions: readonly FieldOption[] | undefined;
            if (field.key === "apiType") {
              dynamicOptions = apiTypeOptions;
            } else if (field.key === "userTypeIds") {
              dynamicOptions = userTypeOptions;
            } else if ("options" in field) {
              dynamicOptions = field.options;
            }


            const customLabel =
              field.key === "providerName" && providerLabel
                ? providerLabel
                : field.label;

            const customPlaceholder =
              field.key === "providerName" && providerPlaceholder
                ? providerPlaceholder
                : field.placeholder;

            return (
              <div key={field.key}>
                <form.AppField
                  name={field.key}
                  validators={{
                    onChange: ({ value }) => {
                      const shape = serviceApiSchema.shape[field.key as keyof typeof serviceApiSchema.shape];
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
                      label={customLabel}
                      type={field.type}
                      placeholder={customPlaceholder}
                      required={field.required}
                      options={dynamicOptions}
                      value={fieldState.state.value ?? ""}
                      onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
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
            label={mode === "create" ? "Save API Configuration" : "Save Changes"}
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
