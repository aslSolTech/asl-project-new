"use client";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { balanceSchema, BalanceFormInput } from "../validations";
import { balanceFieldsConfig, DEFAULT_WALLET_TYPES } from "../constants";
import { useCreateBalanceMutation, useUpdateBalanceMutation, useWalletTypeListQuery } from "../hooks";
import { WalletTypeRecord, WalletBalanceFormProps } from "../types";
import { Save } from "lucide-react";

import { useMemo } from "react";



export function BalanceForm({ mode, initialData, onSuccess }: WalletBalanceFormProps) {
  const createMutation = useCreateBalanceMutation();
  const updateMutation = useUpdateBalanceMutation();
  const { data: typeListData } = useWalletTypeListQuery();
  
  const walletTypes = useMemo<WalletTypeRecord[]>(() => {
    if (typeListData && typeListData.length > 0) {
      return typeListData;
    }
    return DEFAULT_WALLET_TYPES;
  }, [typeListData]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      walletType: initialData?.walletType ?? "",
      balance: initialData?.balance,
      trxnDescription: initialData?.trxnDescription ?? "",
      trxnDate: initialData?.trxnDate ?? ""
    } as BalanceFormInput,
    onSubmit: async ({ value }) => {
      const parsed = balanceSchema.safeParse(value);
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

  const fieldsConfig = useMemo(() => {
    return balanceFieldsConfig.map((field) => {
      if (field.key === "walletType") {
        const dynamicOptions = walletTypes
          .filter((wt) => wt.status)
          .map((wt) => ({
            label: wt.name,
            value: wt.code,
          }));
        return {
          ...field,
          options: dynamicOptions,
        };
      }
      return field;
    });
  }, [walletTypes]);

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
          {fieldsConfig.map((field) => (
            <div key={field.key}>
              <form.AppField
                name={field.key}
                validators={{
                  onChange: ({ value }) => {
                    const shape = balanceSchema.shape[field.key as keyof typeof balanceSchema.shape];
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
                    placeholder={"placeholder" in field ? field.placeholder : undefined}
                    required={field.required}
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
