"use client";

import { useMemo } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { operatorRegisterSchema, OperatorRegisterFormInput } from "../validations";
import { operatorRegisterFieldsConfig, OperatorRegisterFieldConfig } from "../constants";
import { useCreateOperatorRegisterMutation, useUpdateOperatorRegisterMutation } from "../hooks";
import { OperatorRegisterRecord } from "../types";
import { Save } from "lucide-react";
import { useOperatorTypeListQuery } from "@/modules/admin/settings/operator-type/hooks";

export interface OperatorRegisterFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: OperatorRegisterRecord | null;
  readonly onSuccess?: () => void;
}

export function OperatorRegisterForm({ mode, initialData, onSuccess }: OperatorRegisterFormProps) {
  const createMutation = useCreateOperatorRegisterMutation();
  const updateMutation = useUpdateOperatorRegisterMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // Dynamically fetch Operator Types from Settings
  const { data: operatorTypes = [] } = useOperatorTypeListQuery();

  const operatorTypeOptions = useMemo(() => {
    if (operatorTypes.length > 0) {
      return operatorTypes.map((t) => ({
        label: t.operatorType || t.id,
        value: t.id || t.operatorType,
      }));
    }
    return [
      { label: "Mobile Prepaid", value: "mobile_prepaid" },
      { label: "Mobile Postpaid", value: "mobile_postpaid" },
      { label: "DTH", value: "dth" },
      { label: "Electricity", value: "electricity" },
      { label: "Fastag", value: "fastag" },
      { label: "Broadband", value: "broadband" },
      { label: "LPG Gas", value: "lpg_gas" },
    ];
  }, [operatorTypes]);

  const getOptionsForField = (field: OperatorRegisterFieldConfig) => {
    if (field.optionsKey === "operatorTypes") {
      return operatorTypeOptions;
    }
    return field.staticOptions || [];
  };

  const form = useAppForm({
    defaultValues: {
      operatorIcon: initialData?.operatorIcon ?? "",
      operatorTypeId: initialData?.operatorTypeId ?? "",
      operatorName: initialData?.operatorName ?? "",
      optionalParameter: initialData?.optionalParameter ?? "",
      parameterLink: initialData?.parameterLink ?? "",
      isFetch: initialData?.isFetch ?? "N",
      status: initialData?.status ?? "Y",
      stateName: initialData?.stateName ?? "",
    } as OperatorRegisterFormInput,
    onSubmit: async ({ value }) => {
      const parsed = operatorRegisterSchema.safeParse(value);
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
        className="space-y-6">
        <div className="space-y-5 max-h-[65vh] overflow-y-auto pr-1">
          {/* Top Section: Avatar / Icon on Left + Key Fields on Right */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 rounded-xl bg-muted/30 border border-border/60">
            <div className="shrink-0 flex flex-col items-center">
              <form.AppField name="operatorIcon">
                {(fieldState) => (
                  <FormField
                    name="operatorIcon"
                    label="Operator Icon"
                    type="file"
                    value={fieldState.state.value}
                    onChange={(val) =>
                      fieldState.handleChange(
                        val as Parameters<typeof fieldState.handleChange>[0]
                      )
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>

            <div className="grid grid-cols-1 gap-3.5 w-full">
              <form.AppField
                name="operatorTypeId"
                validators={{
                  onChange: ({ value }) => {
                    const res = operatorRegisterSchema.shape.operatorTypeId.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
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
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(
                        val as Parameters<typeof fieldState.handleChange>[0]
                      )
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>

              <form.AppField
                name="operatorName"
                validators={{
                  onChange: ({ value }) => {
                    const res = operatorRegisterSchema.shape.operatorName.safeParse(value);
                    return res.success ? undefined : res.error.issues[0]?.message;
                  },
                }}>
                {(fieldState) => (
                  <FormField
                    name="operatorName"
                    label="Operator Name"
                    type="text"
                    placeholder="e.g. Jio Prepaid, Airtel DTH, BESCOM"
                    required
                    textTransform="capitalize"
                    value={fieldState.state.value ?? ""}
                    onChange={(val) =>
                      fieldState.handleChange(
                        val as Parameters<typeof fieldState.handleChange>[0]
                      )
                    }
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>
          </div>

          {/* Bottom Section: Remaining Fields in 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            {operatorRegisterFieldsConfig
              .filter(
                (f) =>
                  f.key !== "operatorIcon" &&
                  f.key !== "operatorTypeId" &&
                  f.key !== "operatorName"
              )
              .map((field) => (
                <div key={field.key} className="col-span-1">
                  <form.AppField
                    name={field.key}
                    validators={{
                      onChange: ({ value }) => {
                        const shape =
                          operatorRegisterSchema.shape[
                            field.key as keyof typeof operatorRegisterSchema.shape
                          ];
                        if (!shape) return undefined;
                        const res = shape.safeParse(value);
                        if (!res.success) {
                          return res.error.issues[0]?.message;
                        }
                        return undefined;
                      },
                    }}
                  >
                    {(fieldState) => {
                      const fieldValue = fieldState.state.value ?? "";
                      const options = getOptionsForField(field);

                      return (
                        <FormField
                          name={field.key}
                          label={field.label}
                          type={field.type}
                          placeholder={field.placeholder}
                          textTransform={field.textTransform}
                          required={field.required}
                          options={options}
                          value={fieldValue}
                          onChange={(val) =>
                            fieldState.handleChange(
                              val as Parameters<typeof fieldState.handleChange>[0]
                            )
                          }
                          onBlur={fieldState.handleBlur}
                          error={fieldState.state.meta.errors.join(", ")}
                        />
                      );
                    }}
                  </form.AppField>
                </div>
              ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border bg-background">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Register Operator" : "Save Changes"}
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
