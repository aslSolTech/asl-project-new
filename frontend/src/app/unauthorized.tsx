import { ErrorCard } from "@/components/errors/ErrorCard";

export default function Unauthorized() {
  return (
    <ErrorCard
      statusCode={401}
      imageSrc="/images/errors/401.png"
      title="Authentication Required"
      description="You need to be logged in to access this page. Please sign in to continue."
      showHomeBtn={true}
      showBackBtn={true}
    />
  );
}
