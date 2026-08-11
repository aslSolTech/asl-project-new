import { ErrorCard } from "@/components/shared/errors/ErrorCard";

export default function Forbidden() {
  return (
    <ErrorCard
      statusCode={403}
      imageSrc="/images/errors/403.png"
      title="Access Denied"
      description="You don't have the necessary permissions to access this page or resource."
      showHomeBtn={true}
      showBackBtn={true}
    />
  );
}
