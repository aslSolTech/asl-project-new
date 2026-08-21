"use client";

import { useMemo, useState } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { userSchema, UserFormInput } from "../validations";
import { userFieldsConfig } from "../constants";
import { useCreateUserMutation, useUpdateUserMutation } from "../hooks";
import { UserRecord } from "../types";
import { useUserTypeListQuery } from "@/modules/admin/settings/user-type/hooks";
import { DEFAULT_USER_TYPES } from "@/modules/admin/settings/user-type/constants";
import { useUserRegisterListQuery } from "@/modules/admin/master/userRegister/hooks";
import { useApiRegisterListQuery } from "@/modules/admin/master/apiRegister/hooks";
import { Save } from "lucide-react";

export interface UserFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: UserRecord | null;
  readonly onSuccess?: () => void;
}

export function UserForm({ mode, initialData, onSuccess }: UserFormProps) {
  const [showAllApis, setShowAllApis] = useState(false);
  const createMutation = useCreateUserMutation();
  const updateMutation = useUpdateUserMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // 1. User Types Query (from Settings)
  const { data: userTypesData = [] } = useUserTypeListQuery();
  const userTypes = useMemo(() => {
    return userTypesData.length > 0 ? userTypesData : DEFAULT_USER_TYPES;
  }, [userTypesData]);

  const userTypeOptions = useMemo(() => {
    return userTypes.map((ut) => ({
      label: ut.name,
      value: String(ut.id),
    }));
  }, [userTypes]);


  // 2. Master Users Query (from Master > User Management > Users)
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
        email: "rahul.sharma@example.com",
      },
      {
        id: "USR-REC-002",
        userCode: "REG-2024-002",
        firstName: "Amit",
        lastName: "Verma",
        userTypeId: "USR-003",
        userTypeName: "Distributor",
        companyName: "Verma Telecom Services",
        email: "amit.verma@example.com",
      },
      {
        id: "USR-REC-003",
        userCode: "REG-2024-003",
        firstName: "Pooja",
        lastName: "Patel",
        userTypeId: "USR-005",
        userTypeName: "API User / Merchant",
        companyName: "Patel FinTech",
        email: "pooja.patel@example.com",
      },
    ];
  }, [masterUsersData]);

  // 3. Registered APIs Query
  const { data: apiListData } = useApiRegisterListQuery();
  const apiList = useMemo(() => {
    if (apiListData && apiListData.length > 0) return apiListData;
    return [
      { id: "api_paysprint", apiName: "PaySprint Recharge API", apiType: "Recharge", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
      { id: "api_eko", apiName: "Eko Connect API", apiType: "Recharge", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
      { id: "api_mobikwik", apiName: "MobiKwik BBPS API", apiType: "Bill Payment", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
      { id: "api_razorpay_payout", apiName: "RazorpayX Payout API", apiType: "Payout", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
      { id: "api_cashfree_payout", apiName: "Cashfree Payout Direct", apiType: "Payout", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
      { id: "api_sprint_verify", apiName: "Sprint Verification API", apiType: "Verification", developmentType: "admin" as const, url: "", requestType: "POST", responseType: "JSON" },
    ];
  }, [apiListData]);

  const form = useAppForm({
    defaultValues: {
      userTypeId: initialData?.userTypeId ?? "",
      userId: initialData?.userId ?? "",
      apiIds: initialData?.apiIds ?? [],
      fallback: (initialData?.fallback === "inactive" ? "inactive" : "active") as "active" | "inactive",
      status: initialData?.status ?? "active",
    } as UserFormInput,
    onSubmit: async ({ value }) => {
      const parsed = userSchema.safeParse(value);
      if (!parsed.success) return;

      const selectedUserType = userTypes.find((ut) => ut.id === parsed.data.userTypeId);
      const selectedUser = masterUsers.find((u) => u.id === parsed.data.userId);
      const selectedApiNames = apiList
        .filter((api) => parsed.data.apiIds.includes(api.id))
        .map((api) => api.apiName);

      const resolvedUserName = selectedUser
        ? `${selectedUser.firstName || ""} ${selectedUser.lastName || ""}`.trim() || selectedUser.companyName || selectedUser.id
        : parsed.data.userId;

      const payload: Partial<UserRecord> = {
        ...parsed.data,
        userTypeName: selectedUserType?.name || parsed.data.userTypeId,
        userName: resolvedUserName,
        userCode: selectedUser?.userCode || "",
        apiNames: selectedApiNames,
      };

      if (mode === "create") {
        await createMutation.mutateAsync(payload as Omit<UserRecord, "id">);
      } else if (mode === "edit" && initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          ...payload,
        } as UserRecord);
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
        <form.Subscribe selector={(state) => [state.values.userTypeId]}>
          {([selectedUserTypeId]) => {
            // Filter users based on selected user type
            const filteredUsers = masterUsers.filter((u) => {
              if (!selectedUserTypeId) return true;
              return u.userTypeId === selectedUserTypeId;
            });

            // Ensure current initialData user is present so name resolves during edit
            const hasCurrentSelected = filteredUsers.some((u) => u.id === initialData?.userId);
            if (!hasCurrentSelected && initialData?.userId) {
              const matchedGlobal = masterUsers.find((u) => u.id === initialData.userId);
              if (matchedGlobal) {
                filteredUsers.unshift(matchedGlobal);
              } else if (initialData.userName) {
                filteredUsers.unshift({
                  id: initialData.userId,
                  userCode: initialData.userCode || "",
                  firstName: initialData.userName,
                  lastName: "",
                  userTypeId: selectedUserTypeId || "",
                  userTypeName: initialData.userTypeName || "User",
                  companyName: "",
                  email: "",
                });
              }
            }

            const userOptions = filteredUsers.map((u) => {
              const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.companyName || u.id;
              const codeBadge = u.userCode ? ` (${u.userCode})` : "";
              return {
                label: `${fullName}${codeBadge}`,
                value: u.id,
              };
            });

            const effectiveApis = [...apiList];

            // Ensure any initialData API ids are present in options
            const currentApiIds = initialData?.apiIds || [];
            currentApiIds.forEach((apiId, idx) => {
              if (!effectiveApis.some((api) => api.id === apiId)) {
                const apiName = initialData?.apiNames?.[idx] || apiId;
                effectiveApis.push({
                  id: apiId,
                  apiName,
                  apiType: "API",
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
                {userFieldsConfig.map((field) => {
                  let dynamicOptions: { label: string; value: string }[] | undefined;
                  let isFullWidth = false;

                  if (field.key === "userTypeId") {
                    dynamicOptions = [...userTypeOptions];
                  } else if (field.key === "userId") {
                    dynamicOptions = userOptions;
                  } else if (field.key === "apiIds") {
                    dynamicOptions = apiOptions;
                    isFullWidth = true;
                  } else if ("options" in field) {
                    dynamicOptions = [...field.options];
                  }

                  return (
                    <div
                      key={field.key}
                      className={isFullWidth ? "col-span-1 md:col-span-2 space-y-1.5" : "col-span-1"}
                    >
                      {field.key === "apiIds" && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {showAllApis
                              ? `Showing all (${apiList.length}) registered APIs`
                              : `Select vendor routing APIs (${apiOptions.length})`}
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowAllApis((prev) => !prev)}
                            className="text-xs font-semibold text-primary hover:underline cursor-pointer transition-colors"
                          >
                            {showAllApis ? "Compact View" : "Show All APIs"}
                          </button>
                        </div>
                      )}
                      <form.AppField
                        name={field.key}
                        validators={{
                          onChange: ({ value }) => {
                            const shape =
                              userSchema.shape[field.key as keyof typeof userSchema.shape];
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
                              // Reset dependent user selection if user type changes
                              if (field.key === "userTypeId") {
                                form.setFieldValue("userId", "");
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
