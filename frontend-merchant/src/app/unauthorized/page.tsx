import { ErrorCard } from "@/components/shared/errors/ErrorCard";

export default function UnauthorizedPage() {
  return (
    <ErrorCard
      statusCode={401}
      imageSrc="/images/errors/401.png"
      title="Unauthorized Access"
      description="You need to be logged in to view this page. Please log in first."
      showHomeBtn={true}
      showBackBtn={true}
    />
  );
}
