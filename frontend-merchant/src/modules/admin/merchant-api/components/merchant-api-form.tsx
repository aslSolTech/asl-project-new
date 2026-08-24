"use client";

import { useMemo } from "react";
import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { merchantApiSchema, MerchantApiFormInput } from "../validations";
import { useCreateMerchantApiMutation, useUpdateMerchantApiMutation } from "../hooks";
import { MerchantApiRecord } from "../types";
import { useUserRegisterListQuery } from "@/modules/admin/master/userRegister/hooks";
import { Save } from "lucide-react";

export interface MerchantApiFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: MerchantApiRecord | null;
  readonly onSuccess?: () => void;
}

export function MerchantApiForm({ mode, initialData, onSuccess }: Readonly<MerchantApiFormProps>) {
  const createMutation = useCreateMerchantApiMutation();
  const updateMutation = useUpdateMerchantApiMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  // Load API Partner Users from Users Master
  const { data: usersList = [] } = useUserRegisterListQuery();

  const apiPartnerOptions = useMemo(() => {
    const partnerUsers = usersList.filter(
      (u) =>
        u.userTypeName?.toLowerCase().includes("api") ||
        u.userTypeId?.toLowerCase().includes("api") ||
        u.userTypeName?.toLowerCase().includes("merchant")
    );

    const activeList = partnerUsers.length > 0 ? partnerUsers : usersList;
    return activeList.map((u) => ({
      label: `${[u.firstName, u.lastName].filter(Boolean).join(" ") || u.userName} (${u.companyName})`,
      value: u.id,
      name: [u.firstName, u.lastName].filter(Boolean).join(" ") || u.userName || "Partner",
      company: u.companyName || "Company",
    }));
  }, [usersList]);

  const form = useAppForm({
    defaultValues: {
      partnerId: initialData?.partnerId ?? (apiPartnerOptions[0]?.value || "USR-REC-003"),
      partnerName: initialData?.partnerName ?? (apiPartnerOptions[0]?.name || "Pooja Patel"),
      partnerCompanyName: initialData?.partnerCompanyName ?? (apiPartnerOptions[0]?.company || "Patel Fintech Solutions"),
      retailerCode: initialData?.retailerCode ?? "",
      retailerName: initialData?.retailerName ?? "",
      shopName: initialData?.shopName ?? "",
      contactNo: initialData?.contactNo ?? "",
      email: initialData?.email ?? "",
      panNo: initialData?.panNo ?? "",
      aadhaarNo: initialData?.aadhaarNo ?? "",
      kycStatus: initialData?.kycStatus ?? "pending",
      isOtpVerify: initialData?.isOtpVerify ?? "Y",
      isBlocked: initialData?.isBlocked ?? false,
      status: initialData?.status ?? "active",
      callbackUrl: initialData?.callbackUrl ?? "",
      apiKey: initialData?.apiKey ?? "",
    } as MerchantApiFormInput,
    onSubmit: async ({ value }) => {
      const parsed = merchantApiSchema.safeParse(value);
      if (!parsed.success) return;

      const selectedPartner = apiPartnerOptions.find((p) => p.value === parsed.data.partnerId);
      const submissionData = {
        ...parsed.data,
        partnerName: selectedPartner ? selectedPartner.name : parsed.data.partnerName,
        partnerCompanyName: selectedPartner ? selectedPartner.company : parsed.data.partnerCompanyName,
      };

      if (mode === "create") {
        await createMutation.mutateAsync(submissionData);
      } else if (mode === "edit" && initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          ...submissionData,
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
        className="space-y-6 max-h-[75vh] overflow-y-auto px-1 pr-2"
      >
        {/* SECTION 1: API PARTNER SELECTION */}
        <div className="bg-card border border-border/80 rounded-xl p-4 shadow-xs space-y-3">
          <div className="border-b border-border/60 pb-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
              API Partner Mapping
            </h3>
            <p className="text-xs text-muted-foreground">
              Select the registered API Partner under whom this merchant retailer is registered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <form.AppField
              name="partnerId"
              validators={{
                onChange: ({ value }) => {
                  const res = merchantApiSchema.shape.partnerId.safeParse(value);
                  return res.success ? undefined : res.error.issues[0]?.message;
                },
              }}
            >
              {(fieldState) => (
                <FormField
                  name="partnerId"
                  label="API Partner Account"
                  type="select"
                  placeholder="Select API Partner..."
                  required
                  options={apiPartnerOptions}
                  value={fieldState.state.value}
                  onChange={(val) => {
                    fieldState.handleChange(val as string);
                    const selected = apiPartnerOptions.find((p) => p.value === val);
                    if (selected) {
                      form.setFieldValue("partnerName", selected.name);
                      form.setFieldValue("partnerCompanyName", selected.company);
                    }
                  }}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>

            <form.AppField name="partnerCompanyName">
              {(fieldState) => (
                <FormField
                  name="partnerCompanyName"
                  label="Partner Company Name"
                  type="text"
                  placeholder="Auto-filled partner company..."
                  readOnly
                  disabled
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as string)}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>
          </div>
        </div>

        {/* SECTION 2: RETAILER IDENTITY & BUSINESS INFO */}
        <div className="bg-card border border-border/80 rounded-xl p-4 shadow-xs space-y-3">
          <div className="border-b border-border/60 pb-2">
            <h3 className="text-sm font-bold text-foreground">Retailer & Outlet Details</h3>
            <p className="text-xs text-muted-foreground">
              Primary business identity, outlet name and code for terminal recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            <form.AppField
              name="retailerCode"
              validators={{
                onChange: ({ value }) => {
                  const res = merchantApiSchema.shape.retailerCode.safeParse(value);
                  return res.success ? undefined : res.error.issues[0]?.message;
                },
              }}
            >
              {(fieldState) => (
                <FormField
                  name="retailerCode"
                  label="Retailer Code / Terminal ID"
                  type="text"
                  placeholder="e.g. REG-2024-101"
                  required
                  textTransform="uppercase"
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as string)}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>

            <form.AppField
              name="retailerName"
              validators={{
                onChange: ({ value }) => {
                  const res = merchantApiSchema.shape.retailerName.safeParse(value);
                  return res.success ? undefined : res.error.issues[0]?.message;
                },
              }}
            >
              {(fieldState) => (
                <FormField
                  name="retailerName"
                  label="Owner / Contact Person Name"
                  type="text"
                  placeholder="e.g. Rajesh Kumar"
                  required
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as string)}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>

            <form.AppField
              name="shopName"
              validators={{
                onChange: ({ value }) => {
                  const res = merchantApiSchema.shape.shopName.safeParse(value);
                  return res.success ? undefined : res.error.issues[0]?.message;
                },
              }}
            >
              {(fieldState) => (
                <FormField
                  name="shopName"
                  label="Shop / Business Outlet Name"
                  type="text"
                  placeholder="e.g. Rajesh Mobile & Pay"
                  required
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as string)}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>

            <form.AppField
              name="contactNo"
              validators={{
                onChange: ({ value }) => {
                  const res = merchantApiSchema.shape.contactNo.safeParse(value);
                  return res.success ? undefined : res.error.issues[0]?.message;
                },
              }}
            >
              {(fieldState) => (
                <FormField
                  name="contactNo"
                  label="Mobile Number (OTP Enabled)"
                  type="text"
                  placeholder="e.g. 9876543201"
                  required
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as string)}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>

            <form.AppField
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const res = merchantApiSchema.shape.email.safeParse(value);
                  return res.success ? undefined : res.error.issues[0]?.message;
                },
              }}
            >
              {(fieldState) => (
                <FormField
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="e.g. rajesh.pay@gmail.com"
                  required
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as string)}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>
          </div>
        </div>

        {/* SECTION 3: KYC COMPLIANCE & VERIFICATION */}
        <div className="bg-card border border-border/80 rounded-xl p-4 shadow-xs space-y-3">
          <div className="border-b border-border/60 pb-2">
            <h3 className="text-sm font-bold text-foreground">KYC Documents & Status</h3>
            <p className="text-xs text-muted-foreground">
              Official government IDs for regulatory KYC compliance check.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            <form.AppField
              name="panNo"
              validators={{
                onChange: ({ value }) => {
                  const res = merchantApiSchema.shape.panNo.safeParse(value);
                  return res.success ? undefined : res.error.issues[0]?.message;
                },
              }}
            >
              {(fieldState) => (
                <FormField
                  name="panNo"
                  label="PAN Number"
                  type="text"
                  placeholder="e.g. ABCDE1234F"
                  required
                  textTransform="uppercase"
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as string)}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>

            <form.AppField
              name="aadhaarNo"
              validators={{
                onChange: ({ value }) => {
                  const res = merchantApiSchema.shape.aadhaarNo.safeParse(value);
                  return res.success ? undefined : res.error.issues[0]?.message;
                },
              }}
            >
              {(fieldState) => (
                <FormField
                  name="aadhaarNo"
                  label="Aadhaar Number (12 Digits)"
                  type="text"
                  placeholder="e.g. 987654321098"
                  required
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as string)}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>

            <form.AppField name="kycStatus">
              {(fieldState) => (
                <FormField
                  name="kycStatus"
                  label="KYC Verification State"
                  type="select"
                  options={[
                    { label: "Verified (KYC Approved)", value: "verified" },
                    { label: "Pending (Under Review)", value: "pending" },
                    { label: "Rejected (KYC Failed)", value: "rejected" },
                  ]}
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as "verified" | "pending" | "rejected")}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>

            <form.AppField name="isOtpVerify">
              {(fieldState) => (
                <FormField
                  name="isOtpVerify"
                  label="Mobile OTP Verification"
                  type="select"
                  options={[
                    { label: "Yes (Verified via OTP)", value: "Y" },
                    { label: "No (Pending OTP)", value: "N" },
                  ]}
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as "Y" | "N")}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>

            <form.AppField name="status">
              {(fieldState) => (
                <FormField
                  name="status"
                  label="Account Status"
                  type="select"
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                    { label: "Blocked", value: "blocked" },
                  ]}
                  value={fieldState.state.value}
                  onChange={(val) => fieldState.handleChange(val as "active" | "inactive" | "blocked")}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>
          </div>
        </div>

        {/* SECTION 4: API & WEBHOOK CONFIG */}
        <div className="bg-card border border-border/80 rounded-xl p-4 shadow-xs space-y-3">
          <div className="border-b border-border/60 pb-2">
            <h3 className="text-sm font-bold text-foreground">API Credentials & Callback URL</h3>
            <p className="text-xs text-muted-foreground">
              Webhook URL for transaction callbacks and assigned merchant client key.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <form.AppField name="callbackUrl">
              {(fieldState) => (
                <FormField
                  name="callbackUrl"
                  label="Webhook / Callback URL"
                  type="text"
                  placeholder="https://api.partneroutlet.com/webhook"
                  value={fieldState.state.value ?? ""}
                  onChange={(val) => fieldState.handleChange(val as string)}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>

            <form.AppField name="apiKey">
              {(fieldState) => (
                <FormField
                  name="apiKey"
                  label="Client Live API Key"
                  type="text"
                  placeholder="e.g. mk_live_8f7b2c91a034de71"
                  value={fieldState.state.value ?? ""}
                  onChange={(val) => fieldState.handleChange(val as string)}
                  onBlur={fieldState.handleBlur}
                  error={fieldState.state.meta.errors.join(", ")}
                />
              )}
            </form.AppField>
          </div>
        </div>

        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm pt-3 pb-1 border-t border-border flex items-center justify-end gap-3">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Register Merchant Retailer" : "Save Retailer KYC"}
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
