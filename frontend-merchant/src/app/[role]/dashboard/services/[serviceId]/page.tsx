import { Suspense } from "react";
import { ServicePortalView } from "@/modules/merchant/services";
import { Skeleton } from "@/components/ui/skeleton";

interface ServicePageProps {
  readonly params: Promise<{
    role: string;
    serviceId: string;
  }>;
}

function ServiceLoadingSkeleton() {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="w-full h-32 rounded-3xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-96 rounded-3xl" />
        <Skeleton className="h-96 rounded-3xl" />
      </div>
    </div>
  );
}

export default async function DynamicServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const serviceId = resolvedParams?.serviceId || "portal";

  return (
    <Suspense fallback={<ServiceLoadingSkeleton />}>
      <ServicePortalView serviceId={serviceId} />
    </Suspense>
  );
}
