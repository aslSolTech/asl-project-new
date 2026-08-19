"use client";

import { useMemo, useState, useEffect } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { operatorCodeSchema, OperatorCodeFormInput } from "../validations";
import { defaultOperatorTypes, defaultConnectionTypes, isFlatOptions, fallbackApiList } from "../constants";
import { useCreateOperatorCodeMutation, useUpdateOperatorCodeMutation } from "../hooks";
import { OperatorCodeRecord } from "../types";
import { useOperatorTypeListQuery } from "@/modules/admin/master/operatorType/hooks";
import { useOperatorRegisterListQuery } from "@/modules/admin/master/operatorRegister/hooks";
import { useApiRegisterListQuery } from "@/modules/admin/master/apiRegister/hooks";
import { Save, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface OperatorCodeFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: OperatorCodeRecord | null;
  readonly onSuccess?: () => void;
}

export function OperatorCodeForm({ mode, initialData, onSuccess }: OperatorCodeFormProps) {
  const createMutation = useCreateOperatorCodeMutation();
  const updateMutation = useUpdateOperatorCodeMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // Master Data Queries
  const { data: operatorTypesData = [] } = useOperatorTypeListQuery();
  const { data: registeredOperatorsData = [] } = useOperatorRegisterListQuery();
  const { data: registeredApisData = [] } = useApiRegisterListQuery();

  // Combine API options
  const apiOptions = useMemo(() => {
    if (registeredApisData && registeredApisData.length > 0) {
      return registeredApisData.map((api) => ({
        label: api.apiName,
        value: api.id,
        name: api.apiName,
        type: api.apiType,
      }));
    }
    return fallbackApiList.map((api) => ({
      label: api.apiName,
      value: api.id,
      name: api.apiName,
      type: api.apiType,
    }));
  }, [registeredApisData]);

  // Combine Operator Type options
  const operatorTypeOptions = useMemo(() => {
    if (operatorTypesData && operatorTypesData.length > 0) {
      return operatorTypesData.map((t) => ({
        label: t.typeName || t.code || t.id,
        value: t.id || t.code || t.typeName,
      }));
    }
    return [...defaultOperatorTypes];
  }, [operatorTypesData]);

  const [selectedOpType, setSelectedOpType] = useState<string>(
    initialData?.operatorTypeId || "mobile_prepaid"
  );
  const [selectedApiId, setSelectedApiId] = useState<string>(
    initialData?.apiId || apiOptions[0]?.value || "API-001"
  );

  // Dynamic Operator options based on selected operator type from Operator Register
  const operatorOptions = useMemo(() => {
    const fallbackList = [
      { label: "Jio Prepaid", value: "Jio Prepaid", typeId: "mobile_prepaid", code: 101 },
      { label: "Airtel Prepaid", value: "Airtel Prepaid", typeId: "mobile_prepaid", code: 102 },
      { label: "Vi Prepaid (Vodafone Idea)", value: "Vi Prepaid", typeId: "mobile_prepaid", code: 103 },
      { label: "BSNL Prepaid", value: "BSNL Prepaid", typeId: "mobile_prepaid", code: 104 },
      { label: "Tata Play DTH", value: "Tata Play DTH", typeId: "dth", code: 201 },
      { label: "Dish TV", value: "Dish TV", typeId: "dth", code: 202 },
      { label: "Sun Direct", value: "Sun Direct", typeId: "dth", code: 203 },
      { label: "Airtel Digital TV", value: "Airtel Digital TV", typeId: "dth", code: 204 },
      { label: "BESCOM Electricity", value: "BESCOM Electricity", typeId: "electricity", code: 301 },
      { label: "Tata Power", value: "Tata Power", typeId: "electricity", code: 302 },
      { label: "Adani Electricity", value: "Adani Electricity", typeId: "electricity", code: 303 },
      { label: "Indane Gas", value: "Indane Gas", typeId: "lpg_gas", code: 401 },
      { label: "Bharat Gas", value: "Bharat Gas", typeId: "lpg_gas", code: 402 },
      { label: "HP Gas", value: "HP Gas", typeId: "lpg_gas", code: 403 },
      { label: "Fastag NHAI", value: "Fastag NHAI", typeId: "fastag", code: 501 },
    ];

    let allOps = fallbackList;
    if (registeredOperatorsData && registeredOperatorsData.length > 0) {
      allOps = registeredOperatorsData.map((op, idx) => ({
        label: op.operatorName,
        value: op.operatorName,
        typeId: op.operatorTypeId || "mobile_prepaid",
        code: Number(op.code) || 100 + idx,
      }));
    }

    if (!selectedOpType) return allOps;
    const filtered = allOps.filter(
      (op) =>
        op.typeId?.toLowerCase() === selectedOpType.toLowerCase() ||
        op.typeId?.toLowerCase().replace(/_/g, "") === selectedOpType.toLowerCase().replace(/_/g, "")
    );
    return filtered.length > 0 ? filtered : allOps;
  }, [registeredOperatorsData, selectedOpType]);

  const selectedApiObj = useMemo(() => {
    return apiOptions.find((a) => a.value === selectedApiId) || apiOptions[0];
  }, [apiOptions, selectedApiId]);

  const form = useAppForm({
    defaultValues: {
      apiId: initialData?.apiId || selectedApiId || "API-001",
      apiName: initialData?.apiName || selectedApiObj?.name || "Eko Recharge API",
      apiType: initialData?.apiType || selectedApiObj?.type || "mobile_prepaid",
      operatorTypeId: initialData?.operatorTypeId || selectedOpType || "mobile_prepaid",
      operatorTypeName:
        initialData?.operatorTypeName ||
        operatorTypeOptions.find((t) => t.value === selectedOpType)?.label ||
        "Mobile Prepaid",
      operator: initialData?.operator || initialData?.operatorName || "",
      code: initialData?.code !== undefined ? String(initialData.code) : "",
      connectionType: initialData?.connectionType || "Prepaid",
      commission: initialData?.commission !== undefined ? String(initialData.commission) : "2.50",
      gst: initialData?.gst !== undefined ? String(initialData.gst) : "18.00",
      isFlat:
        initialData?.isFlat === "Yes" || initialData?.isFlat === "Y" || initialData?.isFlat === true
          ? "Yes"
          : "No",
    } as unknown as OperatorCodeFormInput,
    onSubmit: async ({ value }) => {
      const parsed = operatorCodeSchema.safeParse(value);
      if (!parsed.success) {
        console.error("Form validation errors:", parsed.error);
        return;
      }

      const opTypeObj = operatorTypeOptions.find((t) => t.value === parsed.data.operatorTypeId);
      const chosenApi = apiOptions.find((a) => a.value === (parsed.data.apiId || selectedApiId));

      const payload: OperatorCodeRecord = {
        id: initialData?.id || `OPC-${Date.now()}`,
        apiId: chosenApi?.value || parsed.data.apiId || "API-001",
        apiName: chosenApi?.name || parsed.data.apiName || "API Service",
        apiType: chosenApi?.type || parsed.data.apiType || "general",
        operatorTypeId: parsed.data.operatorTypeId,
        operatorTypeName: opTypeObj?.label || parsed.data.operatorTypeId,
        operator: parsed.data.operator,
        operatorName: parsed.data.operator,
        code: Number(parsed.data.code) || 0,
        connectionType: parsed.data.connectionType || "Prepaid",
        commission: Number(parsed.data.commission) || 0,
        gst: Number(parsed.data.gst) || 0,
        isFlat: parsed.data.isFlat === "Yes" || parsed.data.isFlat === "Y" ? "Yes" : "No",
        provider: chosenApi?.name || initialData?.provider || "Main Provider",
        providerCode: `${parsed.data.operator}_${parsed.data.code}`,
      };

      // Non-destructive: Preserve existing unchanged keys
      const finalPayload = mode === "edit" && initialData ? { ...initialData, ...payload } : payload;

      if (mode === "create") {
        await createMutation.mutateAsync(finalPayload);
      } else if (mode === "edit" && initialData?.id) {
        await updateMutation.mutateAsync(finalPayload);
      }
      onSuccess?.();
    },
  });

  // Keep internal selected type & api updated if form changes
  useEffect(() => {
    if (initialData?.operatorTypeId) {
      setSelectedOpType(initialData.operatorTypeId);
    }
    if (initialData?.apiId) {
      setSelectedApiId(initialData.apiId);
    }
  }, [initialData]);

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
          {/* API Info & ID Header Card */}
          <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Target API Service
                </span>
                <span className="text-sm font-bold text-foreground">
                  {selectedApiObj?.name || "API Service Provider"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-mono font-bold bg-background text-primary border-primary/30 px-2.5 py-1">
                ID: {selectedApiObj?.value || "API-001"}
              </Badge>
              {selectedApiObj?.type && (
                <Badge variant="secondary" className="text-xs uppercase font-medium">
                  {selectedApiObj.type}
                </Badge>
              )}
            </div>
          </div>

          {/* Section 1: API & Operator Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-card border border-border/80 shadow-xs">
            <div className="col-span-1">
              <form.AppField name="apiId">
                {(fieldState) => (
                  <FormField
                    name="apiId"
                    label="API Name & ID"
                    type="select"
                    placeholder="Select API Provider"
                    required
                    options={apiOptions}
                    value={fieldState.state.value || selectedApiId}
                    onChange={(val) => {
                      const strVal = String(val);
                      setSelectedApiId(strVal);
                      fieldState.handleChange(strVal as Parameters<typeof fieldState.handleChange>[0]);
                      const matched = apiOptions.find((a) => a.value === strVal);
                      if (matched) {
                        form.setFieldValue("apiName" as never, matched.name as never);
                        form.setFieldValue("apiType" as never, matched.type as never);
                      }
                    }}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Select which API will route this operator"
                  />
                )}
              </form.AppField>
            </div>

            <div className="col-span-1">
              <form.AppField
                name="operatorTypeId"
                validators={{
                  onChange: ({ value }) => {
                    return value ? undefined : "Operator Type is required";
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="operatorTypeId"
                    label="Operator Type"
                    type="select"
                    placeholder="Select Operator Type"
                    required
                    options={operatorTypeOptions}
                    value={fieldState.state.value || selectedOpType}
                    onChange={(val) => {
                      const strVal = String(val);
                      setSelectedOpType(strVal);
                      fieldState.handleChange(strVal as Parameters<typeof fieldState.handleChange>[0]);
                      const matched = operatorTypeOptions.find((t) => t.value === strVal);
                      if (matched) {
                        form.setFieldValue("operatorTypeName" as never, matched.label as never);
                      }
                    }}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Category of operator"
                  />
                )}
              </form.AppField>
            </div>

            {/* Operator Name Selection from Registered Operators */}
            <div className="col-span-1 md:col-span-2">
              <form.AppField
                name="operator"
                validators={{
                  onChange: ({ value }) => {
                    return value ? undefined : "Operator Name is required";
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="operator"
                    label="Operator Name (from Registered Master)"
                    type="select"
                    placeholder="Select registered operator..."
                    required
                    options={operatorOptions.map((op) => ({
                      label: `${op.label} (Code: ${op.code})`,
                      value: op.value,
                    }))}
                    value={fieldState.state.value || ""}
                    onChange={(val) => {
                      const strVal = String(val);
                      fieldState.handleChange(strVal as Parameters<typeof fieldState.handleChange>[0]);
                      // Auto populate code if found
                      const matched = operatorOptions.find((o) => o.value === strVal);
                      if (matched?.code) {
                        form.setFieldValue("code" as never, String(matched.code) as never);
                      }
                    }}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Populated from Operator Registration master for the chosen Operator Type"
                  />
                )}
              </form.AppField>
            </div>
          </div>

          {/* Section 2: Code & Connection Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-card border border-border/80 shadow-xs">
            <div className="col-span-1">
              <form.AppField
                name="code"
                validators={{
                  onChange: ({ value }) => {
                    if (value === undefined || value === "") return "Operator Code is required";
                    if (Number.isNaN(Number(value))) return "Must be a valid number";
                    return undefined;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="code"
                    label="OPERATOR CODE (Number)"
                    type="number"
                    placeholder="e.g. 101, 102, 201"
                    required
                    value={fieldState.state.value ?? ""}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Numerical identification code for this operator"
                  />
                )}
              </form.AppField>
            </div>

            <div className="col-span-1">
              <form.AppField
                name="connectionType"
                validators={{
                  onChange: ({ value }) => {
                    return value ? undefined : "Connection Type is required";
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="connectionType"
                    label="CONNECTION TYPE"
                    type="select"
                    placeholder="Select connection type"
                    required
                    options={defaultConnectionTypes}
                    value={fieldState.state.value ?? "Prepaid"}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="e.g. Prepaid, Postpaid, BBPS, Direct API"
                  />
                )}
              </form.AppField>
            </div>
          </div>

          {/* Section 3: Commission, GST & Is Flat */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-card border border-border/80 shadow-xs">
            <div className="col-span-1">
              <form.AppField
                name="commission"
                validators={{
                  onChange: ({ value }) => {
                    if (value === undefined || value === "") return "Commission is required";
                    if (Number.isNaN(Number(value)) || Number(value) < 0) return "Must be >= 0";
                    return undefined;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="commission"
                    label="COMMISSION Rate"
                    type="number"
                    placeholder="2.50"
                    required
                    value={fieldState.state.value ?? "2.50"}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Percentage % or Flat ₹ amount"
                  />
                )}
              </form.AppField>
            </div>

            <div className="col-span-1">
              <form.AppField
                name="gst"
                validators={{
                  onChange: ({ value }) => {
                    if (value === undefined || value === "") return "GST is required";
                    if (Number.isNaN(Number(value)) || Number(value) < 0) return "Must be >= 0";
                    return undefined;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="gst"
                    label="GST (%)"
                    type="number"
                    placeholder="18.00"
                    required
                    value={fieldState.state.value ?? "18.00"}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Applicable GST percentage"
                  />
                )}
              </form.AppField>
            </div>

            <div className="col-span-1">
              <form.AppField name="isFlat">
                {(fieldState) => (
                  <FormField
                    name="isFlat"
                    label="IS FLAT (Charges/Comm.)"
                    type="select"
                    placeholder="Select Yes/No"
                    required
                    options={isFlatOptions}
                    value={fieldState.state.value ?? "No"}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                    helperText="Yes = Fixed ₹, No = Percentage %"
                  />
                )}
              </form.AppField>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border bg-background">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Save Commission & Code" : "Save Changes"}
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
