"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { apiTypeSchema, ApiTypeFormInput } from "../validations";
import { useCreateApiTypeMutation, useUpdateApiTypeMutation } from "../hooks";
import { ApiTypeRecord } from "../types";
import { useRequestParamListQuery } from "@/modules/admin/settings/request-types/hooks";
import { DEFAULT_REQUEST_PARAMS } from "@/modules/admin/settings/request-types/constants";
import { useResponseParamListQuery } from "@/modules/admin/settings/response-type/hooks";
import { DEFAULT_RESPONSE_PARAMS } from "@/modules/admin/settings/response-type/constants";
import { useWalletTypeListQuery } from "@/modules/admin/account/wallet-balance/hooks";
import { DEFAULT_WALLET_TYPES } from "@/modules/admin/account/wallet-balance/constants";
import { Save } from "lucide-react";
import { useMemo } from "react";

export interface ApiTypeFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: ApiTypeRecord | null;
  readonly onSuccess?: () => void;
}

export function ApiTypeForm({ mode, initialData, onSuccess }: Readonly<ApiTypeFormProps>) {
  const createMutation = useCreateApiTypeMutation();
  const updateMutation = useUpdateApiTypeMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // 1. Request Parameters options
  const { data: requestParamsData } = useRequestParamListQuery();
  const requestParamsList = useMemo(() => {
    if (requestParamsData && requestParamsData.length > 0) return requestParamsData;
    return DEFAULT_REQUEST_PARAMS;
  }, [requestParamsData]);

  // 2. Response Parameters options
  const { data: responseParamsData } = useResponseParamListQuery();
  const responseParamsList = useMemo(() => {
    if (responseParamsData && responseParamsData.length > 0) return responseParamsData;
    return DEFAULT_RESPONSE_PARAMS;
  }, [responseParamsData]);

  // 3. Wallet Type options
  const { data: walletTypesData } = useWalletTypeListQuery();
  const walletTypeOptions = useMemo(() => {
    const list = walletTypesData && walletTypesData.length > 0 ? walletTypesData : DEFAULT_WALLET_TYPES;
    return list.map((wt) => ({
      label: wt.name,
      value: wt.code,
    }));
  }, [walletTypesData]);

  const form = useAppForm({
    defaultValues: {
      apiType: initialData?.apiType ?? "",
      requestParams: initialData?.requestParams ?? [],
      responseParams: initialData?.responseParams ?? [],
      walletType: initialData?.walletType ?? "",
      isDisplayPdf: initialData?.isDisplayPdf ?? false,
    } as ApiTypeFormInput,
    onSubmit: async ({ value }) => {
      const parsed = apiTypeSchema.safeParse(value);
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
        {/* 1. API Type (Text) */}
        <form.AppField
          name="apiType"
          validators={{
            onChange: ({ value }) => {
              const res = apiTypeSchema.shape.apiType.safeParse(value);
              return res.success ? undefined : res.error.issues[0]?.message;
            },
          }}
        >
          {(fieldState) => (
            <FormField
              name="apiType"
              label="API Type"
              type="text"
              placeholder="e.g. Recharge, Bill Payment, DMT, AEPS..."
              required
              value={fieldState.state.value ?? ""}
              onChange={(val) => fieldState.handleChange(val as string)}
              onBlur={fieldState.handleBlur}
              error={fieldState.state.meta.errors.join(", ")}
            />
          )}
        </form.AppField>

        {/* 2. Wallet Type (Combobox / Searchable Select) */}
        <form.AppField
          name="walletType"
          validators={{
            onChange: ({ value }) => {
              const res = apiTypeSchema.shape.walletType.safeParse(value);
              return res.success ? undefined : res.error.issues[0]?.message;
            },
          }}
        >
          {(fieldState) => (
            <FormField
              name="walletType"
              label="Wallet Type"
              type="select"
              placeholder="Search or select Wallet Type..."
              required
              options={walletTypeOptions}
              value={fieldState.state.value ?? ""}
              onChange={(val) => fieldState.handleChange(val as string)}
              onBlur={fieldState.handleBlur}
              error={fieldState.state.meta.errors.join(", ")}
            />
          )}
        </form.AppField>

        {/* 3. Request Parameters (Combobox Multi-Select with Chips) */}
        <form.AppField name="requestParams">
          {(fieldState) => (
            <FormField
              name="requestParams"
              label="Request Parameters"
              type="combobox-multi"
              placeholder="Search and select request parameters..."
              options={requestParamsList.map((p) => ({
                label: `${p.paramName} (${p.slug})`,
                value: p.slug || p.id,
              }))}
              value={fieldState.state.value ?? []}
              onChange={(vals) => fieldState.handleChange(vals as string[])}
              onBlur={fieldState.handleBlur}
              error={fieldState.state.meta.errors.join(", ")}
            />
          )}
        </form.AppField>

        {/* 4. Response Parameters (Combobox Multi-Select with Chips) */}
        <form.AppField name="responseParams">
          {(fieldState) => (
            <FormField
              name="responseParams"
              label="Response Parameters"
              type="combobox-multi"
              placeholder="Search and select response parameters..."
              options={responseParamsList.map((p) => ({
                label: `${p.paramName} (${p.slug})`,
                value: p.slug || p.id,
              }))}
              value={fieldState.state.value ?? []}
              onChange={(vals) => fieldState.handleChange(vals as string[])}
              onBlur={fieldState.handleBlur}
              error={fieldState.state.meta.errors.join(", ")}
            />
          )}
        </form.AppField>

        {/* 5. IS DISPLAY PDF (Yes / No Select) */}
        <form.AppField name="isDisplayPdf">
          {(fieldState) => (
            <FormField
              name="isDisplayPdf"
              label="Is Display PDF"
              type="select"
              required
              options={[
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ]}
              value={fieldState.state.value ? "true" : "false"}
              onChange={(val) => fieldState.handleChange(val === "true")}
              onBlur={fieldState.handleBlur}
              error={fieldState.state.meta.errors.join(", ")}
            />
          )}
        </form.AppField>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <form.SubscribeButton
            icon={<Save className="w-5 h-5" />}
            label={mode === "create" ? "Save API Type" : "Save Changes"}
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
