import { Suspense } from "react";
import { MerchantProfileView } from "@/modules/merchant/components/profiles/MerchantProfile";
import { Skeleton } from "@/components/ui/skeleton";

function ProfileLoadingSkeleton() {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="w-full h-48 rounded-3xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-96 rounded-2xl" />
        <Skeleton className="lg:col-span-1 h-96 rounded-2xl" />
      </div>
    </div>
  );
}

export default function MerchantProfilePage() {
  return (
    <Suspense fallback={<ProfileLoadingSkeleton />}>
      <MerchantProfileView />
    </Suspense>
  );
}
