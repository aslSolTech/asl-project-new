interface PageProps {
 readonly params: Promise<{ id: string }>;
}

export default async function TransactionDetailPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Transaction Detail</h1>
      <p className="mt-2 text-muted-foreground">Details for Transaction ID: {id}</p>
    </div>
  );
}
