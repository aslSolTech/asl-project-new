import { ErrorCard } from "@/components/shared/errors/ErrorCard";

export default function ForbiddenPage() {
  return (
    <ErrorCard
      statusCode={403}
      imageSrc="/images/errors/403.png"
      title="Forbidden Access"
      description="You do not have the required permissions to view this resource. Contact your administrator if you believe this is an error."
      showHomeBtn={true}
      showBackBtn={true}
    />
  );
}
