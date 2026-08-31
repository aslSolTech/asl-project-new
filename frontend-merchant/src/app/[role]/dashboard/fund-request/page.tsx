import { Suspense } from "react";
import { FundRequestTab } from "@/modules/merchant/wallets/FundRequestTab";
import { Skeleton } from "@/components/ui/skeleton";

function FundRequestLoadingSkeleton() {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="w-full h-28 rounded-3xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-96 rounded-3xl" />
        <Skeleton className="h-96 rounded-3xl" />
      </div>
      <Skeleton className="w-full h-64 rounded-3xl" />
    </div>
  );
}

export default function FundRequestPage() {
  return (
    <div className="mx-auto w-full space-y-6 pb-12">
      <Suspense fallback={<FundRequestLoadingSkeleton />}>
        <FundRequestTab />
      </Suspense>
    </div>
  );
}
