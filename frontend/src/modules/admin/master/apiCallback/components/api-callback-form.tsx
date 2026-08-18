"use client";

import { useMemo, useState } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { apiCallbackSchema, ApiCallbackFormInput } from "../validations";
import { useCreateApiCallbackMutation, useUpdateApiCallbackMutation } from "../hooks";
import { ApiCallbackRecord, CallbackParameterItem } from "../types";
import { useApiRegisterListQuery } from "@/modules/admin/master/apiRegister/hooks";
import { useParamStatusListQuery } from "@/modules/admin/settings/request-types/hooks";
import { Save, Plus, Trash2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export interface ApiCallbackFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: ApiCallbackRecord | null;
  readonly onSuccess?: () => void;
}

export function ApiCallbackForm({ mode, initialData, onSuccess }: ApiCallbackFormProps) {
  const createMutation = useCreateApiCallbackMutation();
  const updateMutation = useUpdateApiCallbackMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // 1. Fetch Dynamic List of Registered APIs
  const { data: registerApisData = [] } = useApiRegisterListQuery();
  
  // 2. Fetch Parameter Status Options (from settings/request-types?tab=parameter-status)
  const { data: paramStatusesData = [] } = useParamStatusListQuery();

  // API Name Options from Register APIs
  const apiNameOptions = useMemo(() => {
    if (registerApisData.length > 0) {
      return registerApisData.map((item) => ({
        label: item.apiName || item.id,
        value: item.apiName || item.id,
        id: item.id,
      }));
    }
    return [
      { label: "Cashfree Payout", value: "Cashfree Payout", id: "API-001" },
      { label: "Paytm Collection", value: "Paytm Collection", id: "API-002" },
      { label: "Razorpay BBPS", value: "Razorpay BBPS", id: "API-003" },
    ];
  }, [registerApisData]);

  // Parameter For options (from Param Status list)
  const paramForOptions = useMemo(() => {
    if (paramStatusesData.length > 0) {
      return paramStatusesData.map((item) => ({
        label: item.statusName ? `${item.statusName} (${item.statusCode})` : item.id,
        value: item.statusCode || item.statusName || item.id,
      }));
    }
    return [
      { label: "Status (STATUS)", value: "STATUS" },
      { label: "Transaction ID (TXN_ID)", value: "TXN_ID" },
      { label: "Operator Ref ID (OP_REF_ID)", value: "OP_REF_ID" },
      { label: "Message / Description (MSG)", value: "MSG" },
      { label: "Balance (BAL)", value: "BAL" },
      { label: "Error Code (ERR_CODE)", value: "ERR_CODE" },
    ];
  }, [paramStatusesData]);

  // Parameters rows state
  const [parameters, setParameters] = useState<(CallbackParameterItem & { _id?: string })[]>(
    initialData?.parameters && initialData.parameters.length > 0
      ? initialData.parameters.map((p) => ({ ...p, _id: p.id || crypto.randomUUID() }))
      : [{ _id: crypto.randomUUID(), paramName: "", paramValue: "", paramFor: "" }]
  );

  const [copied, setCopied] = useState(false);

  const handleAddParam = () => {
    setParameters((prev) => [
      ...prev,
      { _id: crypto.randomUUID(), paramName: "", paramValue: "", paramFor: "" },
    ]);
  };

  const handleRemoveParam = (index: number) => {
    setParameters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateParam = (
    index: number,
    key: keyof CallbackParameterItem,
    val: string
  ) => {
    setParameters((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: val };
      return updated;
    });
  };

  const formatFileName = (nameOrId?: string) => {
    if (!nameOrId) return "callbackurl.php";
    const cleaned = nameOrId
      .toLowerCase()
      .trim()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-+|-+$/g, "");
    return `${cleaned || "callback"}-callback.php`;
  };

  const computeCallbackUrl = (apiIdOrName?: string) => {
    const fileName = formatFileName(apiIdOrName);
    return `https://uat.payzones.net/api/apiservice/${fileName}`;
  };

  const form = useAppForm({
    defaultValues: {
      apiName: initialData?.apiName ?? initialData?.customerName ?? "",
      apiId: initialData?.apiId ?? "",
      callbackUrl: initialData?.callbackUrl ?? initialData?.url ?? "https://uat.payzones.net/api/apiservice/callbackurl"
    } as ApiCallbackFormInput,
    onSubmit: async ({ value }) => {
      const payload: ApiCallbackFormInput = {
        ...value,
        parameters: parameters.filter((p) => p.paramName.trim() !== ""),
      };

      const parsed = apiCallbackSchema.safeParse(payload);
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

  const handleCopyUrl = (url: string) => {
    void navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Callback URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="space-y-6 max-h-[68vh] overflow-y-auto pr-1">
          {/* Section 1: Basic API Information */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              API Configuration
            </h3>

            <div>
              <form.AppField
                name="apiName"
                validators={{
                  onChange: ({ value }) => {
                    const res = apiCallbackSchema.shape.apiName.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="apiName"
                    label="API Name"
                    type="select"
                    placeholder="Select Registered API"
                    required
                    options={apiNameOptions}
                    value={fieldState.state.value ?? ""}
                    onChange={(val) => {
                      const selectedVal = String(val ?? "");
                      fieldState.handleChange(selectedVal);
                      const matched = apiNameOptions.find((o) => o.value === selectedVal);
                      const identifier = matched?.value || selectedVal;
                      const generatedId = matched?.id || selectedVal.toLowerCase().replaceAll(/\s+/g, "-");
                      form.setFieldValue("apiId", generatedId);
                      form.setFieldValue("callbackUrl", computeCallbackUrl(identifier));
                    }}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>

            {/* Editable Validated Callback URL Input Field with Copy Button */}
            <form.AppField
              name="callbackUrl"
              validators={{
                onChange: ({ value }) => {
                  const res = apiCallbackSchema.shape.callbackUrl.safeParse(value);
                  return res.success ? undefined : res.error.issues[0]?.message;
                },
              }}
            >
              {(fieldState) => {
                const currentVal = fieldState.state.value ?? "";
                return (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold text-foreground">
                        Callback URL <span className="text-destructive">*</span>
                      </Label>
                      {currentVal && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          onClick={() => handleCopyUrl(currentVal)}
                          className="h-6 text-[11px] gap-1 text-primary hover:text-primary hover:bg-primary/10 cursor-pointer"
                        >
                          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          {copied ? "Copied" : "Copy URL"}
                        </Button>
                      )}
                    </div>
                    <FormField
                      name="callbackUrl"
                      type="url"
                      placeholder="https://uat.payzones.net/api/apiservice/callbackurl"
                      required
                      value={currentVal}
                      onChange={(val) =>
                        fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])
                      }
                      onBlur={fieldState.handleBlur}
                      error={fieldState.state.meta.errors.join(", ")}
                    />
                  </div>
                );
              }}
            </form.AppField>
          </div>

          {/* Section 2: Callback Parameter Details */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Callback Parameter Details
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Map received callback parameters to system status keys.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddParam}
                className="h-7 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Parameter
              </Button>
            </div>

            <div className="space-y-2.5 pt-1">
              {parameters.map((param, index) => (
                <div
                  key={param._id || param.id || `callback-param-${index}`}
                  className="flex flex-col sm:flex-row items-center gap-3 p-2.5 rounded-lg bg-background border border-border/60"
                >
                  <div className="flex-1 w-full">
                    <FormField
                      name={`cb_param_name_${index}`}
                      label={index === 0 ? "Parameter Name" : undefined}
                      type="text"
                      placeholder="e.g. status, txn_id"
                      required
                      value={param.paramName}
                      onChange={(val) => handleUpdateParam(index, "paramName", String(val ?? ""))}
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <FormField
                      name={`cb_param_val_${index}`}
                      label={index === 0 ? "Parameter Value" : undefined}
                      type="text"
                      placeholder="e.g. SUCCESS"
                      value={param.paramValue}
                      onChange={(val) => handleUpdateParam(index, "paramValue", String(val ?? ""))}
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <FormField
                      name={`cb_param_for_${index}`}
                      label={index === 0 ? "Parameter For" : undefined}
                      type="select"
                      placeholder="Select Status"
                      required
                      options={paramForOptions}
                      value={param.paramFor}
                      onChange={(val) => handleUpdateParam(index, "paramFor", String(val ?? ""))}
                    />
                  </div>

                  {parameters.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleRemoveParam(index)}
                      className={`text-destructive hover:bg-destructive/10 shrink-0 ${index === 0 ? "sm:mt-6" : ""}`}
                      title="Remove parameter"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border bg-background">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Save Callback API" : "Save Changes"}
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
