"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppForm } from "@/components/form_builder/form";
import {
  RESET_PASSWORD_DEFAULT_VALUES,
  MERCHANT_ROLES,
  MerchantRole,
  FORM_CONTAINER_VARIANTS,
  FORM_ITEM_VARIANTS,
} from "../constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Lock,
  User,
  KeyRound,
  ShieldCheck,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  Store,
  Network,
  Crown,
} from "lucide-react";
import { useAuthState } from "../stores/authState";
import { motion } from "framer-motion";
import { useResetPasswordMutation } from "../hooks";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { pendingUserId, error, successMessage, clearMessages } = useAuthState();
  const { mutate: resetPassword, isPending: isLoading } = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Read URL query params if present (e.g. ?userId=...&role=...&otp=...)
  const queryUserId = searchParams.get("userId") || "";
  const queryRole = (searchParams.get("role") as MerchantRole);
  const queryOtp = searchParams.get("otp") || "";

  const defaultValues = {
    userId: queryUserId || pendingUserId || RESET_PASSWORD_DEFAULT_VALUES.userId,
    role: (queryRole && MERCHANT_ROLES.some((r) => r.value === queryRole)
      ? queryRole
      : "retailer") as MerchantRole,
    otpCode: queryOtp || RESET_PASSWORD_DEFAULT_VALUES.otpCode,
    newPassword: RESET_PASSWORD_DEFAULT_VALUES.newPassword,
    confirmPassword: RESET_PASSWORD_DEFAULT_VALUES.confirmPassword,
  };

  const handleSubmit = ({ value }: { value: typeof defaultValues }) => {
    clearMessages();
    resetPassword(value, {
      onSuccess: () => {
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      },
    });
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: handleSubmit,
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "superdistributor":
        return <Crown className="h-4 w-4 text-amber-500" />;
      case "distributor":
        return <Network className="h-4 w-4 text-indigo-500" />;
      case "retailer":
      default:
        return <Store className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <motion.div
      variants={FORM_CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-md p-8 rounded-xl bg-card border border-border shadow-xl backdrop-blur-sm transition-all duration-300"
    >
      <motion.div variants={FORM_ITEM_VARIANTS} className="text-center mb-6">
        <div className="inline-flex items-center justify-center mb-3">
          <Image
            src="/logo/asl_logo.png"
            alt="Company Logo"
            width={48}
            height={48}
            style={{ width: "auto" }}
            className="h-12 object-contain"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Reset Password
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Set a new password for your Retailer, Distributor, or Super Distributor account
        </p>
      </motion.div>

      {error && (
        <motion.div
          variants={FORM_ITEM_VARIANTS}
          className="mb-6 p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-2"
        >
          {error}
        </motion.div>
      )}

      {successMessage && (
        <motion.div
          variants={FORM_ITEM_VARIANTS}
          className="mb-6 p-4 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium animate-in fade-in slide-in-from-top-2 flex items-center space-x-2"
        >
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
        className="space-y-4"
      >
        {/* Merchant Role Selector */}
        <form.Field name="role">
          {(field) => (
            <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="role" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Account Role
                </Label>
                <span className="text-[11px] text-muted-foreground">Select your merchant level</span>
              </div>
              <Select
                value={field.state.value}
                onValueChange={(val) =>
                  field.handleChange(val as "retailer" | "distributor" | "superdistributor")
                }
              >
                <SelectTrigger id="role" className="w-full h-10 border-blue-600/30 focus:border-blue-600">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {MERCHANT_ROLES.map((roleItem) => (
                    <SelectItem key={roleItem.value} value={roleItem.value}>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(roleItem.value)}
                        <span className="font-medium">{roleItem.label}</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">({roleItem.description})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}
        </form.Field>

        {/* User ID Field */}
        <form.Field name="userId">
          {(field) => (
            <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-1.5">
              <Label htmlFor="userId" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                User ID / Merchant ID
              </Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="userId"
                  type="text"
                  placeholder="e.g. RET1001 / DIS2002 / SD3003"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-10 pr-4 h-10 rounded-md focus:ring-0 focus:outline-none border-blue-600/30 focus:border-blue-600"
                />
              </div>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive font-medium">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </motion.div>
          )}
        </form.Field>

        {/* OTP Code Field (Optional / Verification Code) */}
        <form.Field name="otpCode">
          {(field) => (
            <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="otpCode" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Verification Code / OTP
                </Label>
                <span className="text-[11px] text-muted-foreground">Received on phone / email</span>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="otpCode"
                  type="text"
                  maxLength={6}
                  placeholder="Enter 4-6 digit OTP code"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
                  className="pl-10 pr-4 h-10 rounded-md focus:ring-0 focus:outline-none border-blue-600/30 focus:border-blue-600 tracking-wider font-mono"
                />
              </div>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive font-medium">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </motion.div>
          )}
        </form.Field>

        {/* New Password Field */}
        <form.Field name="newPassword">
          {(field) => (
            <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-1.5">
              <Label htmlFor="newPassword" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-10 pr-12 h-10 rounded-md focus:ring-0 focus:outline-none border-blue-600/30 focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive font-medium">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </motion.div>
          )}
        </form.Field>

        {/* Confirm Password Field */}
        <form.Field name="confirmPassword">
          {(field) => (
            <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Confirm New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-10 pr-12 h-10 rounded-md focus:ring-0 focus:outline-none border-blue-600/30 focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive font-medium">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </motion.div>
          )}
        </form.Field>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [
            state.values.userId,
            state.values.newPassword,
            state.values.confirmPassword,
            isLoading,
          ]}
        >
          {([userId, newPassword, confirmPassword, loading]) => {
            const isFull = Boolean(
              userId &&
              String(userId).trim() !== "" &&
              newPassword &&
              String(newPassword).length >= 6 &&
              confirmPassword &&
              newPassword === confirmPassword
            );

            return (
              <motion.div variants={FORM_ITEM_VARIANTS} className="pt-2">
                <Button
                  type="submit"
                  disabled={Boolean(loading) || !isFull}
                  className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 active:scale-[0.99] transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:active:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span>Reset Password</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            );
          }}
        </form.Subscribe>
      </form>

      <motion.div variants={FORM_ITEM_VARIANTS} className="mt-6 pt-5 border-t border-border/60 text-center">
        <Link
          href="/login"
          className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Back to Login
        </Link>
      </motion.div>
    </motion.div>
  );
}
