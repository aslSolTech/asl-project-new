import { LoginForm } from "@/modules/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <LoginForm />
    </div>
  );
}
