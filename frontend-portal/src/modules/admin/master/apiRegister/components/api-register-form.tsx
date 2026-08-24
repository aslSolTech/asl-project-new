"use client";

import { useMemo, useState } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { apiRegisterSchema, ApiRegisterFormInput } from "../validations";
import { developmentTypeOptions } from "../constants";
import { useCreateApiRegisterMutation, useUpdateApiRegisterMutation } from "../hooks";
import { ApiRegisterRecord, RequestParameterItem, ResponseParameterItem } from "../types";
import { useApiTypeListQuery } from "@/modules/admin/settings/api-type/hooks";
import {
  useRequestTypeListQuery,
  useRequestParamListQuery,
  useParamStatusListQuery,
} from "@/modules/admin/settings/request-types/hooks";
import { useResponseTypeListQuery } from "@/modules/admin/settings/response-type/hooks";
import { Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ApiRegisterFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: ApiRegisterRecord | null;
  readonly onSuccess?: () => void;
}

export function ApiRegisterForm({ mode, initialData, onSuccess }: ApiRegisterFormProps) {
  const createMutation = useCreateApiRegisterMutation();
  const updateMutation = useUpdateApiRegisterMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // 1. Dynamic Options Queries
  const { data: apiTypesData = [] } = useApiTypeListQuery();
  const { data: requestTypesData = [] } = useRequestTypeListQuery();
  const { data: requestParamsData = [] } = useRequestParamListQuery();
  const { data: paramStatusesData = [] } = useParamStatusListQuery();
  const { data: responseTypesData = [] } = useResponseTypeListQuery();

  // API Type options
  const apiTypeOptions = useMemo(() => {
    if (apiTypesData.length > 0) {
      return apiTypesData.map((item) => ({
        label: item.apiType || item.id,
        value: item.apiType || item.id,
      }));
    }
    return [
      { label: "Payout", value: "payout" },
      { label: "Collection", value: "collection" },
      { label: "BBPS", value: "bbps" },
      { label: "Recharge", value: "recharge" },
      { label: "Verification", value: "verification" },
    ];
  }, [apiTypesData]);

  // Request Type options
  const requestTypeOptions = useMemo(() => {
    if (requestTypesData.length > 0) {
      return requestTypesData.map((item) => ({
        label: item.typeName ? `${item.typeName} (${item.httpMethod || "POST"})` : item.id,
        value: item.requestCode || item.typeName || item.id,
      }));
    }
    return [
      { label: "JSON (POST)", value: "JSON_POST" },
      { label: "Form Data (POST)", value: "FORM_DATA_POST" },
      { label: "Query Params (GET)", value: "QUERY_GET" },
      { label: "XML (POST)", value: "XML_POST" },
    ];
  }, [requestTypesData]);

  // Parameter Type options (for Request Parameters)
  const paramTypeOptions = useMemo(() => {
    if (requestParamsData.length > 0) {
      return requestParamsData.map((item) => ({
        label: item.paramName || item.slug || item.id,
        value: item.slug || item.paramName || item.id,
      }));
    }
    return [
      { label: "String / Text", value: "string" },
      { label: "Number / Integer", value: "number" },
      { label: "Boolean", value: "boolean" },
      { label: "JSON Object", value: "object" },
      { label: "Array", value: "array" },
      { label: "Header Token", value: "header" },
    ];
  }, [requestParamsData]);

  // Parameter Status / Parameter For options (for Response Parameters)
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

  // Response Type options
  const responseTypeOptions = useMemo(() => {
    if (responseTypesData.length > 0) {
      return responseTypesData.map((item) => ({
        label: item.responseFormat || item.id,
        value: item.responseFormat || item.id,
      }));
    }
    return [
      { label: "JSON", value: "json" },
      { label: "XML", value: "xml" },
      { label: "Plain Text / Delimited", value: "text" },
      { label: "HTML", value: "html" },
    ];
  }, [responseTypesData]);

  // Request & Response Parameter rows state
  const [requestParameters, setRequestParameters] = useState<(RequestParameterItem & { _id?: string })[]>(
    initialData?.requestParameters && initialData.requestParameters.length > 0
      ? initialData.requestParameters.map((p) => ({ ...p, _id: p.id || crypto.randomUUID() }))
      : [{ _id: crypto.randomUUID(), paramName: "", paramType: "", paramValue: "" }]
  );

  const [responseParameters, setResponseParameters] = useState<(ResponseParameterItem & { _id?: string })[]>(
    initialData?.responseParameters && initialData.responseParameters.length > 0
      ? initialData.responseParameters.map((p) => ({ ...p, _id: p.id || crypto.randomUUID() }))
      : [{ _id: crypto.randomUUID(), paramName: "", paramValue: "", paramFor: "" }]
  );

  const handleAddRequestParam = () => {
    setRequestParameters((prev) => [
      ...prev,
      { _id: crypto.randomUUID(), paramName: "", paramType: "", paramValue: "" },
    ]);
  };

  const handleRemoveRequestParam = (index: number) => {
    setRequestParameters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateRequestParam = (
    index: number,
    key: keyof RequestParameterItem,
    val: string
  ) => {
    setRequestParameters((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: val };
      return updated;
    });
  };

  const handleAddResponseParam = () => {
    setResponseParameters((prev) => [
      ...prev,
      { _id: crypto.randomUUID(), paramName: "", paramValue: "", paramFor: "" },
    ]);
  };

  const handleRemoveResponseParam = (index: number) => {
    setResponseParameters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateResponseParam = (
    index: number,
    key: keyof ResponseParameterItem,
    val: string
  ) => {
    setResponseParameters((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: val };
      return updated;
    });
  };

  const form = useAppForm({
    defaultValues: {
      apiName: initialData?.apiName ?? "",
      apiType: initialData?.apiType ?? "",
      developmentType: initialData?.developmentType ?? "admin",
      url: initialData?.url ?? "",
      requestType: initialData?.requestType ?? "",
      responseType: initialData?.responseType ?? "",
      apiRemarks: initialData?.apiRemarks ?? "",
    } as ApiRegisterFormInput,
    onSubmit: async ({ value }) => {
      const payload: ApiRegisterFormInput = {
        ...value,
        requestParameters: requestParameters.filter((p) => p.paramName.trim() !== ""),
        responseParameters: responseParameters.filter((p) => p.paramName.trim() !== ""),
      };

      const parsed = apiRegisterSchema.safeParse(payload);
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
        className="space-y-6"
      >
        <div className="space-y-6 max-h-[68vh] overflow-y-auto pr-1">
          {/* Section 1: Basic API Information */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              API Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <form.AppField
                name="apiName"
                validators={{
                  onChange: ({ value }) => {
                    const res = apiRegisterSchema.shape.apiName.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="apiName"
                    label="API Name"
                    type="text"
                    placeholder="e.g. Cashfree Payout"
                    required
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>

              <form.AppField
                name="apiType"
                validators={{
                  onChange: ({ value }) => {
                    const res = apiRegisterSchema.shape.apiType.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="apiType"
                    label="API Type"
                    type="select"
                    placeholder="Select API Type"
                    required
                    options={apiTypeOptions}
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>

              <form.AppField
                name="developmentType"
                validators={{
                  onChange: ({ value }) => {
                    const res = apiRegisterSchema.shape.developmentType.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="developmentType"
                    label="Development Type"
                    type="select"
                    placeholder="Select Dev Type"
                    required
                    options={developmentTypeOptions}
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <form.AppField
                  name="url"
                  validators={{
                    onChange: ({ value }) => {
                      const res = apiRegisterSchema.shape.url.safeParse(value);
                      return res.success ? undefined : res.error.issues[0]?.message;
                    },
                  }}
                >
                  {(fieldState) => (
                    <FormField
                      name="url"
                      label="API URL"
                      type="url"
                      placeholder="https://api.provider.com/v1/endpoint"
                      required
                      value={fieldState.state.value ?? ""}
                      onChange={(val) =>
                        fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])
                      }
                      onBlur={fieldState.handleBlur}
                      error={fieldState.state.meta.errors.join(", ")}
                    />
                  )}
                </form.AppField>
              </div>

              <form.AppField
                name="requestType"
                validators={{
                  onChange: ({ value }) => {
                    const res = apiRegisterSchema.shape.requestType.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="requestType"
                    label="Request Type"
                    type="select"
                    placeholder="Select Request Type"
                    required
                    options={requestTypeOptions}
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>
          </div>

          {/* Section 2: Request Parameter Details */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Request Parameter Details
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Configure dynamic request parameters sent to this API endpoint.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddRequestParam}
                className="h-7 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Parameter
              </Button>
            </div>

            <div className="space-y-2.5 pt-1">
              {requestParameters.map((param, index) => (
                <div
                  key={param._id || param.id || `req-param-${index}`}
                  className="flex flex-col sm:flex-row items-center gap-3 p-2.5 rounded-lg bg-background border border-border/60"
                >
                  <div className="flex-1 w-full">
                    <FormField
                      name={`req_param_name_${index}`}
                      label={index === 0 ? "Parameter Name" : undefined}
                      type="text"
                      placeholder="e.g. mobileNumber"
                      value={param.paramName}
                      onChange={(val) => handleUpdateRequestParam(index, "paramName", String(val ?? ""))}
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <FormField
                      name={`req_param_type_${index}`}
                      label={index === 0 ? "Parameter Type" : undefined}
                      type="select"
                      placeholder="Select Type"
                      options={paramTypeOptions}
                      value={param.paramType}
                      onChange={(val) => handleUpdateRequestParam(index, "paramType", String(val ?? ""))}
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <FormField
                      name={`req_param_val_${index}`}
                      label={index === 0 ? "Parameter Value" : undefined}
                      type="text"
                      placeholder="e.g. {customer_mobile}"
                      value={param.paramValue}
                      onChange={(val) => handleUpdateRequestParam(index, "paramValue", String(val ?? ""))}
                    />
                  </div>

                  {requestParameters.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleRemoveRequestParam(index)}
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

          {/* Section 3: Response Parameter Details */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Response Parameter Details
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Map returned response keys to system status parameters.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddResponseParam}
                className="h-7 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Parameter
              </Button>
            </div>

            <div className="space-y-2.5 pt-1">
              {responseParameters.map((param, index) => (
                <div
                  key={param._id || param.id || `res-param-${index}`}
                  className="flex flex-col sm:flex-row items-center gap-3 p-2.5 rounded-lg bg-background border border-border/60"
                >
                  <div className="flex-1 w-full">
                    <FormField
                      name={`res_param_name_${index}`}
                      label={index === 0 ? "Parameter Name" : undefined}
                      type="text"
                      placeholder="e.g. status"
                      value={param.paramName}
                      onChange={(val) => handleUpdateResponseParam(index, "paramName", String(val ?? ""))}
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <FormField
                      name={`res_param_val_${index}`}
                      label={index === 0 ? "Parameter Value" : undefined}
                      type="text"
                      placeholder="e.g. SUCCESS"
                      value={param.paramValue}
                      onChange={(val) => handleUpdateResponseParam(index, "paramValue", String(val ?? ""))}
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <FormField
                      name={`res_param_for_${index}`}
                      label={index === 0 ? "Parameter For" : undefined}
                      type="select"
                      placeholder="Select Status Mapping"
                      options={paramForOptions}
                      value={param.paramFor}
                      onChange={(val) => handleUpdateResponseParam(index, "paramFor", String(val ?? ""))}
                    />
                  </div>

                  {responseParameters.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleRemoveResponseParam(index)}
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

          {/* Section 4: Response Type & Remarks */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Response & Remarks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.AppField
                name="responseType"
                validators={{
                  onChange: ({ value }) => {
                    const res = apiRegisterSchema.shape.responseType.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}
              >
                {(fieldState) => (
                  <FormField
                    name="responseType"
                    label="Response Type"
                    type="select"
                    placeholder="Select Response Type"
                    required
                    options={responseTypeOptions}
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>

              <form.AppField name="apiRemarks">
                {(fieldState) => (
                  <FormField
                    name="apiRemarks"
                    label="API Remarks"
                    type="text"
                    placeholder="e.g. Production payout gateway for instant transfer"
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])
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
            label={mode === "create" ? "Register API" : "Save Changes"}
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
