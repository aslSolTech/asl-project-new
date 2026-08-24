import { CompanySignupForm } from "@/modules/auth/components/company-signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <CompanySignupForm />
    </div>
  );
}
