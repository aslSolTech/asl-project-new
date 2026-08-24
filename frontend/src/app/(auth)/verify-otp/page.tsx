import { OtpVerificationForm } from "@/modules/auth/components/otp-verification-form";

export default function VerifyOtpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <OtpVerificationForm />
    </div>
  );
}
