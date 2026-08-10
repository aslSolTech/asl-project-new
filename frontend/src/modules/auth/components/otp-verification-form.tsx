"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppForm } from "@/components/form_builder/form";
import { useAuthStore } from "@/stores/authStore";
import {
  OTP_VERIFICATION_DEFAULT_VALUES,
  OTP_TIMER_INITIAL_SECONDS,
  FORM_CONTAINER_VARIANTS,
  FORM_ITEM_VARIANTS,
} from "../constants";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ShieldCheck, Loader2, CheckCircle2, ArrowLeft, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export function OtpVerificationForm() {
  const router = useRouter();
  const { pendingUserId, verifyOtp, resendOtp, isLoading, error, successMessage, clearMessages } = useAuthStore();
  const [timer, setTimer] = useState(OTP_TIMER_INITIAL_SECONDS);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const defaultValues = OTP_VERIFICATION_DEFAULT_VALUES;

  const handleSubmit = async ({ value }: { value: typeof defaultValues }) => {
    clearMessages();
    const success = await verifyOtp({
      otpCode: value.otpCode,
      userId: pendingUserId ?? undefined,
    });
    if (success) {
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: handleSubmit,
  });

  const handleResend = async () => {
    if (timer > 0 || !pendingUserId) return;
    clearMessages();
    const success = await resendOtp(pendingUserId);
    if (success) {
      setTimer(60);
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
          OTP Verification
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter the 4-digit security code sent for User ID{" "}
          <span className="font-semibold text-foreground">{pendingUserId ?? "Account"}</span>
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
        {/* OTP Input Field */}
        <form.Field name="otpCode">
          {(field) => (
            <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-6">
              <Label htmlFor="otpCode" className="text-xs font-semibold text-foreground uppercase tracking-wider text-center block">
                Verification Code (4 Digits)
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  id="otpCode"
                  maxLength={4}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(val) => field.handleChange(val.replace(/\D/g, ""))}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive text-center font-medium">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </motion.div>
          )}
        </form.Field>

        {/* Resend Code Section */}
        <motion.div variants={FORM_ITEM_VARIANTS} className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span>Didn&apos;t receive the code?</span>
          {timer > 0 ? (
            <span className="font-mono text-blue-600 dark:text-blue-500">Resend in {timer}s</span>
          ) : (
            <Button
              variant={"link"}
              onClick={handleResend}
              disabled={isLoading}
              className="text-blue-600 dark:text-blue-500 font-semibold hover:no-underline inline-flex items-center space-x-1 p-0 h-auto"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Resend OTP</span>
            </Button>
          )}
        </motion.div>

        {/* Submit Button */}
        <form.Subscribe selector={(state) => [state.values.otpCode, isLoading]}>
          {([otpCode, loading]) => {
            const isFull = Boolean(otpCode && String(otpCode).length === 4);
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
                      <span>Verifying OTP...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span>Verify & Proceed</span>
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
