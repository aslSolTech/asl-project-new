import { Suspense } from "react";
import { AllServicesView } from "@/modules/merchant/services";
import { Skeleton } from "@/components/ui/skeleton";

function ServicesLoadingSkeleton() {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="w-full h-32 rounded-3xl" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={`serv-skel-${i}`} className="h-40 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export default function ServicesIndexPage() {
  return (
    <Suspense fallback={<ServicesLoadingSkeleton />}>
      <AllServicesView />
    </Suspense>
  );
}
