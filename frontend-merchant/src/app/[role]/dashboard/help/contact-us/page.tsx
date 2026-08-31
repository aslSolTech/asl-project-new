import { Suspense } from "react";
import { ContactSupportView } from "@/modules/merchant/contact/messages/components/ContactSupportView";
import { Skeleton } from "@/components/ui/skeleton";

function ContactSupportSkeleton() {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="w-full h-28 rounded-3xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-96 rounded-3xl" />
        <Skeleton className="h-96 rounded-3xl" />
      </div>
      <Skeleton className="w-full h-48 rounded-3xl" />
    </div>
  );
}

export default function ContactSupportPage() {
  return (
    <div className="mx-auto w-full space-y-6 pb-12">
      <Suspense fallback={<ContactSupportSkeleton />}>
        <ContactSupportView />
      </Suspense>
    </div>
  );
}
