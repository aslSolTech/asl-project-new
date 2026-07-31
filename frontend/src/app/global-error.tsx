"use client";
import { ErrorCard } from "@/components/errors/ErrorCard";

interface GlobalErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen antialiased flex items-center justify-center">
        <ErrorCard
          statusCode={500}
          imageSrc="/images/errors/500.png"
          title="Critical System Error"
          description={error?.message || "A system-wide layout error occurred. Please try reloading the page."}
          onRetry={() => reset()}
          showHomeBtn={true}
          showBackBtn={false}
        />
      </body>
    </html>
  );
}
