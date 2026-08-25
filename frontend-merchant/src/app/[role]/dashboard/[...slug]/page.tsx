import Link from "next/link";
import { AlertCircle, Home, LayoutDashboard, Search } from "lucide-react";

interface CatchAllPageProps {
  readonly params: Promise<{
    role: string;
    slug: string[];
  }>;
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const resolvedParams = await params;
  const role = resolvedParams?.role || "merchant";
  const slugArray = resolvedParams?.slug || [];
  const fullPath = slugArray.join("/");
  const formattedTitle = slugArray.at(-1)?.replaceAll("-", " ") || "Page Not Found";

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center space-y-6 animate-in fade-in duration-300">
      {/* 404 Badge & Visual Header */}
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-3xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center text-4xl font-black shadow-inner border border-red-500/20">
          <AlertCircle className="w-12 h-12 stroke-[1.75]" />
        </div>
        <span className="absolute -top-2 -right-3 bg-red-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          404
        </span>
      </div>

      {/* Main Heading & Route Context */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary dark:text-primary/70 tracking-tight uppercase">
          {formattedTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          The requested path <code className="px-2 py-1 font-mono text-xs rounded bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700">/{role}/dashboard/{fullPath}</code> does not exist or has been moved.
        </p>
      </div>

      {/* Helpful Info Box */}
      <div className="w-full max-w-lg p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 text-left space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
          <Search className="w-4 h-4 text-primary" />
          <span>Looking for something else?</span>
        </div>
        <ul className="list-disc list-inside space-y-1 pl-1 text-slate-500 dark:text-slate-400">
          <li>Check the URL for typos or incorrect path parameters.</li>
          <li>Ensure you have the required permissions to access this section.</li>
          <li>Return to the main dashboard overview or use side navigation.</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href={`/${role}/dashboard`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-secondary dark:bg-secondary/70 text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard Overview
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
          <Home className="w-4 h-4" />
          Home Page
        </Link>
      </div>
    </div>
  );
}