"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppForm } from "@/components/form_builder/form";
import { LOGIN_DEFAULT_VALUES, FORM_CONTAINER_VARIANTS, FORM_ITEM_VARIANTS } from "../constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { useAuthState } from "../stores/authState";
import { AnimatePresence, motion } from "framer-motion";
import { useLoginMutation } from "../hooks";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { error, successMessage, clearMessages } = useAuthState();
  const { mutate: login, isPending: isLoading } = useLoginMutation();

  const defaultValues = LOGIN_DEFAULT_VALUES;

  const handleSubmit = ({ value }: { value: typeof defaultValues }) => {
    clearMessages();
    login(value, {
      onSuccess: (data) => {
        const userRole = data?.user?.role || "admin";
        const roleSlug = userRole.toLowerCase().replace(/\s+/g, "-");
        setTimeout(() => {
          router.push(`/${roleSlug}/dashboard`);
        }, 1000);
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
      className="w-full max-w-md p-8 rounded-xl bg-card border border-border shadow-xl backdrop-blur-sm transition-all duration-300"
    >
      <motion.div variants={FORM_ITEM_VARIANTS} className="text-center mb-8">
        <div className="inline-flex items-center justify-center mb-3">
          <Image
            src="/logo/asl_logo.png"
            alt="Company Logo"
            width={48}
            height={48}
            style={{ width: "auto" }}
            className="h-12 object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Sign in to your Merchant Portal to continue
        </p>
      </motion.div>

      {/* Form Error / Success Alert Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            variants={FORM_ITEM_VARIANTS}
            className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between"
          >
            <span>{error}</span>
            <button type="button"
              onClick={() => clearMessages()}
              className="text-destructive hover:opacity-80 p-1"
            >
              ✕
            </button>
          </motion.div>
        )}
        {successMessage && (
          <motion.div
            variants={FORM_ITEM_VARIANTS}
            className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center justify-between"
          >
            <span>{successMessage}</span>
            <button type="button"
              onClick={() => clearMessages()}
              className="text-emerald-600 dark:text-emerald-400 hover:opacity-80 p-1"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
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
                  placeholder="e.g. USER1234"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-10 pr-4 h-10 rounded-md focus:ring-0 focus:outline-none border-border focus:border-primary"
                />
              </div>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </motion.div>
          )}
        </form.Field>

        {/* Password Field */}
        <form.Field name="password">
          {(field) => (
            <motion.div variants={FORM_ITEM_VARIANTS} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary font-medium hover:no-underline transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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
                <p className="text-xs text-destructive mt-1 font-medium">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </motion.div>
          )}
        </form.Field>

        {/* Remember Me */}
        <form.Field name="rememberMe">
          {(field) => (
            <motion.div variants={FORM_ITEM_VARIANTS} className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="rememberMe"
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(Boolean(checked))}
                className="rounded-sm"
              />
              <Label htmlFor="rememberMe" className="text-xs text-muted-foreground cursor-pointer select-none">
                Remember this device
              </Label>
            </motion.div>
          )}
        </form.Field>

        {/* Submit Button */}
        <form.Subscribe selector={(state) => [state.values.userId, state.values.password, isLoading]}>
          {([userId, password, loading]) => {
            const isFull = Boolean(userId && String(userId).trim() !== "" && password && String(password).trim() !== "");
            return (
              <motion.div variants={FORM_ITEM_VARIANTS}>
                <Button 
                  type="submit"
                  disabled={Boolean(loading) || !isFull}
                  className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 active:scale-[0.99] transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:active:scale-100 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            );
          }}
        </form.Subscribe>
      </form>
    </motion.div>
  );
}
