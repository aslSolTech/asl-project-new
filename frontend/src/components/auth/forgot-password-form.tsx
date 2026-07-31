"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppForm } from "@/components/shared/form/form";
import { FORGOT_PASSWORD_DEFAULT_VALUES, FORM_CONTAINER_VARIANTS, FORM_ITEM_VARIANTS } from "@/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { motion } from "framer-motion";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { requestPasswordReset, isLoading, error, successMessage, clearMessages } = useAuthStore();

  const defaultValues = FORGOT_PASSWORD_DEFAULT_VALUES;

  const handleSubmit = async ({ value }: { value: typeof defaultValues }) => {
    clearMessages();
    const success = await requestPasswordReset(value);
    if (success) {
      setTimeout(() => {
        router.push("/verify-otp");
      }, 1200);
    }
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
      className="w-full max-w-md p-8 rounded-xl bg-card border border-border shadow-xl backdrop-blur-sm transition-all duration-300"
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
          Forgot Password
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your User ID to receive a verification OTP code for resetting your password
        </p>
      </motion.div>

      {error && (
        <motion.div variants={FORM_ITEM_VARIANTS} className="mb-6 p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-2">
          {error}
        </motion.div>
      )}

      {successMessage && (
        <motion.div variants={FORM_ITEM_VARIANTS} className="mb-6 p-4 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium animate-in fade-in slide-in-from-top-2">
          {successMessage}
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
        {/* User ID Field */}
        <form.Field name="userId">
          {(field) => (
            <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-2">
              <Label htmlFor="userId" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                User ID
              </Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter registered User ID"
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

        {/* Submit Button */}
        <form.Subscribe selector={(state) => [state.values.userId, isLoading]}>
          {([userId, loading]) => {
            const isFull = Boolean(userId && String(userId).trim() !== "");
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
                      <span>Sending Verification Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send OTP Code</span>
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
