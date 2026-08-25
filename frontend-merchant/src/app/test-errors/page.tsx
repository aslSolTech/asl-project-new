"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NotFound from "@/app/not-found";
import Unauthorized from "@/app/unauthorized/page";
import Forbidden from "@/app/forbidden/page";
import ServerError from "@/app/error";
import { OtpVerificationForm } from "@/modules/auth/components/otp-verification-form";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ForgotPasswordForm } from "@/modules/auth/components/forgot-password-form";
import { LoginForm } from "@/modules/auth/components/login-form";
import { ResetPasswordForm } from "@/modules/auth/components/reset-password-form";


interface TestErrorsPageProps {
 readonly searchParams: Promise<{ type?: string }>;
}

export default function TestErrorsPage({
  searchParams,
}: TestErrorsPageProps) {
  const resolvedParams = use(searchParams);
  const initialType = resolvedParams?.type || "login";
  const [activeTab, setActiveTab] = useState(initialType);
  const router = useRouter();

  const handleTabChange = (type: string) => {
    setActiveTab(type);
    router.replace(`/test-errors?type=${type}`, { scroll: false });
  };

  const tabs = [
    { id: "login", label: "Login" },
    { id: "reset", label: "Reset" },
    { id: "otp", label: "OTP Page" },
    { id: "forgot", label: "Forgot Pass" },
    { id: "404", label: "404 Not Found" },
    { id: "401", label: "401 Unauthorized" },
    { id: "403", label: "403 Forbidden" },
    { id: "500", label: "500 Error" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 bg-background text-foreground overflow-hidden">
      {/* Top Floating Navigation Bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-card/90 border border-border/80 shadow-2xl backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold max-w-[95vw] overflow-x-auto scrollbar-none">
        <span className="text-muted-foreground mr-1 shrink-0">Test Pages:</span>
        <AnimatedThemeToggler variant="hexagon" duration={300} fromCenter className="z-10 cursor-pointer shrink-0" />
        
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id)}
            className={`px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Smooth Framer Motion Slide Entrance */}
      <div className="w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="w-full flex items-center justify-center"
          >
            {activeTab === "login" && <LoginForm />}
            {activeTab === "otp" && <OtpVerificationForm />}
            {activeTab === "forgot" && <ForgotPasswordForm />}
            {activeTab === "404" && <NotFound />}
            {activeTab === "401" && <Unauthorized />}
            {activeTab === "403" && <Forbidden />}
            {activeTab === "reset" && <ResetPasswordForm />}
            {activeTab === "500" && (
              <ServerError
                error={new globalThis.Error("Test Server Runtime Exception (500 Error)")}
                reset={() => window.location.reload()}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
