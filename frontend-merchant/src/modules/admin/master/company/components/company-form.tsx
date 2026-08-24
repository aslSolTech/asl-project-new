"use client";

import { useAppForm } from "@/components/form_builder/form";
import { FormField } from "@/components/form_builder/fields/FormFields";
import { companySchema, CompanyFormInput } from "../validations";
import { companySetupFieldsConfig } from "../constants";
import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from "../hooks";
import { CompanyRecord } from "../types";
import { Save } from "lucide-react";

export interface CompanyFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: CompanyRecord | null;
  readonly onSuccess?: () => void;
}

export function CompanyForm({ mode, initialData, onSuccess }: CompanyFormProps) {
  const createMutation = useCreateCompanyMutation();
  const updateMutation = useUpdateCompanyMutation();

  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useAppForm({
    defaultValues: {
      companyLogo: initialData?.companyLogo ?? null,
      companyName: initialData?.companyName ?? "",
      printName: initialData?.printName ?? "",
      billnoPrefix: initialData?.billnoPrefix ?? "",
      beginingFrom: initialData?.beginingFrom ?? "",
      commencingFrom: initialData?.commencingFrom ?? "",
      address1: initialData?.address1 ?? "",
      address2: initialData?.address2 ?? "",
      address3: initialData?.address3 ?? "",
      country: initialData?.country ?? "India",
      state: initialData?.state ?? "",
      contactNumber1: initialData?.contactNumber1 ?? "",
      contactNumber2: initialData?.contactNumber2 ?? "",
      callbackNumber: initialData?.callbackNumber ?? "",
      landNumber: initialData?.landNumber ?? "",
      emailForService: initialData?.emailForService ?? "",
      emailForInvoice: initialData?.emailForInvoice ?? "",
      website: initialData?.website ?? "",
      faxNo: initialData?.faxNo ?? "",
      tinNo: initialData?.tinNo ?? "",
      cstNo: initialData?.cstNo ?? "",
      taxNo: initialData?.taxNo ?? "",
      panNo: initialData?.panNo ?? "",
      cinNo: initialData?.cinNo ?? "",
      gstNo: initialData?.gstNo ?? "",
      gstPer: initialData?.gstPer ?? 18,
      declaration: initialData?.declaration ?? "",
    } as CompanyFormInput,
    onSubmit: async ({ value }) => {
      const parsed = companySchema.safeParse(value);
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

  const renderField = (field: (typeof companySetupFieldsConfig)[number]) => (
    <form.AppField
      key={field.key}
      name={field.key}
      validators={{
        onChange: ({ value }) => {
          const shape = companySchema.shape[field.key as keyof typeof companySchema.shape];
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
          helperText={field.helperText}
          textTransform={field.textTransform}
          value={fieldState.state.value ?? ""}
          onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
          onBlur={fieldState.handleBlur}
          error={fieldState.state.meta.errors.join(", ")}
        />
      )}
    </form.AppField>
  );

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
        {/* Section 1: Logo & Company Basic Information */}
        <div className="rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" /> {" "}
            Company Identity & Primary Details
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Avatar & Logo Upload in Compact Sidebar */}
            <div className="lg:col-span-2 p-2 mx-auto flex flex-col items-center justify-center rounded bg-muted/40 border border-dashed border-border text-center">
              <form.AppField name="companyLogo">
                {(fieldState) => (
                  <FormField
                    name="companyLogo"
                    label="Company Logo"
                    type="file"
                    description="PNG, JPG or SVG"
                    value={fieldState.state.value}
                    onChange={(val) => fieldState.handleChange(val as Parameters<typeof fieldState.handleChange>[0])}
                    onBlur={fieldState.handleBlur}
                    error={fieldState.state.meta.errors.join(", ")}
                  />
                )}
              </form.AppField>
            </div>

            {/* Basic Identity Inputs utilizing the adjacent space */}
            <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                {renderField(companySetupFieldsConfig.find((f) => f.key === "companyName")!)}
              </div>
              {renderField(companySetupFieldsConfig.find((f) => f.key === "printName")!)}
              {renderField(companySetupFieldsConfig.find((f) => f.key === "billnoPrefix")!)}
              {renderField(companySetupFieldsConfig.find((f) => f.key === "beginingFrom")!)}
              {renderField(companySetupFieldsConfig.find((f) => f.key === "commencingFrom")!)}
            </div>
          </div>
        </div>

        {/* Section 2: Address & Location Details */}
        <div className="rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />{" "}
            Registered Address
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {renderField(companySetupFieldsConfig.find((f) => f.key === "address1")!)}
              {renderField(companySetupFieldsConfig.find((f) => f.key === "address2")!)}
              {renderField(companySetupFieldsConfig.find((f) => f.key === "address3")!)}
            </div>
            <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderField(companySetupFieldsConfig.find((f) => f.key === "state")!)}
              {renderField(companySetupFieldsConfig.find((f) => f.key === "country")!)}
            </div>
          </div>
        </div>

        {/* Section 3: Contact & Communication */}
        <div className="rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />{" "}
            Contact & Communication Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderField(companySetupFieldsConfig.find((f) => f.key === "contactNumber1")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "contactNumber2")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "callbackNumber")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "landNumber")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "emailForService")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "emailForInvoice")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "website")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "faxNo")!)}
          </div>
        </div>

        {/* Section 4: Legal, Tax & Statutory Details */}
        <div className="rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />{" "}
            Statutory & Tax Identifiers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderField(companySetupFieldsConfig.find((f) => f.key === "gstNo")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "gstPer")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "panNo")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "cinNo")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "tinNo")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "cstNo")!)}
            {renderField(companySetupFieldsConfig.find((f) => f.key === "taxNo")!)}
          </div>

          <div className="pt-2">
            {renderField(companySetupFieldsConfig.find((f) => f.key === "declaration")!)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm flex items-center justify-end gap-3 pt-4 border-t border-border mt-6">
          <form.SubscribeButton
            icon={<Save className="w-4 h-4" />}
            label={mode === "create" ? "Save Company" : "Save Changes"}
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
