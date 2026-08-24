"use client";

import { useMemo } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField, FieldOption } from "@/components/form_builder/fields/FormFields";
import { amountSchema, AmountFormInput } from "../validations";
import { amountFieldsConfig } from "../constants";
import { useCreateAmountMutation, useUpdateAmountMutation } from "../hooks";
import { AmountRecord } from "../types";
import { useUserTypeListQuery } from "@/modules/admin/settings/user-type/hooks";
import { DEFAULT_USER_TYPES } from "@/modules/admin/settings/user-type/constants";
import { useUserRegisterListQuery } from "@/modules/admin/master/userRegister/hooks";
import { usePayoutListQuery } from "@/modules/admin/services/service/payouts/hooks";
import { Save } from "lucide-react";

export interface AmountFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: AmountRecord | null;
  readonly onSuccess?: () => void;
}

export function AmountForm({ mode, initialData, onSuccess }: AmountFormProps) {
  const createMutation = useCreateAmountMutation();
  const updateMutation = useUpdateAmountMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // 1. User Types Query
  const { data: userTypesData = [] } = useUserTypeListQuery();
  const userTypes = useMemo(() => {
    return userTypesData.length > 0 ? userTypesData : DEFAULT_USER_TYPES;
  }, [userTypesData]);

  const userTypeOptions: readonly FieldOption[] = useMemo(() => {
    return userTypes.map((ut) => ({
      label: ut.name,
      value: ut.id,
    }));
  }, [userTypes]);

  // 2. Master Users Query
  const { data: masterUsersData = [] } = useUserRegisterListQuery();
  const masterUsers = useMemo(() => {
    if (masterUsersData && masterUsersData.length > 0) {
      return masterUsersData;
    }
    return [
      {
        id: "USR-REC-001",
        userCode: "REG-2024-001",
        firstName: "Rahul",
        lastName: "Sharma",
        userTypeId: "USR-004",
        userTypeName: "Retailer",
        companyName: "Sharma Digital Pay",
      },
      {
        id: "USR-REC-002",
        userCode: "REG-2024-002",
        firstName: "Amit",
        lastName: "Verma",
        userTypeId: "USR-003",
        userTypeName: "Distributor",
        companyName: "Verma Telecom Services",
      },
      {
        id: "USR-REC-003",
        userCode: "REG-2024-003",
        firstName: "Pooja",
        lastName: "Patel",
        userTypeId: "USR-005",
        userTypeName: "API User / Merchant",
        companyName: "Patel FinTech",
      },
    ];
  }, [masterUsersData]);

  // 3. Payout Services Query
  const { data: payoutServicesData = [] } = usePayoutListQuery();
  const payoutServices = useMemo(() => {
    if (payoutServicesData && payoutServicesData.length > 0) {
      return payoutServicesData;
    }
    return [
      {
        id: "PAY-101",
        providerName: "RazorpayX Direct",
        apiName: "Instant IMPS/NEFT Engine",
      },
      {
        id: "PAY-102",
        providerName: "Cashfree AutoPayout",
        apiName: "Standard Settlement Route",
      },
      {
        id: "PAY-103",
        providerName: "Paytm Payout Gateway",
        apiName: "Express Node Route",
      },
    ];
  }, [payoutServicesData]);

  const payoutProviderOptions: readonly FieldOption[] = useMemo(() => {
    return payoutServices.map((p) => {
      const apiLabel = p.apiName ? " (" + p.apiName + ")" : "";
      return {
        label: p.providerName + apiLabel,
        value: p.providerName,
      };
    });
  }, [payoutServices]);

  const fallbackProviderOptions: readonly FieldOption[] = useMemo(() => {
    const serviceOpts = payoutServices.map((p) => {
      const apiLabel = p.apiName ? " (" + p.apiName + ")" : "";
      return {
        label: p.providerName + apiLabel,
        value: p.providerName,
      };
    });
    return [
      { label: "None (No Fallback)", value: "" },
      ...serviceOpts,
    ];
  }, [payoutServices]);

  const form = useAppForm({
    defaultValues: {
      userTypeId: initialData?.userTypeId ?? (userTypes[0]?.id || "USR-004"),
      userId: initialData?.userId ?? "ALL",
      amountFrom: initialData?.amountFrom ?? ("" as unknown as number),
      amountTo: initialData?.amountTo ?? ("" as unknown as number),
      providerName: initialData?.providerName ?? initialData?.api ?? "",
      fallback: initialData?.fallback ?? "",
      status: (initialData?.status === "inactive" ? "inactive" : "active") as "active" | "inactive",
    } as AmountFormInput,


    onSubmit: async ({ value }) => {
      const parsed = amountSchema.safeParse(value);
      if (!parsed.success) return;

      const now = new Date().toISOString();
      const selectedUserTypeObj = userTypes.find((ut) => ut.id === parsed.data.userTypeId);
      const selectedMasterUser = parsed.data.userId && parsed.data.userId !== "ALL"
        ? masterUsers.find((u) => u.id === parsed.data.userId)
        : null;

      let resolvedUserName = "All Users";
      if (selectedMasterUser) {
        const fullName = (selectedMasterUser.firstName + " " + (selectedMasterUser.lastName || "")).trim();
        const comp = selectedMasterUser.companyName ? " (" + selectedMasterUser.companyName + ")" : "";
        resolvedUserName = fullName + comp;
      }

      const payloadData: Omit<AmountRecord, "id"> & { id?: string } = {
        id: initialData?.id,
        userTypeId: parsed.data.userTypeId,
        userTypeName: selectedUserTypeObj?.name || "",
        userId: parsed.data.userId === "ALL" ? "" : parsed.data.userId,
        userName: resolvedUserName,
        userCode: selectedMasterUser?.userCode || "",
        amountFrom: Number(parsed.data.amountFrom),
        amountTo: Number(parsed.data.amountTo),
        amount: `${parsed.data.amountFrom} - ${parsed.data.amountTo}`,
        providerName: parsed.data.providerName,
        api: parsed.data.providerName,
        fallback: parsed.data.fallback || "None",
        status: parsed.data.status,
        createdAt: mode === "create" ? now : initialData?.createdAt,
        updatedAt: now,
      };

      if (mode === "create") {
        await createMutation.mutateAsync(payloadData as AmountRecord);
      } else if (mode === "edit" && initialData?.id) {
        await updateMutation.mutateAsync({
          ...payloadData,
          id: initialData.id,
        } as AmountRecord);
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
        <form.Subscribe selector={(state) => state.values.userTypeId}>
          {(selectedUserTypeId) => {
            const filteredUsers = masterUsers.filter((u) => {
              if (!selectedUserTypeId) return true;
              return u.userTypeId === selectedUserTypeId;
            });

            const userOptions: readonly FieldOption[] = [
              { label: "All Users of this User Type (Default)", value: "ALL" },
              ...filteredUsers.map((u) => {
                const fullName = (u.firstName + " " + (u.lastName || "")).trim();
                const company = u.companyName ? " - " + u.companyName : "";
                const code = u.userCode ? " [" + u.userCode + "]" : "";
                return {
                  label: fullName + company + code,
                  value: u.id,
                };
              }),
            ];

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amountFieldsConfig.map((field) => {
                  let dynamicOptions: readonly FieldOption[] | undefined;
                  if (field.key === "userTypeId") {
                    dynamicOptions = userTypeOptions;
                  } else if (field.key === "userId") {
                    dynamicOptions = userOptions;
                  } else if (field.key === "providerName") {
                    dynamicOptions = payoutProviderOptions;
                  } else if (field.key === "fallback") {
                    dynamicOptions = fallbackProviderOptions;
                  } else if ("options" in field) {
                    dynamicOptions = field.options;
                  }

                  const isFullWidth = field.key === "userId";

                  return (
                    <div
                      key={field.key}
                      className={isFullWidth ? "col-span-1 md:col-span-2" : "col-span-1"}
                    >


                      <form.AppField
                        name={field.key as keyof AmountFormInput}
                        validators={{
                          onChange: ({ value }) => {
                            if (field.key === "amountTo") {
                              const amountFrom = form.getFieldValue("amountFrom" as never) as number | string;
                              if (value !== "" && amountFrom !== "" && Number(value) < Number(amountFrom)) {
                                return "Amount To must be greater than or equal to Amount From!";
                              }
                            }
                            const shape = amountSchema.shape[field.key as keyof typeof amountSchema.shape];
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
                            value={fieldState.state.value ?? ""}
                            onChange={(val) => {
                              fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0]);
                              if (field.key === "userTypeId") {
                                form.setFieldValue("userId" as never, "ALL" as never);
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
            label={mode === "create" ? "Save Amount Routing" : "Save Changes"}
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
