import { Suspense } from "react";
import { WalletsView } from "@/modules/merchant/wallets/WalletsView";
import { Skeleton } from "@/components/ui/skeleton";

function WalletsLoadingSkeleton() {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="w-full h-48 rounded-3xl" />
      <div className="flex gap-2">
        <Skeleton className="w-32 h-10 rounded-2xl" />
        <Skeleton className="w-32 h-10 rounded-2xl" />
        <Skeleton className="w-32 h-10 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-64 rounded-3xl" />
        <Skeleton className="h-64 rounded-3xl" />
        <Skeleton className="h-64 rounded-3xl" />
      </div>
    </div>
  );
}

export default function WalletsPage() {
  return (
    <Suspense fallback={<WalletsLoadingSkeleton />}>
      <WalletsView />
    </Suspense>
  );
}
