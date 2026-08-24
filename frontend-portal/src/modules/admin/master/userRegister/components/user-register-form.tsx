"use client";

import { useMemo } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { userRegisterSchema, UserRegisterFormInput } from "../validations";
import { userRegisterFormSections, UserFormFieldConfig } from "../constants";
import { useCreateUserRegisterMutation, useUpdateUserRegisterMutation } from "../hooks";
import { UserRegisterRecord } from "../types";
import { Save, User, MapPin, ShieldCheck, Package, Calendar } from "lucide-react";
import { formatISODate } from "@/lib/datefns";

// Dynamic Dropdown Hooks
import { useUserTypeListQuery } from "@/modules/admin/settings/user-type/hooks";
import { useGenderListQuery } from "@/modules/admin/settings/gender/hooks";
import { useIsVerifyListQuery } from "@/modules/admin/settings/is-verify/hooks";
import { usePackageListQuery } from "@/modules/admin/packages/hooks";
import { useLoginStatusListQuery } from "@/modules/admin/settings/login-status/hooks";


export interface UserRegisterFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: UserRegisterRecord | null;
  readonly onSuccess?: () => void;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  basic: <User className="w-4 h-4 text-primary" />,
  address: <MapPin className="w-4 h-4 text-primary" />,
  other: <ShieldCheck className="w-4 h-4 text-primary" />,
  package: <Package className="w-4 h-4 text-primary" />,
};

export function UserRegisterForm({ mode, initialData, onSuccess }: UserRegisterFormProps) {
  const createMutation = useCreateUserRegisterMutation();
  const updateMutation = useUpdateUserRegisterMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // Fetch dynamic dropdown data
  const { data: userTypes = [] } = useUserTypeListQuery();
  const { data: genders = [] } = useGenderListQuery();
  const { data: isVerifies = [] } = useIsVerifyListQuery();
  const { data: packages = [] } = usePackageListQuery();
  const { data: loginStatuses = [] } = useLoginStatusListQuery();

  // Map dynamic options with fallbacks
  const userTypeOptions = useMemo(() => {
    if (userTypes.length > 0) {
      return userTypes.map((u) => ({ label: u.name, value: u.id }));
    }
    return [
      { label: "Retailer", value: "retailer" },
      { label: "Distributor", value: "distributor" },
      { label: "Master Distributor", value: "master_distributor" },
      { label: "API Partner", value: "api_partner" },
    ];
  }, [userTypes]);

  const genderOptions = useMemo(() => {
    if (genders.length > 0) {
      return genders.map((g) => ({
        label: g.genderName || g.code,
        value: (g.code || g.genderName).toUpperCase(),
      }));
    }
    return [
      { label: "Male", value: "MALE" },
      { label: "Female", value: "FEMALE" },
      { label: "Other", value: "OTHER" },
    ];
  }, [genders]);

  const isVerifyOptions = useMemo(() => {
    if (isVerifies.length > 0) {
      return isVerifies.map((v) => ({
        label: `${v.name} (${v.value})`,
        value: v.value || v.name,
      }));
    }
    return [
      { label: "Yes", value: "Y" },
      { label: "No", value: "N" },
    ];
  }, [isVerifies]);

  const packageOptions = useMemo(() => {
    if (packages.length > 0) {
      return packages.map((p) => ({
        label: p.packageName,
        value: p.id || p.packageName,
      }));
    }
    return [
      { label: "Standard Package", value: "PKG-STD" },
      { label: "Gold Package", value: "PKG-GOLD" },
      { label: "Platinum Package", value: "PKG-PLATINUM" },
      { label: "Diamond API Package", value: "PKG-DIAMOND" },
    ];
  }, [packages]);

  const loginStatusOptions = useMemo(() => {
    if (loginStatuses.length > 0) {
      return loginStatuses.map((s) => ({
        label: s.statusName || s.value,
        value: s.value || s.statusName,
      }));
    }
    return [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Blocked", value: "blocked" },
    ];
  }, [loginStatuses]);

  const getOptionsForField = (field: UserFormFieldConfig) => {
    switch (field.optionsKey) {
      case "userTypes":
        return userTypeOptions;
      case "genders":
        return genderOptions;
      case "isVerifies":
        return isVerifyOptions;
      case "packages":
        return packageOptions;
      case "loginStatuses":
        return loginStatusOptions;
      default:
        return field.staticOptions || [];
    }
  };

  const form = useAppForm({
    defaultValues: {
      // Basic Details
      firstName: initialData?.firstName ?? "",
      lastName: initialData?.lastName ?? "",
      userTypeId: initialData?.userTypeId ?? "",
      companyName: initialData?.companyName ?? "",
      contactNo: initialData?.contactNo ?? initialData?.mobile ?? "",
      whatsappNo: initialData?.whatsappNo ?? "",
      email: initialData?.email ?? "",
      dob: initialData?.dob ?? "",
      gender: initialData?.gender ?? "MALE",

      // Address Details
      address: initialData?.address ?? "",
      landmark: initialData?.landmark ?? "",
      nationality: initialData?.nationality ?? "Indian",
      pinCode: initialData?.pinCode ?? "",
      panNo: initialData?.panNo ?? "",

      // Other's Details
      gstNo: initialData?.gstNo ?? "",
      aadhaarNo: initialData?.aadhaarNo ?? "",
      userIpAddress: initialData?.userIpAddress ?? "",
      callbackUrl: initialData?.callbackUrl ?? "",
      isOtpVerify: initialData?.isOtpVerify ?? "N",

      // Package Details
      packageId: initialData?.packageId ?? "",
      lockAmount: initialData?.lockAmount ?? "0",
      loginStatus: initialData?.loginStatus ?? "active",
    } as UserRegisterFormInput,
    onSubmit: async ({ value }) => {
      const parsed = userRegisterSchema.safeParse(value);
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
        className="space-y-4"
      >
        <div className="space-y-6 max-h-[64vh] overflow-y-auto pr-2">
          {userRegisterFormSections.map((section) => (
            <div
              key={section.id}
              className="rounded-xl border border-border/80 bg-card/60 p-4 sm:p-5 shadow-xs space-y-4"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                    {SECTION_ICONS[section.id]}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground tracking-tight">
                      {section.title}
                    </h2>
                    {section.description && (
                      <p className="text-xs text-muted-foreground">
                        {section.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div
                    key={field.key}
                    className={field.colSpan === 2 ? "col-span-1 md:col-span-2" : "col-span-1"}
                  >
                    <form.AppField
                      name={field.key}
                      validators={{
                        onChange: ({ value }) => {
                          const shape =
                            userRegisterSchema.shape[
                              field.key as keyof typeof userRegisterSchema.shape
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
                          <div className="space-y-1">
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

                            {/* Date of Birth formatted preview using formatISODate from lib/datefns */}
                            {field.key === "dob" && typeof fieldValue === "string" && fieldValue.trim() !== "" && (
                              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium pl-1 pt-0.5">
                                <Calendar className="w-3.5 h-3.5 text-primary" />
                                <span>
                                  Formatted View:{" "}
                                  <span className="text-foreground font-semibold">
                                    {(() => {
                                      try {
                                        return formatISODate({
                                          date: new Date(fieldValue),
                                          formatType: "dateOnly",
                                        });
                                      } catch {
                                        return fieldValue;
                                      }
                                    })()}
                                  </span>
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      }}
                    </form.AppField>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border bg-background sticky bottom-0">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Register User" : "Save Changes"}
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
