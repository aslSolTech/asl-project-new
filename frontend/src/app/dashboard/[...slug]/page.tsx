interface CatchAllPageProps {
  readonly  params: {
        slug: string[];
    };
}

export default function CatchAllPage({ params }: CatchAllPageProps) {
  const path = params?.slug?.join(" / ");
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
        {path?.charAt(0).toUpperCase()}
      </div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 capitalize">{path?.replaceAll("-", " ")}</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        This is the <span className="font-semibold text-indigo-600 dark:text-indigo-400">{path}</span> page. Content will be rendered here based on the route.
      </p>
    </div>
  );
}