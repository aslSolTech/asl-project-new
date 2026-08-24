"use client";

import { useMemo, useState } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { amountSchema, AmountFormInput } from "../validations";
import { amountFieldsConfig } from "../constants";
import { useCreateAmountMutation, useUpdateAmountMutation } from "../hooks";
import { AmountRecord } from "../types";
import { useOperatorTypeListQuery } from "@/modules/admin/settings/operator-type/hooks";
import { useOperatorRegisterListQuery } from "@/modules/admin/master/operatorRegister/hooks";
import { useApiRegisterListQuery } from "@/modules/admin/master/apiRegister/hooks";
import { Save } from "lucide-react";

export interface AmountFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: AmountRecord | null;
  readonly onSuccess?: () => void;
}

export function AmountForm({ mode, initialData, onSuccess }: AmountFormProps) {
  const [showAllApis, setShowAllApis] = useState(false);
  const createMutation = useCreateAmountMutation();
  const updateMutation = useUpdateAmountMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // 1. Dynamic Data Queries with Fallbacks
  const { data: operatorTypesData } = useOperatorTypeListQuery();
  const { data: operatorListData } = useOperatorRegisterListQuery();
  const { data: apiListData } = useApiRegisterListQuery();

  const operatorTypes = useMemo(() => {
    if (operatorTypesData && operatorTypesData.length > 0) return operatorTypesData;
    return [
      { id: "mobile_prepaid", operatorType: "Mobile Prepaid", apiType: "Recharge", status: "active" },
      { id: "mobile_postpaid", operatorType: "Mobile Postpaid", apiType: "Recharge", status: "active" },
      { id: "dth", operatorType: "DTH", apiType: "Recharge", status: "active" },
      { id: "electricity", operatorType: "Electricity Bill", apiType: "Bill Payment", status: "active" },
      { id: "fastag", operatorType: "Fastag", apiType: "Fastag", status: "active" },
      { id: "payout", operatorType: "Bank Transfer / Payout", apiType: "Payout", status: "active" },
    ];
  }, [operatorTypesData]);

  const operatorList = useMemo(() => {
    if (operatorListData && operatorListData.length > 0) return operatorListData;
    return [
      { id: "jio_prep", operatorTypeId: "mobile_prepaid", operatorName: "Jio Prepaid", status: "Y" },
      { id: "airtel_prep", operatorTypeId: "mobile_prepaid", operatorName: "Airtel Prepaid", status: "Y" },
      { id: "vi_prep", operatorTypeId: "mobile_prepaid", operatorName: "Vodafone Idea", status: "Y" },
      { id: "tataplay_dth", operatorTypeId: "dth", operatorName: "Tata Play DTH", status: "Y" },
      { id: "bescom", operatorTypeId: "electricity", operatorName: "BESCOM Electricity", status: "Y" },
      { id: "payout_imps", operatorTypeId: "payout", operatorName: "IMPS Payout", status: "Y" },
      { id: "payout_neft", operatorTypeId: "payout", operatorName: "NEFT Payout", status: "Y" },
    ];
  }, [operatorListData]);

  const apiList = useMemo(() => {
    if (apiListData && apiListData.length > 0) return apiListData;
    return [
      { id: "api_paysprint", apiName: "PaySprint Recharge API", apiType: "Recharge", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
      { id: "api_eko", apiName: "Eko Connect API", apiType: "Recharge", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
      { id: "api_mobikwik", apiName: "MobiKwik BBPS API", apiType: "Bill Payment", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
      { id: "api_razorpay_payout", apiName: "RazorpayX Payout API", apiType: "Payout", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
      { id: "api_cashfree_payout", apiName: "Cashfree Payout Direct", apiType: "Payout", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
    ];
  }, [apiListData]);

  const form = useAppForm({
    defaultValues: {
      condition: initialData?.condition ?? "==",
      amountFrom: String(initialData?.amountFrom ?? ""),
      amountTo: String(initialData?.amountTo ?? ""),
      operatorTypeId: initialData?.operatorTypeId ?? "",
      operatorId: initialData?.operatorId ?? "",
      apiIds: initialData?.apiIds ?? [],
      fallback: (initialData?.fallback === "inactive" ? "inactive" : "active") as "active" | "inactive",
      status: initialData?.status ?? "active",
    } as AmountFormInput,
    onSubmit: async ({ value }) => {
      const parsed = amountSchema.safeParse(value);
      if (!parsed.success) return;

      const selectedOpType = operatorTypes.find(
        (t) => t.id === parsed.data.operatorTypeId || t.operatorType === parsed.data.operatorTypeId
      );
      const selectedOperator = operatorList.find((op) => op.id === parsed.data.operatorId);
      const selectedApiNames = apiList
        .filter((api) => parsed.data.apiIds.includes(api.id))
        .map((api) => api.apiName);

      const payload: Partial<AmountRecord> = {
        ...parsed.data,
        operatorTypeName: selectedOpType?.operatorType || parsed.data.operatorTypeId,
        operatorName: selectedOperator?.operatorName || parsed.data.operatorId,
        apiNames: selectedApiNames,
      };

      if (mode === "create") {
        await createMutation.mutateAsync(payload as Omit<AmountRecord, "id">);
      } else if (mode === "edit" && initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          ...payload,
        } as AmountRecord);
      }
      onSuccess?.();
    },
  });

  const operatorTypeOptions = useMemo(() => {
    return operatorTypes.map((item) => {
      const typeName = item.operatorType || item.id;
      const apiSuffix = item.apiType ? ` [${item.apiType}]` : "";
      return {
        label: `${typeName}${apiSuffix}`,
        value: item.id || item.operatorType,
      };
    });
  }, [operatorTypes]);

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
        <form.Subscribe selector={(state) => [state.values.operatorTypeId, state.values.condition]}>
          {([selectedOpTypeId, selectedCondition]) => {
            const isRangeCondition = selectedCondition === "BETWEEN" || selectedCondition === "AND";

            // Find selected operator type record to get linked apiType
            const currentOpType = operatorTypes.find(
              (t) => t.id === selectedOpTypeId || t.operatorType === selectedOpTypeId
            );

            // Filter operators registered for this operator type
            const filteredOperators = operatorList.filter((op) => {
              if (!selectedOpTypeId) return true;
              return op.operatorTypeId === selectedOpTypeId || op.operatorTypeId === currentOpType?.id;
            });

            // Ensure current initialData operator is in the list
            const hasCurrentSelected = filteredOperators.some(
              (op) => op.id === initialData?.operatorId || op.operatorName === initialData?.operatorName
            );
            if (!hasCurrentSelected && initialData?.operatorId) {
              const matchedGlobal = operatorList.find((op) => op.id === initialData.operatorId);
              if (matchedGlobal) {
                filteredOperators.unshift(matchedGlobal);
              } else if (initialData.operatorName) {
                filteredOperators.unshift({
                  id: initialData.operatorId,
                  operatorName: initialData.operatorName,
                  operatorTypeId: selectedOpTypeId || "",
                  status: "Y",
                });
              }
            }

            const operatorOptions = filteredOperators.map((op) => ({
              label: op.operatorName,
              value: op.id,
            }));

            // Filter APIs matching the operator type's apiType category
            const filteredApis = apiList.filter((api) => {
              if (showAllApis || !currentOpType?.apiType) return true;
              const opApiType = currentOpType.apiType.toLowerCase().trim();
              const apiItemType = (api.apiType || "").toLowerCase().trim();

              if (opApiType === "recharge" || opApiType === "dth") {
                if (apiItemType.includes("recharge") || apiItemType.includes("dth")) return true;
              }

              return apiItemType.includes(opApiType) || opApiType.includes(apiItemType);
            });

            let effectiveApis = filteredApis;
            if (showAllApis || filteredApis.length === 0) {
              effectiveApis = apiList;
            }

            // Ensure any initialData API ids are present in options
            const currentApiIds = initialData?.apiIds || [];
            currentApiIds.forEach((apiId, idx) => {
              if (!effectiveApis.some((api) => api.id === apiId)) {
                const apiName = initialData?.apiNames?.[idx] || apiId;
                effectiveApis.push({
                  id: apiId,
                  apiName,
                  apiType: currentOpType?.apiType || "API",
                  developmentType: "admin" as const,
                  url: "",
                  requestType: "POST",
                  responseType: "JSON",
                });
              }
            });

            const apiOptions = effectiveApis.map((api) => ({
              label: `${api.apiName} [${api.apiType || "API"}]`,
              value: api.id,
            }));

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amountFieldsConfig.map((field) => {
                  // Hide amountTo if not range condition
                  if (field.key === "amountTo" && !isRangeCondition) {
                    return null;
                  }

                  let dynamicOptions: { label: string; value: string }[] | undefined;
                  let isFullWidth = false;

                  if (field.key === "operatorTypeId") {
                    dynamicOptions = operatorTypeOptions;
                  } else if (field.key === "operatorId") {
                    dynamicOptions = operatorOptions;
                  } else if (field.key === "apiIds") {
                    dynamicOptions = apiOptions;
                    isFullWidth = true;
                  } else if ("options" in field) {
                    dynamicOptions = [...field.options];
                  }

                  let fieldColSpan = "col-span-1";
                  if (field.key === "condition" && isRangeCondition) {
                    fieldColSpan = "col-span-1 md:col-span-2";
                  } else if (isFullWidth) {
                    fieldColSpan = "col-span-1 md:col-span-2 space-y-1.5";
                  }


                  return (
                    <div key={field.key} className={fieldColSpan}>
                      {field.key === "apiIds" && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {showAllApis
                              ? `Showing all (${apiList.length}) registered APIs`
                              : `Filtered for ${currentOpType?.apiType || "this category"} (${effectiveApis.length})`}
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowAllApis((prev) => !prev)}
                            className="text-xs font-semibold text-primary hover:underline cursor-pointer transition-colors"
                          >
                            {showAllApis ? "Show Category Only" : "Show All APIs"}
                          </button>
                        </div>
                      )}
                      <form.AppField
                        name={field.key}
                        validators={{
                          onChange: ({ value }) => {
                            const shape =
                              amountSchema.shape[field.key as keyof typeof amountSchema.shape];
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
                            options={dynamicOptions}
                            value={fieldState.state.value ?? (field.key === "apiIds" ? [] : "")}
                            onChange={(val) => {
                              fieldState.handleChange(
                                val as Parameters<typeof fieldState.handleChange>[0]
                              );
                              // Reset dependent operator if operator type changes
                              if (field.key === "operatorTypeId") {
                                form.setFieldValue("operatorId", "");
                                form.setFieldValue("apiIds", []);
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
            );
          }}
        </form.Subscribe>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <form.SubscribeButton
            icon={<Save className="w-5 h-5" />}
            label={mode === "create" ? "Save Route" : "Save Changes"}
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
