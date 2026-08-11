"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppForm } from "@/components/form_builder/form";
import { useAuthState } from "../stores/authState";
import { SIGNUP_DEFAULT_VALUES, BUSINESS_TYPES, FORM_CONTAINER_VARIANTS, FORM_ITEM_VARIANTS } from "../constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Briefcase,
  FileText,
  Mail,
  Phone,
  User,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import { useSignupCompanyMutation } from "../hooks";

export function CompanySignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { error, successMessage, clearMessages } = useAuthState();
  const { mutate: signupCompany, isPending: isLoading } = useSignupCompanyMutation();

  const defaultValues = SIGNUP_DEFAULT_VALUES;

  const handleSubmit = ({ value }: { value: typeof defaultValues }) => {
    clearMessages();
    signupCompany(value, {
      onSuccess: () => {
        setTimeout(() => {
          router.push("/verify-otp");
        }, 1200);
      },
    });
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: handleSubmit,
  });

  return (
    <motion.div
      variants={FORM_CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-2xl p-8 rounded-xl bg-card border border-border shadow-xl backdrop-blur-sm transition-all duration-300"
    >
      <motion.div variants={FORM_ITEM_VARIANTS} className="text-center mb-8">
        <div className="inline-flex items-center justify-center mb-3">
          <Image
            src="/logo/logo.png"
            alt="Company Logo"
            width={48}
            height={48}
            style={{ width: "auto" }}
            className="h-12 object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-500">
          Company Onboarding
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Register your organization and setup primary administrator account
        </p>
      </motion.div>

      {error && (
        <motion.div variants={FORM_ITEM_VARIANTS} className="mb-6 p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-2">
          {error}
        </motion.div>
      )}

      {successMessage && (
        <motion.div variants={FORM_ITEM_VARIANTS} className="mb-6 p-4 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium animate-in fade-in slide-in-from-top-2 flex items-center space-x-2">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          <span>{successMessage}</span>
        </motion.div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Section 1: Company Information */}
        <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
            1. Organization Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <form.Field name="companyName">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="companyName" className="text-xs font-semibold text-foreground">
                    Company Name *
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Acme Financial Services"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 h-10 text-xs rounded-md"
                    />
                  </div>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Business Type (Shadcn Select) */}
            <form.Field name="businessType">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="businessType" className="text-xs font-semibold text-foreground">
                    Business Entity Type *
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => field.handleChange(val || "")}
                    >
                      <SelectTrigger id="businessType" className="pl-10 w-full h-10 text-xs rounded-md">
                        <SelectValue placeholder="Select Entity Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUSINESS_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="text-xs">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Tax ID */}
            <form.Field name="taxId">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="taxId" className="text-xs font-semibold text-foreground">
                    GSTIN / Tax Registration No *
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      id="taxId"
                      type="text"
                      placeholder="22AAAAA0000A1Z5"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value.toUpperCase())}
                      className="pl-10 h-10 text-xs rounded-md"
                    />
                  </div>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Official Email */}
            <form.Field name="companyEmail">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="companyEmail" className="text-xs font-semibold text-foreground">
                    Official Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      id="companyEmail"
                      type="email"
                      placeholder="contact@company.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 h-10 text-xs rounded-md"
                    />
                  </div>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Company Phone */}
            <form.Field name="companyPhone">
              {(field) => (
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="companyPhone" className="text-xs font-semibold text-foreground">
                    Company Contact Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      id="companyPhone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 h-10 text-xs rounded-md"
                    />
                  </div>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>
          </div>
        </motion.div>

        {/* Section 2: Primary Admin Credentials */}
        <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-4 pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
            2. Primary Administrator Account
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Admin Full Name */}
            <form.Field name="adminFullName">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="adminFullName" className="text-xs font-semibold text-foreground">
                    Admin Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      id="adminFullName"
                      type="text"
                      placeholder="John Doe"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 h-10 text-xs rounded-md"
                    />
                  </div>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Admin User ID */}
            <form.Field name="adminUserId">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="adminUserId" className="text-xs font-semibold text-foreground">
                    Desired Admin User ID *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      id="adminUserId"
                      type="text"
                      placeholder="ADMIN_ACME"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value.toUpperCase())}
                      className="pl-10 h-10 text-xs rounded-md"
                    />
                  </div>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 pr-10 h-10 text-xs rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Confirm Password */}
            <form.Field name="confirmPassword">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-semibold text-foreground">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 h-10 text-xs rounded-md"
                    />
                  </div>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>
          </div>
        </motion.div>

        {/* Terms Agreement (Shadcn Checkbox) */}
        <form.Field name="agreeTerms">
          {(field) => (
            <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-1.5">
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="agreeTerms"
                  checked={Boolean(field.state.value)}
                  onCheckedChange={(checked) => field.handleChange(Boolean(checked))}
                  className="rounded-sm"
                />
                <Label htmlFor="agreeTerms" className="text-xs text-muted-foreground cursor-pointer select-none">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive font-medium">{String(field.state.meta.errors[0])}</p>
              )}
            </motion.div>
          )}
        </form.Field>

        {/* Submit Button (Shadcn Button) */}
        <form.Subscribe selector={(state) => [state.values, isLoading] as const}>
          {([values, loading]) => {
            const v = typeof values === "object" && values !== null ? values : null;
            const isFull = Boolean(
              v?.companyName?.trim() &&
              v?.businessType?.trim() &&
              v?.taxId?.trim() &&
              v?.companyEmail?.trim() &&
              v?.companyPhone?.trim() &&
              v?.adminFullName?.trim() &&
              v?.adminUserId?.trim() &&
              v?.password?.trim() &&
              v?.confirmPassword?.trim() &&
              v?.agreeTerms
            );
            return (
              <motion.div variants={FORM_ITEM_VARIANTS}>
                <Button
                  type="submit"
                  disabled={Boolean(loading) || !isFull}
                  className="w-full h-11 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 active:scale-[0.99] transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:active:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting Onboarding Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Company Signup</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            );
          }}
        </form.Subscribe>
      </form>

      <motion.div variants={FORM_ITEM_VARIANTS} className="mt-8 pt-6 border-t border-border/60 text-center">
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 dark:text-blue-500 font-semibold hover:no-underline">
            Sign In Here
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
