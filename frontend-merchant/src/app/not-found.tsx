import { ErrorCard } from "@/components/shared/errors/ErrorCard";

export default function NotFound() {
  return (
    <ErrorCard
      statusCode={404}
      imageSrc="/images/errors/404.png"
      title="Page Not Found"
      description="Oops! The page you are looking for doesn't exist or has been moved."
      showHomeBtn={true}
      showBackBtn={true}
    />
  );
}
