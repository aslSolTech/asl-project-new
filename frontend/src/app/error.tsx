"use client";

import { useEffect } from "react";
import { ErrorCard } from "@/components/shared/errors/ErrorCard";

interface ErrorProps {
 readonly error: Error & { digest?: string };
 readonly reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Runtime Error:", error);
  }, [error]);

  return (
    <ErrorCard
      statusCode={500}
      imageSrc="/images/errors/500.png"
      title="Something Went Wrong!"
      description={error.message || "An unexpected application error occurred. Don't worry, please try again."}
      onRetry={() => reset()}
      showHomeBtn={true}
      showBackBtn={true}
    />
  );
}
